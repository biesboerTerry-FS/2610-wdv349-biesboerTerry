const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

export function displayName(record) {
	if (!record || typeof record !== "object") return "";
	return (
		record.name ||
		[record.firstName, record.lastName].filter(Boolean).join(" ") ||
		record.athleteName ||
		record.studentName ||
		record.donorName ||
		record.authorName ||
		record.title ||
		record.subject ||
		record.email ||
		record.question ||
		record.key ||
		""
	);
}

export function formatDate(value, withTime = false) {
	if (!value) return "—";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return String(value);

	return date.toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "America/Chicago",
		...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
	});
}

export function formatCurrency(value) {
	const amount = Number(value);
	if (Number.isNaN(amount)) return "—";
	return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function formatCell(value) {
	if (value === null || value === undefined || value === "") return "—";
	if (typeof value === "boolean") return value ? "Yes" : "No";
	if (Array.isArray(value)) {
		if (!value.length) return "—";
		return value
			.map((entry) => (entry && typeof entry === "object" ? displayName(entry) : String(entry)))
			.join(", ");
	}
	if (typeof value === "object") return displayName(value) || "—";
	if (typeof value === "string" && ISO_DATE.test(value)) return formatDate(value);
	return String(value);
}

/** Short, human label for a referenced document. */
export function referenceLabel(value) {
	if (!value) return "—";
	if (typeof value !== "object") return String(value);
	return displayName(value) || value.id || value._id || "—";
}
