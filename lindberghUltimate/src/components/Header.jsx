// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "./Navbar";

const Header = () => {
	const backgroundUrl =
		"https://sites.google.com/u/0/sitesv-images-rt/AMxu72uKV1vXFHXZAiwxLzgLWGtJvb5l4i6ekg0kDiUyN-U_Cw2LSfNihaUTK8wIDe9n7Uz6rApU8kAXZq52mCVHAmtoJTskOE9QDxjfn1DrjAHTQ04GhloibrnVN0oFz20UsQwuRQb-iSG_7ohpUYZ9KPMeH5AiBQ0m6-ZnjSjUJPhsP96icIawy2sG6FfRe_o=w16383&h=16383";

	return (
		<header
			className="relative w-full h-162.5 bg-no-repeat bg-center bg-cover"
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
