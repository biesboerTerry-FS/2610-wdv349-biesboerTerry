import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	ApiError,
	deleteResource,
	fetchAdminMeta,
	listResource,
} from "../lib/api";
import { useAdminAuth } from "./AdminAuthContext";
import { displayName, formatCell } from "./format";
import RecordDetail from "./RecordDetail";
import RecordForm from "./RecordForm";
import { RESOURCES } from "./resources";

const PAGE_SIZES = [25, 50, 100];

const STATUS_TONES = {
	active: "bg-lu-green/10 text-lu-green",
	approved: "bg-lu-green/10 text-lu-green",
	completed: "bg-lu-green/10 text-lu-green",
	subscribed: "bg-lu-green/10 text-lu-green",
	published: "bg-lu-green/10 text-lu-green",
	submitted: "bg-lu-yellow/30 text-lu-dark",
	new: "bg-lu-yellow/30 text-lu-dark",
	pending: "bg-lu-yellow/30 text-lu-dark",
	under_review: "bg-lu-yellow/30 text-lu-dark",
	contacted: "bg-lu-yellow/30 text-lu-dark",
	draft: "bg-lu-ink/5 text-lu-ink/50",
	denied: "bg-red-100 text-red-700",
	unsubscribed: "bg-lu-ink/5 text-lu-ink/50",
	archived: "bg-lu-ink/5 text-lu-ink/50",
	cancelled: "bg-red-100 text-red-700",
};

