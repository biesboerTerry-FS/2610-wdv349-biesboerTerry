import React from "react";

// Replace with your YouTube video IDs (from watch?v=VIDEO_ID)
const VIDEOS = [
	{ title: "Girls State Championships 2021 Highlight Reel", videoId: "" },
	{ title: "Flyers News Broadcast 3/6/25 Ultimate Segment", videoId: "", duration: "3:15" },
];

const GALLERIES = [
	{ title: "Middle School", image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80", link: "#" },
	{ title: "All Star Game 2025", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80", link: "#" },
	{ title: "High School Spring Season 2025", image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80", link: "#" },
	{ title: "High School Spring Season 2024", image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80", link: "#" },
	{ title: "High School Spring Season 2023", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", link: "#" },
	{ title: "Gxrls Missouri State Tournament 2023", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80", link: "#" },
	{ title: "High School Spring Season 2022", image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80", link: "#" },
	{ title: "High School Gxrls Spring Season 2021 / High School Boys Spring Season 2021", image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80", link: "#" },
	{ title: "High School Gxrls Pre-2020", note: "Photos from the one game in 2020 before the world shut down", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", link: "#" },
];

const Media = () => {
	return (
		<div
			className="min-h-screen bg-[#1c6a37] text-[#f9f9f9]"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			{/* Hero */}
			<section className="relative w-full h-[280px] md:h-[360px] flex items-center justify-center overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center opacity-80"
					style={{
						backgroundImage: "url(https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1200&q=80)",
					}}
				/>
				<div className="absolute inset-0 bg-black/50" />
				<h1 className="relative z-10 text-white text-4xl md:text-6xl font-bold uppercase tracking-widest drop-shadow-lg">
					Media
				</h1>
			</section>

			{/* Videos */}
			<section className="max-w-5xl mx-auto px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{VIDEOS.map((video, i) => (
						<div key={i} className="bg-white/10 border-2 border-[#fbcc00] rounded-xl overflow-hidden">
							{video.videoId ? (
								<div className="aspect-video">
									<iframe
										title={video.title}
										className="w-full h-full"
										src={`https://www.youtube.com/embed/${video.videoId}`}
										allowFullScreen
									/>
								</div>
							) : (
								<div className="aspect-video bg-[#0d4a28] flex items-center justify-center">
									<span className="text-[#fbcc00]/70 text-sm">Add YouTube video ID</span>
								</div>
							)}
							<div className="p-4">
								<p className="text-[#fbcc00] font-bold">
									{video.title}
									{video.duration && (
										<span className="text-[#f9f9f9]/80 font-normal text-sm ml-2">({video.duration})</span>
									)}
								</p>
								{video.videoId && (
									<a
										href={`https://www.youtube.com/watch?v=${video.videoId}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-[#f9f9f9]/90 text-sm hover:text-[#fbcc00] transition-colors"
									>
										Watch on YouTube
									</a>
								)}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Photo galleries */}
			<section className="max-w-5xl mx-auto px-6 pb-20">
				<div className="border-t border-dashed border-[#fbcc00]/50 pt-12">
					<h2 className="text-[#fbcc00] text-2xl font-bold uppercase tracking-wide mb-8">
						Photo Galleries
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{GALLERIES.map((g, i) => (
							<a
								key={i}
								href={g.link}
								className="group block border-b border-dashed border-[#fbcc00]/40 pb-8 last:border-0"
							>
								<div
									className="aspect-video rounded-lg overflow-hidden bg-[#0d4a28] bg-cover bg-center mb-3"
									style={{ backgroundImage: `url(${g.image})` }}
								/>
								<p className="text-[#fbcc00] font-bold group-hover:text-white transition-colors">
									{g.title}
								</p>
								{g.note && (
									<p className="text-[#f9f9f9]/70 text-sm mt-1">{g.note}</p>
								)}
							</a>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Media;
