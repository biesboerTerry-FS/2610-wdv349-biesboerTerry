import React from "react";
import circle from "../assets/circle.jpg";
import powerLunch from "../assets/Lindbergh Ultimate - Power Lunch.jpg";
import fiveWeek from "../assets/5week.jpg";
import lunch2 from "../assets/lunch2.png";
import practice from "../assets/3.jpg";

const PowerLunch = () => {
	return (
		<div
			className="min-h-screen bg-lu-green text-lu-cream"
		>
			{/* Hero */}
			<section className="relative flex items-center justify-center w-full overflow-hidden h-70 md:h-95">
				<div
					className="absolute inset-0 bg-center bg-cover opacity-80"
					style={{
						backgroundImage: `url(${circle})`,
					}}
				/>
				<div className="absolute inset-0 bg-black/50" />
				<h1 className="relative z-10 px-4 text-5xl font-bold tracking-widest text-center uppercase hero-title drop-shadow-lg md:text-6xl lg:text-7xl">
					Power Lunch
				</h1>
			</section>

			{/* Main content */}
			<section className="max-w-5xl px-4 py-10 mx-auto sm:px-6 sm:py-16 lg:max-w-7xl">
				<p className="font-roboto text-sm font-bold uppercase tracking-[0.25em] text-lu-yellow">
					What is
				</p>
				<h2 className="mt-3 text-5xl font-bold leading-tight outline-title sm:text-6xl">
					Power Lunch?
				</h2>
				<div className="mt-6 h-1.5 w-28 rounded-full bg-lu-yellow" />
				<div className="mt-6 space-y-4 text-base leading-relaxed text-lu-cream sm:text-lg">
					<p>
						Power Lunch is a low commitment opportunity to learn the basics of Ultimate. No
						previous knowledge or experience is needed to join. Bring a friend and join us
						whenever you have time!
					</p>
					<p>Wednesdays (year round) during A Lunch in the Green Gym.</p>
					<p>
						Got Questions? Reach out to Coach Morgan (
						<a
							href="mailto:morgan.blake@example.com"
							className="font-bold wrap-break-word text-lu-yellow hover:underline"
						>
							morgan.blake@example.com
						</a>
						)
					</p>
				</div>
			</section>

			{/* Image gallery */}
			<section className="max-w-5xl px-4 pt-10 pb-16 mx-auto border-t border-dashed border-lu-yellow/40 sm:px-6 sm:pb-20 sm:pt-12 lg:max-w-7xl">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
					{[
						powerLunch,
						fiveWeek,
						lunch2,
						practice,
					].map((src, i) => (
						<div
							key={i}
							className="overflow-hidden bg-center bg-cover border-2 aspect-video rounded-xl border-lu-yellow/50 bg-lu-deep"
							style={{ backgroundImage: `url(${src})` }}
						/>
					))}
				</div>
			</section>
		</div>
	);
};

export default PowerLunch;
