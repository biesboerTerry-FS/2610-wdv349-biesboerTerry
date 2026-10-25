import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ultimateLogoTransparent from "../assets/ultimateLogoTransparent.png";

const navLinkClass = ({ isActive }) =>
	isActive
		? "font-bold text-[#f9f9f9]"
		: "font-semibold cursor-pointer hover:text-[#f9f9f9]";

const highSchoolPaths = ["/high-school", "/registration", "/calendar", "/power-lunch"];
const familiesPaths = ["/families", "/booster-club", "/sportsyou", "/usa-ultimate"];

const isActivePath = (pathname, paths) => paths.some((p) => pathname.startsWith(p));

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [highSchoolOpen, setHighSchoolOpen] = useState(false);
	const [familiesOpen, setFamiliesOpen] = useState(false);
	const location = useLocation();
	const pathname = location.pathname;

	const closeAll = () => {
		setMobileMenuOpen(false);
		setHighSchoolOpen(false);
		setFamiliesOpen(false);
	};

	const highSchoolActive = isActivePath(pathname, highSchoolPaths);
	const familiesActive = isActivePath(pathname, familiesPaths);

	const desktopNav = (
		<ul className="hidden min-[880px]:flex items-center gap-6 list-none py-4 px-6 text-[#fbcc00]">
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
			<li className="relative group flex items-center">
				<NavLink
					to="/high-school"
					className={`font-semibold hover:text-[#f9f9f9] ${highSchoolActive ? "font-bold text-[#f9f9f9]" : ""}`}
					onClick={closeAll}
				>
					High School
				</NavLink>
				<span className="inline-block ml-0.5 text-[0.6em] opacity-80 pointer-events-none">▼</span>
				<div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
					<div className="bg-[#1c6a37] border border-[#fbcc00] rounded-lg shadow-xl py-2 min-w-[180px]">
						<NavLink
							to="/registration"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-[#fbcc00] hover:text-[#1c6a37] ${isActive ? "bg-[#fbcc00]/20 text-[#fbcc00]" : "text-[#f9f9f9]"}`
							}
							onClick={closeAll}
						>
							Registration
						</NavLink>
						<NavLink
							to="/calendar"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-[#fbcc00] hover:text-[#1c6a37] ${isActive ? "bg-[#fbcc00]/20 text-[#fbcc00]" : "text-[#f9f9f9]"}`
							}
							onClick={closeAll}
						>
							2026 Calendar
						</NavLink>
						<NavLink
							to="/power-lunch"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-[#fbcc00] hover:text-[#1c6a37] ${isActive ? "bg-[#fbcc00]/20 text-[#fbcc00]" : "text-[#f9f9f9]"}`
							}
							onClick={closeAll}
						>
							Power Lunch
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
			<li className="relative group">
				<span
					className={`cursor-pointer font-semibold hover:text-[#f9f9f9] ${familiesActive ? "font-bold text-[#f9f9f9]" : ""}`}
				>
					Families
				</span>
				<span className="inline-block ml-0.5 text-[0.6em] opacity-80">▼</span>
				<div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
					<div className="bg-[#1c6a37] border border-[#fbcc00] rounded-lg shadow-xl py-2 min-w-[180px]">
						<NavLink
							to="/families"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-[#fbcc00] hover:text-[#1c6a37] ${isActive ? "bg-[#fbcc00]/20 text-[#fbcc00]" : "text-[#f9f9f9]"}`
							}
							onClick={closeAll}
						>
							Families Overview
						</NavLink>
						<NavLink
							to="/booster-club"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-[#fbcc00] hover:text-[#1c6a37] ${isActive ? "bg-[#fbcc00]/20 text-[#fbcc00]" : "text-[#f9f9f9]"}`
							}
							onClick={closeAll}
						>
							Booster Club
						</NavLink>
						<NavLink
							to="/sportsyou"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-[#fbcc00] hover:text-[#1c6a37] ${isActive ? "bg-[#fbcc00]/20 text-[#fbcc00]" : "text-[#f9f9f9]"}`
							}
							onClick={closeAll}
						>
							SportsYou
						</NavLink>
						<NavLink
							to="/usa-ultimate"
							className={({ isActive }) =>
								`block px-4 py-2 text-sm hover:bg-[#fbcc00] hover:text-[#1c6a37] ${isActive ? "bg-[#fbcc00]/20 text-[#fbcc00]" : "text-[#f9f9f9]"}`
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
		<div className="absolute top-0 left-0 w-full z-20">
			<nav className="flex justify-between items-center pt-0 mt-0 px-5 pb-4 text-[#FBCC00] w-full">
				<span className="flex gap-3">
					<img
						src={ultimateLogoTransparent}
						alt="Ultimate Logo"
						className="h-16"
					/>
					<h1 className="text-2xl font-bold pt-4">Lindbergh Ultimate</h1>
				</span>
				{desktopNav}
				{/* Hamburger: visible below 880px */}
				<button
					type="button"
					className="min-[880px]:hidden flex flex-col justify-center gap-1.5 w-10 h-10 p-2 rounded text-[#f9f9f9] hover:bg-[#f9f9f9]/10"
					aria-expanded={mobileMenuOpen}
					aria-label="Toggle menu"
					onClick={() => setMobileMenuOpen((open) => !open)}
				>
					<span className="block w-6 h-0.5 bg-[#fbcc00] rounded" />
					<span className="block w-6 h-0.5 bg-[#fbcc00] rounded" />
					<span className="block w-6 h-0.5 bg-[#fbcc00] rounded" />
				</button>
			</nav>
			{/* Mobile menu */}
			<div
				className={`min-[880px]:hidden overflow-hidden transition-[height,opacity] duration-200 ${
					mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<ul className="flex flex-col list-none p-5 pt-2 text-white bg-[#1c6a37]/95 rounded-b-lg">
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
							className="font-semibold text-left w-full flex items-center justify-between"
							onClick={() => setHighSchoolOpen((o) => !o)}
						>
							High School
							<span className="text-sm">{highSchoolOpen ? "▲" : "▼"}</span>
						</button>
						{highSchoolOpen && (
							<ul className="pl-4 mt-2 space-y-2 border-l-2 border-[#fbcc00]/50">
								<li>
									<NavLink to="/high-school" className="text-sm hover:text-[#fbcc00]" onClick={closeAll}>
										High School
									</NavLink>
								</li>
								<li>
									<NavLink to="/registration" className="text-sm hover:text-[#fbcc00]" onClick={closeAll}>
										Registration
									</NavLink>
								</li>
								<li>
									<NavLink to="/calendar" className="text-sm hover:text-[#fbcc00]" onClick={closeAll}>
										2026 Calendar
									</NavLink>
								</li>
								<li>
									<NavLink to="/power-lunch" className="text-sm hover:text-[#fbcc00]" onClick={closeAll}>
										Power Lunch
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
							className="font-semibold text-left w-full flex items-center justify-between"
							onClick={() => setFamiliesOpen((o) => !o)}
						>
							Families
							<span className="text-sm">{familiesOpen ? "▲" : "▼"}</span>
						</button>
						{familiesOpen && (
							<ul className="pl-4 mt-2 space-y-2 border-l-2 border-[#fbcc00]/50">
								<li>
									<NavLink to="/families" className="text-sm hover:text-[#fbcc00]" onClick={closeAll}>
										Families Overview
									</NavLink>
								</li>
								<li>
									<NavLink to="/booster-club" className="text-sm hover:text-[#fbcc00]" onClick={closeAll}>
										Booster Club
									</NavLink>
								</li>
								<li>
									<NavLink to="/sportsyou" className="text-sm hover:text-[#fbcc00]" onClick={closeAll}>
										SportsYou
									</NavLink>
								</li>
								<li>
									<NavLink to="/usa-ultimate" className="text-sm hover:text-[#fbcc00]" onClick={closeAll}>
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
