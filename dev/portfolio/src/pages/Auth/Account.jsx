import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ultimateLogoTransparent from "../../assets/ultimateLogoTransparent.png";
import { usePublicAuth } from "../../auth/PublicAuthContext";
import OAuthButtons from "../../components/OAuthButtons";

export default function Account() {
	const { user, checking, signOut } = usePublicAuth();
	const location = useLocation();

	if (checking) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-lu-green text-lu-cream">
				<p>Checking your session…</p>
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/login" state={{ from: location.pathname }} replace />;
	}

	const providers = user.providers || [];
	const providerLabel = (provider) =>
		provider === "google" ? "Google" : provider === "apple" ? "Apple" : provider;

	return (
		<div className="mx-auto w-full max-w-3xl px-4 py-10 font-body text-lu-ink sm:px-6">
			<div className="rounded-2xl border border-lu-yellow/50 bg-white p-6 shadow-sm sm:p-8 dark:bg-white">
				<div className="flex items-start gap-4">
					<span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-lu-cream">
						{user.avatar ? (
							<img src={user.avatar} alt="" className="h-full w-full object-cover" />
						) : (
							<img
								src={ultimateLogoTransparent}
								alt=""
								className="h-12 w-12 object-contain opacity-70"
							/>
						)}
					</span>
					<div className="min-w-0">
						<h1 className="font-display text-2xl font-bold uppercase text-lu-dark">
							{user.name || "My account"}
						</h1>
						<p className="mt-1 text-sm text-lu-ink/70">{user.email}</p>
						{user.emailVerified && (
							<p className="mt-1 text-xs font-semibold uppercase tracking-wider text-lu-green">
								Email verified
							</p>
						)}
					</div>
				</div>

				<div className="mt-8">
					<h2 className="font-roboto text-sm font-bold uppercase tracking-widest text-lu-dark">
						Social accounts
					</h2>
					{providers.length ? (
						<ul className="mt-3 space-y-2">
							{providers.map((entry) => (
								<li
									key={`${entry.provider}-${entry.providerId}`}
									className="flex items-center justify-between rounded-lg border border-lu-ink/10 px-4 py-3 text-sm"
								>
									<span className="font-semibold">{providerLabel(entry.provider)}</span>
									<span className="text-lu-ink/60">{entry.email || entry.providerId}</span>
								</li>
							))}
						</ul>
					) : (
						<p className="mt-3 text-sm text-lu-ink/70">No social accounts linked yet.</p>
					)}
					<div className="mt-4 max-w-sm">
						<OAuthButtons audience="public" returnTo="/account" />
					</div>
				</div>

				<div className="mt-8 flex flex-wrap gap-3">
					<Link
						to="/registration"
						className="rounded-full bg-lu-green px-5 py-2.5 text-sm font-bold text-lu-cream hover:bg-lu-dark"
					>
						Register for the season
					</Link>
					<Link
						to="/interest-form"
						className="rounded-full border border-lu-green px-5 py-2.5 text-sm font-bold text-lu-green hover:bg-lu-green hover:text-lu-cream"
					>
						Interest form
					</Link>
					<button
						type="button"
						onClick={signOut}
						className="rounded-full border border-lu-ink/20 px-5 py-2.5 text-sm font-semibold hover:bg-lu-ink/5"
					>
						Sign out
					</button>
				</div>
			</div>

			<p className="mt-6 text-center">
				<Link to="/" className="inline-flex items-center gap-2 text-sm text-lu-green hover:text-lu-dark">
					<FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
					Back to the website
				</Link>
			</p>
		</div>
	);
}
