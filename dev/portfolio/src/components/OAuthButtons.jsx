import React, { useEffect, useState } from "react";
import { fetchOAuthProviders, getOAuthStartUrl } from "../lib/api";

function GoogleIcon({ className = "" }) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
			<path
				fill="#4285F4"
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
			/>
			<path
				fill="#34A853"
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
			/>
			<path
				fill="#FBBC05"
				d="M5.84 14.1a7.2 7.2 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 11.88l3.66-2.84z"
			/>
			<path
				fill="#EA4335"
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 5.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
			/>
		</svg>
	);
}

function AppleIcon({ className = "" }) {
	// Font Awesome `apple` brand path (https://fontawesome.com/4.7.0/icon/apple).
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
			<path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.024-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.03 1.52-.065 2.09-.987 3.935-.987 1.83 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 2.4-1.711 3.5-2.194 1.156-.48 2.1-1.204 2.27-2.178-1.368-.224-2.777.8-3.68 1.765-1.01 1.054-2.304 2.604-1.98 4.11 1.505.117 2.27-.605 3.89-1.5z" />
		</svg>
	);
}

/**
 * Google + Apple sign-in buttons. Hidden providers are not rendered; when
 * the server reports no providers, a short notice is shown instead.
 */
export default function OAuthButtons({
	audience = "public",
	returnTo,
	variant = "dark",
	disabled = false,
}) {
	const [providers, setProviders] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		let cancelled = false;
		fetchOAuthProviders()
			.then((payload) => {
				if (!cancelled) setProviders(payload?.data?.providers || []);
			})
			.catch(() => {
				if (!cancelled) setProviders([]);
			});
		return () => {
			cancelled = true;
		};
	}, []);

	const start = (provider) => {
		setError("");
		window.location.href = getOAuthStartUrl(provider, { audience, returnTo });
	};

	const base =
		"flex w-full items-center justify-center gap-3 rounded-full px-5 py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60";
	const styles =
		variant === "light"
			? `${base} bg-white text-lu-dark hover:bg-lu-yellow`
			: `${base} bg-white text-lu-dark border border-black/10 hover:bg-lu-yellow`;

	if (providers === null) {
		return (
			<div className="flex flex-col gap-3" aria-busy="true">
				<div className="h-12 animate-pulse rounded-full bg-black/10" />
				<div className="h-12 animate-pulse rounded-full bg-black/10" />
			</div>
		);
	}

	if (!providers.length) {
		return (
			<p className="rounded-lg border border-dashed border-current px-4 py-3 text-center text-sm opacity-70">
				Social sign-in isn&apos;t configured yet. You can still continue below.
			</p>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{providers.map((provider) => {
				const id = typeof provider === "string" ? provider : provider.id;
				if (id === "google") {
					return (
						<button
							key="google"
							type="button"
							disabled={disabled}
							onClick={() => start("google")}
							className={styles}
						>
							<GoogleIcon className="h-5 w-5 shrink-0" />
							Continue with Google
						</button>
					);
				}
				if (id === "apple") {
					return (
						<button
							key="apple"
							type="button"
							disabled={disabled}
							onClick={() => start("apple")}
							className="flex w-full items-center justify-center gap-3 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60"
						>
							<AppleIcon className="h-5 w-5 shrink-0" />
							Continue with Apple
						</button>
					);
				}
				return null;
			})}
			<p className="text-center text-xs opacity-60">
				{audience === "admin"
					? "Staff only — Google/Apple accounts must be authorized by an administrator."
					: "No password needed. An account is created automatically on first sign-in."}
			</p>
			{error && (
				<p role="alert" className="text-center text-sm">
					{error}
				</p>
			)}
		</div>
	);
}
