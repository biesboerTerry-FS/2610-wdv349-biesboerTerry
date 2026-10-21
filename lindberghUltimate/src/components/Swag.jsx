import React from "react";
import swag from "../assets/swag.png";

const Swag = () => {
	return (
		<div
			className="flex flex-col md:flex-row items-center justify-center bg-[#1c6a37] text-[#f9f9f9] py-16 px-10"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			{/* Left 2/3: Content Section */}
			<div className="w-full md:w-2/3 flex flex-col items-start text-left">
				{/* Main Header */}
				<h2 className="text-3xl md:text-5xl font-bold text-[#fbcc00] mb-6 uppercase tracking-widest">
					Rep our Swag by Visiting Our Team Store
				</h2>

				{/* Description Text */}
				<p className="text-lg md:text-2xl leading-relaxed max-w-3xl opacity-90 mb-10 font-sans">
					The Lindbergh Ultimate Team Store is open year-round for
					purchasing general swag such as hoodies, joggers, hats,
					flags, and more.
				</p>

				{/* Specific Callout for Uniforms */}
				<div className="bg-white/10 border-l-8 border-[#fbcc00] p-8 rounded-r-lg max-w-2xl">
					<p className="text-[#fbcc00] font-bold mb-2 uppercase text-sm tracking-tighter">
						Important: Uniform Kits
					</p>
					<p className="text-base md:text-xl leading-snug font-sans">
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
			<div className="w-full md:w-1/3 flex justify-center items-center mt-12 md:mt-0">
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
