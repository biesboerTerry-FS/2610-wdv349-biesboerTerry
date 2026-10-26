import React, { useEffect, useMemo, useState } from "react";
import {
	ApiError,
	createResource,
	listResource,
	updateResource,
} from "../lib/api";
import { fromDateTimeInput, toDateTimeInput } from "./dateTime";
import { displayName } from "./format";

const INPUT_CLASS =
	"w-full rounded-lg border border-lu-ink/15 bg-white px-3 py-2 font-body text-sm text-lu-ink placeholder-lu-ink/45 focus:border-lu-green focus:outline-none";

function labelFor(key) {
	return key
		.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
		.replace(/[_.-]+/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

function getByPath(source, path) {
	return path.split(".").reduce((value, key) => (value == null ? value : value[key]), source);
}

function setByPath(target, path, value) {
	const keys = path.split(".");
	let cursor = target;
	for (let index = 0; index < keys.length - 1; index += 1) {
		const key = keys[index];
		if (!cursor[key] || typeof cursor[key] !== "object" || Array.isArray(cursor[key])) {
			cursor[key] = {};
		}
		cursor = cursor[key];
	}
	cursor[keys[keys.length - 1]] = value;
}

function refId(value) {
	if (value === null || value === undefined) return "";
	if (typeof value === "object") return String(value.id || value._id || "");
	return String(value);
}

function initialValue(field, record) {
	const raw = record ? getByPath(record, field.name) : field.default;

	switch (field.kind) {
		case "boolean":
			return raw === true;
		case "date":
			return toDateTimeInput(raw);
		case "number":
			return raw === null || raw === undefined ? "" : String(raw);
		case "stringArray":
		case "numberArray":
			return Array.isArray(raw) ? raw.join(", ") : "";
		case "enumArray":
		case "refArray":
			return Array.isArray(raw) ? raw.map(refId).filter(Boolean) : [];
		case "json":
			if (raw === undefined || raw === null) return "";
			if (field.mixed && typeof raw === "string") return raw;
			return JSON.stringify(raw, null, 2);
		case "enum":
			if (raw !== undefined && raw !== null) return String(raw);
			return field.required && field.enumValues?.length ? field.enumValues[0] : "";
		default:
			return raw === null || raw === undefined ? "" : String(raw);
	}
}

function initialValues(fields, record) {
	return Object.fromEntries(fields.map((field) => [field.name, initialValue(field, record)]));
}

function optionLabel(option) {
	return displayName(option) || option.email || option.key || refId(option);
}

function FieldControl({ field, value, onChange, options }) {
	const id = `field-${field.name.replace(/\./g, "-")}`;
	const required = field.required;

	switch (field.kind) {
		case "text":
			return (
				<textarea
					id={id}
					value={value}
					onChange={(event) => onChange(event.target.value)}
					rows={field.rows || 4}
					required={required}
					className={INPUT_CLASS}
				/>
			);

		case "boolean":
			return (
				<label htmlFor={id} className="flex items-center gap-2 text-sm">
					<input
						id={id}
						type="checkbox"
						checked={Boolean(value)}
						onChange={(event) => onChange(event.target.checked)}
						className="h-4 w-4 rounded border-lu-ink/25 text-lu-green focus:ring-lu-green"
					/>
					<span>{value ? "Yes" : "No"}</span>
				</label>
			);

		case "enum":
			return (
				<select
					id={id}
					value={value}
					onChange={(event) => onChange(event.target.value)}
					required={required}
					className={INPUT_CLASS}
				>
					{!required && <option value="">— Not set —</option>}
					{(field.enumValues || []).map((option) => (
						<option key={option} value={option}>
							{labelFor(option)}
						</option>
					))}
				</select>
			);

		case "enumArray":
			return (
				<div className="flex flex-wrap gap-x-4 gap-y-2">
					{(field.enumValues || []).map((option) => {
						const checked = Array.isArray(value) && value.includes(option);
						return (
							<label key={option} className="flex items-center gap-2 text-sm">
								<input
									type="checkbox"
									checked={checked}
									onChange={(event) => {
										const next = new Set(Array.isArray(value) ? value : []);
										if (event.target.checked) next.add(option);
										else next.delete(option);
										onChange([...next]);
									}}
									className="h-4 w-4 rounded border-lu-ink/25 text-lu-green focus:ring-lu-green"
								/>
								<span>{labelFor(option)}</span>
							</label>
						);
					})}
				</div>
			);

		case "ref":
		case "refArray": {
			const choices = options[field.refSlug] || [];
			const selected = field.kind === "ref" ? [value].filter(Boolean) : Array.isArray(value) ? value : [];
			const missing = selected.filter(
				(selectedId) => !choices.some((choice) => refId(choice) === String(selectedId))
			);

			if (field.kind === "ref") {
				return (
					<select
						id={id}
						value={value}
						onChange={(event) => onChange(event.target.value)}
						required={required}
						className={INPUT_CLASS}
					>
						<option value="">— Not set —</option>
						{choices.map((choice) => (
							<option key={refId(choice)} value={refId(choice)}>
								{optionLabel(choice)}
							</option>
						))}
						{missing.map((missingId) => (
							<option key={missingId} value={missingId}>
								{missingId} (current)
							</option>
						))}
					</select>
				);
			}

			return (
				<>
					<select
						id={id}
						multiple
						size={Math.min(8, Math.max(4, choices.length))}
						value={selected.map(String)}
						onChange={(event) =>
							onChange(Array.from(event.target.selectedOptions, (option) => option.value))
						}
						className={INPUT_CLASS}
					>
						{choices.map((choice) => (
							<option key={refId(choice)} value={refId(choice)}>
								{optionLabel(choice)}
							</option>
						))}
						{missing.map((missingId) => (
							<option key={missingId} value={missingId}>
								{missingId} (current)
							</option>
						))}
					</select>
					<p className="mt-1 text-xs text-lu-ink/45">Ctrl/Cmd-click to select more than one.</p>
				</>
			);
		}

		case "date":
			return (
				<>
					<input
						id={id}
						type="datetime-local"
						value={value}
						onChange={(event) => onChange(event.target.value)}
						required={required}
						className={INPUT_CLASS}
					/>
					<p className="mt-1 text-xs text-lu-ink/45">Central time (America/Chicago).</p>
				</>
			);

		case "number":
			return (
				<input
					id={id}
					type="number"
					step="any"
					value={value}
					onChange={(event) => onChange(event.target.value)}
					required={required}
					min={field.min}
					max={field.max}
					className={INPUT_CLASS}
				/>
			);

		case "password":
			return (
				<input
					id={id}
					type="password"
					value={value}
					onChange={(event) => onChange(event.target.value)}
					autoComplete="new-password"
					required={required}
					className={INPUT_CLASS}
				/>
			);

		case "stringArray":
		case "numberArray":
			return (
				<>
					<input
						id={id}
						type="text"
						value={value}
						onChange={(event) => onChange(event.target.value)}
						required={required}
						className={INPUT_CLASS}
					/>
					<p className="mt-1 text-xs text-lu-ink/45">Separate values with commas.</p>
				</>
			);

		case "json":
			return (
				<>
					<textarea
						id={id}
						value={value}
						onChange={(event) => onChange(event.target.value)}
						rows={6}
						required={required}
						spellCheck={false}
						className={`${INPUT_CLASS} font-mono text-xs`}
					/>
					<p className="mt-1 text-xs text-lu-ink/45">
						{field.mixed
							? "Enter text, or a JSON value for objects, arrays, numbers and booleans."
							: "JSON value — objects, arrays, text, numbers and booleans are all valid."}
					</p>
				</>
			);

		case "email":
			return (
				<input
					id={id}
					type="email"
					value={value}
					onChange={(event) => onChange(event.target.value)}
					required={required}
					className={INPUT_CLASS}
				/>
			);

		default:
			return (
				<input
					id={id}
					type="text"
					value={value}
					onChange={(event) => onChange(event.target.value)}
					required={required}
					maxLength={field.maxlength}
					className={INPUT_CLASS}
				/>
			);
	}
}

export default function RecordForm({ slug, record, fields, singular, onClose, onSaved }) {
	const isEdit = Boolean(record && (record.id || record._id));
	const refSlugs = useMemo(() => {
		const slugs = fields
			.filter((field) => (field.kind === "ref" || field.kind === "refArray") && field.refSlug)
			.map((field) => field.refSlug);
		return [...new Set(slugs)];
	}, [fields]);

	const [values, setValues] = useState(() => initialValues(fields, record));
	const [refOptions, setRefOptions] = useState({});
	const [refLoading, setRefLoading] = useState(refSlugs.length > 0);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const [fieldErrors, setFieldErrors] = useState({});

	useEffect(() => {
		if (!refSlugs.length) return undefined;
		let cancelled = false;

		Promise.all(
			refSlugs.map(async (refSlug) => {
				try {
					const payload = await listResource(refSlug, { limit: 200 });
					return [refSlug, payload.data || []];
				} catch {
					return [refSlug, []];
				}
			})
		).then((entries) => {
			if (cancelled) return;
			setRefOptions(Object.fromEntries(entries));
			setRefLoading(false);
		});

		return () => {
			cancelled = true;
		};
	}, [refSlugs]);

	useEffect(() => {
		const handleKey = (event) => {
			if (event.key === "Escape" && !saving) onClose();
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [onClose, saving]);

	const setValue = (name, value) => {
		setValues((current) => ({ ...current, [name]: value }));
		if (fieldErrors[name]) {
			setFieldErrors((current) => {
				const next = { ...current };
				delete next[name];
				return next;
			});
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (saving) return;

		const body = {};
		const errors = {};

		for (const field of fields) {
			const raw = values[field.name];
			const empty = raw === "" || raw === null || raw === undefined;

			if (field.requiredOnCreate && !isEdit && field.kind === "password" && !String(raw || "").trim()) {
				errors[field.name] = "A password is required for a new user account.";
				continue;
			}

			switch (field.kind) {
				case "boolean":
					setByPath(body, field.name, Boolean(raw));
					break;

				case "date":
					if (empty) {
						if (isEdit) setByPath(body, field.name, null);
						break;
					}
					setByPath(body, field.name, fromDateTimeInput(raw));
					break;

				case "number": {
					if (empty) {
						if (isEdit) setByPath(body, field.name, null);
						break;
					}
					const number = Number(raw);
					if (Number.isNaN(number)) errors[field.name] = "Enter a valid number.";
					else setByPath(body, field.name, number);
					break;
				}

				case "stringArray":
				case "numberArray": {
					const entries = String(raw)
						.split(",")
						.map((entry) => entry.trim())
						.filter(Boolean);

					if (field.kind === "numberArray") {
						const numbers = entries.map(Number);
						if (numbers.some(Number.isNaN)) {
							errors[field.name] = "Enter comma-separated numbers.";
							break;
						}
						setByPath(body, field.name, numbers);
					} else {
						setByPath(body, field.name, entries);
					}
					break;
				}

				case "enumArray":
				case "refArray":
					setByPath(body, field.name, Array.isArray(raw) ? raw : []);
					break;

				case "json": {
					if (empty) {
						if (isEdit) setByPath(body, field.name, null);
						break;
					}
					try {
						setByPath(body, field.name, JSON.parse(raw));
					} catch {
						if (field.mixed) {
							setByPath(body, field.name, raw);
						} else {
							errors[field.name] = "Enter valid JSON.";
						}
					}
					break;
				}

				case "password":
					if (!empty) setByPath(body, field.name, raw);
					break;

				default:
					if (empty) {
						if (isEdit) setByPath(body, field.name, null);
						break;
					}
					setByPath(body, field.name, raw);
			}
		}

		if (Object.keys(errors).length) {
			setFieldErrors(errors);
			setError("Please fix the highlighted fields before saving.");
			return;
		}

		setSaving(true);
		setError("");
		setFieldErrors({});

		try {
			const payload = isEdit
				? await updateResource(slug, record.id || record._id, body)
				: await createResource(slug, body);
			onSaved(payload?.data);
		} catch (err) {
			if (err instanceof ApiError) {
				const rawErrors = err.fieldErrors || {};
				const mapped = { ...rawErrors };
				for (const [key, message] of Object.entries(rawErrors)) {
					const field = fields.find(
						(entry) => entry.name === key || key.startsWith(`${entry.name}.`)
					);
					if (field && !mapped[field.name]) mapped[field.name] = message;
				}
				setFieldErrors(mapped);
				setError(err.message);
			} else {
				setError("Could not save this record. Please try again.");
			}
			setSaving(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex justify-end bg-black/45" role="dialog" aria-modal="true">
			<button
				type="button"
				aria-label="Close form"
				onClick={saving ? undefined : onClose}
				className="absolute inset-0 cursor-default"
			/>

			<form
				onSubmit={handleSubmit}
				className="relative flex h-full w-full max-w-3xl flex-col overflow-hidden bg-lu-cream shadow-2xl"
			>
				<header className="flex items-start gap-3 border-b border-lu-green/15 bg-white px-5 py-4">
					<div className="flex-1 min-w-0">
						<p className="text-[10px] uppercase tracking-[0.25em] text-lu-green/70">
							{isEdit ? "Edit" : "New"} {singular}
						</p>
						<h2 className="font-display truncate text-xl font-bold text-lu-dark">
							{isEdit ? displayName(record) || singular : `Add ${singular.toLowerCase()}`}
						</h2>
						{isEdit && <p className="mt-1 break-all font-mono text-xs text-lu-ink/40">{record.id || record._id}</p>}
					</div>
					<button
						type="button"
						onClick={onClose}
						disabled={saving}
						className="rounded-full border border-lu-ink/15 px-3 py-1.5 text-sm font-semibold hover:bg-lu-green/5 disabled:opacity-50"
					>
						Close
					</button>
				</header>

				<div className="flex-1 overflow-y-auto px-5 py-5">
					{error && (
						<div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
							{error}
						</div>
					)}

					{refLoading && (
						<p className="mb-4 text-xs text-lu-ink/45">Loading linked records for the pickers…</p>
					)}

					<div className="flex flex-col gap-5 rounded-xl border border-lu-green/15 bg-white p-4">
						{fields.map((field, index) => {
							const group = field.name.includes(".") ? field.name.split(".")[0] : null;
							const previousGroup =
								index > 0 && fields[index - 1].name.includes(".")
									? fields[index - 1].name.split(".")[0]
									: null;
							const showGroup = group && group !== previousGroup;
							const fieldError = fieldErrors[field.name];

							return (
								<React.Fragment key={field.name}>
									{showGroup && (
										<h3 className="border-t border-lu-green/15 pt-4 font-roboto text-xs font-bold uppercase tracking-wider text-lu-green first:border-0 first:pt-0">
											{labelFor(group)}
										</h3>
									)}
									<div className="flex flex-col gap-1.5">
										<label
											htmlFor={`field-${field.name.replace(/\./g, "-")}`}
											className="text-xs font-semibold text-lu-ink/70"
										>
											{labelFor(field.name.split(".").pop())}
											{field.required && <span className="ml-1 text-red-600">*</span>}
											{field.requiredOnCreate && !isEdit && (
												<span className="ml-1 text-red-600">*</span>
											)}
										</label>
										<FieldControl
											field={field}
											value={values[field.name]}
											onChange={(value) => setValue(field.name, value)}
											options={refOptions}
										/>
										{fieldError && <p className="text-xs font-medium text-red-700">{fieldError}</p>}
									</div>
								</React.Fragment>
							);
						})}
					</div>
				</div>

				<footer className="flex items-center justify-end gap-2 border-t border-lu-green/15 bg-white px-5 py-4">
					<button
						type="button"
						onClick={onClose}
						disabled={saving}
						className="rounded-full border border-lu-ink/15 px-4 py-2 text-sm font-semibold hover:bg-lu-green/5 disabled:opacity-50"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={saving}
						className="rounded-full bg-lu-green px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-lu-dark disabled:opacity-60"
					>
						{saving ? "Saving…" : isEdit ? "Save changes" : `Create ${singular.toLowerCase()}`}
					</button>
				</footer>
			</form>
		</div>
	);
}
