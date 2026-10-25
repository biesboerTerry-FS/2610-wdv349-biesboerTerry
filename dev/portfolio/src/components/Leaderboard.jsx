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
			className="px-4 py-10 border-t border-lu-yellow/30 bg-lu-green text-lu-cream sm:px-6 sm:py-16"
		>
			<div className="max-w-4xl mx-auto">
				<h2 className="mb-8 text-2xl font-bold tracking-widest text-center uppercase outline-title sm:text-3xl">
					Fundraiser Leaderboard
				</h2>
				<div className="flex flex-wrap justify-center gap-8 mb-10">
					<div className="px-8 py-4 text-center border-2 shadow-lg rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
						<p className="text-sm font-bold tracking-wider uppercase text-lu-green">Total Raised</p>
						<p className="text-2xl font-bold text-lu-ink">${stats.totalRaised}</p>
					</div>
					<div className="px-8 py-4 text-center border-2 shadow-lg rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
						<p className="text-sm font-bold tracking-wider uppercase text-lu-green">Player avg.</p>
						<p className="text-2xl font-bold text-lu-ink">${stats.playerAvg}</p>
					</div>
				</div>
				<div className="overflow-hidden border-2 shadow-2xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
					{/* Table header */}
					<div className="grid grid-cols-3 gap-2 px-3 py-4 text-xs font-bold tracking-wide uppercase bg-lu-yellow font-roboto text-lu-green sm:gap-4 sm:px-6 sm:text-sm">
						<span>Place</span>
						<span>Player Name</span>
						<span>Amount Raised</span>
					</div>
					{/* Table rows */}
					{rows.map((row, i) => (
						<div
							key={row.place}
							className={`grid grid-cols-3 gap-2 px-3 py-4 text-sm text-lu-ink sm:gap-4 sm:px-6 sm:text-base ${
								i % 2 === 1 ? "bg-[#e8f0e9]" : ""
							}`}
						>
							<span className="font-bold text-lu-green">{row.place}</span>
							<span className="font-roboto">{row.playerName}</span>
							<span>${row.amountRaised}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Leaderboard;
