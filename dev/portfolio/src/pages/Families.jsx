import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import circle from "../assets/circle.png";
import wordCloud from "../assets/wordCloud.png";
// Kept for reference: the interactive word cloud is replaced by the supplied image.
// import WordCloud from "../components/WordCloud";

const TESTIMONIALS = [
	{
		quote:
			"I have made long lasting friendships, gained so much confidence and leadership experience, and found a sport that I'm going to love for the rest of my life! It is such a cool community of people and an amazing environment to be a part of. Not just Lindbergh Ultimate, but the Saint Louis community in general is so welcoming to anyone who wants to try it out.",
		attribution: "Nora Delgado (Player, c.o. '25)",
	},
	{
		quote:
			"Playing ultimate has shaped me into the leader I am today and has build my confidence both on and off the field. It opens you up to an incredibly supportive and kind community for all ages.",
		attribution: "Maya Patel (Player, c.o. '25)",
	},
	{
		quote:
			"Ultimate's unique Spirit of the Game has given our son a place to play hard and have fun! The positive attitudes of players, coaches, and spectators truly makes this sport exceptional.",
		attribution: "Riley Hayes (Parent)",
	},
	{
		quote:
			"As a parent, I couldn't be more impressed with the Lindbergh Flyers Ultimate Frisbee team. The coaching staff is outstanding—so knowledgeable about the sport and so dedicated to the players. I saw how they invested in my daughter not just as an athlete, but as a person—offering support in school, other interests, and personal growth. The team atmosphere is incredibly welcoming—every skill level is embraced, and it's just a joy to watch them grow both on and off the field. I'm so grateful for this amazing team!",
		attribution: "Dana Whitfield (Parent)",
	},
	{
		quote:
			"Ultimate has given me a community and friends as well as really valuable leadership experience that I feel like I have learned a lot from. It's one the most welcoming sports out there, and a place where you can get some energy out in a really fun way!",
		attribution: "Elena Whitfield (Player, c.o. 2025)",
	},
	{
		quote:
			"It's a low-risk sport compared to the ones at the high school that's not as popular but it's just as fun that can help you build athleticism whether you're getting into sports or on an off season of another sport.",
		attribution: "Sofia Tran (Player, c.o. '25)",
	},
	{
		quote:
			"Ultimate has helped my son build confidence, learn teamwork and is a fun outlet for his competitive spirit!",
		attribution: "Priya Nair (Parent)",
	},
	{
		quote:
			"Ultimate gave my son a great way to stay active, introduced him to a new sport, and helped him make new friends.",
		attribution: "Erin Foster (Parent)",
	},
	{
		quote:
			"We've enjoyed the ultimate frisbee program at Truman. It's well organized, and the coaches are accepting of all skill levels, so it helps the kids build confidence while having fun.",
		attribution: "Marcus Reed (Parent)",
	},
	{
		quote:
			"Ultimate has been a very positive experience for my son's physical and social health.",
		attribution: "Hannah Cole (Parent)",
	},
	{
		quote:
			"The team camaraderie is incredible! As a first time player, my daughter felt a part of the team from day one! Thank you Coach T, I know you have created this wonderful atmosphere! It's so easy to play hard when you're having so much fun!!!",
		attribution: "Laura Simmons (Parent)",
		fullWidth: true,
	},
];

