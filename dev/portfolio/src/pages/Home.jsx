import React from "react";
import Highlights from "../components/Highlights";
import WhatIs from "../components/WhatIs";
import Swag from "../components/Swag";
import Rules from "../components/Rules";
import Welcome from "../components/Welcome";
import FrisbeeDivider from "../components/FrisbeeDivider";
import champions from "../assets/champions.jpg"


const Home = () => {
	return (
		<>
		<div>
			<img className="w-full h-auto shadow-[0_0_20px_0_#fbcc00]" src={champions} alt="Champions" />
		</div>
			<Welcome />
			<FrisbeeDivider />
			<WhatIs />
			<FrisbeeDivider />
			<Rules />
			<FrisbeeDivider />
			<Highlights />
			<FrisbeeDivider />
			<Swag />
		</>
	);
};

export default Home;
