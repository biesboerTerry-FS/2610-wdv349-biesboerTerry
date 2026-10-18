import React from "react";
import Navbar from "./Navbar";

const Header = () => {
	const backgroundUrl =
		"https://lh7-rt.googleusercontent.com/sitesz/AClOY7pMS735rhSUcYnsr4OoxLaHZ1IAPCimjLhI3EtaMvUAtiVTwbNKFuKNXylIC-xQMqcPlFtOEED1DwGct08suTgM_B0VXVb1UvspwlskuM4gQW8EYPWFm1EKPJz0hhaHXYX_jOpPDDMm7M85D4ttm383jIZ1zK94fF4ol-RjiS4bZdn0kt8?key=uw4YL8q30IN4NlmlrYDz4Q";

	return (
		<header
			className="relative w-full h-[650px] bg-no-repeat bg-center bg-cover"
			style={{
				backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%), url(${backgroundUrl})`,
				backgroundSize: "100% auto",
				backgroundRepeat: "no-repeat",
			}}
		>
			<Navbar />
		</header>
	);
};

export default Header;
