import React from "react";
import circle from "../assets/circle.png";
import gradesThreeToEight from "../assets/Lindbergh Ultimate - Grades 3-8.jpg";

const MiddleSchool = () => {
	return (
		<div
			className="min-h-screen bg-lu-green text-lu-cream"
		>
			{/* Banner: full-width image with "Middle School" overlay */}
			<section className="relative flex items-center justify-center w-full overflow-hidden h-80 md:h-100 bg-lu-deep">
				{/* Placeholder for banner image – replace src with your group photo */}
				<div
					className="absolute inset-0 bg-center bg-cover opacity-60"
					style={{
						backgroundImage: `url(${circle})`,
					}}
				/>
				<div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/30" />
				<h1 className="relative z-10 px-4 text-5xl font-bold tracking-widest text-center uppercase hero-title drop-shadow-lg md:text-6xl lg:text-7xl">
					Middle School
				</h1>
			</section>

			{/* Intro paragraph */}
			<section className="max-w-4xl px-6 py-12 mx-auto">
				<div className="p-6 text-center border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink sm:p-8">
					<p className="text-lg leading-relaxed text-lu-ink md:text-xl">
						Lindbergh Ultimate is proud to be a leader of Middle School Ultimate in the St. Louis area.
						Our middle school program began in 2021 as a collaboration with Lindbergh Community Ed, and
						we have experienced increased growth, interest, and expansion of play opportunities every
						year since.
					</p>
				</div>
			</section>

			{/* Two program cards */}
			<section className="max-w-6xl px-6 pb-20 mx-auto">
				<div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
					{/* Fall After School Club */}
					<article className="flex flex-col h-full overflow-hidden border-2 shadow-2xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
						<div
							className="bg-center bg-cover aspect-16/10 bg-lu-deep"
							style={{
								backgroundImage: `url(${gradesThreeToEight})`,
							}}
						/>
						<div className="flex flex-col flex-1 p-6 md:p-8">
							<h2 className="mb-4 text-2xl font-bold tracking-wide uppercase font-roboto text-lu-green">
								Fall After School Club
							</h2>
							<ul className="space-y-2 text-base text-lu-ink md:text-lg">
								<li>August – December</li>
								<li>Wednesdays 3:00 PM – 4:15 PM</li>
								<li>Location: Truman Middle School</li>
								<li>
									<a
										href="#"
										className="underline transition-colors text-lu-green hover:text-lu-deep"
									>
										Sperreng Carpool GroupMe
									</a>
								</li>
								<li className="font-bold font-roboto text-lu-green">Cost: FREE!</li>
							</ul>
							<div className="pt-6 mt-auto">
								<a
									href="#"
									className="inline-block px-8 py-3 font-bold transition-all rounded-full shadow-lg bg-lu-yellow text-lu-green hover:scale-105 hover:bg-lu-green hover:text-lu-yellow"
								>
									Sign Up Now
								</a>
							</div>
						</div>
					</article>

					{/* 5 Week Community Ed Summer Camps */}
					<article className="flex flex-col h-full overflow-hidden border-2 shadow-2xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
						<div
							className="bg-center bg-cover aspect-16/10 bg-lu-deep"
							style={{
								backgroundImage: `url(${gradesThreeToEight})`,
							}}
						/>
						<div className="flex flex-col flex-1 p-6 md:p-8">
							<h2 className="mb-4 text-2xl font-bold tracking-wide uppercase font-roboto text-lu-green">
								5 Week Community Ed Summer Camps
							</h2>
							<ul className="space-y-2 text-base text-lu-ink md:text-lg">
								<li>Beginner Session: June 3 – July 1 (2026)</li>
								<li>Intermediate Session: July 8 – August 5 (2026)</li>
								<li>Wednesdays 3:15 PM – 4:45 PM</li>
								<li>Location: Truman Middle School</li>
								<li>Cost: $69 per session, includes a disc and/or t-shirt</li>
							</ul>
							<div className="pt-6 mt-auto">
								<a
									href="#"
									className="inline-block px-8 py-3 font-bold transition-all rounded-full shadow-lg bg-lu-yellow text-lu-green hover:scale-105 hover:bg-lu-green hover:text-lu-yellow"
								>
									Sign Up Now
								</a>
							</div>
						</div>
					</article>
				</div>
			</section>
		</div>
	);
};

export default MiddleSchool;
