import { slugify } from "../utils/slugify.js";

/**
 * Shared schema options: timestamps, `id` instead of `_id` in JSON, and no
 * `__v` leaking into API responses.
 */
export const baseSchemaOptions = {
	timestamps: true,
	versionKey: false,
	toJSON: {
		virtuals: true,
		transform(_doc, ret) {
			ret.id = ret._id?.toString?.() ?? ret._id;
			delete ret._id;
			return ret;
		},
	},
	toObject: { virtuals: true },
};

/**
 * Adds a unique, URL friendly `slug` generated from a source field.
 * The source may be a field name or a function returning a string.
 * Usage: slugPlugin(schema, "name")
 */
export function slugPlugin(schema, sourceField = "name", { unique = true } = {}) {
	schema.add({
		slug: { type: String, unique, index: true, trim: true, lowercase: true },
	});

	schema.pre("validate", function generateSlug() {
		if (!this.slug) {
			const source =
				typeof sourceField === "function" ? sourceField.call(this) : this[sourceField];
			if (source) this.slug = slugify(source);
		}
	});
}

export function lowerCaseTrimmed(options = {}) {
	return {
		type: String,
		trim: true,
		lowercase: true,
		...options,
	};
}

export function phoneField(options = {}) {
	return { type: String, trim: true, maxlength: 24, ...options };
}
