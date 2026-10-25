import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminAuthProvider from "./AdminAuthProvider";
import AdminDashboard from "./AdminDashboard";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin";
import AdminResourcePage from "./AdminResourcePage";
import RequireAuth from "./RequireAuth";

export default function AdminRoutes() {
	return (
		<AdminAuthProvider>
			<Routes>
				<Route path="login" element={<AdminLogin />} />
				<Route
					element={
						<RequireAuth>
							<AdminLayout />
						</RequireAuth>
					}
				>
					<Route index element={<AdminDashboard />} />
					<Route path=":resource" element={<AdminResourcePage />} />
					<Route path="*" element={<Navigate to="/admin" replace />} />
				</Route>
			</Routes>
		</AdminAuthProvider>
	);
}