const Families = () => {
	const [openFaq, setOpenFaq] = useState(null);

	return (
		<div
			className="min-h-screen bg-lu-green text-lu-cream"
		>
			{/* Hero */}
			<section className="relative flex items-center justify-center w-full overflow-hidden h-70 md:h-90">
				<div
					className="absolute inset-0 bg-center bg-cover opacity-80"
					style={{
						backgroundImage: `url(${circle})`,
					}}
				/>
				<div className="absolute inset-0 bg-black/50" />
				<h1 className="relative z-10 px-4 text-5xl font-bold tracking-widest text-center uppercase hero-title drop-shadow-lg md:text-6xl lg:text-7xl">
					Families
				</h1>
			</section>

			{/* Testimonies */}
			<section className="max-w-5xl px-6 py-16 mx-auto">
				<h2 className="mb-12 text-2xl font-bold tracking-wide text-center uppercase outline-title md:text-3xl">
					Testimonies from Families &amp; Players
				</h2>
				<div className="gap-8 columns-1 md:columns-2">
					{TESTIMONIALS.filter((t) => !t.fullWidth).map((t, i) => (
						<div
							key={i}
							className="p-6 mb-8 border-2 shadow-xl break-inside-avoid rounded-xl border-lu-yellow bg-lu-cream text-lu-ink"
						>
							<p className="text-lg italic leading-relaxed">&quot;{t.quote}&quot;</p>
							<p className="mt-4 text-sm font-bold font-roboto text-lu-green">—{t.attribution}</p>
						</div>
					))}
				</div>
				{/* Full-width testimonial */}
				{TESTIMONIALS.filter((t) => t.fullWidth).map((t, i) => (
					<div
						key={`fw-${i}`}
						className="max-w-3xl p-6 mx-auto mt-8 text-center border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink"
					>
						<p className="text-lg italic leading-relaxed">&quot;{t.quote}&quot;</p>
						<p className="mt-4 text-sm font-bold font-roboto text-lu-green">—{t.attribution}</p>
					</div>
				))}
			</section>

			{/* Describe Lindbergh Ultimate in Three Words */}
			<section className="max-w-4xl px-6 py-12 mx-auto border-t border-lu-yellow/30">
				<h2 className="mb-8 text-xl font-bold text-center outline-title md:text-2xl">
					Describe Lindbergh Ultimate in Three Words
				</h2>
				{/* Interactive word cloud retained for reference.
				<WordCloud />
				*/}
				<div className="max-w-3xl p-3 mx-auto border-2 shadow-xl rounded-2xl border-lu-yellow bg-lu-cream sm:p-5">
					<img
						src={wordCloud}
						alt="Word cloud shaped like a flying disc, filled with Lindbergh Ultimate values such as friendly, driven, spirited, inclusive, and hardworking."
						className="w-full h-auto"
					/>
				</div>
			</section>

			{/* Common Q&As */}
			<section className="max-w-6xl px-6 py-16 mx-auto border-t border-lu-yellow/30">
				<h2 className="mb-10 text-2xl font-bold text-center outline-title">
					Common Q&amp;As
				</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start">
					{[
						{
							q: "Does my child need prior Ultimate experience to participate?",
							a: "Absolutely not! All are welcome regardless of experience, athletic ability, etc. Coaches will teach everything players need to know.",
						},
						{
							q: "What is the time commitment during the season (practices, games, tournaments)?",
							a: "High School: Two 2 hour practices a week, 1-2 games a week. Middle School: One 1 hour practice a week, occasional scrimmage.",
						},
						{
							q: "When does the season run?",
							a: "High School: Late February - Early May. Middle School: Late August - Early December.",
						},
						{
							q: "Where are practices held, and what happens if locations change?",
							a: "Practices are held at Truman Middle School, and we typically do not ever cancel a practice. If we need to move indoors, we will either play in the gym or discuss film in a classroom. Families will be notified via email and/or SportsYou.",
						},
						{
							q: "What transportation options are available to help get players to/from practices & games?",
							a: "High School: There is a bus that goes directly from the high school to Truman Middle School that many students choose to ride. Additionally, upperclassmen quite often arrange carpools to help teammates get to practice & games. Middle School: Sperreng Families use this GroupMe to arrange carpools to help get kids to and from Truman after school. Truman Students may sign up for the Activity Bus to get home after practices.",
							link: { text: "GroupMe", href: "#" },
						},
						{
							q: "What happens if my child has another sport or activity?",
							a: "All the Lindbergh coaches are very passionate about this sport and getting more kids exposed to it, so we are happy to work with their schedules and find a plan that works for everyone.",
						},
						{
							q: "What equipment or gear does my child need?",
							a: "Water bottle, athletic clothes, and cleats are strongly encouraged. We do have some gently used cleats for players who may need financial assistance.",
						},
						{
							q: "What costs are associated with the program, and what does the registration fee include?",
							a: "High School: Please review our Season Info Packet, located toward the bottom of our High School Page, for current season information. Middle School: Annual $10 Activity Fee should be paid to the office; this fee covers all middle school activities for the calendar year.",
							link: { text: "High School Page", to: "/high-school" },
						},
						{
							q: "How is playing time determined?",
							a: "High School: Coaches typically use practice attendance to determine playing time, especially for the Missouri State Tournament. Middle School: All players get equal playing time.",
						},
						{
							q: "How will families receive updates and important information?",
							a: "High School: SportsYou! Middle School: Email.",
							link: { text: "SportsYou", to: "/sportsyou" },
						},
						{
							q: "How can parents and families get involved or support the program?",
							a: "Spread the word about our program, email your district administrators about the positive impact you believe Ultimate can have on kids, use your professional connections, join the Lindbergh Ultimate Booster Club!",
							link: { text: "Lindbergh Ultimate Booster Club!", to: "/booster-club" },
						},
						{
							q: "What \"Spirit of the Game\" behavior is expected from spectators?",
							a: "On an Ultimate sideline, encouragement and support are emphasized. Cheering is encouraged, but never at the expense of respect for all players, fans, and officials. Friends and family can support their teams in many ways. Some positive and helpful forms of support include: Create and share a team roster with other friends and family. Provide team drinks and snacks to maintain energy necessary for competing and remaining healthy. Bring tents for shade in hot or rainy weather. Cheer for the team and individuals. Encourage spirit and conflict resolution among players by listening quietly when calls are made and allowing them to make the final decision without receiving feedback from the crowd. Take pictures to share with the team after the event. Wear team colors and make posters or banners. Stay positive! Celebrate good plays and defense; refrain from booing or negative comments.",
						},
					].map((faq, i) => (
						<div
							key={i}
							className="overflow-hidden border-2 rounded-lg shadow-lg border-lu-yellow bg-lu-cream text-lu-ink"
						>
							<button
								type="button"
								aria-expanded={openFaq === i}
								className="flex items-center justify-between w-full px-5 py-4 font-bold text-left text-lu-green"
								onClick={() => setOpenFaq(openFaq === i ? null : i)}
							>
								<span className="pr-4">Q: {faq.q}</span>
								<FontAwesomeIcon
									icon={faChevronDown}
									aria-hidden="true"
									className={`shrink-0 transition-transform duration-200 ${
										openFaq === i ? "rotate-180" : ""
									}`}
								/>
							</button>
							{openFaq === i && (
								<div className="px-5 pb-4 leading-relaxed text-lu-ink">
									<p className="mb-1 font-medium text-lu-green">A:</p>
									<p className="whitespace-pre-line">{faq.a}</p>
									{faq.link && (
										<p className="mt-2">
											{faq.link.to ? (
												<Link to={faq.link.to} className="font-bold text-lu-green hover:underline">
													{faq.link.text}
												</Link>
											) : (
												<a href={faq.link.href} className="font-bold text-lu-green hover:underline" target="_blank" rel="noopener noreferrer">
													{faq.link.text}
												</a>
											)}
										</p>
									)}
								</div>
							)}
						</div>
					))}
				</div>
			</section>

			{/* Spectator / USA Ultimate */}
			<section className="max-w-3xl px-6 pt-12 pb-20 mx-auto border-t border-lu-yellow/30">
				<h2 className="mb-6 text-xl font-bold text-center outline-title">
					For Spectators &amp; Families
				</h2>
				<div className="p-6 space-y-4 border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink">
					<p>
						Ultimate is self-officiated—players make their own calls and resolve disputes. As a
						spectator, encouragement and support are emphasized. Cheer positively, respect all
						players and fans, and allow players to make calls without sideline feedback.
					</p>
					<p>
						Come prepared: sun protection, water, snacks, and team colors. For the full USA
						Ultimate Spectator Guide (rules, terms, safety, Spirit of the Game), visit USA
						Ultimate.
					</p>
					<Link
						to="/usa-ultimate"
						className="inline-block px-6 py-2 font-bold transition-colors rounded-full bg-lu-yellow text-lu-green hover:bg-lu-green hover:text-lu-yellow"
					>
						USA Ultimate
					</Link>
				</div>
			</section>
		</div>
	);
};

export default Families;
