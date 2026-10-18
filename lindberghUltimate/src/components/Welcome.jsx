import React from "react";
import whatIs from "../assets/whatIs.png";

const Welcome = () => {
	return (
		<div className="flex w-full min-h-[400px] bg-[#1c6a37] py-16 my-12">
			<div className="w-1/2 flex justify-center items-center">
				<img
					src={whatIs}
					alt="What is Ultimate"
					className="w-[70%] h-auto object-contain drop-shadow-[0_0_20px_#fbcc00]"
				/>
			</div>

			{/* Right Side: Text Container */}
			<div className="w-1/2 flex flex-col justify-around items-start px-12">
				<h1 className="text-[#fbcc00] text-4xl font-bold uppercase tracking-wide">
					Welcome to Lindbergh Ultimate!
				</h1>
				<p className="text-[#f9f9f9] text-lg leading-relaxed max-w-md">
					Our mission is to advance the sport of Ultimate at Lindbergh
					by enhancing and promoting Character, Community, and
					Competition. At Lindbergh, we are dedicated to fostering a
					vibrant and supportive community for our players, coaches,
					and families.
				</p>
			</div>
		</div>
	);
};

export default Welcome;
