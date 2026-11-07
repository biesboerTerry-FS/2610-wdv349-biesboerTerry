import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ultimateLogoTransparent from "../../assets/ultimateLogoTransparent.png";
import OAuthButtons from "../../components/OAuthButtons";
import { usePublicAuth } from "../../auth/PublicAuthContext";
import { ApiError } from "../../lib/api";

export default function Login() {
	const { user, checking, refreshUser } = usePublicAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [errorMessage, setErrorMessage] = useState("");

	const returnTo = location.state?.from || "/account";

	useEffect(() => {
		if (!checking && user) {
			navigate(returnTo, { replace: true });
		}
	}, [checking, user, navigate, returnTo]);

	const queryError = useMemo(
		() => new URLSearchParams(location.search).get("error"),
		[location.search],
	);
	const displayError = errorMessage || queryError || "";

	useEffect(() => {
		if (user) return;
		refreshUser().catch((error) => {
			if (error && error.status !== 401) {
				setErrorMessage(error instanceof ApiError ? error.message : "Unable to load your session.");
			}
		});
	}, [user, refreshUser]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-lu-green px-6 py-16 font-body text-lu-cream">
			<div className="w-full max-w-md">
				<div className="mb-8 text-center">
					<span className="mx-auto mb-4 flex w-48 items-center justify-center rounded-2xl bg-lu-green p-3 shadow-lg">
						<img src={ultimateLogoTransparent} alt="Lindbergh Ultimate" className="w-full" />
					</span>
					<p className="mb-2 font-roboto text-sm uppercase tracking-[0.3em] text-lu-yellow">
						Lindbergh Ultimate
					</p>
					<h1 className="font-display text-3xl font-bold uppercase">Sign in</h1>
					<p className="mt-3 text-sm text-lu-cream/70">
						Sign in with Google or Apple to view your account. New visitors get an account
						automatically — no password to remember.
					</p>
				</div>

				<div className="flex flex-col gap-5 rounded-2xl border border-lu-yellow/50 bg-white/10 p-6">
					{displayError && (
						<div
							role="alert"
							className="rounded-lg border border-lu-yellow bg-lu-yellow/10 px-4 py-3 text-sm"
						>
							{displayError}
						</div>
					)}
					<OAuthButtons audience="public" returnTo={returnTo} variant="light" />

					<div className="flex items-center gap-3 text-xs uppercase tracking-widest text-lu-cream/60">
						<span className="h-px flex-1 bg-lu-cream/20" aria-hidden="true" />
						<span>or</span>
						<span className="h-px flex-1 bg-lu-cream/20" aria-hidden="true" />
					</div>

					<p className="text-center text-sm text-lu-cream/70">
						Prefer email?{" "}
						<Link to="/interest-form" className="font-semibold text-lu-yellow hover:text-white">
							Submit the Interest Form
						</Link>{" "}
						or{" "}
						<Link to="/registration" className="font-semibold text-lu-yellow hover:text-white">
							Register
						</Link>
						.
					</p>
				</div>

				<p className="mt-6 text-center">
					<Link to="/" className="inline-flex items-center gap-2 text-sm text-lu-yellow hover:text-white">
						<FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
						Back to the website
					</Link>
				</p>
			</div>
		</div>
	);
}
