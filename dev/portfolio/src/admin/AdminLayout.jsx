import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faBars,
	faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import ultimateLogoTransparent from "../assets/ultimateLogoTransparent.png";
import { useAdminAuth } from "./AdminAuthContext";
import { NAV_GROUPS, RESOURCES } from "./resources";

function pageTitle(pathname) {
	const slug = pathname.replace(/^\/admin\/?/, "").split("/")[0];
	if (!slug) return "Dashboard";
	return RESOURCES[slug]?.label || "Not found";
}

export default function AdminLayout() {
	const { user, signOut } = useAdminAuth();
	const location = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);

	const groups = NAV_GROUPS.map((group) => ({
		...group,
		resources: group.resources.filter(
			(slug) => RESOURCES[slug] && (!RESOURCES[slug].adminOnly || user?.role === "admin")
		),
	})).filter((group) => group.resources.length);

	const activeGroupLabel = NAV_GROUPS.find((group) =>
		group.resources.some((slug) => location.pathname.startsWith(`/admin/${slug}`))
	)?.label;

	const [openGroups, setOpenGroups] = useState(
		() => new Set(activeGroupLabel ? [activeGroupLabel] : [])
	);

	const toggleGroup = (label) => {
		setOpenGroups((current) => {
			const next = new Set(current);
			if (next.has(label)) next.delete(label);
			else next.add(label);
			return next;
		});
	};

	const linkClass = ({ isActive }) =>
		`block rounded-lg px-3 py-2 font-roboto text-sm transition-colors ${
			isActive
				? "bg-lu-yellow text-lu-dark font-bold shadow-sm"
				: "text-lu-cream/85 hover:bg-white/10 hover:text-white"
		}`;

	return (
		<div className="min-h-screen bg-lu-cream font-body text-lu-ink lg:flex">
			{menuOpen && (
				<button
					type="button"
					aria-label="Close menu"
					onClick={() => setMenuOpen(false)}
					className="fixed inset-0 z-30 bg-black/50 lg:hidden"
				/>
			)}

			<aside
				id="admin-sidebar"
				className={`fixed inset-y-0 left-0 z-40 w-72 overflow-y-auto border-r border-lu-yellow/20 bg-lu-dark text-lu-cream transition-transform duration-200 lg:static lg:translate-x-0 ${
					menuOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="border-b border-white/10 px-5 py-6">
					<div className="flex items-center gap-3">
						<span className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-lu-cream p-1.5">
							<img
								src={ultimateLogoTransparent}
								alt="Lindbergh Ultimate"
								className="max-h-full w-auto"
							/>
						</span>
						<div className="min-w-0">
							<p className="text-[10px] uppercase tracking-[0.3em] text-lu-yellow">
								Lindbergh
							</p>
							<h1 className="font-display truncate text-xl uppercase leading-tight">
								Admin Panel
							</h1>
						</div>
					</div>
					<p className="mt-3 text-xs text-lu-cream/60">
						Every record in the program database.
					</p>
				</div>

				<nav className="px-3 py-4">
					<NavLink to="/admin" end className={linkClass} onClick={() => setMenuOpen(false)}>
						Dashboard
					</NavLink>

					{groups.map((group) => {
						const isOpen = openGroups.has(group.label);
						const isActive = group.label === activeGroupLabel;
						const panelId = `admin-nav-${group.label
							.toLowerCase()
							.replace(/[^a-z0-9]+/g, "-")}`;

						return (
							<div key={group.label} className="mt-2">
								<button
									type="button"
									aria-expanded={isOpen}
									aria-controls={panelId}
									onClick={() => toggleGroup(group.label)}
									className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-white/10 ${
										isActive
											? "text-lu-yellow"
											: "text-lu-yellow/60 hover:text-lu-yellow"
									}`}
								>
									<span>{group.label}</span>
									<FontAwesomeIcon
										icon={faChevronDown}
										aria-hidden="true"
										className={`text-[10px] transition-transform duration-200 ${
											isOpen ? "rotate-180" : ""
										}`}
									/>
								</button>

								{isOpen && (
									<div id={panelId} className="mt-1 space-y-1">
										{group.resources.map((slug) => (
											<NavLink
												key={slug}
												to={`/admin/${slug}`}
												className={linkClass}
												onClick={() => setMenuOpen(false)}
											>
												{RESOURCES[slug].label}
											</NavLink>
										))}
									</div>
								)}
							</div>
						);
					})}
				</nav>

				<div className="border-t border-white/10 px-5 py-6">
					<Link
						to="/"
						onClick={() => setMenuOpen(false)}
						className="inline-flex items-center gap-2 text-xs text-lu-yellow hover:text-white"
					>
						<FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
						Back to the website
					</Link>
				</div>
			</aside>

			<div className="flex min-w-0 flex-1 flex-col">
				<header className="sticky top-0 z-20 flex items-center gap-3 border-b border-lu-yellow/30 bg-lu-green px-4 py-3 text-lu-cream sm:px-6">
					<button
						type="button"
						onClick={() => setMenuOpen(true)}
						className="rounded-lg border border-lu-yellow/50 px-3 py-2 text-sm font-semibold text-lu-yellow hover:bg-white/10 lg:hidden"
						aria-label="Open menu"
						aria-expanded={menuOpen}
						aria-controls="admin-sidebar"
					>
						<FontAwesomeIcon icon={faBars} aria-hidden="true" />
					</button>

					<div className="min-w-0 flex-1">
						<p className="text-[10px] font-roboto uppercase tracking-[0.25em] text-lu-yellow">
							Admin Panel
						</p>
						<h2 className="font-display truncate text-lg font-bold">
							{pageTitle(location.pathname)}
						</h2>
					</div>

					<div className="hidden text-right sm:block">
						<p className="font-roboto text-sm font-semibold leading-tight">
							{user?.name || user?.email || "Administrator"}
						</p>
						<p className="text-[10px] uppercase tracking-wider text-lu-cream/60">
							{user?.role === "admin" ? "Administrator" : "Admin panel"}
						</p>
					</div>

					<button
						type="button"
						onClick={signOut}
						className="rounded-full border border-lu-yellow px-4 py-2 text-sm font-semibold text-lu-yellow transition-colors hover:bg-lu-yellow hover:text-lu-dark"
					>
						Sign out
					</button>
				</header>

				<main className="flex-1 p-4 sm:p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
