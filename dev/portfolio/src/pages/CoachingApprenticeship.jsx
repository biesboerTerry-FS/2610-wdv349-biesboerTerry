import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRight,
	faClipboardCheck,
	faClock,
	faEnvelope,
	faHandshake,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import circle from "../assets/circle.png";

const APPLICATION_URL =
	"https://docs.google.com/forms/d/e/1FAIpQLSdjlasSht6fT4fJvoSSswuruQmgSHlJ9sAM9O3EDOeHnWIPWg/closedform";

const EXPECTATIONS = [
	"Be 21 or older.",
	"Attend practices consistently to build rapport with players and coaches.",
	"Complete USA Ultimate Chaperone requirements, including SafeSport training and a background check.",
	"Participate in 1–2 pre-season planning meetings (January–February).",
	"Have a basic understanding of Ultimate and a desire to continue learning.",
	"Model Lindbergh Ultimate’s values of Character, Community, and Competition.",
	"Communicate professionally with youth athletes and uphold Spirit of the Game.",
];

const NICE_TO_HAVE = [
	"Attend games and tournaments.",
	"Run drills or small-group activities independently.",
	"Help plan practices or season structure.",
	"Work one-on-one with players on skill development.",
	"Pursue USAU Coaching Certification—we can help guide you.",
];

const GAINS = [
	"A supportive introduction to coaching youth Ultimate.",
	"Experience within a structured, values-driven high school program.",
	"Mentorship from experienced coaches.",
	"Leadership, teaching, and communication skills.",
	"A meaningful way to give back to the Saint Louis Ultimate community.",
];

const TIME_COMMITMENT = [
	{
		label: "Pre-season (January–February)",
		detail: "1–2 planning meetings with the coaching staff.",
	},
	{
		label: "Regular season (mid-February–early May)",
		detail:
			"Two practices per week, each about 2 hours. Practices usually occur between 3pm–8pm; exact times TBD.",
	},
	{
		label: "Games (March–April)",
		detail:
			"1–2 games per week, typically on weekday evenings but sometimes on weekends.",
	},
	{
		label: "Tournaments",
		detail:
			"One out-of-state tournament in April (Indianapolis Invite) and the Missouri State Championship in May (typically the first weekend).",
	},
];

