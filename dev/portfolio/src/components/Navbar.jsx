import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ultimateLogoTransparent from "../assets/ultimateLogoTransparent.png";

const navLinkClass = ({ isActive }) =>
	isActive
		? "font-bold text-[#f9f9f9]"
		: "font-semibold hover:text-[#f9f9f9]";

const highSchoolPaths = [
	"/high-school",
	"/registration",
	"/calendar",
	"/power-lunch",
	"/coaching-apprenticeship",
];
const familiesPaths = ["/families", "/booster-club", "/sportsyou", "/usa-ultimate"];

const PAGE_LABELS = {
	"/": "Home",
	"/interest-form": "Interest Form",
	"/high-school": "High School",
	"/registration": "Registration",
	"/calendar": "2026 Calendar",
	"/power-lunch": "Power Lunch",
	"/coaching-apprenticeship": "Coaching Apprenticeship",
	"/middle-school": "Middle School",
	"/families": "Families",
	"/booster-club": "Booster Club",
	"/sportsyou": "SportsYou",
	"/usa-ultimate": "USA Ultimate",
	"/play-opportunities": "Play Opportunities",
	"/media": "Media",
	"/fundraiser": "Fundraiser",
};

const isActivePath = (pathname, paths) => paths.some((p) => pathname.startsWith(p));

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [highSchoolOpen, setHighSchoolOpen] = useState(false);
	const [familiesOpen, setFamiliesOpen] = useState(false);
	const location = useLocation();
	const pathname = location.pathname;
	const currentPath = pathname.replace(/\/+$/, "") || "/";
	const pageLabel = PAGE_LABELS[currentPath] || "Lindbergh Ultimate";

	const closeAll = () => {
		setMobileMenuOpen(false);
		setHighSchoolOpen(false);
		setFamiliesOpen(false);
	};

	const highSchoolActive = isActivePath(pathname, highSchoolPaths);
	const familiesActive = isActivePath(pathname, familiesPaths);

	const desktopNav = (
		<ul className="hidden list-none items-center gap-5 py-2 pl-6 text-lu-yellow min-[1100px]:flex">
			<li>
				<NavLink to="/" className={navLinkClass} onClick={closeAll}>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink to="/interest-form" className={navLinkClass} onClick={closeAll}>
					Interest Form
				</NavLink>
			</li>
			{/* High School: link + dropdown */}
			<li className="relative flex items-center group">
				<NavLink
					to="/high-school"
					className={`font-semibold hover:text-lu-cream ${highSchoolActive ? "font-bold text-lu-cream" : ""}`}
					onClick={closeAll}
				>
					High School
				</NavLink>
				<FontAwesomeIcon
					icon={faChevronDown}
					aria-hidden="true"
					className="pointer-events-none ml-1 text-[0.65em] opacity-80"
				/>
				<div className="absolute left-0 z-30 invisible pt-1 transition-all opacity-0 top-full group-hover:visible group-hover:opacity-100">
					<div className="py-2 border rounded-lg shadow-xl min-w-52 border-lu-yellow bg-lu-green">
						<NavLink
							to="/registration"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-lu-yellow hover:text-lu-green ${isActive ? "bg-lu-yellow/20 text-lu-yellow" : "text-lu-cream"}`
							}
							onClick={closeAll}
						>
							Registration
						</NavLink>
						<NavLink
							to="/calendar"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-lu-yellow hover:text-lu-green ${isActive ? "bg-lu-yellow/20 text-lu-yellow" : "text-lu-cream"}`
							}
							onClick={closeAll}
						>
							2026 Calendar
						</NavLink>
						<NavLink
							to="/power-lunch"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-lu-yellow hover:text-lu-green ${isActive ? "bg-lu-yellow/20 text-lu-yellow" : "text-lu-cream"}`
							}
							onClick={closeAll}
						>
							Power Lunch
						</NavLink>
						<NavLink
							to="/coaching-apprenticeship"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-lu-yellow hover:text-lu-green ${isActive ? "bg-lu-yellow/20 text-lu-yellow" : "text-lu-cream"}`
							}
							onClick={closeAll}
						>
							Coaching Apprenticeship
						</NavLink>
					</div>
				</div>
			</li>
			<li>
				<NavLink to="/middle-school" className={navLinkClass} onClick={closeAll}>
					Middle School
				</NavLink>
			</li>
			{/* Families dropdown */}
			<li className="relative flex items-center group">
				<NavLink
					to="/families"
					className={`font-semibold hover:text-lu-cream ${familiesActive ? "font-bold text-lu-cream" : ""}`}
					onClick={closeAll}
				>
					Families
				</NavLink>
				<FontAwesomeIcon
					icon={faChevronDown}
					aria-hidden="true"
					className="pointer-events-none ml-1 text-[0.65em] opacity-80"
				/>
				<div className="absolute left-0 z-30 invisible pt-1 transition-all opacity-0 top-full group-hover:visible group-hover:opacity-100">
					<div className="py-2 border rounded-lg shadow-xl min-w-45 border-lu-yellow bg-lu-green">
						<NavLink
							to="/families"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-lu-yellow hover:text-lu-green ${isActive ? "bg-lu-yellow/20 text-lu-yellow" : "text-lu-cream"}`
							}
							onClick={closeAll}
						>
							Families Overview
						</NavLink>
						<NavLink
							to="/booster-club"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-lu-yellow hover:text-lu-green ${isActive ? "bg-lu-yellow/20 text-lu-yellow" : "text-lu-cream"}`
							}
							onClick={closeAll}
						>
							Booster Club
						</NavLink>
						<NavLink
							to="/sportsyou"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-lu-yellow hover:text-lu-green ${isActive ? "bg-lu-yellow/20 text-lu-yellow" : "text-lu-cream"}`
							}
							onClick={closeAll}
						>
							SportsYou
						</NavLink>
						<NavLink
							to="/usa-ultimate"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-lu-yellow hover:text-lu-green ${isActive ? "bg-lu-yellow/20 text-lu-yellow" : "text-lu-cream"}`
							}
							onClick={closeAll}
						>
							USA Ultimate
						</NavLink>
					</div>
				</div>
			</li>
			<li>
				<NavLink to="/play-opportunities" className={navLinkClass} onClick={closeAll}>
					Play Opportunities
				</NavLink>
			</li>
			<li>
				<NavLink to="/media" className={navLinkClass} onClick={closeAll}>
					Media
				</NavLink>
			</li>
		</ul>
	);

	return (
		<div className="relative z-40 w-full border-b-2 shadow-lg border-lu-yellow bg-lu-dark/95 text-lu-cream backdrop-blur">
			<nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 font-roboto sm:px-6">
				<Link to="/" className="flex items-center min-w-0 gap-3" onClick={closeAll}>
					<span className="flex items-center justify-center w-12 h-10 bg-transparent shrink-0">
						<img
							src={ultimateLogoTransparent}
							alt="Lindbergh Ultimate"
							className="w-auto max-h-full"
						/>
					</span>
					<span className="min-w-0">
						<span className="block truncate text-[9px] uppercase tracking-[0.22em] text-lu-cream/65">
							lindberghultimate.org
						</span>
						<span className="block text-sm font-bold tracking-wide uppercase truncate font-display text-lu-yellow">
							{pageLabel}
						</span>
					</span>
				</Link>

				{desktopNav}

				<button
					type="button"
					className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded p-2 text-lu-cream hover:bg-lu-cream/10 min-[1100px]:hidden"
					aria-expanded={mobileMenuOpen}
					aria-controls="mobile-nav"
					aria-label="Toggle menu"
					onClick={() => setMobileMenuOpen((open) => !open)}
				>
					<span className="block h-0.5 w-6 rounded bg-lu-yellow" />
					<span className="block h-0.5 w-6 rounded bg-lu-yellow" />
					<span className="block h-0.5 w-6 rounded bg-lu-yellow" />
				</button>
			</nav>

			{/* Mobile menu */}
			<div
				id="mobile-nav"
				className={`absolute inset-x-0 top-full z-50 overflow-y-auto border-b-2 border-lu-yellow bg-lu-dark shadow-2xl transition-[max-height,opacity] duration-200 min-[1100px]:hidden ${
					mobileMenuOpen ? "max-h-[calc(100vh-4.5rem)] opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<ul className="flex flex-col p-5 pt-2 text-white list-none">
					<li>
						<NavLink to="/" className={navLinkClass} onClick={closeAll}>
							Home
						</NavLink>
					</li>
					<li className="mt-4">
						<NavLink to="/interest-form" className={navLinkClass} onClick={closeAll}>
							Interest Form
						</NavLink>
					</li>
					<li className="mt-4">
						<button
							type="button"
							aria-expanded={highSchoolOpen}
							aria-controls="mobile-high-school-menu"
							className="flex items-center justify-between w-full font-semibold text-left"
							onClick={() => setHighSchoolOpen((o) => !o)}
						>
							High School
							<FontAwesomeIcon
								icon={faChevronDown}
								aria-hidden="true"
								className={`text-xs transition-transform duration-200 ${
									highSchoolOpen ? "rotate-180" : ""
								}`}
							/>
						</button>
						{highSchoolOpen && (
							<ul
								id="mobile-high-school-menu"
								className="pl-4 mt-2 space-y-2 border-l-2 border-lu-yellow/50"
							>
								<li>
									<NavLink to="/high-school" className="text-sm hover:text-lu-yellow" onClick={closeAll}>
										High School
									</NavLink>
								</li>
								<li>
									<NavLink to="/registration" className="text-sm hover:text-lu-yellow" onClick={closeAll}>
										Registration
									</NavLink>
								</li>
								<li>
									<NavLink to="/calendar" className="text-sm hover:text-lu-yellow" onClick={closeAll}>
										2026 Calendar
									</NavLink>
								</li>
								<li>
									<NavLink to="/power-lunch" className="text-sm hover:text-lu-yellow" onClick={closeAll}>
										Power Lunch
									</NavLink>
								</li>
								<li>
									<NavLink to="/coaching-apprenticeship" className="text-sm hover:text-lu-yellow" onClick={closeAll}>
										Coaching Apprenticeship
									</NavLink>
								</li>
							</ul>
						)}
					</li>
					<li className="mt-4">
						<NavLink to="/middle-school" className={navLinkClass} onClick={closeAll}>
							Middle School
						</NavLink>
					</li>
					<li className="mt-4">
						<button
							type="button"
							aria-expanded={familiesOpen}
							aria-controls="mobile-families-menu"
							className="flex items-center justify-between w-full font-semibold text-left"
							onClick={() => setFamiliesOpen((o) => !o)}
						>
							Families
							<FontAwesomeIcon
								icon={faChevronDown}
								aria-hidden="true"
								className={`text-xs transition-transform duration-200 ${
									familiesOpen ? "rotate-180" : ""
								}`}
							/>
						</button>
						{familiesOpen && (
							<ul
								id="mobile-families-menu"
								className="pl-4 mt-2 space-y-2 border-l-2 border-lu-yellow/50"
							>
								<li>
									<NavLink to="/families" className="text-sm hover:text-lu-yellow" onClick={closeAll}>
										Families Overview
									</NavLink>
								</li>
								<li>
									<NavLink to="/booster-club" className="text-sm hover:text-lu-yellow" onClick={closeAll}>
										Booster Club
									</NavLink>
								</li>
								<li>
									<NavLink to="/sportsyou" className="text-sm hover:text-lu-yellow" onClick={closeAll}>
										SportsYou
									</NavLink>
								</li>
								<li>
									<NavLink to="/usa-ultimate" className="text-sm hover:text-lu-yellow" onClick={closeAll}>
										USA Ultimate
									</NavLink>
								</li>
							</ul>
						)}
					</li>
					<li className="mt-4">
						<NavLink to="/play-opportunities" className={navLinkClass} onClick={closeAll}>
							Play Opportunities
						</NavLink>
					</li>
					<li className="mt-4">
						<NavLink to="/media" className={navLinkClass} onClick={closeAll}>
							Media
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
