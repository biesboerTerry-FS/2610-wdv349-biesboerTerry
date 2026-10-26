// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";

const TESTIMONIALS = [
	{
		quote:
			"I have made long lasting friendships, gained so much confidence and leadership experience, and found a sport that I'm going to love for the rest of my life! It is such a cool community of people and an amazing environment to be a part of. Not just Lindbergh Ultimate, but the Saint Louis community in general is so welcoming to anyone who wants to try it out.",
		attribution: "Teresa Dollenmeyer (Player, c.o. '25)",
	},
	{
		quote:
			"Playing ultimate has shaped me into the leader I am today and has build my confidence both on and off the field. It opens you up to an incredibly supportive and kind community for all ages.",
		attribution: "Karen Bose (Player, c.o. '25)",
	},
	{
		quote:
			"Ultimate's unique Spirit of the Game has given our son a place to play hard and have fun! The positive attitudes of players, coaches, and spectators truly makes this sport exceptional.",
		attribution: "Traci Lichtenberg (Parent)",
	},
	{
		quote:
			"As a parent, I couldn't be more impressed with the Lindbergh Flyers Ultimate Frisbee team. The coaching staff is outstanding—so knowledgeable about the sport and so dedicated to the players. I saw how they invested in my daughter not just as an athlete, but as a person—offering support in school, other interests, and personal growth. The team atmosphere is incredibly welcoming—every skill level is embraced, and it's just a joy to watch them grow both on and off the field. I'm so grateful for this amazing team!",
		attribution: "Kristie Deeter (Parent)",
	},
	{
		quote:
			"Ultimate has given me a community and friends as well as really valuable leadership experience that I feel like I have learned a lot from. It's one the most welcoming sports out there, and a place where you can get some energy out in a really fun way!",
		attribution: "Abby Deeter (Player, c.o. 2025)",
	},
	{
		quote:
			"It's a low-risk sport compared to the ones at the high school that's not as popular but it's just as fun that can help you build athleticism whether you're getting into sports or on an off season of another sport.",
		attribution: "Ivanka Huynh (Player, c.o. '25)",
	},
	{
		quote:
			"Ultimate has helped my son build confidence, learn teamwork and is a fun outlet for his competitive spirit!",
		attribution: "Monica Queathem (Parent)",
	},
	{
		quote:
			"Ultimate gave my son a great way to stay active, introduced him to a new sport, and helped him make new friends.",
		attribution: "Carrie Love (Parent)",
	},
	{
		quote:
			"We've enjoyed the ultimate frisbee program at Truman. It's well organized, and the coaches are accepting of all skill levels, so it helps the kids build confidence while having fun.",
		attribution: "Trevor MacDougall (Parent)",
	},
	{
		quote:
			"Ultimate has been a very positive experience for my son's physical and social health.",
		attribution: "Rachel Charney (Parent)",
	},
	{
		quote:
			"The team camaraderie is incredible! As a first time player, my daughter felt a part of the team from day one! Thank you Coach T, I know you have created this wonderful atmosphere! It's so easy to play hard when you're having so much fun!!!",
		attribution: "Karen Penrod (Parent)",
		fullWidth: true,
	},
];

const WORD_CLOUD_WORDS = [
	"Friendly", "Driven", "Spirited", "Vibrant", "Fun", "Effort", "Hardworking",
	"Joy", "Challenging", "Resilient", "Perseverant", "Welcoming", "Inclusive",
	"Exciting", "Passion", "Friendship", "Tight-knit", "Determination", "Awesome",
	"Communication", "Unique", "Discipline", "LINDBERGH ULTIMATE",
];

