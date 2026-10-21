import React from "react";

const WhatIs = () => {
	return (
		<div className="flex flex-col items-center justify-center py-16 bg-[#1c6a37]">
			{/* Spacing added with mb-8 for separation from the video */}
			<p className="text-3xl font-bold mb-8 text-[#fbcc00] tracking-widest">
				What is Ultimate?
			</p>

			{/* Centered Iframe container */}
			<div className="w-full max-w-4xl px-4 flex justify-center">
				<iframe
					className="w-full aspect-video rounded-xl shadow-2xl border-2 border-[#fbcc00]"
					src="https://www.youtube.com/embed/PrinnxHyWlo"
					title="Ultimate frisbee explained"
					allowFullScreen
				></iframe>
				{/* <iframe
               className="rounded-xl shadow-2xl border-4 border-[#fbcc00]"
               width="100%"
               style={{ aspectRatio: '16/9', height: 'auto', maxWidth: '1123px' }}
               src="https://www.youtube.com/embed/PrinnxHyWlo"
               title="Ultimate frisbee explained"
               frameBorder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               referrerPolicy="strict-origin-when-cross-origin"
               allowFullScreen
            ></iframe> */}
			</div>
		</div>
	);
};

export default WhatIs;
