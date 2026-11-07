import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
	clearStoredPublicToken,
	fetchPublicMe,
	getStoredPublicToken,
	storePublicToken,
} from "../lib/api";
import { PublicAuthContext } from "./PublicAuthContext";

export default function PublicAuthProvider({ children }) {
	const [token, setToken] = useState(() => getStoredPublicToken());
	const [user, setUser] = useState(null);
	const [checking, setChecking] = useState(Boolean(token));

	useEffect(() => {
		let cancelled = false;

		if (!token) return undefined;

		fetchPublicMe(token)
			.then((payload) => {
				if (!cancelled) setUser(payload.data);
			})
			.catch(() => {
				if (cancelled) return;
				clearStoredPublicToken();
				setUser(null);
				setToken(null);
			})
			.finally(() => {
				if (!cancelled) setChecking(false);
			});

		return () => {
			cancelled = true;
		};
	}, [token]);

	const signInWithToken = useCallback((nextToken, nextUser = null) => {
		storePublicToken(nextToken);
		setToken(nextToken);
		if (nextUser) setUser(nextUser);
		setChecking(false);
	}, []);

	const refreshUser = useCallback(async () => {
		const current = getStoredPublicToken();
		if (!current) return null;
		const payload = await fetchPublicMe(current);
		setUser(payload.data);
		setToken(current);
		return payload.data;
	}, []);

	const signOut = useCallback(() => {
		clearStoredPublicToken();
		setUser(null);
		setToken(null);
		setChecking(false);
	}, []);

	const value = useMemo(
		() => ({ token, user, checking, signInWithToken, refreshUser, signOut }),
		[token, user, checking, signInWithToken, refreshUser, signOut],
	);

	return <PublicAuthContext.Provider value={value}>{children}</PublicAuthContext.Provider>;
}
