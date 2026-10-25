import React, { useEffect, useState } from "react";
import { ApiError, fetchResource } from "../lib/api";
import { displayName, formatDate } from "./format";
import { RESOURCES } from "./resources";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

function labelFor(key) {
	return key
		.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
		.replace(/[_-]+/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

function PrimitiveValue({ value }) {
	if (value === null || value === undefined || value === "") {
		return <span className="text-lu-ink/35">—</span>;
	}
	if (typeof value === "boolean") {
		return (
			<span
				className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
					value ? "bg-lu-green/10 text-lu-green" : "bg-lu-ink/5 text-lu-ink/50"
				}`}
			>
				{value ? "Yes" : "No"}
			</span>
		);
	}
	if (typeof value === "string" && ISO_DATE.test(value)) {
		return <span>{formatDate(value, true)}</span>;
	}
	if (typeof value === "string" && /^https?:\/\//.test(value)) {
		return (
			<a
				href={value}
				target="_blank"
				rel="noreferrer"
				className="break-all text-lu-green underline"
			>
				{value}
			</a>
		);
	}
	return <span className="break-words">{String(value)}</span>;
}

function ValueView({ value, depth = 0 }) {
	if (Array.isArray(value)) {
		if (!value.length) return <span className="text-lu-ink/35">—</span>;
		if (value.every((entry) => entry === null || typeof entry !== "object")) {
			return (
				<div className="flex flex-wrap gap-1">
					{value.map((entry, index) => (
						<span
							key={`${String(entry)}-${index}`}
							className="rounded-full bg-lu-green/10 px-2 py-0.5 text-xs text-lu-green"
						>
							{String(entry)}
						</span>
					))}
				</div>
			);
		}
		return (
			<div className="flex flex-col gap-2">
				{value.map((entry, index) => (
					<div key={entry?.id || entry?._id || index} className="rounded-lg border border-lu-green/10 p-2">
						{entry && typeof entry === "object" ? (
							depth >= 2 ? (
								<span>{displayName(entry) || "Record"}</span>
							) : (
								<ObjectFields record={entry} depth={depth + 1} />
							)
						) : (
							<PrimitiveValue value={entry} />
						)}
					</div>
				))}
			</div>
		);
	}

	if (value && typeof value === "object") {
		if (depth >= 3) {
			return <code className="text-xs break-all">{JSON.stringify(value)}</code>;
		}
		return <ObjectFields record={value} depth={depth + 1} />;
	}

	return <PrimitiveValue value={value} />;
}

function ObjectFields({ record, depth = 0 }) {
	const entries = Object.entries(record).filter(([key]) => key !== "__v");
	if (!entries.length) return <span className="text-lu-ink/35">—</span>;

	return (
		<dl className={`flex flex-col gap-3 ${depth > 0 ? "border-l-2 border-lu-green/15 pl-3" : ""}`}>
			{entries.map(([key, value]) => (
				<div key={key} className="min-w-0">
					<dt className="text-[10px] font-semibold uppercase tracking-wide text-lu-ink/45">
						{labelFor(key)}
					</dt>
					<dd className="mt-1 min-w-0 text-sm text-lu-ink">
						<ValueView value={value} depth={depth} />
					</dd>
				</div>
			))}
		</dl>
	);
}

export default function RecordDetail({
	slug,
	id,
	onClose,
	onEdit,
	onDelete,
	deleting = false,
}) {
	const resource = RESOURCES[slug];
	const [record, setRecord] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let cancelled = false;

		fetchResource(slug, id)
			.then((payload) => {
				if (!cancelled) setRecord(payload.data);
			})
			.catch((err) => {
				if (!cancelled) {
					setError(err instanceof ApiError ? err.message : "Could not load this record.");
				}
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [slug, id]);

	useEffect(() => {
		const handleKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [onClose]);

	return (
		<div className="fixed inset-0 z-50 flex justify-end bg-black/45" role="dialog" aria-modal="true">
			<button
				type="button"
				aria-label="Close details"
				onClick={onClose}
				className="absolute inset-0 cursor-default"
			/>

			<div className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden bg-lu-cream shadow-2xl">
				<header className="flex items-start gap-3 border-b border-lu-green/15 bg-white px-5 py-4">
					<div className="flex-1 min-w-0">
						<p className="text-[10px] uppercase tracking-[0.25em] text-lu-green/70">
							{resource?.singular || "Record"}
						</p>
						<h2 className="font-display truncate text-xl font-bold text-lu-dark">
							{record ? displayName(record) || "Record details" : "Record details"}
						</h2>
						<p className="mt-1 break-all font-mono text-xs text-lu-ink/40">{id}</p>
					</div>
					<div className="flex items-center gap-2">
						{record && onEdit && (
							<button
								type="button"
								onClick={() => onEdit(record)}
								className="rounded-full bg-lu-green px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-lu-dark"
							>
								Edit
							</button>
						)}
						{record && onDelete && (
							<button
								type="button"
								onClick={() => onDelete(record)}
								disabled={deleting}
								className="rounded-full border border-red-300 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
							>
								{deleting ? "Deleting…" : "Delete"}
							</button>
						)}
						<button
							type="button"
							onClick={onClose}
							className="rounded-full border border-lu-ink/15 px-3 py-1.5 text-sm font-semibold hover:bg-lu-green/5"
						>
							Close
						</button>
					</div>
				</header>

				<div className="flex-1 overflow-y-auto px-5 py-5">
					{loading && <p className="text-lu-ink/60">Loading record…</p>}
					{error && (
						<div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-800">
							{error}
						</div>
					)}
					{record && (
						<div className="flex flex-col gap-6">
							<section className="rounded-xl border border-lu-green/15 bg-white p-4">
								<ObjectFields record={record} />
							</section>

							<details className="rounded-xl border border-lu-green/15 bg-white p-4">
								<summary className="cursor-pointer font-roboto text-sm font-semibold text-lu-dark">Raw JSON</summary>
								<pre className="mt-3 max-h-96 overflow-auto rounded-lg bg-lu-dark p-3 text-xs text-lu-cream">
									{JSON.stringify(record, null, 2)}
								</pre>
							</details>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
