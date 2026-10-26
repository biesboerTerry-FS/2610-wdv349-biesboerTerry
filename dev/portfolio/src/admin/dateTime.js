/**
 * Date/time helpers for the admin forms.
 *
 * Timestamps are stored as ISO strings (UTC) but coaches think in Central
 * time, so the form inputs display and interpret wall-clock time in
 * America/Chicago. The conversion accounts for daylight saving where possible.
 */
const TIME_ZONE = "America/Chicago";

function zoneParts(date) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: TIME_ZONE,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	}).formatToParts(date);

	return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

function offsetAt(date) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: TIME_ZONE,
		timeZoneName: "longOffset",
	}).formatToParts(date);
	const zone = parts.find((part) => part.type === "timeZoneName")?.value || "GMT";
	const offset = zone.replace("GMT", "");
	return offset || "+00:00";
}

/** Convert a stored ISO timestamp to a `datetime-local` input value. */
export function toDateTimeInput(value) {
	if (!value) return "";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";

	const parts = zoneParts(date);
	let hour = parts.hour;
	if (hour === "24") hour = "00";

	return `${parts.year}-${parts.month}-${parts.day}T${hour}:${parts.minute}`;
}

/** Convert a `datetime-local` input value (Central wall time) to an ISO string. */
export function fromDateTimeInput(value) {
	if (!value) return "";

	// Start with the offset in effect at the naive UTC instant, then re-check the
	// offset after conversion so times around DST boundaries land on the right
	// wall-clock time.
	const guess = new Date(`${value}:00Z`);
	const firstOffset = offsetAt(guess);
	let iso = new Date(`${value}:00${firstOffset}`).toISOString();
	const secondOffset = offsetAt(new Date(iso));
	if (secondOffset !== firstOffset) {
		iso = new Date(`${value}:00${secondOffset}`).toISOString();
	}

	return iso;
}
