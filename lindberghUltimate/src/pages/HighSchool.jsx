import React from "react";

// Replace with your coach photo URLs or import from assets
const COACHES = [
	{ name: "Gabby Lavezzi", role: "Boys Ultimate Coach", image: "https://i.pravatar.cc/400?u=gabby" },
	{ name: "Kristina \"T\" Gu", role: "Gxrls Team Coach", image: "https://i.pravatar.cc/400?u=kristina" },
	{ name: "Loren \"Goods\" Goodrich", role: "Boys Team Coach", image: "https://i.pravatar.cc/400?u=loren" },
	{ name: "Joe Corcoran", role: "Gxrls Team Coach", image: "https://i.pravatar.cc/400?u=joe" },
];

// Replace with your Google Slides embed URL (File → Share → Publish to web → Embed)
const INTEREST_MEETING_SLIDES_URL = "";
// Replace with your Season Info Packet PDF or Google Docs embed URL
const SEASON_INFO_PACKET_URL = "";

const HighSchool = () => {
	return (
		<div
			className="min-h-screen bg-[#1c6a37] text-[#f9f9f9]"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			{/* Hero */}
			<section className="relative w-full h-[280px] md:h-[400px] flex items-center justify-center overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center opacity-80"
					style={{
						backgroundImage: "url(https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1200&q=80)",
					}}
				/>
				<div className="absolute inset-0 bg-black/50" />
				<h1 className="relative z-10 text-white text-4xl md:text-6xl font-bold uppercase tracking-widest drop-shadow-lg">
					High School
				</h1>
			</section>

			{/* Meet the Coaches */}
			<section className="max-w-5xl mx-auto px-6 py-12">
				<div className="bg-[#1c6a37] border-2 border-[#fbcc00] rounded-lg py-4 mb-10">
					<h2 className="text-[#fbcc00] text-xl font-bold text-center uppercase tracking-wide">
						Meet the Coaches
					</h2>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
					{COACHES.map((coach, i) => (
						<div
							key={i}
							className="bg-white/10 border border-[#fbcc00]/50 rounded-xl overflow-hidden text-center"
						>
							<div
								className="aspect-square w-full max-w-[240px] mx-auto bg-[#0d4a28] bg-cover bg-center"
								style={{ backgroundImage: `url(${coach.image})` }}
							/>
							<div className="p-4">
								<p className="text-[#fbcc00] font-bold text-lg">{coach.name}</p>
								<p className="text-[#f9f9f9] text-sm">{coach.role}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* 2026 Interest Meeting Slides */}
			<section className="max-w-4xl mx-auto px-6 py-12 border-t border-[#fbcc00]/30">
				<h2 className="text-[#fbcc00] text-xl font-bold mb-6">
					2026 Interest Meeting Slides
				</h2>
				{INTEREST_MEETING_SLIDES_URL ? (
					<div className="aspect-video rounded-xl overflow-hidden border-2 border-[#fbcc00] bg-white">
						<iframe
							title="2026 Interest Meeting Slides"
							className="w-full h-full"
							src={INTEREST_MEETING_SLIDES_URL}
							allowFullScreen
						/>
					</div>
				) : (
					<div className="aspect-video rounded-xl border-2 border-dashed border-[#fbcc00]/60 bg-white/5 flex items-center justify-center">
						<p className="text-[#fbcc00]/80 text-sm">
							Add your Google Slides embed URL in HighSchool.jsx (INTEREST_MEETING_SLIDES_URL)
						</p>
					</div>
				)}
			</section>

			{/* 2026 Season Info Packet */}
			<section className="max-w-4xl mx-auto px-6 py-12 border-t border-[#fbcc00]/30">
				<h2 className="text-[#fbcc00] text-xl font-bold mb-6">
					2026 Season Info Packet
				</h2>
				{SEASON_INFO_PACKET_URL ? (
					<div className="rounded-xl overflow-hidden border-2 border-[#fbcc00] bg-white min-h-[500px]">
						<iframe
							title="2026 Season Info Packet"
							className="w-full min-h-[500px] border-0"
							src={SEASON_INFO_PACKET_URL}
						/>
					</div>
				) : (
					<div className="min-h-[400px] rounded-xl border-2 border-dashed border-[#fbcc00]/60 bg-white/5 flex items-center justify-center p-8">
						<p className="text-[#fbcc00]/80 text-sm text-center max-w-md">
							Add your Season Info Packet PDF or Google Docs embed URL in HighSchool.jsx
							(SEASON_INFO_PACKET_URL). The packet typically includes the introduction from
							coaches, mandatory parent meeting info, medical waiver reminder, What is
							Ultimate?, Spirit of the Game, and more.
						</p>
					</div>
				)}
			</section>

			{/* Footer contact */}
			<section className="max-w-4xl mx-auto px-6 py-12 border-t border-[#fbcc00]/30 text-center">
				<p className="text-[#f9f9f9]/90">
					Have a question about the team? Email us at{" "}
					<a
						href="mailto:lindberghultimate@gmail.com"
						className="text-[#fbcc00] font-bold hover:underline"
					>
						lindberghultimate@gmail.com
					</a>
				</p>
			</section>
		</div>
	);
};

export default HighSchool;
