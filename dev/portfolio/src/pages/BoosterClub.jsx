import React from "react";
import circle from "../assets/circle.png";
import blankAvatar from "../assets/blankAvatar.svg";
import coachT from "../assets/coachT.jpg";
import dave from "../assets/dave.png";
import evie from "../assets/evie.jpg";
import gabby from "../assets/gabby.jpg";
import glenn from "../assets/glenn.jpg";
import goods from "../assets/goods.jpg";
import jeff from "../assets/jeff.jpg";
import joe from "../assets/joe.jpg";
import traci from "../assets/traci.jpg";

const MEMBERS = [
	{ role: "President", name: "Joe Corcoran", email: "serioustob@gmail.com", image: joe, open: false },
	{ role: "Secretary", name: "Traci Lichtenberg", email: "tlich1126@gmail.com", image: traci, open: false },
	{
		role: "Co-Treasurer",
		name: "Chris Dollenmeyer",
		email: "Christopherlee711@yahoo.com",
		image: jeff,
		open: false,
	},
	{
		role: "Co-Treasurer",
		name: "Dave Valentine-Elam",
		email: "dvalentineelam@gmail.com",
		image: dave,
		open: false,
	},
	{ role: "Vice-President", name: "Jeff Glotfelty", email: "jglotfelty@gmail.com", image: glenn, open: false },
	{ role: "Alumni Rep", name: "Evie Reed", email: "18evelynreed@gmail.com", image: evie, open: false },
	{ role: "Middle School Rep", open: true },
	{
		role: "Gxrls Team Coach",
		name: 'Kristina "T" Gu',
		email: "kristinagu@lindberghschools.ws",
		image: coachT,
		open: false,
	},
	{
		role: "Boys Team Coach",
		name: "Gabby Lavezzi",
		email: "gabriellalavezzi@lindberghschools.ws",
		image: gabby,
		open: false,
	},
	{
		role: "Boys Team Coach",
		name: "Loren Goodrich",
		email: "goodric3@gmail.com",
		image: goods,
		open: false,
	},
	{ role: "Gxrls Team Historian", open: true },
	{ role: "Boys Team Historian", open: true },
];

const BoosterClub = () => {
	return (
		<div
			className="min-h-screen bg-lu-green text-lu-cream"
		>
			{/* Hero */}
			<section className="relative flex items-center justify-center w-full h-64 overflow-hidden bg-lu-deep sm:h-80 md:h-100">
				<div
					className="absolute inset-0 bg-center bg-cover opacity-60"
					style={{
						backgroundImage: `url(${circle})`,
					}}
				/>
				<div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/30" />
				<h1 className="relative z-10 px-4 text-4xl font-bold tracking-widest text-center uppercase hero-title drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
					Booster Club
				</h1>
			</section>

			{/* About */}
			<section className="max-w-3xl px-4 py-10 mx-auto sm:px-6 sm:py-12">
				<div className="p-6 space-y-6 border-2 shadow-xl rounded-xl border-lu-yellow bg-lu-cream text-lu-ink sm:p-8">
					<p className="text-base leading-relaxed text-lu-ink sm:text-lg">
						The Lindbergh Ultimate Booster Club supports our players, coaches, and the overall growth of
						Ultimate at Lindbergh. Made up of engaged parents, guardians, and community members, the
						Booster Club helps fund key program needs such as tournaments, jerseys, equipment, field
						costs, and player support, helping ensure a positive experience for every athlete.
					</p>
					<p className="text-base leading-relaxed text-lu-ink sm:text-lg">
						The Booster Club meets regularly and works closely with coaches throughout the season to
						support team operations, coordinate fundraising efforts, and strengthen the long-term
						sustainability of the program. As a registered 501(c)(3) nonprofit, the Booster Club can
						also accept tax-deductible donations to help expand opportunities and reduce financial
						barriers for players.
					</p>
					<p className="text-base leading-relaxed text-lu-ink sm:text-lg">
						All families are encouraged to get involved — whether by attending meetings, volunteering
						during the season, or helping with fundraising efforts. The Booster Club plays an important
						role in building a supportive, inclusive, and community-driven Lindbergh Ultimate program.
					</p>
				</div>
			</section>

			{/* Email CTA */}
			<section className="max-w-3xl px-4 pb-10 mx-auto text-center sm:px-6 sm:pb-12">
				<p className="mb-2 text-xl font-bold tracking-wide uppercase font-roboto text-lu-yellow sm:text-2xl">
					Questions? Want to Get Involved? Email Us!
				</p>
				<a
					href="mailto:lindberghultimate@gmail.com"
					className="inline-block px-4 py-2 text-sm font-bold break-all transition-all rounded-full bg-lu-yellow text-lu-green hover:bg-white sm:px-6 sm:text-lg"
				>
					lindberghultimate@gmail.com
				</a>
			</section>

			{/* Member directory grid */}
			<section className="max-w-6xl px-4 pb-16 mx-auto sm:px-6 sm:pb-20">
				<h2 className="mb-8 text-xl font-bold tracking-wide text-center uppercase outline-title sm:text-2xl">
					Booster Club &amp; Coaches
				</h2>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{MEMBERS.map((member) => (
						<div
							key={`${member.role}-${member.name || "open"}`}
							className={`flex flex-col rounded-xl border-2 p-2 text-lu-ink ${
								member.open
									? "border-dashed border-lu-yellow/70 bg-lu-cream/85"
									: "border-lu-yellow bg-lu-cream shadow-xl"
							}`}
						>
							<div className="overflow-hidden rounded-lg booster-photo-shadow bg-lu-deep">
								<img
									src={member.open ? blankAvatar : member.image}
									alt={
										member.open
											? `Blank avatar for ${member.role} open position`
											: `${member.name}, ${member.role}`
									}
									className="object-cover w-full aspect-square"
									loading="lazy"
								/>
							</div>
							<div className="flex flex-col flex-1 p-3">
								<p className="text-sm font-bold tracking-wide uppercase font-roboto text-lu-green">
									{member.role}
								</p>
								{member.open ? (
									<p className="mt-1 text-sm font-medium text-lu-ink/60">Open position</p>
								) : (
									<>
										<p className="mt-1 font-medium font-roboto text-lu-ink">{member.name}</p>
										<a
											href={`mailto:${member.email}`}
											className="mt-1 text-sm break-all transition-colors text-lu-green hover:text-lu-deep hover:underline"
										>
											{member.email}
										</a>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default BoosterClub;
