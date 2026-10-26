import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

export default function RequireAuth({ children }) {
	const { user, checking } = useAdminAuth();
	const location = useLocation();

	if (checking) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-lu-green text-lu-cream">
				<p>Loading…</p>
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
	}

	return children;
}
