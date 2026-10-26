export function parsePagination(query = {}) {
	const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
	const requestedLimit = Number.parseInt(query.limit, 10) || 25;
	const limit = Math.min(Math.max(1, requestedLimit), 200);

	return { page, limit, skip: (page - 1) * limit };
}

export function buildPaginationMeta({ page, limit, total }) {
	return {
		page,
		limit,
		total,
		totalPages: Math.ceil(total / limit) || 0,
		hasNextPage: page * limit < total,
		hasPreviousPage: page > 1,
	};
}