function Cell({ column, record }) {
	const value = column.get ? column.get(record) : record[column.key];
	const text = formatCell(value);
	const isStatus = /status/i.test(column.label);

	if (isStatus && value) {
		const tone = STATUS_TONES[String(value)] || "bg-lu-ink/5 text-lu-ink/70";
		return (
			<span className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ${tone}`}>
				{text}
			</span>
		);
	}

	return (
		<span className={column.wide ? "" : "block max-w-[22rem] truncate"} title={text}>
			{text}
		</span>
	);
}

export default function AdminResourcePage() {
	const { resource } = useParams();
	return <ResourceView key={resource} slug={resource} />;
}

function ResourceView({ slug }) {
	const resource = RESOURCES[slug];
	const { signOut } = useAdminAuth();

	const [q, setQ] = useState("");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(25);
	const [rows, setRows] = useState([]);
	const [pagination, setPagination] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [notice, setNotice] = useState("");
	const [selectedId, setSelectedId] = useState(null);
	const [formState, setFormState] = useState(null);
	const [fields, setFields] = useState(null);
	const [deleting, setDeleting] = useState(false);
	const [reloadKey, setReloadKey] = useState(0);
	const lastSearch = useRef("");

	const startRequest = () => {
		setLoading(true);
		setError("");
	};

	useEffect(() => {
		if (!notice) return undefined;
		const timer = setTimeout(() => setNotice(""), 4000);
		return () => clearTimeout(timer);
	}, [notice]);

	useEffect(() => {
		let cancelled = false;

		fetchAdminMeta()
			.then((payload) => {
				if (!cancelled) setFields(payload.data?.[slug]?.fields || null);
			})
			.catch((err) => {
				if (cancelled) return;
				if (err instanceof ApiError && err.status === 401) {
					signOut();
					return;
				}
				setError("Could not load the form fields for this section. Refresh to try again.");
			});

		return () => {
			cancelled = true;
		};
	}, [slug, signOut, reloadKey]);

	useEffect(() => {
		const timer = setTimeout(() => {
			const next = q.trim();
			if (next === lastSearch.current) return;
			lastSearch.current = next;
			setSearch(next);
			setPage(1);
			setLoading(true);
			setError("");
		}, 300);
		return () => clearTimeout(timer);
	}, [q]);

	useEffect(() => {
		if (!resource) return undefined;
		let cancelled = false;

		listResource(slug, { page, limit, q: search })
			.then((payload) => {
				if (cancelled) return;
				setRows(payload.data || []);
				setPagination(payload.pagination || null);
				setError("");
				setLoading(false);
			})
			.catch((err) => {
				if (cancelled) return;
				if (err instanceof ApiError && err.status === 401) {
					signOut();
					return;
				}
				setError(err instanceof ApiError ? err.message : "Could not load records.");
				setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [slug, resource, page, limit, search, reloadKey, signOut]);

	const openCreate = () => {
		setFormState({ record: null });
	};

	const openEdit = (record) => {
		setSelectedId(null);
		setFormState({ record });
	};

	const handleSaved = () => {
		setNotice(`${resource.singular} saved.`);
		setFormState(null);
		setSelectedId(null);
		startRequest();
		setReloadKey((key) => key + 1);
	};

	const handleDelete = (record) => {
		const id = record?.id || record?._id;
		if (!id) return;
		const label = displayName(record) || resource.singular;
		if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return;

		setDeleting(true);
		setError("");

		deleteResource(slug, id)
			.then(() => {
				setSelectedId(null);
				setNotice(`${resource.singular} deleted.`);
				startRequest();
				setReloadKey((key) => key + 1);
			})
			.catch((err) => {
				if (err instanceof ApiError && err.status === 401) {
					signOut();
					return;
				}
				setSelectedId(null);
				setError(err instanceof ApiError ? err.message : "Could not delete this record.");
			})
			.finally(() => setDeleting(false));
	};

	if (!resource) {
		return (
			<div className="max-w-xl rounded-xl border border-lu-green/15 bg-white p-6">
				<h2 className="font-display mb-2 text-xl font-bold text-lu-dark">Unknown section</h2>
				<p className="mb-4 text-lu-ink/60">
					There is no admin section called “{slug}”.
				</p>
				<Link to="/admin" className="font-semibold text-lu-green underline">
					Back to the dashboard
				</Link>
			</div>
		);
	}

	const total = pagination?.total ?? rows.length;
	const totalPages = pagination?.totalPages ?? 1;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-3 rounded-xl border border-lu-green/15 bg-white p-4 sm:flex-row sm:items-center">
				<div className="flex-1">
					<input
						type="search"
						value={q}
						onChange={(event) => setQ(event.target.value)}
						placeholder={`Search ${resource.label.toLowerCase()}…`}
						className="w-full rounded-lg border border-lu-ink/15 bg-lu-cream/50 px-3 py-2 font-body text-sm text-lu-ink placeholder-lu-ink/45 focus:border-lu-green focus:bg-white focus:outline-none"
						aria-label={`Search ${resource.label}`}
					/>
				</div>

				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={openCreate}
						disabled={!fields}
						title={fields ? undefined : "Loading form fields…"}
						className="rounded-lg bg-lu-green px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-lu-dark disabled:opacity-50"
					>
						New {resource.singular.toLowerCase()}
					</button>

					<label className="text-xs text-lu-ink/55" htmlFor="page-size">
						Rows
					</label>
					<select
						id="page-size"
						value={limit}
						onChange={(event) => {
							setLimit(Number(event.target.value));
							setPage(1);
							startRequest();
						}}
						className="rounded-lg border border-lu-ink/15 bg-white px-2 py-2 font-body text-sm text-lu-ink"
					>
						{PAGE_SIZES.map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>

					<button
						type="button"
						onClick={() => {
							startRequest();
							setReloadKey((key) => key + 1);
						}}
						className="rounded-lg border border-lu-ink/15 px-3 py-2 text-sm font-semibold hover:bg-lu-green/5"
					>
						Refresh
					</button>
				</div>
			</div>

			<div className="flex flex-wrap items-baseline justify-between gap-2">
				<p className="text-sm text-lu-ink/60">
					{loading ? "Loading…" : `${total.toLocaleString()} ${total === 1 ? "record" : "records"}`}
					{q && !loading ? ` matching “${q.trim()}”` : ""}
				</p>
				<p className="text-xs text-lu-ink/45">
					Select a row to see or edit every field stored for that record.
				</p>
			</div>

			{error && (
				<div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
					{error}
				</div>
			)}

			{notice && (
				<div className="rounded-lg border border-lu-green/30 bg-lu-green/10 px-4 py-3 text-sm font-medium text-lu-green">
					{notice}
				</div>
			)}

			<div className="overflow-hidden rounded-xl border border-lu-green/15 bg-white">
				<div className="overflow-x-auto">
					<table className="w-full min-w-[46rem] border-collapse text-left text-sm">
						<thead>
							<tr className="border-b border-lu-green/15 bg-lu-green/5 text-[10px] uppercase tracking-wider text-lu-ink/50">
								{resource.columns.map((column) => (
									<th key={column.label} className="whitespace-nowrap px-4 py-3 font-roboto font-semibold">
										{column.label}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{loading && !rows.length && (
								<tr>
									<td colSpan={resource.columns.length} className="px-4 py-10 text-center text-lu-ink/50">
										Loading {resource.label.toLowerCase()}…
									</td>
								</tr>
							)}

							{!loading && !rows.length && (
								<tr>
									<td colSpan={resource.columns.length} className="px-4 py-10 text-center text-lu-ink/50">
										No records found.
									</td>
								</tr>
							)}

							{rows.map((record) => {
								const rowId = record.id || record._id;
								return (
									<tr
										key={rowId}
										onClick={() => setSelectedId(rowId)}
										onKeyDown={(event) => {
											if (event.key === "Enter" || event.key === " ") {
												event.preventDefault();
												setSelectedId(rowId);
											}
										}}
										tabIndex={0}
										className="cursor-pointer border-b border-lu-green/10 last:border-0 hover:bg-lu-yellow/10 focus:bg-lu-yellow/10 focus:outline-none"
									>
										{resource.columns.map((column) => (
											<td key={column.label} className="px-4 py-3 align-top">
												<Cell column={column} record={record} />
											</td>
										))}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>

			<div className="flex flex-wrap items-center justify-between gap-3">
				<p className="text-sm text-lu-ink/55">
					Page {pagination?.page ?? page} of {Math.max(totalPages, 1)}
					{total ? ` · ${total.toLocaleString()} total` : ""}
				</p>
				<div className="flex gap-2">
					<button
						type="button"
						disabled={!pagination?.hasPreviousPage || loading}
						onClick={() => {
							startRequest();
							setPage((current) => Math.max(1, current - 1));
						}}
						className="rounded-full border border-lu-green/30 px-4 py-2 text-sm font-semibold hover:bg-lu-green hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit"
					>
						Previous
					</button>
					<button
						type="button"
						disabled={!pagination?.hasNextPage || loading}
						onClick={() => {
							startRequest();
							setPage((current) => current + 1);
						}}
						className="rounded-full border border-lu-green/30 px-4 py-2 text-sm font-semibold hover:bg-lu-green hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit"
					>
						Next
					</button>
				</div>
			</div>

			{selectedId && (
				<RecordDetail
					slug={slug}
					id={selectedId}
					onClose={() => setSelectedId(null)}
					onEdit={openEdit}
					onDelete={handleDelete}
					deleting={deleting}
				/>
			)}

			{formState && fields && (
				<RecordForm
					key={formState.record?.id || formState.record?._id || "new"}
					slug={slug}
					record={formState.record}
					fields={fields}
					singular={resource.singular}
					onClose={() => setFormState(null)}
					onSaved={handleSaved}
				/>
			)}
		</div>
	);
}
