import React from "react";

const PowerLunch = () => {
	return (
		<div
			className="min-h-screen bg-[#1c6a37] text-[#f9f9f9]"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			{/* Hero */}
			<section className="relative w-full h-[280px] md:h-[380px] flex items-center justify-center overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center opacity-80"
					style={{
						backgroundImage: "url(https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1200&q=80)",
					}}
				/>
				<div className="absolute inset-0 bg-black/50" />
				<h1 className="relative z-10 text-white text-4xl md:text-6xl font-bold uppercase tracking-widest drop-shadow-lg">
					Power Lunch
				</h1>
			</section>

			{/* Main content: two columns */}
			<section className="max-w-5xl mx-auto px-6 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
					{/* Left column */}
					<div>
						<p className="text-[#1c6a37] bg-white/95 rounded-lg px-4 py-2 inline-block text-lg font-medium">
							Join us for
						</p>
						<p className="text-[#1c6a37] bg-white/95 rounded-lg px-4 py-2 mt-2 text-2xl md:text-3xl font-bold">
							Power Lunch!
						</p>
					</div>

					{/* Right column */}
					<div className="bg-white/10 border border-[#fbcc00]/50 rounded-xl p-6 md:p-8">
						<h2 className="text-[#fbcc00] text-xl font-bold mb-4">
							What is Power Lunch?
						</h2>
						<p className="text-[#f9f9f9] leading-relaxed mb-4">
							Power Lunch is a low commitment opportunity to learn the basics of Ultimate. No
							previous knowledge or experience is needed to join. Bring a friend and join us
							whenever you have time!
						</p>
						<p className="text-[#f9f9f9] leading-relaxed mb-4">
							<span className="bg-[#fbcc00] text-[#1c6a37] px-1 rounded">Wednesdays</span> (year
							round) during{" "}
							<span className="bg-[#fbcc00] text-[#1c6a37] px-1 rounded">A Lunch</span> in the{" "}
							<span className="bg-[#1c6a37] border border-[#fbcc00] text-[#fbcc00] px-1 rounded">
								Green Gym
							</span>
						</p>
						<p className="text-[#f9f9f9]">
							Got Questions? Reach out to Coach Gabby (
							<a
								href="mailto:gabriellalavezzi@lindberghschools.ws"
								className="text-[#fbcc00] font-bold hover:underline"
							>
								gabriellalavezzi@lindberghschools.ws
							</a>
							)
						</p>
					</div>
				</div>
			</section>

			{/* Image gallery */}
			<section className="max-w-5xl mx-auto px-6 pb-20 border-t border-dashed border-[#fbcc00]/40 pt-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{[
						"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
						"https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
						"https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80",
					].map((src, i) => (
						<div
							key={i}
							className="aspect-video rounded-xl overflow-hidden border-2 border-[#fbcc00]/50 bg-[#0d4a28] bg-cover bg-center"
							style={{ backgroundImage: `url(${src})` }}
						/>
					))}
				</div>
			</section>
		</div>
	);
};

export default PowerLunch;
