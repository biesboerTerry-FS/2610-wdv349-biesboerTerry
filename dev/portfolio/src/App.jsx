import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import QuickInterest from "./pages/QuickInterest";
import Fundraiser from "./pages/Fundraiser";
import HighSchool from "./pages/HighSchool";
import CoachingApprenticeship from "./pages/CoachingApprenticeship";
import MiddleSchool from "./pages/MiddleSchool";
import RegistrationForm from "./pages/RegistrationForm";
import Calendar2026 from "./pages/Calendar2026";
import BoosterClub from "./pages/BoosterClub";
import SportsYou from "./pages/SportsYou";
import USUltimate from "./pages/USUltimate";
import PlayOpportunities from "./pages/PlayOpportunities";
import Media from "./pages/Media";
import PowerLunch from "./pages/PowerLunch";
import Families from "./pages/Families";
import AdminRoutes from "./admin/AdminRoutes";

function Layout({ children }) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="grow">{children}</main>
			<Footer />
		</div>
	);
}

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout><Home /></Layout>} />
			<Route path="/interest-form" element={<Layout><QuickInterest /></Layout>} />
			<Route path="/high-school" element={<Layout><HighSchool /></Layout>} />
			<Route path="/coaching-apprenticeship" element={<Layout><CoachingApprenticeship /></Layout>} />
			<Route path="/middle-school" element={<Layout><MiddleSchool /></Layout>} />
			<Route path="/fundraiser" element={<Fundraiser />} />
			<Route path="/registration" element={<Layout><RegistrationForm /></Layout>} />
			<Route path="/calendar" element={<Layout><Calendar2026 /></Layout>} />
			<Route path="/booster-club" element={<Layout><BoosterClub /></Layout>} />
			<Route path="/sportsyou" element={<Layout><SportsYou /></Layout>} />
			<Route path="/usa-ultimate" element={<Layout><USUltimate /></Layout>} />
			<Route path="/play-opportunities" element={<Layout><PlayOpportunities /></Layout>} />
			<Route path="/media" element={<Layout><Media /></Layout>} />
			<Route path="/power-lunch" element={<Layout><PowerLunch /></Layout>} />
			<Route path="/families" element={<Layout><Families /></Layout>} />
			<Route path="/admin/*" element={<AdminRoutes />} />
		</Routes>
	);
}

export default App;
