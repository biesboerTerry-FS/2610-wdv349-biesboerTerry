import React from "react";
import swag from "../assets/swag.png";

const Swag = () => {
	return (
		<div
			className="flex flex-col items-center justify-center px-4 py-12 bg-lu-green text-lu-cream sm:px-10 sm:py-16 md:flex-row"
		>
			{/* Left 2/3: Content Section */}
			<div className="flex flex-col items-start w-full text-left md:w-2/3">
				{/* Main Header */}
				<h2 className="mb-6 text-2xl font-bold tracking-widest uppercase outline-title sm:text-3xl md:text-5xl">
					Rep our Swag by Visiting Our Team Store
				</h2>

				{/* Description Text */}
				<p className="max-w-3xl mb-8 font-sans text-base leading-relaxed opacity-90 sm:mb-10 sm:text-lg md:text-2xl">
					The Lindbergh Ultimate Team Store is open year-round for
					purchasing general swag such as hoodies, joggers, hats,
					flags, and more.
				</p>

				{/* Specific Callout for Uniforms */}
				<div className="max-w-2xl p-5 border-l-8 rounded-r-lg shadow-xl border-lu-yellow bg-lu-cream text-lu-ink sm:p-8">
					<p className="mb-2 text-sm font-bold tracking-tighter uppercase font-roboto text-lu-green">
						Important: Uniform Kits
					</p>
					<p className="font-sans text-sm leading-snug sm:text-base md:text-xl">
						Uniform Kit (jerseys & shorts) ordering is done once a
						year—generally the last two weeks of February.
					</p>
				</div>

				{/* Action Button */}
				<a
					href="#"
					className="inline-block px-6 py-3 mt-8 text-lg font-bold transition-all rounded-full shadow-2xl bg-lu-yellow text-lu-green hover:scale-105 hover:bg-white sm:mt-12 sm:px-12 sm:py-4 sm:text-2xl"
				>
					Visit Team Store
				</a>
			</div>

			{/* Right 1/3: Image Section */}
			<div className="flex items-center justify-center w-full mt-12 md:w-1/3 md:mt-0">
				<img
					src={swag}
					alt="Lindbergh Swag"
					className="w-[80%] md:w-[90%] h-auto drop-shadow-[0_0_25px_#fbcc00] object-contain"
				/>
			</div>
		</div>
	);
};

export default Swag;
