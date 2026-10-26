import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiError, fetchDashboard } from "../lib/api";
import { useAdminAuth } from "./AdminAuthContext";
import { displayName, formatCurrency, formatDate } from "./format";

function StatCard({ label, value, hint, to }) {
	const body = (
		<div className="h-full rounded-xl border border-lu-green/15 bg-white p-4 transition hover:border-lu-green/30 hover:shadow-md">
			<p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lu-ink/45">{label}</p>
			<p className="font-display mt-2 text-3xl font-bold text-lu-green">{value}</p>
			{hint && <p className="mt-1 text-xs text-lu-ink/50">{hint}</p>}
		</div>
	);
	return to ? <Link to={to}>{body}</Link> : body;
}

function StatusBreakdown({ counts }) {
	const entries = Object.entries(counts || {});
	if (!entries.length) return <p className="text-xs text-lu-ink/45">No submissions yet.</p>;

	return (
		<div className="flex flex-wrap gap-2">
			{entries.map(([status, count]) => (
				<span
					key={status}
					className="rounded-full bg-lu-green/10 px-2.5 py-1 text-xs font-semibold text-lu-green"
				>
					{status.replace(/_/g, " ")}: {count}
				</span>
			))}
		</div>
	);
}

function RecentList({ title, items, to, labelKey }) {
	return (
		<section className="rounded-xl border border-lu-green/15 bg-white p-4">
			<div className="flex items-center justify-between gap-3 mb-3">
				<h3 className="font-roboto font-bold">{title}</h3>
				<Link to={to} className="text-xs font-semibold text-lu-green underline">
					View all
				</Link>
			</div>
			{!items?.length ? (
				<p className="text-sm text-lu-ink/45">Nothing yet.</p>
			) : (
				<ul className="divide-y divide-black/5">
					{items.map((item) => (
						<li key={item.id || item._id} className="flex items-center justify-between gap-3 py-2">
							<div className="min-w-0">
								<p className="truncate text-sm font-medium">{item[labelKey]}</p>
								<p className="text-xs text-lu-ink/45">{formatDate(item.submittedAt, true)}</p>
							</div>
							<span className="shrink-0 rounded-full bg-lu-green/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-lu-green">
								{item.status?.replace(/_/g, " ")}
							</span>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}

export default function AdminDashboard() {
	const { user } = useAdminAuth();
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let cancelled = false;

		fetchDashboard()
			.then((payload) => {
				if (!cancelled) setStats(payload.data);
			})
			.catch((err) => {
				if (!cancelled) {
					setError(err instanceof ApiError ? err.message : "Could not load the dashboard.");
				}
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, []);

	if (loading) return <p className="text-lu-ink/55">Loading dashboard…</p>;

	if (error) {
		return (
			<div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
				{error}
			</div>
		);
	}

	if (!stats) return null;

	const { registrations, interest, players, email, schedule, inbox, fundraiser } = stats;

	return (
		<div className="flex flex-col gap-6">
			<section>
				<h2 className="font-display text-2xl font-bold text-lu-dark">
					Welcome back
				</h2>
				<p className="mt-1 text-sm text-lu-ink/55">
					{user?.name ? `Signed in as ${user.name}. ` : ""}
					Everything stored for the 2026 season is available below.
				</p>
			</section>

			<section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				<StatCard
					label="Registrations"
					value={registrations.total}
					hint="Spring registration submissions"
					to="/admin/registrations"
				/>
				<StatCard
					label="Interest forms"
					value={interest.total}
					hint="Prospective players"
					to="/admin/interest-submissions"
				/>
				<StatCard
					label="Players"
					value={players.total}
					hint={`${players.active} active`}
					to="/admin/players"
				/>
				<StatCard
					label="Email subscribers"
					value={email.subscribed}
					hint="Subscribed contacts"
					to="/admin/email-subscribers"
				/>
				<StatCard
					label="Upcoming events"
					value={schedule.upcomingPublicEvents}
					hint="Public scheduled events"
					to="/admin/schedules"
				/>
				<StatCard
					label="New messages"
					value={inbox.newMessages}
					hint="Unread contact form messages"
					to="/admin/messages"
				/>
				<StatCard
					label="Donations"
					value={formatCurrency(fundraiser.totalRaised)}
					hint={`${fundraiser.donationCount} completed gifts`}
					to="/admin/donations"
				/>
				<StatCard
					label="Active season"
					value={stats.activeSeason?.name || "—"}
					hint={
						stats.activeSeason
							? `${formatDate(stats.activeSeason.startDate)} – ${formatDate(stats.activeSeason.endDate)}`
							: "No active season"
					}
					to="/admin/seasons"
				/>
			</section>

			<section className="grid gap-4 lg:grid-cols-2">
				<div className="rounded-xl border border-lu-green/15 bg-white p-4">
					<div className="flex items-center justify-between gap-3 mb-3">
						<h3 className="font-roboto font-bold">Registrations by status</h3>
						<Link to="/admin/registrations" className="text-xs font-semibold text-lu-green underline">
							Open
						</Link>
					</div>
					<StatusBreakdown counts={registrations.byStatus} />
				</div>

				<div className="rounded-xl border border-lu-green/15 bg-white p-4">
					<div className="flex items-center justify-between gap-3 mb-3">
						<h3 className="font-roboto font-bold">Interest forms by status</h3>
						<Link
							to="/admin/interest-submissions"
							className="text-xs font-semibold text-lu-green underline"
						>
							Open
						</Link>
					</div>
					<StatusBreakdown counts={interest.byStatus} />
				</div>
			</section>

			{fundraiser.campaign && (
				<section className="rounded-xl border border-lu-yellow/60 bg-lu-yellow/10 p-4">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div>
							<p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lu-ink/45">
								Fundraiser
							</p>
							<h3 className="font-roboto text-lg font-bold">
								{displayName(fundraiser.campaign) || "Campaign"}
							</h3>
							<p className="text-sm text-lu-ink/60">
								{formatCurrency(fundraiser.totalRaised)} raised of{" "}
								{formatCurrency(fundraiser.campaign.goalAmount)} goal
							</p>
						</div>
						<Link
							to="/admin/fundraiser-campaigns"
							className="rounded-full bg-lu-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-lu-dark"
						>
							View campaign
						</Link>
					</div>
				</section>
			)}

			<section className="grid gap-4 lg:grid-cols-2">
				<RecentList
					title="Latest registrations"
					items={stats.recent.registrations}
					labelKey="athleteName"
					to="/admin/registrations"
				/>
				<RecentList
					title="Latest interest forms"
					items={stats.recent.interest}
					labelKey="studentName"
					to="/admin/interest-submissions"
				/>
			</section>

			<section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{[
					{ label: "Roster & parents", to: "/admin/players", text: "Players, parents, coaches, teams" },
					{ label: "Calendar", to: "/admin/schedules", text: "Practices, games and camps" },
					{ label: "Email lists", to: "/admin/email-lists", text: "Audiences and subscribers" },
					{ label: "Website content", to: "/admin/faqs", text: "FAQs, media, testimonials, settings" },
				].map((tile) => (
					<Link
						key={tile.to}
						to={tile.to}
						className="rounded-xl border border-lu-green/15 bg-white p-4 transition-colors hover:border-lu-green/40 hover:shadow-sm"
					>
						<p className="font-roboto font-bold">{tile.label}</p>
						<p className="mt-1 text-xs text-lu-ink/50">{tile.text}</p>
					</Link>
				))}
			</section>
		</div>
	);
}
