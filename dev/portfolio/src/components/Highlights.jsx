import React, { useState } from "react";

const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

const DIVISIONS = [
	{
		id: "gxrls",
		label: "Gxrls",
		awards: [
			{
				name: "Missouri State Champions",
				years: [2017, 2018, 2019, 2025],
			},
			{
				name: "Missouri State Spirit Award",
				years: [2021, 2024],
			},
		],
	},
	{
		id: "boys",
		label: "Boys",
		awards: [
			{
				name: "State Spirit Award — D1",
				years: [2021],
			},
			{
				name: "State Spirit Award — D2",
				years: [2025],
			},
		],
	},
	{
		id: "coaches",
		label: "Coaches",
		awards: [
			{
				name: 'Coach of the Year — Kristina "T" Gu',
				years: [2023],
			},
		],
	},
	{
		id: "players",
		label: "Players",
		awards: [
			{
				name: "Heart of the Lyons — Maggie O'Brien",
				years: [2019],
			},
			{
				name: "Heart of the Lyons — Abby Deeter",
				years: [2024],
			},
			{
				name: "Heart of the Lyons — Karen Bose",
				years: [2025],
			},
		],
	},
];

const Highlights = () => {
	const [activeDivisionId, setActiveDivisionId] = useState(null);
	const [selectedYear, setSelectedYear] = useState(null);

	const activeDivision =
		DIVISIONS.find((division) => division.id === activeDivisionId) ?? null;

	const awardsForYear = (year) =>
		activeDivision?.awards.filter((award) => award.years.includes(year)) ?? [];

	const countAwardsForYear = (year) =>
		DIVISIONS.reduce(
			(total, division) =>
				total +
				division.awards.filter((award) => award.years.includes(year)).length,
			0
		);

	const selectedYearGroups = selectedYear
		? DIVISIONS.map((division) => ({
				...division,
				awards: division.awards.filter((award) =>
					award.years.includes(selectedYear)
				),
			})).filter((division) => division.awards.length > 0)
		: [];

	return (
		<section className="px-4 py-10 text-white border-lu-yellow bg-lu-green sm:px-10 sm:py-14">
			<div className="max-w-5xl mx-auto">
				<h2 className="text-2xl font-bold tracking-widest text-center uppercase outline-title sm:text-3xl">
					Program History &amp; Highlights
				</h2>

				<p className="max-w-2xl mx-auto mt-4 text-sm leading-relaxed text-center font-body text-lu-cream/75 sm:text-base">
					Click a division to highlight its award years. Click any year to
					highlight it yellow and see every award from all divisions below.
					Click the year again to clear it.
				</p>

				<div
					className="flex flex-wrap justify-center gap-3 mt-8"
					role="group"
					aria-label="Select a division"
				>
					{DIVISIONS.map((division) => {
						const isActive = division.id === activeDivisionId;

						return (
							<button
								key={division.id}
								type="button"
								aria-pressed={isActive}
								onClick={() => {
									setActiveDivisionId((current) =>
										current === division.id ? null : division.id
									);
									setSelectedYear(null);
								}}
								className={`rounded-full border-2 px-4 py-2 font-roboto text-sm font-bold uppercase tracking-wide transition-all sm:px-5 ${
									isActive
										? "border-lu-yellow bg-lu-yellow text-lu-green shadow-lg"
										: "border-lu-yellow/50 bg-white/5 text-lu-cream hover:border-lu-yellow hover:bg-white/10"
								}`}
							>
								{division.label}
							</button>
						);
					})}
				</div>

				<div className="grid grid-cols-2 gap-4 mt-8 sm:gap-6 md:grid-cols-5">
					{YEARS.map((year) => {
						const awards = awardsForYear(year);
						const totalAwards = countAwardsForYear(year);
						const isSelected = selectedYear === year;
						const isHighlighted = isSelected || awards.length > 0;
						const badgeCount = isSelected ? totalAwards : awards.length;

						const selectYear = () => {
							setSelectedYear((current) => (current === year ? null : year));
							setActiveDivisionId(null);
						};

						const cardTone = isSelected
							? "border-[#fbcc00] bg-[#fbcc00] text-[#1c6a37] shadow-[0_0_30px_rgba(251,204,0,0.75)] ring-4 ring-[#fbcc00]/40"
							: isHighlighted
								? "border-[#fbcc00] bg-[#fbcc00] text-[#1c6a37] shadow-[0_0_20px_rgba(251,204,0,0.45)]"
								: "border-white/80 bg-white text-[#1c6a37] hover:-translate-y-0.5 hover:border-[#fbcc00]";

						return (
							<div
								key={year}
								role="button"
								tabIndex={0}
								aria-pressed={isSelected}
								onClick={selectYear}
								onKeyDown={(event) => {
									if (event.key === "Enter" || event.key === " ") {
										event.preventDefault();
										selectYear();
									}
								}}
								className={`relative flex min-h-40 cursor-pointer flex-col overflow-hidden rounded-lg border-2 p-3 pt-5 text-left transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-lu-yellow/60 ${cardTone}`}
							>
								<div className="absolute inset-x-0 top-0 h-3 bg-red-600" />

								<div className="flex items-start justify-between gap-2">
									<span className="text-2xl font-bold leading-none font-roboto sm:text-3xl">
										{year}
									</span>
									{badgeCount > 0 && (
										<span className="rounded-full bg-lu-green px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-lu-yellow">
											{badgeCount} {badgeCount === 1 ? "award" : "awards"}
										</span>
									)}
								</div>

								<div className="flex-1 mt-3">
									{isSelected ? (
										<p className="text-[10px] font-bold uppercase tracking-wide text-lu-green/75">
											{totalAwards > 0 ? "Awards listed below" : "No awards recorded"}
										</p>
									) : awards.length > 0 ? (
										<ul className="space-y-1.5">
											{awards.map((award) => (
												<li
													key={award.name}
													className="text-[11px] font-semibold leading-tight sm:text-xs"
												>
													{award.name}
												</li>
											))}
										</ul>
									) : activeDivision ? (
										<p className="text-[10px] font-medium uppercase tracking-wide text-lu-green/40">
											No award
										</p>
									) : null}
								</div>
							</div>
						);
					})}
				</div>

				{selectedYear && (
					<div
						aria-live="polite"
						className="p-5 mt-6 border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink sm:p-6"
					>
						<div className="flex flex-wrap items-center justify-between gap-3">
							<h3 className="text-xl font-bold font-roboto text-lu-green">
								{selectedYear} Awards
							</h3>
							<button
								type="button"
								onClick={() => setSelectedYear(null)}
								className="text-sm font-bold text-lu-green underline-offset-4 hover:underline"
							>
								Clear year
							</button>
						</div>
						{selectedYearGroups.length > 0 ? (
							<div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
								{selectedYearGroups.map((division) => (
									<div
										key={division.id}
										className="p-4 border rounded-lg border-lu-green/15 bg-white/70"
									>
										<p className="text-xs font-bold tracking-wide uppercase font-roboto text-lu-green/70">
											{division.label}
										</p>
										<ul className="mt-2 space-y-1.5">
											{division.awards.map((award) => (
												<li
													key={award.name}
													className="font-semibold leading-snug text-lu-ink"
												>
													{award.name}
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						) : (
							<p className="mt-3 text-sm text-lu-ink/70">
								No awards recorded for {selectedYear}.
							</p>
						)}
					</div>
				)}
			</div>
		</section>
	);
};

export default Highlights;
