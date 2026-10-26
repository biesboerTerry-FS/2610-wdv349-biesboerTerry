import React from "react";

const WhatIs = () => {
	return (
		<div className="flex flex-col items-center justify-center px-4 py-12 bg-lu-green sm:py-16">
			{/* Spacing added with mb-8 for separation from the video */}
			<h2 className="mb-8 text-2xl font-bold tracking-widest text-center outline-title font-display sm:text-3xl">
				What is Ultimate?
			</h2>

			{/* Centered Iframe container */}
			<div className="flex justify-center w-full max-w-4xl px-4">
				<iframe
					className="w-full border-2 shadow-2xl aspect-video rounded-xl border-lu-yellow"
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
