import React from "react";

const MEMBERS = [
	{ role: "President", name: "Joe Corcoran", email: "serioustob@gmail.com", open: false },
	{ role: "Secretary", name: "Traci Lichtenberg", email: "tlich1126@gmail.com", open: false },
	{ role: "Co-Treasurer", name: "Chris Dollenmeyer", email: "Christopherlee711@yahoo.com", open: false },
	{ role: "Co-Treasurer", name: "Dave Valentine-Elam", email: "dvalentineelam@gmail.com", open: false },
	{ role: "Vice-President", name: "Terry Biesboer", email: "tbiesboer@gmail.com", open: false },
	{ role: "Alumni Rep", name: "Evie Reed", email: "18evelynreed@gmail.com", open: false },
	{ role: "Middle School Rep", open: true },
	{ role: "Gxrls Team Coach", name: "Kristina \"T\" Gu", email: "kristinagu@lindberghschools.ws", open: false },
	{ role: "Boys Team Coach", name: "Gabby Lavezzi", email: "gabriellalavezzi@lindberghschools.ms", open: false },
	{ role: "Boys Team Coach", name: "Loren Goodrich", email: "goodric3@gmail.com", open: false },
	{ role: "Gxrls Team Historian", open: true },
	{ role: "Boys Team Historian", open: true },
];

const BoosterClub = () => {
	return (
		<div
			className="min-h-screen bg-[#1c6a37] text-[#f9f9f9]"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			{/* Hero */}
			<section className="relative w-full h-[320px] md:h-[400px] bg-[#0d4a28] flex items-center justify-center overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center opacity-60"
					style={{
						backgroundImage: "url(https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80)",
					}}
				/>
				<div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/30" />
				<h1 className="relative z-10 text-white text-4xl md:text-5xl font-bold uppercase tracking-widest drop-shadow-lg">
					Booster Club
				</h1>
			</section>

			{/* About */}
			<section className="max-w-3xl mx-auto px-6 py-12 space-y-6">
				<p className="text-[#f9f9f9] text-lg leading-relaxed">
					The Lindbergh Ultimate Booster Club supports our players, coaches, and the overall growth of
					Ultimate at Lindbergh. Made up of engaged parents, guardians, and community members, the
					Booster Club helps fund key program needs such as tournaments, jerseys, equipment, field
					costs, and player support, helping ensure a positive experience for every athlete.
				</p>
				<p className="text-[#f9f9f9] text-lg leading-relaxed">
					The Booster Club meets regularly and works closely with coaches throughout the season to
					support team operations, coordinate fundraising efforts, and strengthen the long-term
					sustainability of the program. As a registered 501(c)(3) nonprofit, the Booster Club can
					also accept tax-deductible donations to help expand opportunities and reduce financial
					barriers for players.
				</p>
				<p className="text-[#f9f9f9] text-lg leading-relaxed">
					All families are encouraged to get involved — whether by attending meetings, volunteering
					during the season, or helping with fundraising efforts. The Booster Club plays an important
					role in building a supportive, inclusive, and community-driven Lindbergh Ultimate program.
				</p>
			</section>

			{/* Email CTA */}
			<section className="max-w-3xl mx-auto px-6 pb-12 text-center">
				<p className="text-[#fbcc00] text-2xl font-bold uppercase tracking-wide mb-2">
					Questions? Want to Get Involved? Email Us!
				</p>
				<a
					href="mailto:lindberghultimate@gmail.com"
					className="text-[#1c6a37] bg-[#fbcc00] hover:bg-white font-bold text-lg px-6 py-2 rounded-full inline-block transition-all"
				>
					lindberghultimate@gmail.com
				</a>
			</section>

			{/* Member directory grid */}
			<section className="max-w-6xl mx-auto px-6 pb-20">
				<h2 className="text-[#fbcc00] text-2xl font-bold uppercase tracking-wide mb-8 text-center">
					Booster Club &amp; Coaches
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{MEMBERS.map((member, i) => (
						<div
							key={i}
							className={`rounded-xl overflow-hidden border-2 ${
								member.open
									? "border-red-500/80 bg-red-900/30"
									: "border-[#fbcc00] bg-white/10"
							}`}
						>
							{member.open ? (
								<>
									<div className="aspect-square bg-red-600/50 flex items-center justify-center">
										<span className="text-white font-bold text-center text-sm px-4 uppercase tracking-wider">
											OPEN POSITION!
										</span>
									</div>
									<div className="p-4 text-center">
										<p className="text-[#fbcc00] font-bold">{member.role}</p>
									</div>
								</>
							) : (
								<>
									<div
										className="aspect-square bg-[#0d4a28] bg-cover bg-center"
										style={{
											backgroundImage: `url(https://i.pravatar.cc/400?u=${encodeURIComponent(member.email || member.name)}&size=400)`,
										}}
									/>
									<div className="p-4">
										<p className="text-[#fbcc00] font-bold text-sm uppercase tracking-wide">
											{member.role}
										</p>
										<p className="text-[#f9f9f9] font-medium mt-1">{member.name}</p>
										<a
											href={`mailto:${member.email}`}
											className="text-[#fbcc00]/90 text-sm hover:text-white transition-colors break-all"
										>
											{member.email}
										</a>
									</div>
								</>
							)}
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default BoosterClub;
