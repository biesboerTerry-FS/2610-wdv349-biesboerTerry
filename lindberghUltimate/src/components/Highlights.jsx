// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";

const Highlights = () => {
	const [highlightedYears, setHighlightedYears] = useState([]);
	const [activeCategory, setActiveCategory] = useState(null);

	const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

	const data = {
		Girls: [
			{
				name: "Missouri State Champions",
				years: [2017, 2018, 2019, 2025],
			},
			{ name: "Missouri State Spirit Award", years: [2021, 2024] },
			{ name: "All", years: [2017, 2018, 2019, 2021, 2024, 2025] },
		],
		Boys: [
			{ name: "Missouri State Spirit Award - D1", years: [2021] },
			{ name: "Missouri State Spirit Award - D2", years: [2025] },
			{ name: "All", years: [2021, 2025] },
		],
		Coaches: [
			{
				name: "Coach of the Year Recipient - Kristina 'T' Gu",
				years: [2023],
			},
			// Added 'All' for Coaches
			{ name: "All", years: [2023] },
		],
		Players: [
			{
				name: "Maggie O'Brien - Heart of the Lyons Recipient",
				years: [2019],
			},
			{
				name: "Abby Deeter - Heart of the Lyons Recipient",
				years: [2024],
			},
			{
				name: "Karen Bose - Heart of the Lyons Recipient",
				years: [2025],
			},
			// Added 'All' for Players
			{ name: "All", years: [2019, 2024, 2025] },
		],
	};

	const handleSelection = (selectedYears) => {
		setHighlightedYears(selectedYears);
		setActiveCategory(null); // Closes the menu after selection
	};

	return (
		<div
			className="bg-[#1c6a37] p-10 text-white min-h-screen border-[#fbcc00]"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			<h2 className="text-center text-[#fbcc00] text-3xl font-bold pt-8 pb-12 uppercase tracking-widest">
				Program History & Highlights
			</h2>

			{/* 1. Categories Section */}
			<div className="flex justify-center gap-0 max-w-5xl mx-auto mb-20">
				{["Girls", "Boys", "Coaches", "Players"].map((cat) => (
					<div
						key={cat}
						className="flex-1 text-center flex flex-col items-center"
					>
						<p
							onClick={() =>
								setActiveCategory(
									activeCategory === cat ? null : cat,
								)
							}
							className={`cursor-pointer text-xl font-bold mb-4 transition-all hover:text-[#fbcc00] ${
								activeCategory === cat
									? "underline text-[#fbcc00]"
									: "text-white"
							}`}
						>
							{cat}
						</p>

						<div className="relative z-50">
							{activeCategory === cat && (
								<div className="absolute left-1/2 -translate-x-1/2 flex flex-col gap-2 w-56 p-2 bg-[#1c6a37] border border-[#fbcc00] rounded-lg shadow-2xl">
									{data[cat].map((item) => (
										<button
											key={item.name}
											onClick={() =>
												handleSelection(item.years)
											}
											className="text-white py-2 px-3 rounded text-sm hover:bg-[#fbcc00] hover:text-[#1c6a37] transition-all font-sans text-left"
										>
											{item.name}
										</button>
									))}
								</div>
							)}
						</div>
					</div>
				))}
			</div>

			{/* 2. Calendar Grid */}
			<div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto relative z-10">
				{years.map((year) => {
					const isHighlighted = highlightedYears.includes(year);
					return (
						<div
							key={year}
							className={`relative overflow-hidden border-2 transition-all duration-500 h-28 flex items-center justify-center rounded-md ${
								isHighlighted
									? "bg-[#fbcc00] border-[#fbcc00] scale-105 shadow-[0_0_20px_#fbcc00]"
									: "bg-white border-white"
							}`}
						>
							<div className="absolute top-0 left-0 w-full h-4 bg-red-600" />
							<div
								className="text-4xl font-bold"
								style={{
									color: "#1c6a37",
									WebkitTextStroke: isHighlighted
										? "0px"
										: "1.5px #fbcc00",
									paintOrder: "stroke fill",
								}}
							>
								{year}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Highlights;
