import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { buildFilter, buildSearch, parseSort } from "../utils/query.js";
import { buildPaginationMeta, parsePagination } from "../utils/pagination.js";

const IMMUTABLE_FIELDS = new Set(["_id", "id", "__v", "createdAt", "updatedAt", "passwordHash"]);

function stripImmutable(body = {}) {
	return Object.fromEntries(
		Object.entries(body).filter(([key]) => !IMMUTABLE_FIELDS.has(key)),
	);
}

function applyPopulate(query, populate = []) {
	for (const entry of populate) {
		query.populate(entry);
	}
	return query;
}

/**
 * Creates standard list/get/create/update/delete handlers for a Mongoose model.
 * Admin routes are all protected, so no per-document ownership checks are needed.
 */
export function createCrudController({
	model,
	searchFields = [],
	allowedFilters = [],
	allowedSortFields = ["createdAt", "updatedAt", "_id"],
	defaultSort = "-createdAt",
	populate = [],
	forcedFilter = {},
	beforeCreate,
	afterCreate,
	beforeUpdate,
}) {
	const list = asyncHandler(async (req, res) => {
		const { page, limit, skip } = parsePagination(req.query);
		const filter = {
			...forcedFilter,
			...buildFilter(req.query, model, { allowedFilters }),
		};
		const search = buildSearch(req.query.q, searchFields);
		if (search) Object.assign(filter, search);

		const sort = parseSort(req.query.sort, allowedSortFields, defaultSort);
		const query = applyPopulate(model.find(filter).sort(sort).skip(skip).limit(limit), populate);
		const [data, total] = await Promise.all([query.exec(), model.countDocuments(filter)]);

		res.json({
			success: true,
			data,
			pagination: buildPaginationMeta({ page, limit, total }),
		});
	});

	const getById = asyncHandler(async (req, res) => {
		const query = applyPopulate(model.findById(req.params.id), populate);
		const document = await query.exec();
		if (!document) throw ApiError.notFound(`${model.modelName} not found`);
		res.json({ success: true, data: document });
	});

	const create = asyncHandler(async (req, res) => {
		let body = stripImmutable(req.body);
		if (beforeCreate) body = await beforeCreate(body, req);
		let document = await model.create(body);
		if (populate.length) document = await document.populate(populate);
		if (afterCreate) document = (await afterCreate(document, req)) ?? document;
		res.status(201).json({ success: true, data: document });
	});

	const update = asyncHandler(async (req, res) => {
		let body = stripImmutable(req.body);
		if (beforeUpdate) body = await beforeUpdate(body, req);
		let document = await model.findByIdAndUpdate(req.params.id, body, {
			returnDocument: "after",
			runValidators: true,
		});
		if (!document) throw ApiError.notFound(`${model.modelName} not found`);
		if (populate.length) document = await document.populate(populate);
		res.json({ success: true, data: document });
	});

	const remove = asyncHandler(async (req, res) => {
		const document = await model.findByIdAndDelete(req.params.id);
		if (!document) throw ApiError.notFound(`${model.modelName} not found`);
		res.json({ success: true, data: { id: req.params.id, deleted: true } });
	});

	return { list, getById, create, update, remove };
}

export function createCrudRouter(router, path, options) {
	const controller = createCrudController(options);
	router.get(path, controller.list);
	router.get(`${path}/:id`, controller.getById);
	router.post(path, controller.create);
	router.patch(`${path}/:id`, controller.update);
	router.delete(`${path}/:id`, controller.remove);
	return router;
}
