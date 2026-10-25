import React from "react";

const Leaderboard = () => {
	// Placeholder data – replace with real data when wired up
	const stats = { totalRaised: 2026, playerAvg: 42 };
	const rows = [
		{ place: 1, playerName: "Player One", amountRaised: 150 },
		{ place: 2, playerName: "Player Two", amountRaised: 120 },
		{ place: 3, playerName: "Player Three", amountRaised: 95 },
	];

	return (
		<div
			className="bg-[#1c6a37] text-[#f9f9f9] py-16 px-6 border-t border-[#fbcc00]/30"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			<div className="max-w-4xl mx-auto">
				<h2 className="text-center text-[#fbcc00] text-3xl font-bold uppercase tracking-widest mb-8">
					Fundraiser Leaderboard
				</h2>
				<div className="flex flex-wrap justify-center gap-8 mb-10">
					<div className="bg-white/10 border-2 border-[#fbcc00] rounded-xl px-8 py-4 text-center">
						<p className="text-[#fbcc00] font-bold text-sm uppercase tracking-wider">Total Raised</p>
						<p className="text-2xl font-bold text-[#f9f9f9]">${stats.totalRaised}</p>
					</div>
					<div className="bg-white/10 border-2 border-[#fbcc00] rounded-xl px-8 py-4 text-center">
						<p className="text-[#fbcc00] font-bold text-sm uppercase tracking-wider">Player avg.</p>
						<p className="text-2xl font-bold text-[#f9f9f9]">${stats.playerAvg}</p>
					</div>
				</div>
				<div className="overflow-hidden rounded-xl border-2 border-[#fbcc00] shadow-2xl">
					{/* Table header */}
					<div className="grid grid-cols-3 gap-4 bg-[#fbcc00] text-[#1c6a37] font-bold px-6 py-4 uppercase tracking-wide text-sm">
						<span>Place</span>
						<span>Player Name</span>
						<span>Amount Raised</span>
					</div>
					{/* Table rows */}
					{rows.map((row, i) => (
						<div
							key={row.place}
							className={`grid grid-cols-3 gap-4 px-6 py-4 text-[#f9f9f9] ${
								i % 2 === 1 ? "bg-white/5" : ""
							}`}
						>
							<span className="font-bold text-[#fbcc00]">{row.place}</span>
							<span>{row.playerName}</span>
							<span>${row.amountRaised}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Leaderboard;
