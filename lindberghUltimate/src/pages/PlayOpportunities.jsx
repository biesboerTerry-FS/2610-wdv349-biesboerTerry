import React from "react";

// Sample schedule – replace with your Google Calendar embed URL or keep as list
const SCHEDULE_EVENTS = [
	{ date: "Feb 13, FRI", time: "8:30 – 10pm", title: "League: Indoor Winter", location: "1 Athletic Dr, Earth City, MO 63045" },
	{ date: "Feb 15, SUN", time: "12:30 – 2:30pm", title: "Pickup: Sundays @ Parkway Central", location: "Parkway Central High School, 369 N Woods Mill Rd, Chesterfield, MO 63017, USA" },
	{ date: "Feb 20, FRI", time: "8:30 – 10pm", title: "League: Indoor Winter", location: "1 Athletic Dr, Earth City, MO 63045" },
	{ date: "Feb 22, SUN", time: "12:30 – 2:30pm", title: "Pickup: Sundays @ Parkway Central", location: "Parkway Central High School, 369 N Woods Mill Rd, Chesterfield, MO 63017, USA" },
	{ date: "Feb 27, FRI", time: "8:30 – 10pm", title: "League: Indoor Winter", location: "1 Athletic Dr, Earth City, MO 63045" },
	{ date: "Mar 1, SUN", time: "12:30 – 2:30pm", title: "Pickup: Sundays @ Parkway Central", location: "Parkway Central High School, 369 N Woods Mill Rd, Chesterfield, MO 63017, USA" },
	{ date: "Mar 2, MON", time: "6 – 7:45pm", title: "Pickup: St. Charles", location: "Wapelhorst Park, 1875 Muegge Rd, St Charles, MO 63303, USA" },
];

const GOOGLE_CALENDAR_LINK = "https://calendar.google.com/calendar"; // Replace with your STL Ultimate calendar link
const SLUA_URL = "https://www.slua.org";

const PlayOpportunities = () => {
	return (
		<div
			className="min-h-screen bg-[#1c6a37] text-[#f9f9f9]"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			{/* Hero */}
			<section className="relative w-full h-[280px] md:h-[360px] flex items-center justify-center overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center opacity-80"
					style={{
						backgroundImage: "url(https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80)",
					}}
				/>
				<div className="absolute inset-0 bg-black/50" />
				<h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold uppercase tracking-widest drop-shadow-lg">
					Play Opportunities
				</h1>
			</section>

			{/* Schedule / Calendar section */}
			<section className="max-w-4xl mx-auto px-6 py-12">
				<div className="bg-white/95 text-[#1a1a1a] rounded-xl border-2 border-[#fbcc00] shadow-2xl overflow-hidden">
					<div className="p-6 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
						<h2 className="text-[#1c6a37] font-bold text-xl">Feb – Jun 2026</h2>
						<a
							href={GOOGLE_CALENDAR_LINK}
							target="_blank"
							rel="noopener noreferrer"
							className="text-[#1c6a37] font-medium text-sm hover:underline flex items-center gap-2"
						>
							Add to Google Calendar
						</a>
					</div>
					<ul className="divide-y divide-gray-200">
						{SCHEDULE_EVENTS.map((ev, i) => (
							<li key={i} className="p-4 md:p-5 hover:bg-gray-50 transition-colors">
								<p className="font-bold text-gray-800">{ev.date} · {ev.time}</p>
								<p className="text-[#1c6a37] font-medium mt-0.5">{ev.title}</p>
								<p className="text-gray-600 text-sm mt-1">{ev.location}</p>
							</li>
						))}
					</ul>
					<div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2">
						<span className="text-gray-700 font-medium">STL Ultimate Opportunities</span>
						<a
							href={GOOGLE_CALENDAR_LINK}
							target="_blank"
							rel="noopener noreferrer"
							className="text-[#1c6a37] font-medium text-sm hover:underline"
						>
							Add to Google Calendar
						</a>
					</div>
				</div>
			</section>

			{/* Two cards: Lindbergh Players | SLUA */}
			<section className="max-w-5xl mx-auto px-6 pb-20">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Lindbergh Players Pickup GroupMe */}
					<a
						href="#"
						className="group block bg-white/10 border-2 border-[#fbcc00] rounded-xl overflow-hidden shadow-xl hover:bg-white/15 transition-all"
					>
						<div
							className="aspect-video bg-[#0d4a28] bg-cover bg-center"
							style={{
								backgroundImage: "url(https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80)",
							}}
						/>
						<div className="p-6 text-center">
							<p className="text-[#fbcc00] font-bold text-lg group-hover:text-white transition-colors">
								Lindbergh Players Pickup GroupMe
							</p>
						</div>
					</a>

					{/* Saint Louis Ultimate Association */}
					<a
						href={SLUA_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="group block bg-white/10 border-2 border-[#fbcc00] rounded-xl overflow-hidden shadow-xl hover:bg-white/15 transition-all"
					>
						<div className="aspect-video bg-amber-400 flex items-center justify-center p-8">
							<div className="text-center">
								<p className="text-[#1a1a1a] font-bold text-sm">slua.org</p>
								<p className="text-[#1a1a1a] font-bold text-3xl md:text-4xl mt-1 tracking-tight">
									SLUA
								</p>
								<p className="text-[#1a1a1a] text-sm mt-1">Saint Louis Ultimate Association</p>
							</div>
						</div>
						<div className="p-6 text-center">
							<p className="text-[#fbcc00] font-bold text-lg group-hover:text-white transition-colors">
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
