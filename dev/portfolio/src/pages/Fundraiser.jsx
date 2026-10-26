import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Leaderboard from "../components/Leaderboard";
import Supporters from "../components/Supporters";
import circle from "../assets/circle.jpg";
import champions from "../assets/champions.jpg";

const donationGoal = 2000;
const amountRaised = 2026;
const supporterCount = 123;

const Fundraiser = () => {
	return (
		<div className="min-h-screen bg-lu-green text-lu-cream">
			<Header />
			{/* Hero / campaign header */}
			<div className="relative overflow-hidden">
				<img
					className="absolute inset-0 object-cover w-full h-full opacity-30"
					src={circle}
					alt=""
				/>
				<div className="relative flex flex-col items-center justify-center max-w-5xl gap-10 px-4 py-10 mx-auto sm:px-6 sm:py-16 md:flex-row">
					<div className="flex justify-center w-full md:w-1/2">
						<div className="w-48 h-48 overflow-hidden border-2 shadow-2xl rounded-xl border-lu-yellow">
							<img
								src={champions}
								alt="Lindbergh Ultimate team"
								className="object-cover w-full h-full"
							/>
						</div>
					</div>
					<div className="flex flex-col items-start w-full md:w-1/2">
						<span className="flex flex-col mb-4">
							<h2 className="text-3xl font-bold font-roboto text-lu-yellow sm:text-4xl">${amountRaised.toLocaleString()}</h2>
							<p className="text-lg text-lu-cream">raised</p>
							<p className="text-lu-cream/90">of ${donationGoal.toLocaleString()} goal</p>
						</span>
						<div className="w-full h-2 mb-6 overflow-hidden rounded-full bg-white/20">
							<div
								className="h-full transition-all duration-500 rounded-full bg-lu-yellow"
								style={{ width: `${Math.min(100, (amountRaised / donationGoal) * 100)}%` }}
							/>
						</div>
						<span className="flex flex-wrap gap-6 mb-6 text-sm text-lu-cream/90">
							<span className="flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-lu-yellow" />
								<p>{Math.round((amountRaised / donationGoal) * 100)}% raised</p>
							</span>
							<span className="flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-lu-yellow" />
								<p>{supporterCount} supporters</p>
							</span>
							<span className="flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-lu-yellow" />
								<p>Campaign Ended</p>
							</span>
						</span>
						<hr className="w-full mb-6 border-lu-yellow/40" />
						<span className="flex flex-wrap gap-4">
							<button className="px-8 py-3 font-bold transition-all transform rounded-full shadow-lg bg-lu-yellow text-lu-green hover:bg-white hover:scale-105">
								Donate Now
							</button>
							<button className="px-8 py-3 font-bold transition-all border-2 rounded-full border-lu-yellow text-lu-yellow hover:bg-lu-yellow hover:text-lu-green">
								Share
							</button>
						</span>
					</div>
				</div>
			</div>

			{/* About section */}
			<div className="max-w-4xl px-4 pb-16 mx-auto sm:px-6">
				<div className="p-5 border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink sm:p-8">
					<span className="flex items-center gap-3 mb-4">
						<span className="flex items-center justify-center w-10 h-10 font-bold rounded-lg bg-lu-green/10 text-lu-green">
							A
						</span>
						<h3 className="text-2xl font-bold tracking-wide uppercase font-roboto text-lu-green">About</h3>
					</span>
					<p className="mb-4 text-lg leading-relaxed text-lu-ink">
						Lindbergh High School Ultimate Frisbee team is raising money to help offset program costs
						and to support the members throughout the season. With the help of your generous donation,
						we'll also be able to:
					</p>
					<ol className="mb-4 space-y-2 text-lg list-decimal list-inside text-lu-ink">
						<li>Purchase a video camera to film practices/games</li>
						<li>Provide student athlete sponsorships</li>
					</ol>
					<p className="text-lg leading-relaxed text-lu-ink">
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
