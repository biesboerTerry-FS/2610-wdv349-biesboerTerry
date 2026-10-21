import React from "react";

const USA_ULTIMATE_MEMBERSHIP_URL = "https://www.usaultimate.org/membership/";

const USUltimate = () => {
	return (
		<div
			className="min-h-screen bg-[#1c6a37] text-[#f9f9f9]"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			{/* Hero: frisbee on grass with "USA Ultimate" overlay */}
			<section className="relative w-full h-[320px] md:h-[400px] bg-[#0d4a28] flex items-center justify-center overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center opacity-70"
					style={{
						backgroundImage: "url(https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80)",
					}}
				/>
				<div className="absolute inset-0 bg-black/40" />
				<h1 className="relative z-10 text-white text-4xl md:text-6xl font-bold uppercase tracking-widest drop-shadow-lg">
					USA Ultimate
				</h1>
			</section>

			{/* Content box */}
			<section className="max-w-3xl mx-auto px-6 py-16">
				<div className="bg-white text-[#1a1a1a] rounded-xl border-2 border-[#fbcc00] shadow-2xl p-8 md:p-12">
					<h2 className="text-[#1c6a37] text-2xl md:text-3xl font-bold mb-4">
						Join the nationwide ultimate community.
					</h2>
					<p className="text-gray-800 leading-relaxed mb-4">
						Becoming a USA Ultimate member comes with many benefits and helps support the continued
						growth of the ultimate sport.
					</p>
					<p className="text-gray-800 leading-relaxed mb-8">
						Member dues help introduce the sport to more and more people, create a more equitable and
						inclusive community, educate and train coaches, develop a more robust national
						infrastructure of local disc organizations and much, much more.
					</p>

					<h3 className="text-[#1c6a37] text-xl md:text-2xl font-bold mb-4">
						Membership Options
					</h3>
					<p className="text-gray-800 leading-relaxed mb-8">
						Whether you are looking to play, coach, organize, officiate, volunteer, chaperone, watch
						or just generally support ultimate as fan or family member, there is a membership level
						designed for you.
					</p>

					<a
						href={USA_ULTIMATE_MEMBERSHIP_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block bg-[#1c6a37] hover:bg-[#0d4a28] text-white font-bold py-3 px-8 rounded-lg transition-colors"
					>
						Learn More
					</a>
				</div>
			</section>
		</div>
	);
};

export default USUltimate;
