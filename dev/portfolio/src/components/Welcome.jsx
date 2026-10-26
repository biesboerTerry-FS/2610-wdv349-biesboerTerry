import React from "react";
import welcome from "../assets/welcome.png";

const Welcome = () => {
	return (
		<div className="w-full px-4 py-10 bg-lu-green md:my-12 md:py-16">
			<h1 className="max-w-5xl mx-auto mb-8 text-3xl font-bold tracking-wide text-center uppercase welcome-title sm:mb-10 sm:text-4xl lg:text-5xl">
				Welcome to Lindbergh Ultimate!
			</h1>

			<div className="flex flex-col w-full gap-8 md:flex-row md:items-center md:justify-center">
				<div className="flex items-center justify-center w-full md:w-1/2">
					<img
						src={welcome}
						alt="What is Ultimate"
						className="h-auto w-full max-w-md object-contain drop-shadow-[0_0_20px_#fbcc00] sm:max-w-lg md:w-full md:max-w-none"
					/>
				</div>

				{/* Right Side: Text Container */}
				<div className="flex flex-col items-start justify-center w-full gap-5 px-2 md:w-1/2 md:px-12">
					<div className="p-6 border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink sm:p-8">
						<p className="max-w-xl text-lg leading-relaxed text-lu-ink sm:text-xl lg:text-2xl">
							Our mission is to advance the sport of Ultimate at Lindbergh
							by enhancing and promoting Character, Community, and
							Competition. At Lindbergh, we are dedicated to fostering a
							vibrant and supportive community for our players, coaches,
							and families.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
