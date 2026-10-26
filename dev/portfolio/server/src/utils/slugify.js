export function slugify(value = "") {
	return String(value)
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.trim()
		.replace(/['"]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 80);
}

export function uniqueSlug(base, suffix = "") {
	const slug = slugify(base) || "item";
	return suffix ? `${slug}-${slugify(suffix)}` : slug;
}
