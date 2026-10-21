// eslint-disable-next-line no-unused-vars
import React from "react";
import rules from "../assets/rules.png";
import circle from "../assets/circle.png";

const Rules = () => {
	const sectionWrapper =
		"w-full max-w-4xl px-6 mb-16 flex flex-col items-start";

	return (
		<div
			className="flex flex-col items-center bg-[#1c6a37] text-[#f9f9f9] py-16"
			style={{ fontFamily: "'Graduate', serif" }}
		>
			{/* 1. Top Section: 10 Simple Rules */}
			<div className={sectionWrapper}>
				<h3 className="text-4xl font-bold text-[#fbcc00] mb-8 uppercase tracking-wide self-center">
					Ultimate in 10 Simple Rules
				</h3>
				<ul className="space-y-4 text-lg leading-relaxed">
					<li>
						<span className="text-[#fbcc00] font-bold">
							1. THE FIELD:
						</span>{" "}
						A rectangular shape with end zones at each end. A
						regulation field is 70 yards long by 40 yards wide, with
						end zones 20 yards deep.
					</li>
					<li>
						<span className="text-[#fbcc00] font-bold">
							2. STARTING PLAY:
						</span>{" "}
						Each point begins with both teams lining up on the front
						of opposite end zone lines. The defense throws (“pulls”)
						the disc to the offense. A regulation game has seven
						players per team.
					</li>
					<li>
						<span className="text-[#fbcc00] font-bold">
							3. SCORING:
						</span>{" "}
						Each time the offense catches a pass in the defense’s
						end zone, the offense scores a point. The teams switch
						direction after every goal, and the next point begins
						with a new pull by the team that just scored.
					</li>
					<li>
						<span className="text-[#fbcc00] font-bold">
							4. MOVEMENT OF THE DISC:
						</span>{" "}
						The disc may be advanced in any direction by completing
						a pass to a teammate. Players may not run with the disc.
						The person with the disc (“thrower”) has ten seconds to
						throw the disc. The defender guarding the thrower
						(“marker”) counts out the stall count.
					</li>
					<li>
						<span className="text-[#fbcc00] font-bold">
							5. CHANGE OF POSSESSION:
						</span>{" "}
						When a pass is not completed (e.g., out of bounds, drop,
						block, interception, stalled), the defense immediately
						takes possession of the disc and becomes the offense.
					</li>
					<li>
						<span className="text-[#fbcc00] font-bold">
							6. SUBSTITUTIONS:
						</span>{" "}
						Players not in the game may replace players in the game
						after a score and during an injury timeout.
					</li>
					<li>
						<span className="text-[#fbcc00] font-bold">
							7. NON-CONTACT:
						</span>{" "}
						Players must attempt to avoid physical contact during
						play. Picks and screens are also prohibited.
					</li>
					<li>
						<span className="text-[#fbcc00] font-bold">
							8. FOULS:
						</span>{" "}
						When a player initiates contact that affects the play, a
						foul occurs. When a foul causes a player to lose
						possession, the play resumes as if the possession was
						retained. If the player that the foul was called against
						disagrees with the foul call, the play is redone.
					</li>
					<li>
						<span className="text-[#fbcc00] font-bold">
							9. SELF-OFFICIATING:
						</span>{" "}
						Players are responsible for their own foul and line
						calls. Players resolve their own disputes.
					</li>
					<li>
						<span className="text-[#fbcc00] font-bold">
							10. SPIRIT OF THE GAME:
						</span>{" "}
						The foundation of the rules in ultimate is Spirit of the
						Game, which places the responsibility for fair play on
						the player. Competitive play is encouraged, but never at
						the expense of respect between players, adherence to the
						rules, and the basic joy of play.
					</li>
				</ul>
			</div>

			{/* 2. Image: Rules Diagram */}
			<div className="w-full max-w-5xl mb-16 px-4">
				<img
					src={rules}
					alt="Rules Diagram"
					className="w-full rounded-lg shadow-2xl border-4 border-[#fbcc00]"
				/>
			</div>

			{/* 3. Middle Section: Spirit of the Game Text */}
			<div className={sectionWrapper}>
				<h1 className="text-4xl font-bold text-[#fbcc00] mb-6 self-center">
					Spirit of the Game
				</h1>
				<p className="italic text-xl mb-8 border-l-4 border-[#fbcc00] pl-6 py-2">
					"Ultimate relies upon a spirit of sportsmanship that places
					the responsibility for fair play on the player. Highly
					competitive play is encouraged, but never at the expense of
					mutual respect among competitors, adherence to the agreed
					upon rules, or the basic joy of play."
				</p>

				<div className="space-y-8">
					<div>
						<h3 className="text-2xl font-bold text-[#fbcc00] mb-2">
							A Sport with No Referees
							<br />
						</h3>
						<p className="text-lg opacity-90">
							A truly unique and defining element of ultimate,
							Spirit of the Game places the responsibility of fair
							play solely on the athletes themselves by requiring
							each player to know the rules and make their own
							calls, without the help of a neutral official. These
							underlying principles reinforce mutual respect and
							trust between opponents; communication and conflict
							resolution skills; and self confidence – both on and
							off the field of play.
						</p>
					</div>

					<div>
						<h3 className="text-2xl font-bold text-[#fbcc00] mb-2">
							Players make their own calls.
							<br />
						</h3>
						<p className="text-lg opacity-90">
							As a self-officiated sport, ultimate depends on
							personal responsibility. It places the obligation
							and expectation to play fairly on the players in
							order to maintain the integrity of the game.
						</p>
					</div>

					<div>
						<h3 className="text-2xl font-bold text-[#fbcc00] mb-2">
							Spirit is part of the rules.
						</h3>
						<br />

						<p className="text-lg opacity-90">
							Spirit and its principles are written directly into
							the official rules of ultimate, establishing a
							fundamental requirement to know the rules and not
							intentionally violate them while playing hard and
							having fun.
						</p>
					</div>

					<div>
						<h3 className="text-2xl font-bold text-[#fbcc00] mb-2">
							Focus on fair play.
						</h3>
						<br />
						<p className="text-lg opacity-90">
							Spirit of the Game emphasizes a different take on
							sports. Instead of promoting a win-at-all-costs
							mentality, Spirit expects players not to take
							advantage of, or knowingly break the rules.
						</p>
					</div>
				</div>
			</div>

			{/* 4. Bottom Image: Circle Spirit Diagram */}
			<div className="w-full max-w-3xl flex justify-center">
				<img
					src={circle}
					alt="Spirit Circle"
					className="w-[80%] h-auto drop-shadow-[0_0_15px_#fbcc00]"
				/>
			</div>
		</div>
	);
};

export default Rules;
