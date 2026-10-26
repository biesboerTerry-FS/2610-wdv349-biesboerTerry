// eslint-disable-next-line no-unused-vars
import React from "react";
import swag from "../assets/swag.png";

const Swag = () => {
	return (
		<div
			className="flex flex-col md:flex-row items-center justify-center bg-[#1c6a37] text-[#f9f9f9] py-16 px-10"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			{/* Left 2/3: Content Section */}
			<div className="flex flex-col items-start w-full text-left md:w-2/3">
				{/* Main Header */}
				<h2 className="text-3xl md:text-5xl font-bold text-[#fbcc00] mb-6 uppercase tracking-widest">
					Rep our Swag by Visiting Our Team Store
				</h2>

				{/* Description Text */}
				<p className="max-w-3xl mb-10 font-sans text-lg leading-relaxed md:text-2xl opacity-90">
					The Lindbergh Ultimate Team Store is open year-round for
					purchasing general swag such as hoodies, joggers, hats,
					flags, and more.
				</p>

				{/* Specific Callout for Uniforms */}
				<div className="bg-white/10 border-l-8 border-[#fbcc00] p-8 rounded-r-lg max-w-2xl">
					<p className="text-[#fbcc00] font-bold mb-2 uppercase text-sm tracking-tighter">
						Important: Uniform Kits
					</p>
					<p className="font-sans text-base leading-snug md:text-xl">
						Uniform Kit (jerseys & shorts) ordering is done once a
						year—generally the last two weeks of February.
					</p>
				</div>

				{/* Action Button */}
				<a
					href="#"
					className="mt-12 inline-block bg-[#fbcc00] text-[#1c6a37] font-bold py-4 px-12 rounded-full text-2xl hover:bg-white transition-all transform hover:scale-105 shadow-2xl"
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
