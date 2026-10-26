import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ultimateLogoTransparent from "../assets/ultimateLogoTransparent.png";
import { ApiError } from "../lib/api";
import { useAdminAuth } from "./AdminAuthContext";

export default function AdminLogin() {
	const { signIn, user, checking } = useAdminAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const redirectTo = location.state?.from || "/admin";

	useEffect(() => {
		if (user) navigate(redirectTo, { replace: true });
	}, [user, navigate, redirectTo]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("submitting");
		setErrorMessage("");

		try {
			await signIn(email.trim(), password);
		} catch (error) {
			setErrorMessage(
				error instanceof ApiError ? error.message : "Unable to sign in. Please try again."
			);
			setStatus("error");
		}
	};

	if (checking) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-lu-green text-lu-cream">
				<p>Checking your session…</p>
			</div>
		);
	}

	const inputClass =
		"w-full rounded-lg border border-lu-yellow/50 bg-lu-cream px-4 py-3 font-body text-sm text-lu-dark placeholder-lu-dark/45 focus:border-lu-yellow focus:bg-white focus:outline-none";

	return (
		<div
			className="flex min-h-screen items-center justify-center bg-lu-green px-6 py-16 font-body text-lu-cream"
		>
			<div className="w-full max-w-md">
				<div className="mb-8 text-center">
					<span className="mx-auto mb-4 flex w-48 items-center justify-center rounded-2xl bg-lu-green p-3 shadow-lg">
						<img
							src={ultimateLogoTransparent}
							alt="Lindbergh Ultimate"
							className="w-full"
						/>
					</span>
					<p className="mb-2 font-roboto text-sm uppercase tracking-[0.3em] text-lu-yellow">
						Lindbergh Ultimate
					</p>
					<h1 className="font-display text-3xl font-bold uppercase">Admin Panel</h1>
					<p className="mt-3 text-sm text-lu-cream/70">
						Administrator access only. Sign in with the program admin account.
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-5 rounded-2xl border border-lu-yellow/50 bg-white/10 p-6"
				>
					<div>
						<label htmlFor="admin-email" className="mb-1 block font-body font-medium">
							Email
						</label>
						<input
							id="admin-email"
							type="email"
							autoComplete="username"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={inputClass}
							placeholder="admin@example.com"
						/>
					</div>

					<div>
						<label htmlFor="admin-password" className="mb-1 block font-body font-medium">
							Password
						</label>
						<input
							id="admin-password"
							type="password"
							autoComplete="current-password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={inputClass}
							placeholder="••••••••"
						/>
					</div>

					{status === "error" && errorMessage && (
						<div
							role="alert"
							className="rounded-lg border border-lu-yellow bg-lu-yellow/10 px-4 py-3 text-sm"
						>
							{errorMessage}
						</div>
					)}

					<button
						type="submit"
						disabled={status === "submitting"}
						className="rounded-full bg-lu-yellow px-6 py-3 font-bold text-lu-green transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
					>
						{status === "submitting" ? "Signing in…" : "Sign in"}
					</button>

					<p className="text-center text-xs text-lu-cream/60">
						Admin credentials come from the server&apos;s SEED_ADMIN_EMAIL and
						SEED_ADMIN_PASSWORD settings.
					</p>
				</form>

				<p className="mt-6 text-center">
					<a
						href="/"
						className="inline-flex items-center gap-2 text-sm text-lu-yellow hover:text-white"
					>
						<FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
						Back to the website
					</a>
				</p>
			</div>
		</div>
	);
}
