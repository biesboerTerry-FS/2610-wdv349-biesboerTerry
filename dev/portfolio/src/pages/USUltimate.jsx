import React from "react";
import circle from "../assets/circle.jpg";

const USA_ULTIMATE_MEMBERSHIP_URL = "https://www.usaultimate.org/membership/";

const USUltimate = () => {
	return (
		<div
			className="min-h-screen bg-lu-green text-lu-cream"
		>
			<section className="relative flex items-center justify-center w-full overflow-hidden h-80 md:h-100 bg-lu-deep">
				<img
					className="absolute inset-0 object-cover w-full h-full opacity-70"
					src={circle}
					alt="Circle"
				/>
				<div className="absolute inset-0 bg-black/40" />
				<h1 className="relative z-10 px-4 text-5xl font-bold tracking-widest text-center uppercase hero-title drop-shadow-lg md:text-6xl lg:text-7xl">
					USA Ultimate
				</h1>
			</section>

			{/* Content box */}
			<section className="max-w-3xl px-4 py-10 mx-auto sm:px-6 sm:py-16">
				<div className="p-5 border-2 shadow-2xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink sm:p-8 md:p-12">
					<h2 className="mb-4 text-xl font-bold font-roboto text-lu-green sm:text-2xl md:text-3xl">
						Join the nationwide ultimate community.
					</h2>
					<p className="mb-4 leading-relaxed text-gray-800">
						Becoming a USA Ultimate member comes with many benefits and helps support the continued
						growth of the ultimate sport.
					</p>
					<p className="mb-8 leading-relaxed text-gray-800">
						Member dues help introduce the sport to more and more people, create a more equitable and
						inclusive community, educate and train coaches, develop a more robust national
						infrastructure of local disc organizations and much, much more.
					</p>

					<h3 className="mb-4 text-lg font-bold text-lu-green sm:text-xl md:text-2xl">
						Membership Options
					</h3>
					<p className="mb-8 leading-relaxed text-gray-800">
						Whether you are looking to play, coach, organize, officiate, volunteer, chaperone, watch
						or just generally support ultimate as fan or family member, there is a membership level
						designed for you.
					</p>

					<a
						href={USA_ULTIMATE_MEMBERSHIP_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block px-8 py-3 font-bold text-white transition-colors rounded-lg bg-lu-green hover:bg-lu-deep"
					>
						Learn More
					</a>
				</div>
			</section>
		</div>
	);
};

export default USUltimate;
