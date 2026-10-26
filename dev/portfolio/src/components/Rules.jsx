import React from "react";
import rules from "../assets/ultimateRules.png";
import circle from "../assets/circle.jpg";

const Rules = () => {
	// Common style for section wrappers to ensure they are centered but text is left-aligned
	const sectionWrapper =
		"w-full max-w-4xl px-4 sm:px-6 mb-12 sm:mb-16 flex flex-col items-start";
	const rulesWrapper =
		"w-full max-w-5xl px-4 sm:px-6 mb-12 sm:mb-16 flex flex-col items-start";

	return (
		<div
			className="flex flex-col items-center px-2 py-12 bg-lu-green text-lu-cream sm:py-16"
		>
			{/* 1. Top Section: 10 Simple Rules */}
			<div className={rulesWrapper}>
				<h3 className="self-center mb-6 text-2xl font-bold tracking-wide text-center uppercase outline-title font-display sm:mb-8 sm:text-4xl">
					Ultimate in 10 Simple Rules
				</h3>
				<ul className="w-full columns-1 gap-x-10 text-base leading-relaxed sm:text-lg md:columns-2 [&>li]:mb-4 [&>li]:break-inside-avoid">
					<li>
						<span className="font-bold font-roboto text-lu-yellow">
							1. THE FIELD:
						</span>{" "}
						A rectangular shape with end zones at each end. A
						regulation field is 70 yards long by 40 yards wide, with
						end zones 20 yards deep.
					</li>
					<li>
						<span className="font-bold font-roboto text-lu-yellow">
							2. STARTING PLAY:
						</span>{" "}
						Each point begins with both teams lining up on the front
						of opposite end zone lines. The defense throws (“pulls”)
						the disc to the offense. A regulation game has seven
						players per team.
					</li>
					<li>
						<span className="font-bold font-roboto text-lu-yellow">
							3. SCORING:
						</span>{" "}
						Each time the offense catches a pass in the defense’s
						end zone, the offense scores a point. The teams switch
						direction after every goal, and the next point begins
						with a new pull by the team that just scored.
					</li>
					<li>
						<span className="font-bold font-roboto text-lu-yellow">
							4. MOVEMENT OF THE DISC:
						</span>{" "}
						The disc may be advanced in any direction by completing
						a pass to a teammate. Players may not run with the disc.
						The person with the disc (“thrower”) has ten seconds to
						throw the disc. The defender guarding the thrower
						(“marker”) counts out the stall count.
					</li>
					<li>
						<span className="font-bold font-roboto text-lu-yellow">
							5. CHANGE OF POSSESSION:
						</span>{" "}
						When a pass is not completed (e.g., out of bounds, drop,
						block, interception, stalled), the defense immediately
						takes possession of the disc and becomes the offense.
					</li>
					<li>
						<span className="font-bold font-roboto text-lu-yellow">
							6. SUBSTITUTIONS:
						</span>{" "}
						Players not in the game may replace players in the game
						after a score and during an injury timeout.
					</li>
					<li>
						<span className="font-bold font-roboto text-lu-yellow">
							7. NON-CONTACT:
						</span>{" "}
						Players must attempt to avoid physical contact during
						play. Picks and screens are also prohibited.
					</li>
					<li>
						<span className="font-bold font-roboto text-lu-yellow">
							8. FOULS:
						</span>{" "}
						When a player initiates contact that affects the play, a
						foul occurs. When a foul causes a player to lose
						possession, the play resumes as if the possession was
						retained. If the player that the foul was called against
						disagrees with the foul call, the play is redone.
					</li>
					<li>
						<span className="font-bold font-roboto text-lu-yellow">
							9. SELF-OFFICIATING:
						</span>{" "}
						Players are responsible for their own foul and line
						calls. Players resolve their own disputes.
					</li>
					<li>
						<span className="font-bold font-roboto text-lu-yellow">
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
			<div className="w-full max-w-5xl px-4 mb-16">
				<img
					src={rules}
					alt="Rules Diagram"
					className="w-full border-2 rounded-lg shadow-2xl border-lu-yellow sm:border-4"
				/>
			</div>

			{/* 3. Middle Section: Spirit of the Game Heading and Quote */}
			<div className={sectionWrapper}>
				<h1 className="self-center mb-6 text-2xl font-bold text-center outline-title sm:text-4xl">
					Spirit of the Game
				</h1>
				<p className="py-2 pl-4 mb-8 text-base italic border-l-4 border-lu-yellow sm:pl-6 sm:text-xl">
					"Ultimate relies upon a spirit of sportsmanship that places
					the responsibility for fair play on the player. Highly
					competitive play is encouraged, but never at the expense of
					mutual respect among competitors, adherence to the agreed
					upon rules, or the basic joy of play."
				</p>
			</div>

			{/* 4. Full-width Spirit Circle image */}
			<div className="w-full px-4 mb-12 sm:mb-16">
				<img
					src={circle}
					alt="Spirit Circle"
					className="w-full h-auto drop-shadow-[0_0_15px_#fbcc00]"
				/>
			</div>

			{/* 5. Spirit of the Game points: two columns of two */}
			<div className="flex flex-col items-start w-full px-4">
				<div className="grid w-full gap-8 md:grid-cols-2">
					<div>
						<h3 className="mb-2 text-xl font-bold text-lu-yellow sm:text-2xl">
							A Sport with No Referees
						</h3>
						<p className="text-base leading-relaxed opacity-90 sm:text-lg">
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
						<h3 className="mb-2 text-xl font-bold text-lu-yellow sm:text-2xl">
							Players make their own calls.
						</h3>
						<p className="text-base leading-relaxed opacity-90 sm:text-lg">
							As a self-officiated sport, ultimate depends on
							personal responsibility. It places the obligation
							and expectation to play fairly on the players in
							order to maintain the integrity of the game.
						</p>
					</div>

					<div>
						<h3 className="mb-2 text-xl font-bold text-lu-yellow sm:text-2xl">
							Spirit is part of the rules.
						</h3>
						<p className="text-base leading-relaxed opacity-90 sm:text-lg">
							Spirit and its principles are written directly into
							the official rules of ultimate, establishing a
							fundamental requirement to know the rules and not
							intentionally violate them while playing hard and
							having fun.
						</p>
					</div>

					<div>
						<h3 className="mb-2 text-xl font-bold text-lu-yellow sm:text-2xl">
							Focus on fair play.
						</h3>
						<p className="text-base leading-relaxed opacity-90 sm:text-lg">
							Spirit of the Game emphasizes a different take on
							sports. Instead of promoting a win-at-all-costs
							mentality, Spirit expects players not to take
							advantage of, or knowingly break the rules.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Rules;
