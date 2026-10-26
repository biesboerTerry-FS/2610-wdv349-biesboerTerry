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
			className="px-4 py-10 border-t border-lu-yellow/30 bg-lu-green text-lu-cream sm:px-6 sm:py-16"
		>
			<div className="max-w-4xl mx-auto">
				<h2 className="mb-10 text-2xl font-bold tracking-widest text-center uppercase outline-title sm:text-3xl">
					Supporters
				</h2>
				<div className="flex flex-col gap-3">
					{supporters.map((s, i) => (
						<div
							key={i}
							className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 transition-colors border-2 rounded-lg shadow-sm border-lu-yellow bg-lu-cream text-lu-ink hover:bg-white sm:px-6"
						>
							<span className="font-medium font-roboto text-lu-ink">{s.name}</span>
							<span className="font-bold text-lu-green">${s.amount}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Supporters;