const Families = () => {
	const [openFaq, setOpenFaq] = useState(null);

	return (
		<div
			className="min-h-screen bg-[#1c6a37] text-[#f9f9f9]"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			{/* Hero */}
			<section className="relative w-full h-70 md:h-90 flex items-center justify-center overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center opacity-80"
					style={{
						backgroundImage: "url(https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1200&q=80)",
					}}
				/>
				<div className="absolute inset-0 bg-black/50" />
				<h1 className="relative z-10 text-white text-4xl md:text-6xl font-bold uppercase tracking-widest drop-shadow-lg">
					Families
				</h1>
			</section>

			{/* Testimonies */}
			<section className="max-w-5xl mx-auto px-6 py-16">
				<h2 className="text-[#fbcc00] text-2xl md:text-3xl font-bold text-center mb-12 uppercase tracking-wide">
					Testimonies from Families &amp; Players
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{TESTIMONIALS.filter((t) => !t.fullWidth).map((t, i) => (
						<div
							key={i}
							className="bg-white/10 border border-[#fbcc00]/50 rounded-xl p-6 text-[#f9f9f9]"
						>
							<p className="italic text-lg leading-relaxed">&quot;{t.quote}&quot;</p>
							<p className="mt-4 font-bold text-[#fbcc00] text-sm">—{t.attribution}</p>
						</div>
					))}
				</div>
				{/* Full-width testimonial */}
				{TESTIMONIALS.filter((t) => t.fullWidth).map((t, i) => (
					<div
						key={`fw-${i}`}
						className="mt-8 max-w-3xl mx-auto bg-white/10 border border-[#fbcc00]/50 rounded-xl p-6 text-center text-[#f9f9f9]"
					>
						<p className="italic text-lg leading-relaxed">&quot;{t.quote}&quot;</p>
						<p className="mt-4 font-bold text-[#fbcc00] text-sm">—{t.attribution}</p>
					</div>
				))}
			</section>

			{/* Describe Lindbergh Ultimate in Three Words */}
			<section className="max-w-4xl mx-auto px-6 py-12 border-t border-[#fbcc00]/30">
				<h2 className="text-[#fbcc00] text-xl md:text-2xl font-bold text-center mb-8">
					Describe Lindbergh Ultimate in Three Words
				</h2>
				<div className="flex flex-wrap justify-center gap-3">
					{WORD_CLOUD_WORDS.map((word, i) => (
						<span
							key={i}
							className={`px-3 py-1 rounded-full font-medium ${
								word === "LINDBERGH ULTIMATE"
									? "bg-[#fbcc00] text-[#1c6a37] text-lg"
									: i % 3 === 0
										? "bg-[#fbcc00]/20 text-[#fbcc00]"
										: "bg-white/10 text-[#f9f9f9]"
							}`}
						>
							{word}
						</span>
					))}
				</div>
			</section>

			{/* Common Q&As */}
			<section className="max-w-3xl mx-auto px-6 py-16 border-t border-[#fbcc00]/30">
				<h2 className="text-[#fbcc00] text-2xl font-bold text-center mb-10">
					Common Q&amp;As
				</h2>
				<div className="space-y-4">
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
							className="bg-white/10 border border-[#fbcc00]/40 rounded-lg overflow-hidden"
						>
							<button
								type="button"
								className="w-full text-left px-5 py-4 font-bold text-[#fbcc00] flex justify-between items-center"
								onClick={() => setOpenFaq(openFaq === i ? null : i)}
							>
								<span className="pr-4">Q: {faq.q}</span>
								<span className="shrink-0">{openFaq === i ? "▲" : "▼"}</span>
							</button>
							{openFaq === i && (
								<div className="px-5 pb-4 text-[#f9f9f9] leading-relaxed">
									<p className="font-medium text-[#f9f9f9]/90 mb-1">A:</p>
									<p className="whitespace-pre-line">{faq.a}</p>
									{faq.link && (
										<p className="mt-2">
											{faq.link.to ? (
												<Link to={faq.link.to} className="text-[#fbcc00] font-bold hover:underline">
													{faq.link.text}
												</Link>
											) : (
												<a href={faq.link.href} className="text-[#fbcc00] font-bold hover:underline" target="_blank" rel="noopener noreferrer">
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
			<section className="max-w-3xl mx-auto px-6 pb-20 border-t border-[#fbcc00]/30 pt-12">
				<h2 className="text-[#fbcc00] text-xl font-bold text-center mb-6">
					For Spectators &amp; Families
				</h2>
				<div className="bg-white/10 border border-[#fbcc00]/50 rounded-xl p-6 space-y-4 text-[#f9f9f9]">
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
						className="inline-block bg-[#fbcc00] text-[#1c6a37] font-bold py-2 px-6 rounded-full hover:bg-white transition-colors"
					>
						USA Ultimate
					</Link>
				</div>
			</section>
		</div>
	);
};

export default Families;
