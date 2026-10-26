import React from "react";
import champions from "../assets/champions.jpg";
import circle from "../assets/circle.jpg";
import mediaImage from "../assets/Lindbergh Ultimate - Media.jpg";
import gradesThreeToEight from "../assets/Lindbergh Ultimate - Grades 3-8.jpg";
import playOpportunities from "../assets/Lindbergh Ultimate - Play Opportunities.jpg";
import powerLunch from "../assets/Lindbergh Ultimate - Power Lunch.jpg";
import fall3to5 from "../assets/fall3-5.jpg";
import fallMiddleSchoolClub from "../assets/fallMiddleSchoolClub.jpg";
import groupme from "../assets/groupme.jpg";
import lunch1 from "../assets/lunch1.jpg";
import lunch2 from "../assets/lunch2.png";
import lunch3 from "../assets/lunch3.jpg";
import practice from "../assets/3.jpg";

const VIDEOS = [
	{
		title: "Gxrls State Championships 2021",
		videoId: "HIKvPYdtd50",
		url: "https://www.youtube.com/watch?v=HIKvPYdtd50",
	},
	{
		title: "Flyers News Broadcast 3/6/25 Ultimate Segment",
		videoId: "vdbEz3rHC_Y",
		url: "https://www.youtube.com/watch?v=vdbEz3rHC_Y&t=196s",
		start: 196,
		duration: "3:15",
	},
];

const GALLERIES = [
	{
		title: "Flyers Ultimate Gxrls 2026",
		image: champions,
		link: "https://photos.google.com/share/AF1QipN_s7R53YpcmoePuxccClXAgCYdoWVImNxCC1yC-FsqMH4AZFldh-OkLosFhHiy-Q?pli=1&key=RHdqZFVzZ1hVa1BrazRYM1pCNnJ3M0JYaS1tTmx3",
	},
	{
		title: "Flyers Ultimate Boys 2026",
		image: mediaImage,
		link: "https://photos.google.com/share/AF1QipONdTfJ2Lgxiy6Yd4dIWkXbhlZwW0UcGU5KQZLFtK4mwsvSJWt4QIAtMaZSEESuZw?key=WDRzT3d5MWZ3X2dtbEJaaU41S29IUjZ4Uy1hYUdR",
	},
	{
		title: "Middle School",
		image: gradesThreeToEight,
		link: "https://photos.google.com/share/AF1QipP1koCHSPexyQNG_IUAm1BnRgTlQNDpTwx7tif4s6JSzAcGv9oy_ry_u6TPyiBLsw?key=OUVpaG5ZX3J2M2g2YVh6T0p3bjlkNjhYYmRYMV9R",
	},
	{
		title: "2025 SLUJ All Star Game",
		image: fall3to5,
		link: "https://photos.google.com/share/AF1QipP2fDDJN_WgEab-p3JHDX-JuopK8Lyo3B6nM_JolkOGsIhhgr2XyfsKqnk5o_09uQ?key=elltR3gwcndzakQzODJyTFI3M3hIbGdqUktXRzNn",
	},
	{
		title: "Flyers Ultimate 2025",
		image: playOpportunities,
		link: "https://photos.google.com/share/AF1QipOcPh_ctBoNHykAyEaq8eCcRSzixjY7r_d-LlVdl5tqYh5OAAOl0VT4MzR7LQOmyg?key=VEQwY2c1WXZvVGNxNWJYcXdibTM3bTUxbS1pcHln",
	},
	{
		title: "Flyers Ultimate 2024",
		image: powerLunch,
		link: "https://photos.google.com/share/AF1QipM5YhT8PCVXQYTHDwW5t6kpooMS1QQ5blqMGmXEr3IOrsRbfqg0ozdCObjzqHmmPg?key=MzZuX1R4Q3V5TkFoZGdjUFpDcHE1ZTJXbTNBQjdR",
	},
	{
		title: "Flyers Ultimate 2023",
		image: fallMiddleSchoolClub,
		link: "https://photos.google.com/share/AF1QipP-NpdnvI1Hz3fXfE8MG0ASZMUZNCul_GBUaK1rMnKkvEobK8XcHrE6Rmk3vZfBpQ?key=R0kwdE93b0NOQmZVVnRRUjNYWTBLWTFYM0owNHdB",
	},
	{
		title: "2023 High School State Championship",
		image: groupme,
		link: "https://photos.google.com/share/AF1QipOHQ45tAaX6yqGnZrZfJtzZTeOkH1CAbr7ETJINaBKivE7dsnuvUOUdXdB_4e0_oA?key=Skl4RjZCOFlDSWZiaFJ2MG9GcjJyN084cm9JU21n",
	},
	{
		title: "Lady Flyers Ultimate 2022",
		image: lunch1,
		link: "https://photos.google.com/share/AF1QipO8cVHT1KOtX6k3ri3SA2iUvn84jHsGatvUjIA3-EhBWZbJBCkz11Gon7tROcwt_g?key=VmtTUmFyalBvVTRiMm9MTjR6T1JoMV9aMHM0eTV3",
	},
	{
		title: "Lady Flyers Ultimate 2021 Season",
		image: lunch2,
		link: "https://photos.google.com/share/AF1QipNuhbQF19n6IExhkScUoK1zgbiAZBc2QLr540rERR-C_XvMB9vfo8remXw1fd-qaQ?key=dVc4N0d5WmRwYzBlUUViUXhBZVdGV0ZlbHN2cjFB",
	},
	{
		title: "Lindbergh Lady Flyers Ultimate Team History",
		image: lunch3,
		link: "https://photos.google.com/share/AF1QipP5XpJmgSG4-JCqclVZqbMdwSn7lkO8ODqptLscH9ddH9kFFBC7vtCQ5TvtBMOZJQ?key=QzFFaTBoMmY2ZHllUFg1VS00dk1wbkhCbEJ1SE5B",
	},
	{
		title: "Boys Flyers Ultimate 2021 Season",
		image: practice,
		link: "https://photos.google.com/share/AF1QipMVnKqJwpU0_651McEagsog4LuOPOfCUXQMZvymyY83xZb7cWpkVCREi4hsmDV28Q?key=bzVSd3oyMEF6S0VkVzlWTHg2NGdubUJiSUZieV9n",
	},
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
										src={`https://www.youtube.com/embed/${video.videoId}${video.start ? `?start=${video.start}` : ""}`}
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
										href={video.url || `https://www.youtube.com/watch?v=${video.videoId}`}
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
								target="_blank"
								rel="noopener noreferrer"
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
