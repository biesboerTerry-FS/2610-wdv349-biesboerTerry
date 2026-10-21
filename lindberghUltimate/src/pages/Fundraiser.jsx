import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Leaderboard from "../components/Leaderboard";
import Supporters from "../components/Supporters";

const donationGoal = 2000;
const amountRaised = 2026;
const supporterCount = 123;

const Fundraiser = () => {
	return (
		<div className="min-h-screen bg-[#1c6a37] text-[#f9f9f9]" style={{ fontFamily: "'Graduate', serif" }}>
			<Navbar />
			{/* Hero / campaign header */}
			<div className="flex flex-col md:flex-row items-center justify-center gap-10 py-16 px-6 max-w-5xl mx-auto">
				<div className="w-full md:w-1/2 flex justify-center">
					<div className="w-48 h-48 rounded-xl bg-white/10 border-2 border-[#fbcc00] flex items-center justify-center shadow-2xl">
						{/* Placeholder for campaign image */}
						<span className="text-[#fbcc00] text-sm">Image</span>
					</div>
				</div>
				<div className="w-full md:w-1/2 flex flex-col items-start">
					<span className="flex flex-col mb-4">
						<h2 className="text-4xl font-bold text-[#fbcc00]">${amountRaised.toLocaleString()}</h2>
						<p className="text-[#f9f9f9] text-lg">raised</p>
						<p className="text-[#f9f9f9]/90">of ${donationGoal.toLocaleString()} goal</p>
					</span>
					<div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-6">
						<div
							className="h-full bg-[#fbcc00] rounded-full transition-all duration-500"
							style={{ width: `${Math.min(100, (amountRaised / donationGoal) * 100)}%` }}
						/>
					</div>
					<span className="flex flex-wrap gap-6 text-sm text-[#f9f9f9]/90 mb-6">
						<span className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-full bg-[#fbcc00]" />
							<p>{Math.round((amountRaised / donationGoal) * 100)}% raised</p>
						</span>
						<span className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-full bg-[#fbcc00]" />
							<p>{supporterCount} supporters</p>
						</span>
						<span className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-full bg-[#fbcc00]" />
							<p>Campaign Ended</p>
						</span>
					</span>
					<hr className="w-full border-[#fbcc00]/40 mb-6" />
					<span className="flex gap-4">
						<button className="bg-[#fbcc00] text-[#1c6a37] font-bold py-3 px-8 rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-lg">
							Donate Now
						</button>
						<button className="border-2 border-[#fbcc00] text-[#fbcc00] font-bold py-3 px-8 rounded-full hover:bg-[#fbcc00] hover:text-[#1c6a37] transition-all">
							Share
						</button>
					</span>
				</div>
			</div>

			{/* About section */}
			<div className="max-w-4xl mx-auto px-6 pb-16">
				<div className="bg-white/5 border-l-8 border-[#fbcc00] rounded-r-xl p-8 shadow-xl">
					<span className="flex items-center gap-3 mb-4">
						<span className="w-10 h-10 rounded-lg bg-[#fbcc00]/20 flex items-center justify-center text-[#fbcc00] font-bold">
							A
						</span>
						<h3 className="text-2xl font-bold text-[#fbcc00] uppercase tracking-wide">About</h3>
					</span>
					<p className="text-[#f9f9f9] text-lg leading-relaxed mb-4">
						Lindbergh High School Ultimate Frisbee team is raising money to help offset program costs
						and to support the members throughout the season. With the help of your generous donation,
						we'll also be able to:
					</p>
					<ol className="list-decimal list-inside space-y-2 text-[#f9f9f9] text-lg mb-4">
						<li>Purchase a video camera to film practices/games</li>
						<li>Provide student athlete sponsorships</li>
					</ol>
					<p className="text-[#f9f9f9] text-lg leading-relaxed">
						Please donate below to help us reach our goal and THANK YOU for supporting us!
					</p>
				</div>
			</div>

			<Leaderboard />
			<Supporters />
			<Footer />
		</div>
	);
};

export default Fundraiser;
