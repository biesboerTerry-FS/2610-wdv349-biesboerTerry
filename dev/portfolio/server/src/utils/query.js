/**
 * Query helpers shared by the generic CRUD and public read endpoints.
 */

function escapeRegex(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function castValue(value, schemaType) {
	if (value === "true") return true;
	if (value === "false") return false;
	if (schemaType === Number && value !== "" && !Number.isNaN(Number(value))) return Number(value);
	return value;
}

export function buildFilter(query, model, { allowedFilters = [] } = {}) {
	const filter = {};

	for (const field of allowedFilters) {
		const raw = query[field];
		if (raw === undefined || raw === null || raw === "") continue;

		const schemaType = model.schema.path(field)?.instance;
		if (typeof raw === "string" && raw.includes(",")) {
			filter[field] = {
				$in: raw.split(",").map((part) => castValue(part.trim(), schemaType)),
			};
		} else {
			filter[field] = castValue(raw, schemaType);
		}
	}

	return filter;
}

export function buildSearch(search, searchFields = []) {
	if (!search || !searchFields.length) return null;
	const regex = new RegExp(escapeRegex(String(search).trim()), "i");
	return { $or: searchFields.map((field) => ({ [field]: regex })) };
}

export function parseSort(sort, allowedSortFields = [], defaultSort = "-createdAt") {
	if (!sort) return defaultSort;

	const requested = String(sort)
		.split(",")
		.map((field) => field.trim())
		.filter(Boolean);

	const safe = requested.filter((field) => {
		const name = field.startsWith("-") ? field.slice(1) : field;
		return allowedSortFields.includes(name);
	});

	return safe.length ? safe.join(" ") : defaultSort;
}
