import React from "react";

const MiddleSchool = () => {
	return (
		<div
			className="min-h-screen bg-[#1c6a37] text-[#f9f9f9]"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			{/* Banner: full-width image with "Middle School" overlay */}
			<section className="relative w-full h-[320px] md:h-[400px] bg-[#0d4a28] flex items-center justify-center overflow-hidden">
				{/* Placeholder for banner image – replace src with your group photo */}
				<div
					className="absolute inset-0 bg-cover bg-center opacity-60"
					style={{
						backgroundImage: "url(https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1200&q=80)",
					}}
				/>
				<div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/30" />
				<h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold uppercase tracking-widest drop-shadow-lg">
					Middle School
				</h1>
			</section>

			{/* Intro paragraph */}
			<section className="max-w-4xl mx-auto px-6 py-12 text-center">
				<p className="text-[#f9f9f9] text-lg md:text-xl leading-relaxed">
					Lindbergh Ultimate is proud to be a leader of Middle School Ultimate in the St. Louis area.
					Our middle school program began in 2021 as a collaboration with Lindbergh Community Ed, and
					we have experienced increased growth, interest, and expansion of play opportunities every
					year since.
				</p>
			</section>

			{/* Two program cards */}
			<section className="max-w-6xl mx-auto px-6 pb-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
					{/* Fall After School Club */}
					<article className="bg-white/10 border-2 border-[#fbcc00] rounded-xl overflow-hidden shadow-2xl">
						<div
							className="aspect-16/10 bg-[#0d4a28] bg-cover bg-center"
							style={{
								backgroundImage: "url(https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80)",
							}}
						/>
						<div className="p-6 md:p-8">
							<h2 className="text-[#fbcc00] text-2xl font-bold uppercase tracking-wide mb-4">
								Fall After School Club
							</h2>
							<ul className="space-y-2 text-[#f9f9f9] text-base md:text-lg">
								<li>August – December</li>
								<li>Wednesdays 3:00 PM – 4:15 PM</li>
								<li>Location: Truman Middle School</li>
								<li>
									<a
										href="#"
										className="text-[#fbcc00] underline hover:text-white transition-colors"
									>
										Sperreng Carpool GroupMe
									</a>
								</li>
								<li className="font-bold text-[#fbcc00]">Cost: FREE!</li>
							</ul>
							<a
								href="#"
								className="mt-6 inline-block bg-[#fbcc00] text-[#1c6a37] font-bold py-3 px-8 rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-lg"
							>
								Sign Up Now
							</a>
						</div>
					</article>

					{/* 5 Week Community Ed Summer Camps */}
					<article className="bg-white/10 border-2 border-[#fbcc00] rounded-xl overflow-hidden shadow-2xl">
						<div
							className="aspect-16/10 bg-[#0d4a28] bg-cover bg-center"
							style={{
								backgroundImage: "url(https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80)",
							}}
						/>
						<div className="p-6 md:p-8">
							<h2 className="text-[#fbcc00] text-2xl font-bold uppercase tracking-wide mb-4">
								5 Week Community Ed Summer Camps
							</h2>
							<ul className="space-y-2 text-[#f9f9f9] text-base md:text-lg">
								<li>Beginner Session: June 3 – July 1 (2026)</li>
								<li>Intermediate Session: July 8 – August 5 (2026)</li>
								<li>Wednesdays 3:15 PM – 4:45 PM</li>
								<li>Location: Truman Middle School</li>
								<li>Cost: $69 per session, includes a disc and/or t-shirt</li>
							</ul>
							<a
								href="#"
								className="mt-6 inline-block bg-[#fbcc00] text-[#1c6a37] font-bold py-3 px-8 rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-lg"
							>
								Sign Up Now
							</a>
						</div>
					</article>
				</div>
			</section>
		</div>
	);
};

export default MiddleSchool;
