import { ADMIN_REF_SLUGS, ADMIN_RESOURCES } from "../config/adminResources.js";
import { User } from "../models/User.js";

const SKIP_PATHS = new Set(["__v", "_id", "createdAt", "updatedAt", "createdBy"]);
const USER_SKIP_PATHS = new Set([...SKIP_PATHS, "lastLoginAt", "passwordChangedAt"]);
const TEXT_PATTERN =
	/(description|bio|notes|answer|message|quote|story|details|content|instructions|address|reason)/i;

function enumValuesFor(path) {
	const values = (path.enumValues || []).filter((value) => value !== null && value !== undefined);
	return values.length ? values : null;
}

function refInfo(ref) {
	if (!ref) return {};
	const modelName = typeof ref === "string" ? ref : ref.modelName;
	return { ref: modelName, refSlug: ADMIN_REF_SLUGS[modelName] || null };
}

function scalarKind(name, path) {
	const instance = path.instance;
	if (instance === "String") {
		if (enumValuesFor(path)) return "enum";
		if (/email/i.test(name)) return "email";
		if (/(url|link|href|to)$/i.test(name)) return "string";
		if (TEXT_PATTERN.test(name) || (path.options?.maxlength ?? 0) > 300) return "text";
		return "string";
	}
	if (instance === "Number" || instance === "Decimal128") return "number";
	if (instance === "Boolean") return "boolean";
	if (instance === "Date") return "date";
	if (instance === "ObjectId") return "ref";
	return "json";
}

function describeScalar(name, path) {
	const kind = scalarKind(name, path);
	const field = { name, kind, required: Boolean(path.isRequired) };

	const values = enumValuesFor(path);
	if (values) field.enumValues = values;
	if (kind === "ref") Object.assign(field, refInfo(path.options?.ref));

	if (path.options?.maxlength) field.maxlength = path.options.maxlength;
	if (typeof path.options?.min === "number") field.min = path.options.min;
	if (typeof path.options?.max === "number") field.max = path.options.max;
	if (path.options?.default !== undefined && typeof path.options.default !== "function") {
		field.default = path.options.default;
	}
	if (kind === "text") {
		field.rows = Math.min(10, Math.max(3, Math.ceil((path.options?.maxlength || 600) / 140)));
	}

	return field;
}

function describeArray(name, path) {
	const caster = path.embeddedSchemaType || path.caster;
	const field = { name, kind: "json", required: Boolean(path.isRequired) };

	if (Array.isArray(path.options?.default)) field.default = [...path.options.default];
	else if (!path.options?.default) field.default = [];

	if (!caster) return field;

	const instance = caster.instance;
	if (instance === "ObjectId") {
		field.kind = "refArray";
		Object.assign(field, refInfo(caster.options?.ref));
		return field;
	}

	if (instance === "String" || instance === "Number") {
		const values = enumValuesFor(caster);
		if (values) {
			field.kind = "enumArray";
			field.enumValues = values;
		} else {
			field.kind = instance === "Number" ? "numberArray" : "stringArray";
		}
		return field;
	}

	return field;
}

function describeSchema(schema, { skip = SKIP_PATHS, prefix = "" } = {}) {
	const fields = [];

	for (const [rawName, path] of Object.entries(schema.paths)) {
		if (skip.has(rawName)) continue;
		if (path.options?.select === false) continue;
		if (path.instance === "Array" && rawName === "_id") continue;

		const name = prefix ? `${prefix}.${rawName}` : rawName;

		if (path.instance === "Array") {
			fields.push(describeArray(name, path));
			continue;
		}

		if (path.instance === "Embedded" || path.instance === "Subdocument") {
			if (path.schema && Object.keys(path.schema.paths).length) {
				fields.push(...describeSchema(path.schema, { prefix: name }));
			}
			continue;
		}

		if (path.instance === "Mixed" || path.instance === "Map") {
			fields.push({
				name,
				kind: "json",
				mixed: true,
				required: Boolean(path.isRequired),
				default: path.options?.default,
			});
			continue;
		}

		fields.push(describeScalar(name, path));
	}

	return fields;
}

/** Schema metadata for every admin resource, used to build create/edit forms. */
export function buildAdminMeta() {
	const meta = {};

	for (const { slug, model } of ADMIN_RESOURCES) {
		meta[slug] = { collection: model.collection.name, fields: describeSchema(model.schema) };
	}

	const userFields = describeSchema(User.schema, { skip: USER_SKIP_PATHS }).filter(
		(field) => field.name !== "passwordHash"
	);
	const emailIndex = userFields.findIndex((field) => field.name === "email");
	userFields.splice(emailIndex + 1, 0, {
		name: "password",
		kind: "password",
		required: false,
		requiredOnCreate: true,
	});

	meta.users = { collection: User.collection.name, fields: userFields };

	return meta;
}
