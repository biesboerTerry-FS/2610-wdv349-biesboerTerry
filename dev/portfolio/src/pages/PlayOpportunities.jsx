import React from "react";
import circle from "../assets/circle.jpg";
import groupme from "../assets/groupme.jpg";
import slua from "../assets/slua.png";

// Sample schedule – replace with Google Calendar embed URL or keep as list
const SCHEDULE_EVENTS = [
	{ date: "Feb 13, FRI", time: "8:30 – 10pm", title: "League: Indoor Winter", location: "1 Athletic Dr, Earth City, MO 63045" },
	{ date: "Feb 15, SUN", time: "12:30 – 2:30pm", title: "Pickup: Sundays @ Parkway Central", location: "Parkway Central High School, 369 N Woods Mill Rd, Chesterfield, MO 63017, USA" },
	{ date: "Feb 20, FRI", time: "8:30 – 10pm", title: "League: Indoor Winter", location: "1 Athletic Dr, Earth City, MO 63045" },
	{ date: "Feb 22, SUN", time: "12:30 – 2:30pm", title: "Pickup: Sundays @ Parkway Central", location: "Parkway Central High School, 369 N Woods Mill Rd, Chesterfield, MO 63017, USA" },
	{ date: "Feb 27, FRI", time: "8:30 – 10pm", title: "League: Indoor Winter", location: "1 Athletic Dr, Earth City, MO 63045" },
	{ date: "Mar 1, SUN", time: "12:30 – 2:30pm", title: "Pickup: Sundays @ Parkway Central", location: "Parkway Central High School, 369 N Woods Mill Rd, Chesterfield, MO 63017, USA" },
	{ date: "Mar 2, MON", time: "6 – 7:45pm", title: "Pickup: St. Charles", location: "Wapelhorst Park, 1875 Muegge Rd, St Charles, MO 63303, USA" },
];

const GOOGLE_CALENDAR_LINK = "https://calendar.google.com/calendar"; // Replace with STL Ultimate calendar link
const SLUA_URL = "https://www.slua.org";

const PlayOpportunities = () => {
	return (
		<div
			className="min-h-screen bg-lu-green text-lu-cream"
		>
			{/* Hero */}
			<section className="relative flex items-center justify-center w-full overflow-hidden h-70 md:h-90">
				<div
					className="absolute inset-0 bg-center bg-cover opacity-80"
					style={{
						backgroundImage: `url(${circle})`,
					}}
				/>
				<div className="absolute inset-0 bg-black/50" />
				<h1 className="hero-title relative z-10 max-w-full px-4 text-center text-3xl font-bold uppercase tracking-[0.12em] drop-shadow-lg sm:text-4xl sm:tracking-widest md:text-5xl lg:text-6xl">
					Play Opportunities
				</h1>
			</section>

			{/* Schedule / Calendar section */}
			<section className="max-w-4xl px-4 py-10 mx-auto sm:px-6 sm:py-12">
				<div className="overflow-hidden border-2 shadow-2xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
					<div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-gray-200">
						<h2 className="text-xl font-bold font-roboto text-lu-green">Feb – Jun 2026</h2>
						<a
							href={GOOGLE_CALENDAR_LINK}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-sm font-medium text-lu-green hover:underline"
						>
							Add to Google Calendar
						</a>
					</div>
					<ul className="divide-y divide-gray-200">
						{SCHEDULE_EVENTS.map((ev, i) => (
							<li key={i} className="p-4 transition-colors md:p-5 hover:bg-gray-50">
								<p className="font-bold text-gray-800 font-roboto">{ev.date} · {ev.time}</p>
								<p className="mt-0.5 font-roboto font-medium text-lu-green">{ev.title}</p>
								<p className="mt-1 text-sm text-gray-600">{ev.location}</p>
							</li>
						))}
					</ul>
					<div className="flex flex-wrap items-center justify-between gap-2 p-4 border-t border-gray-200 bg-gray-50">
						<span className="font-medium text-gray-700">STL Ultimate Opportunities</span>
						<a
							href={GOOGLE_CALENDAR_LINK}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm font-medium text-lu-green hover:underline"
						>
							Add to Google Calendar
						</a>
					</div>
				</div>
			</section>

			{/* Two cards: Lindbergh Players | SLUA */}
			<section className="max-w-5xl px-4 pb-16 mx-auto sm:px-6 sm:pb-20">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					{/* Lindbergh Players Pickup GroupMe */}
					<a
						href="#"
						className="group block overflow-hidden rounded-xl border-2 border-lu-yellow bg-lu-cream text-lu-ink shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
					>
						<div
							className="bg-center bg-cover aspect-video bg-lu-deep"
							style={{
								backgroundImage: `url(${groupme})`,
							}}
						/>
						<div className="p-6 text-center">
							<p className="text-lg font-bold transition-colors font-roboto text-lu-green group-hover:text-lu-deep">
								Lindbergh Players Pickup GroupMe
							</p>
						</div>
					</a>

					{/* Saint Louis Ultimate Association */}
					<a
						href={SLUA_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="group block overflow-hidden rounded-xl border-2 border-lu-yellow bg-lu-cream text-lu-ink shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
					>
						<div
							className="bg-center bg-cover aspect-video bg-lu-deep"
							style={{ backgroundImage: `url(${slua})` }}
						/>
						<div className="p-6 text-center">
							<p className="text-lg font-bold transition-colors font-roboto text-lu-green group-hover:text-lu-deep">
								Saint Louis Ultimate Association
							</p>
						</div>
					</a>
				</div>
			</section>
		</div>
	);
};

export default PlayOpportunities;
