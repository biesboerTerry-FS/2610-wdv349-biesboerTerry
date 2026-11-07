import { createContext, useContext } from "react";

export const PublicAuthContext = createContext(null);

export function usePublicAuth() {
	const context = useContext(PublicAuthContext);
	if (!context) {
		throw new Error("usePublicAuth must be used inside <PublicAuthProvider>");
	}
	return context;
}
