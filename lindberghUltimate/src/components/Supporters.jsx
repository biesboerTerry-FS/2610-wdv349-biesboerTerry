// eslint-disable-next-line no-unused-vars
import React from "react";

const Supporters = () => {
	// Placeholder list – replace with real data when wired up
	const supporters = [
		{ name: "Supporter One", amount: 50 },
		{ name: "Supporter Two", amount: 25 },
		{ name: "Supporter Three", amount: 100 },
	];

	return (
		<div
			className="bg-[#1c6a37] text-[#f9f9f9] py-16 px-6 border-t border-[#fbcc00]/30"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			<div className="max-w-4xl mx-auto">
				<h2 className="text-center text-[#fbcc00] text-3xl font-bold uppercase tracking-widest mb-10">
					Supporters
				</h2>
				<div className="flex flex-col gap-3">
					{supporters.map((s, i) => (
						<div
							key={i}
							className="flex flex-wrap items-center justify-between gap-4 bg-white/5 border border-[#fbcc00]/40 rounded-lg px-6 py-4 hover:bg-white/10 transition-colors"
						>
							<span className="text-[#f9f9f9] font-medium">{s.name}</span>
							<span className="text-[#fbcc00] font-bold">${s.amount}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Supporters;
