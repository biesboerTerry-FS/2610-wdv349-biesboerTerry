import React, { useState } from "react";

// Event: { time: string, title: string, type: "gxrls" | "boys" | "general" }
// Dates as "YYYY-MM-DD" for sorting
const CALENDAR_2026 = {
	"2026-02-07": [
		{ time: "All-day", title: "Midwest Throwdown College Tournament (1 hour from STL)", type: "general" },
	],
	"2026-02-10": [
		{ time: "1:00 pm – 3:00 pm", title: "Gxrls Ultimate Clinic", type: "gxrls" },
		{ time: "2:45 pm – 3:15 pm", title: "Meet the Coaches Interest Meeting", type: "general" },
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Open Pre-Season Clinic", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Open Pre-Season Clinic", type: "boys" },
	],
	"2026-02-17": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Open Pre-Season Clinic", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Open Pre-Season Clinic", type: "boys" },
	],
	"2026-02-18": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Open Pre-Season Clinic", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Open Pre-Season Clinic", type: "boys" },
	],
	"2026-02-19": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Open Pre-Season Clinic", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Open Pre-Season Clinic", type: "boys" },
	],
	"2026-02-24": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Open Pre-Season Clinic", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Open Pre-Season Clinic", type: "boys" },
		{ time: "7:00 pm – 8:00 pm", title: "MANDATORY Parent Meeting", type: "general" },
	],
	"2026-02-25": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Open Pre-Season Clinic", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Open Pre-Season Clinic", type: "boys" },
	],
	"2026-02-26": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Open Pre-Season Clinic", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Open Pre-Season Clinic", type: "boys" },
	],
	"2026-02-28": [
		{ time: "All-day", title: "Midwest Throwdown College Tournament (1 hour from STL)", type: "general" },
	],
	"2026-03-01": [
		{ time: "All-day", title: "Midwest Throwdown College Tournament (1 hour from STL)", type: "general" },
	],
	"2026-03-03": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-03-04": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
	],
	"2026-03-05": [
		{ time: "3:30 pm – 5:30 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-03-08": [
		{ time: "All-day", title: "Likely Game Day (1pm or 3pm)", type: "general" },
	],
	"2026-03-10": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-03-11": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
	],
	"2026-03-12": [
		{ time: "3:30 pm – 5:30 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-03-13": [{ time: "All-day", title: "Lindbergh Spring Break", type: "general" }],
	"2026-03-14": [{ time: "All-day", title: "Lindbergh Spring Break", type: "general" }],
	"2026-03-15": [
		{ time: "All-day", title: "Likely Game Day (1pm or 3pm)", type: "general" },
		{ time: "All-day", title: "Lindbergh Spring Break", type: "general" },
	],
	"2026-03-16": [{ time: "All-day", title: "Lindbergh Spring Break", type: "general" }],
	"2026-03-17": [
		{ time: "All-day", title: "Lindbergh Spring Break", type: "general" },
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
	],
	"2026-03-18": [
		{ time: "All-day", title: "Lindbergh Spring Break", type: "general" },
		{ time: "3:30 pm – 5:30 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-03-19": [{ time: "All-day", title: "Lindbergh Spring Break", type: "general" }],
	"2026-03-20": [{ time: "All-day", title: "Lindbergh Spring Break", type: "general" }],
	"2026-03-21": [
		{ time: "All-day", title: "Likely Game Day (1pm or 3pm)", type: "general" },
		{ time: "All-day", title: "Lindbergh Spring Break", type: "general" },
	],
	"2026-03-22": [{ time: "All-day", title: "Lindbergh Spring Break", type: "general" }],
	"2026-03-24": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-03-25": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
	],
	"2026-03-26": [
		{ time: "3:30 pm – 5:30 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-03-29": [
		{ time: "All-day", title: "Likely Game Day (1pm or 3pm)", type: "general" },
	],
	"2026-03-31": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-04-01": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
	],
	"2026-04-02": [
		{ time: "3:30 pm – 5:30 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-04-03": [
		{ time: "3:15 pm – 4:15 pm", title: "Optional Agility Workout w/ Coach T", type: "general" },
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-04-07": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
	],
	"2026-04-08": [
		{ time: "3:30 pm – 5:30 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-04-09": [
		{ time: "3:15 pm – 4:15 pm", title: "Optional Agility Workout w/ Coach T", type: "general" },
	],
	"2026-04-10": [
		{ time: "All-day", title: "Indy Invite High School Tournament (Boys & Gxrls)", type: "general" },
	],
	"2026-04-11": [
		{ time: "All-day", title: "Indy Invite High School Tournament (Boys & Gxrls)", type: "general" },
	],
	"2026-04-12": [
		{ time: "All-day", title: "Likely Game Day (1pm or 3pm)", type: "general" },
	],
	"2026-04-14": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-04-15": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
	],
	"2026-04-16": [
		{ time: "3:30 pm – 5:30 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-04-17": [
		{ time: "3:15 pm – 4:15 pm", title: "Optional Agility Workout w/ Coach T", type: "general" },
	],
	"2026-04-19": [
		{ time: "All-day", title: "Likely Game Day (1pm or 3pm)", type: "general" },
	],
	"2026-04-21": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-04-22": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
	],
	"2026-04-23": [
		{ time: "3:30 pm – 5:30 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-04-24": [
		{ time: "3:15 pm – 4:15 pm", title: "Optional Agility Workout w/ Coach T", type: "general" },
	],
	"2026-04-26": [
		{ time: "All-day", title: "Likely Game Day (1pm or 3pm)", type: "general" },
	],
	"2026-04-28": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
		{ time: "4:00 pm – 6:00 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-04-29": [
		{ time: "3:30 pm – 5:30 pm", title: "Gxrls Practice", type: "gxrls" },
	],
	"2026-04-30": [
		{ time: "3:30 pm – 5:30 pm", title: "Boys Practice", type: "boys" },
	],
	"2026-05-02": [
		{ time: "All-day", title: "Likely Weekend of MO State Championship Tournament", type: "general" },
	],
	"2026-05-03": [
		{ time: "All-day", title: "Likely Weekend of MO State Championship Tournament", type: "general" },
	],
	"2026-05-17": [
		{ time: "2:00 pm – 4:00 pm", title: "Senior vs. Underclassmxn Scrim", type: "general" },
		{ time: "4:30 pm – 6:30 pm", title: "Family, Friends, & Alumni Scrim + Team Awards", type: "general" },
	],
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December",
];

function formatDateLabel(iso) {
	const d = new Date(iso + "T12:00:00");
	const month = MONTH_NAMES[d.getMonth()];
	const day = d.getDate();
	const weekday = DAY_NAMES[d.getDay()];
	return { month, day, weekday, full: `${month} ${day}, 2026 — ${weekday}` };
}

function EventBadge({ type }) {
	const styles = {
		gxrls: "bg-emerald-500/90 text-white",
		boys: "bg-amber-400/90 text-[#1c6a37]",
		general: "bg-purple-500/90 text-white",
	};
	return (
		<span
			className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${styles[type] || styles.general}`}
			title={type === "gxrls" ? "Gxrls" : type === "boys" ? "Boys" : "General"}
			aria-hidden
		/>
	);
}

const Calendar2026 = () => {
	const [filterMonth, setFilterMonth] = useState(null); // null = all
	const entries = Object.entries(CALENDAR_2026).sort(([a], [b]) => a.localeCompare(b));

	const filtered =
		filterMonth == null
			? entries
			: entries.filter(([date]) => date.slice(0, 7) === filterMonth);

	return (
		<div
			className="min-h-screen bg-[#1c6a37] text-[#f9f9f9] py-16 px-6"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			<div className="max-w-3xl mx-auto">
				<h1 className="text-[#fbcc00] text-3xl font-bold uppercase tracking-wide mb-2">
					2026 Calendar
				</h1>
				<p className="text-[#f9f9f9]/90 mb-8">
					Lindbergh Ultimate spring season — clinics, practices, games, and events.
				</p>

				{/* Legend */}
				<div className="flex flex-wrap gap-6 mb-8 text-sm">
					<span className="flex items-center gap-2">
						<EventBadge type="gxrls" /> Gxrls
					</span>
					<span className="flex items-center gap-2">
						<EventBadge type="boys" /> Boys
					</span>
					<span className="flex items-center gap-2">
						<EventBadge type="general" /> Meetings / Games / Tournaments
					</span>
				</div>

				{/* Month filter */}
				<div className="flex flex-wrap gap-2 mb-10">
					<button
						type="button"
						onClick={() => setFilterMonth(null)}
						className={`px-4 py-2 rounded-full font-medium transition-all ${
							filterMonth === null
								? "bg-[#fbcc00] text-[#1c6a37]"
								: "bg-white/10 text-[#f9f9f9] hover:bg-white/20"
						}`}
					>
						All
					</button>
					{["2026-02", "2026-03", "2026-04", "2026-05"].map((m) => {
						const [, monthNum] = m.split("-");
						const label = MONTH_NAMES[parseInt(monthNum, 10) - 1];
						return (
							<button
								key={m}
								type="button"
								onClick={() => setFilterMonth(m)}
								className={`px-4 py-2 rounded-full font-medium transition-all ${
									filterMonth === m
										? "bg-[#fbcc00] text-[#1c6a37]"
										: "bg-white/10 text-[#f9f9f9] hover:bg-white/20"
								}`}
							>
								{label}
							</button>
						);
					})}
				</div>

				{/* Calendar list */}
				<div className="space-y-10">
					{filtered.map(([date, events]) => {
						const { month, day, weekday, full } = formatDateLabel(date);
						if (events.length === 0) return null;
						return (
							<article
								key={date}
								className="border-l-4 border-[#fbcc00] pl-6 py-1"
							>
								<time
									dateTime={date}
									className="block text-[#fbcc00] font-bold text-lg mb-3"
								>
									{full}
								</time>
								<ul className="space-y-2">
									{events.map((ev, i) => (
										<li
											key={i}
											className="flex items-start gap-3 text-[#f9f9f9]"
										>
											<EventBadge type={ev.type} />
											<span className="shrink-0 text-[#fbcc00]/90 font-medium w-36">
												{ev.time}
											</span>
											<span>{ev.title}</span>
										</li>
									))}
								</ul>
							</article>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Calendar2026;
