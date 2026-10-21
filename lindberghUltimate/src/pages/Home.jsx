import React from "react";
import Footer from "../components/Footer";
import Highlights from "../components/Highlights";
import WhatIs from "../components/WhatIs";
import Swag from "../components/Swag";
import Rules from "../components/Rules";
import Welcome from "../components/Welcome";

const Home = () => {
	return (
		<>
			<Welcome />
			<WhatIs />
			<Rules />
			<Highlights />
			<Swag />
		</>
	);
};

export default Home;