const CoachingApprenticeship = () => {
	return (
		<div className="min-h-screen bg-lu-green text-lu-cream">
			<section className="relative flex items-center justify-center w-full overflow-hidden h-70 md:h-90">
				<div
					className="absolute inset-0 bg-center bg-cover opacity-80"
					style={{ backgroundImage: `url(${circle})` }}
				/>
				<div className="absolute inset-0 bg-black/55" />
				<h1 className="relative z-10 max-w-full px-2 text-4xl font-bold tracking-widest text-center uppercase hero-title drop-shadow-lg sm:px-4 sm:text-5xl md:text-6xl lg:text-7xl">
					Coaching Apprenticeship
				</h1>
			</section>

			<section className="max-w-4xl px-6 py-12 mx-auto">
				<div className="p-6 border-2 shadow-xl rounded-2xl border-lu-yellow bg-lu-cream text-lu-ink md:p-8">
					<p className="font-roboto text-xs font-bold uppercase tracking-[0.25em] text-lu-green">
						Volunteer Opportunity
					</p>
					<h2 className="mt-3 text-2xl font-bold leading-tight font-roboto text-lu-green md:text-3xl">
						Lindbergh High School Ultimate – Coaching Apprenticeship
						Program
					</h2>
					<p className="mt-3 text-sm font-bold tracking-wide uppercase font-roboto text-lu-green">
						Role: Coaching Apprentice (Volunteer)
					</p>
					<p className="mt-5 leading-relaxed text-lu-ink">
						Our mission is to advance the sport of Ultimate at Lindbergh by
						enhancing and promoting Character, Community, and Competition. We
						are dedicated to fostering a vibrant, supportive environment for
						players, coaches, and families—and we are excited to welcome new
						members of the Ultimate community into that mission.
					</p>
					<p className="mt-3 leading-relaxed text-lu-ink">
						The Coaching Apprenticeship Program is designed to introduce
						individuals into youth Ultimate in a low-risk, high-support way.
						Apprentices learn by observing and collaborating with experienced
						coaches while contributing meaningfully to the team.
					</p>
					<div className="flex flex-wrap items-center gap-4 mt-6">
						<a
							href={APPLICATION_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-6 py-3 font-bold transition-colors rounded-full bg-lu-green text-lu-yellow hover:bg-lu-dark"
						>
							Open Application Form
							<FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
						</a>
						<Link
							to="/"
							className="text-sm font-semibold text-lu-green underline-offset-4 hover:underline"
						>
							Learn more about Lindbergh Ultimate
						</Link>
					</div>
				</div>
			</section>

			<section className="grid max-w-5xl gap-6 px-6 pb-12 mx-auto md:grid-cols-2">
				<div className="p-6 border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
					<h2 className="flex items-center gap-3 text-xl font-bold font-roboto text-lu-green">
						<FontAwesomeIcon icon={faHandshake} aria-hidden="true" />
						Role Overview
					</h2>
					<p className="mt-4 leading-relaxed text-lu-ink">
						The Coaching Apprentice role is perfect for individuals who want to
						explore coaching without the pressure of leading a team.
						Apprentices work alongside veteran coaches, gradually taking on
						responsibilities as their comfort and confidence grow.
					</p>
					<p className="mt-4 leading-relaxed text-lu-ink">
						This is a volunteer position, but Lindbergh Ultimate will reimburse
						the cost of your USA Ultimate Membership, Chaperone Certification,
						and background check.
					</p>
					<p className="mt-4 leading-relaxed text-lu-ink">
						Coaching Apprentices may choose to work with the Lindbergh Gxrls,
						Lindbergh Boys, or—if interested—we can help connect you with
						another local high school program involved in the Saint Louis
						Ultimate League.
					</p>
				</div>

				<div className="p-6 border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
					<h2 className="flex items-center gap-3 text-xl font-bold font-roboto text-lu-green">
						<FontAwesomeIcon icon={faStar} aria-hidden="true" />
						What You’ll Gain
					</h2>
					<ul className="mt-4 space-y-3">
						{GAINS.map((item) => (
							<li key={item} className="flex gap-3 leading-relaxed text-lu-ink">
								<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lu-green" />
								{item}
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className="max-w-5xl px-6 pb-12 mx-auto">
				<div className="p-6 border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink md:p-8">
					<h2 className="flex items-center gap-3 text-xl font-bold font-roboto text-lu-green">
						<FontAwesomeIcon icon={faClipboardCheck} aria-hidden="true" />
						Baseline Expectations (Required)
					</h2>
					<ul className="grid gap-4 mt-5 md:grid-cols-2">
						{EXPECTATIONS.map((item) => (
							<li key={item} className="flex gap-3 leading-relaxed text-lu-ink">
								<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lu-green" />
								{item}
							</li>
						))}
					</ul>
					<p className="p-4 mt-5 font-semibold border-2 rounded-lg border-lu-yellow bg-lu-yellow/20 text-lu-green">
						No previous playing experience is required—enthusiasm and
						willingness to learn are what matter most.
					</p>
				</div>
			</section>

			<section className="grid max-w-5xl gap-6 px-6 pb-12 mx-auto md:grid-cols-2">
				<div className="p-6 border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
					<h2 className="text-xl font-bold font-roboto text-lu-green">
						Nice-to-Have Skills (Optional)
					</h2>
					<p className="mt-2 text-sm text-lu-ink/70">
						These are not required but offer opportunities for deeper
						involvement:
					</p>
					<ul className="mt-4 space-y-3">
						{NICE_TO_HAVE.map((item) => (
							<li key={item} className="flex gap-3 leading-relaxed text-lu-ink">
								<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lu-green" />
								{item}
							</li>
						))}
					</ul>
				</div>

				<div className="p-6 border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
					<h2 className="flex items-center gap-3 text-xl font-bold font-roboto text-lu-green">
						<FontAwesomeIcon icon={faClock} aria-hidden="true" />
						Time Commitment
					</h2>
					<dl className="mt-4 space-y-4">
						{TIME_COMMITMENT.map((item) => (
							<div key={item.label}>
								<dt className="text-sm font-bold tracking-wide uppercase font-roboto text-lu-green">
									{item.label}
								</dt>
								<dd className="mt-1 leading-relaxed text-lu-ink">
									{item.detail}
								</dd>
							</div>
						))}
					</dl>
					<p className="mt-4 text-sm italic leading-relaxed text-lu-ink/65">
						This role is flexible—if you cannot attend everything, that is
						okay. Clear communication is what matters.
					</p>
				</div>
			</section>

			<section className="max-w-4xl px-6 pb-20 mx-auto">
				<div className="p-6 border-2 rounded-2xl border-lu-yellow bg-lu-yellow text-lu-green md:p-8">
					<h2 className="text-2xl font-bold tracking-wide uppercase font-roboto">
						How to Apply
					</h2>
					<p className="mt-3 leading-relaxed">
						Interested applicants should complete the program application
						form. Questions can be directed to Casey “Coach Brooks” Brooks.
					</p>
					<div className="flex flex-wrap items-center gap-4 mt-5">
						<a
							href={APPLICATION_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-6 py-3 font-bold transition-colors rounded-full bg-lu-green text-lu-yellow hover:bg-lu-dark"
						>
							Program Application Form
							<FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
						</a>
						<a
							href="mailto:casey.brooks@example.com"
							className="inline-flex items-center gap-2 font-bold underline-offset-4 hover:underline"
						>
							<FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
							casey.brooks@example.com
						</a>
					</div>
				</div>
			</section>
		</div>
	);
};

export default CoachingApprenticeship;
