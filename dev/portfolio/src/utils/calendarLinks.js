const TIME_ZONE = "America/Chicago";
const CALENDAR_NAME = "Lindbergh Ultimate 2026";
const EVENT_TYPE_LABELS = {
	gxrls: "Gxrls",
	boys: "Boys",
	general: "Meetings / Games / Tournaments",
};

const pad = (value) => String(value).padStart(2, "0");

function compactDate(iso) {
	return iso.replaceAll("-", "");
}

function nextDate(iso) {
	const [year, month, day] = iso.split("-").map(Number);
	const date = new Date(Date.UTC(year, month - 1, day));
	date.setUTCDate(date.getUTCDate() + 1);
	return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}`;
}

function compactDateTime(iso, clock) {
	return `${compactDate(iso)}T${pad(clock.hours)}${pad(clock.minutes)}00`;
}

function parseClock(value) {
	const match = value.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
	if (!match) return null;

	const period = match[3].toLowerCase();
	const hour = (Number(match[1]) % 12) + (period === "pm" ? 12 : 0);
	return { hours: hour, minutes: Number(match[2]) };
}

export function parseEventTime(value) {
	if (!value || value.trim().toLowerCase() === "all-day") {
		return { allDay: true };
	}

	const [startRaw, endRaw] = value.split("–").map((part) => part.trim());
	if (!startRaw || !endRaw) return { allDay: true };

	const start = parseClock(startRaw);
	const end = parseClock(endRaw);
	if (!start || !end) return { allDay: true };

	return { allDay: false, start, end };
}

function utcStamp() {
	return new Date()
		.toISOString()
		.replace(/[-:]/g, "")
		.replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value) {
	return String(value)
		.replace(/\\/g, "\\\\")
		.replace(/\r?\n/g, "\\n")
		.replace(/,/g, "\\,")
		.replace(/;/g, "\\;");
}

function slugify(value) {
	return (
		String(value)
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-+|-+$/g, "")
			.slice(0, 60) || "event"
	);
}

function foldIcsLine(line) {
	if (line.length <= 75) return line;

	const chunks = [];
	let remaining = line;
	while (remaining.length > 75) {
		chunks.push(remaining.slice(0, 75));
		remaining = ` ${remaining.slice(75)}`;
	}
	chunks.push(remaining);
	return chunks.join("\r\n");
}

function eventDescription(event) {
	return `Lindbergh Ultimate 2026 season\n${EVENT_TYPE_LABELS[event.type] ?? "Team event"}`;
}

export function buildGoogleCalendarUrl(event) {
	const time = parseEventTime(event.time);
	const dates = time.allDay
		? `${compactDate(event.date)}/${nextDate(event.date)}`
		: `${compactDateTime(event.date, time.start)}/${compactDateTime(event.date, time.end)}`;

	const params = new URLSearchParams({
		action: "TEMPLATE",
		text: event.title,
		dates,
		details: eventDescription(event),
		ctz: TIME_ZONE,
	});

	return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcs(event) {
	const time = parseEventTime(event.time);
	const date = compactDate(event.date);
	const uid = `lu-2026-${date}-${event.index ?? 0}-${slugify(event.title)}@lindberghultimate.org`;

	const dtStart = time.allDay
		? `DTSTART;VALUE=DATE:${date}`
		: `DTSTART;TZID=${TIME_ZONE}:${compactDateTime(event.date, time.start)}`;
	const dtEnd = time.allDay
		? `DTEND;VALUE=DATE:${nextDate(event.date)}`
		: `DTEND;TZID=${TIME_ZONE}:${compactDateTime(event.date, time.end)}`;

	const lines = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//Lindbergh Ultimate//2026 Season Calendar//EN",
		"CALSCALE:GREGORIAN",
		"METHOD:PUBLISH",
		`X-WR-CALNAME:${CALENDAR_NAME}`,
		`X-WR-TIMEZONE:${TIME_ZONE}`,
		"BEGIN:VTIMEZONE",
		`TZID:${TIME_ZONE}`,
		`X-LIC-LOCATION:${TIME_ZONE}`,
		"BEGIN:DAYLIGHT",
		"TZOFFSETFROM:-0600",
		"TZOFFSETTO:-0500",
		"TZNAME:CDT",
		"DTSTART:19700308T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
		"END:DAYLIGHT",
		"BEGIN:STANDARD",
		"TZOFFSETFROM:-0500",
		"TZOFFSETTO:-0600",
		"TZNAME:CST",
		"DTSTART:19701101T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
		"END:STANDARD",
		"END:VTIMEZONE",
		"BEGIN:VEVENT",
		`UID:${uid}`,
		`DTSTAMP:${utcStamp()}`,
		dtStart,
		dtEnd,
		`SUMMARY:${escapeIcsText(event.title)}`,
		`DESCRIPTION:${escapeIcsText(eventDescription(event))}`,
		"END:VEVENT",
		"END:VCALENDAR",
	];

	return `${lines.map(foldIcsLine).join("\r\n")}\r\n`;
}

export function downloadIcs(event) {
	const blob = new Blob([buildIcs(event)], {
		type: "text/calendar;charset=utf-8",
	});
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = `lindbergh-ultimate-${event.date}-${slugify(event.title)}.ics`;
	document.body.appendChild(link);
	link.click();
	link.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}
