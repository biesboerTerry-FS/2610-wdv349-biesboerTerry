import React from "react";
import circle from "../assets/circle.png";
import mediaImage from "../assets/Lindbergh Ultimate - Media.jpg";
import gradesThreeToEight from "../assets/Lindbergh Ultimate - Grades 3-8.jpg";
import playOpportunities from "../assets/Lindbergh Ultimate - Play Opportunities.jpg";
import powerLunch from "../assets/Lindbergh Ultimate - Power Lunch.jpg";

// Replace with your YouTube video IDs (from watch?v=VIDEO_ID)
const VIDEOS = [
	{ title: "Girls State Championships 2021 Highlight Reel", videoId: "" },
	{ title: "Flyers News Broadcast 3/6/25 Ultimate Segment", videoId: "", duration: "3:15" },
];

const GALLERIES = [
	{ title: "Middle School", image: gradesThreeToEight, link: "#" },
	{ title: "All Star Game 2025", image: mediaImage, link: "#" },
	{ title: "High School Spring Season 2025", image: playOpportunities, link: "#" },
	{ title: "High School Spring Season 2024", image: powerLunch, link: "#" },
	{ title: "High School Spring Season 2023", image: gradesThreeToEight, link: "#" },
	{ title: "Gxrls Missouri State Tournament 2023", image: mediaImage, link: "#" },
	{ title: "High School Spring Season 2022", image: playOpportunities, link: "#" },
	{ title: "High School Gxrls Spring Season 2021 / High School Boys Spring Season 2021", image: gradesThreeToEight, link: "#" },
	{ title: "High School Gxrls Pre-2020", note: "Photos from the one game in 2020 before the world shut down", image: gradesThreeToEight, link: "#" },
];

const Media = () => {
	return (
		<div
			className="min-h-screen bg-lu-green text-lu-cream"
		>
			{/* Hero */}
			<section className="relative flex items-center justify-center w-full overflow-hidden h-70 md:h-90">
				<div
					className="absolute inset-0 bg-center bg-cover opacity-80"
					style={{
						backgroundImage: `url(${circle})`,
					}}
				/>
				<div className="absolute inset-0 bg-black/50" />
				<h1 className="relative z-10 px-4 text-5xl font-bold tracking-widest text-center uppercase hero-title drop-shadow-lg md:text-6xl lg:text-7xl">
					Media
				</h1>
			</section>

			{/* Videos */}
			<section className="max-w-5xl px-4 py-10 mx-auto sm:px-6 sm:py-12">
				<h2 className="mb-8 text-xl font-bold tracking-wide uppercase outline-title sm:text-2xl">
					Videos
				</h2>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					{VIDEOS.map((video, i) => (
						<div key={i} className="overflow-hidden border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
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
								<div className="aspect-video bg-[#e8f0e9] flex items-center justify-center">
									<span className="text-sm text-lu-green/70">Add YouTube video ID</span>
								</div>
							)}
							<div className="p-4">
								<p className="text-sm font-bold text-lu-green sm:text-base">
									{video.title}
									{video.duration && (
										<span className="ml-2 text-sm font-normal text-lu-ink/60">({video.duration})</span>
									)}
								</p>
								{video.videoId && (
									<a
										href={`https://www.youtube.com/watch?v=${video.videoId}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm transition-colors text-lu-green hover:text-lu-deep hover:underline"
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
			<section className="max-w-5xl px-4 pb-16 mx-auto sm:px-6 sm:pb-20">
				<div className="pt-12 border-t border-lu-yellow/30">
					<h2 className="mb-8 text-xl font-bold tracking-wide uppercase outline-title sm:text-2xl">
						Photo Galleries
					</h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						{GALLERIES.map((g, i) => (
							<a
								key={i}
								href={g.link}
								className="group flex h-full flex-col overflow-hidden rounded-xl border-2 border-lu-yellow bg-lu-cream text-lu-ink shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
							>
								<div
									className="bg-center bg-cover aspect-video bg-lu-deep"
									style={{ backgroundImage: `url(${g.image})` }}
								/>
								<div className="flex flex-col flex-1 p-4">
									<p className="font-bold transition-colors text-lu-green group-hover:text-lu-deep">
										{g.title}
									</p>
									{g.note && (
										<p className="mt-1 text-sm text-lu-ink/65">{g.note}</p>
									)}
								</div>
							</a>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Media;
