/**
 * Small fetch wrapper for the Lindbergh Ultimate API (see server/README.md).
 *
 * Set VITE_API_URL to change the base URL, e.g.
 *   VITE_API_URL=https://api.lindberghultimate.com/api
 */
const API_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:5050/api").replace(
	/\/+$/,
	""
);

const REQUEST_TIMEOUT_MS = 15000;
const TOKEN_KEY = "lu-admin-token";

export class ApiError extends Error {
	constructor(message, { status = 0, details = [] } = {}) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.details = details;
	}

	/** Server validation details keyed by field name, e.g. { studentEmail: "..." } */
	get fieldErrors() {
		return (this.details || []).reduce((acc, detail) => {
			if (detail?.field) acc[detail.field] = detail.message;
			return acc;
		}, {});
	}
}

export function getApiUrl() {
	return API_URL;
}

export function getStoredToken() {
	try {
		return window.localStorage.getItem(TOKEN_KEY);
	} catch {
		return null;
	}
}

export function storeToken(token) {
	try {
		window.localStorage.setItem(TOKEN_KEY, token);
	} catch {
		// Private browsing / storage disabled: the session still works in memory.
	}
}

export function clearStoredToken() {
	try {
		window.localStorage.removeItem(TOKEN_KEY);
	} catch {
		// Ignore storage errors.
	}
}

function withQuery(path, query) {
	if (!query) return path;
	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(query)) {
		if (value === undefined || value === null || value === "") continue;
		params.set(key, String(value));
	}
	const qs = params.toString();
	return qs ? `${path}?${qs}` : path;
}

async function request(path, { method = "GET", body, headers, token, query } = {}) {
	let response;

	try {
		response = await fetch(`${API_URL}${withQuery(path, query)}`, {
			method,
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: `Bearer ${token}` } : {}),
				...(headers || {}),
			},
			body: body === undefined ? undefined : JSON.stringify(body),
			signal: AbortSignal.timeout?.(REQUEST_TIMEOUT_MS),
		});
	} catch (error) {
		if (error?.name === "TimeoutError") {
			throw new ApiError("The request timed out. Please try again.");
		}
		throw new ApiError(
			"We couldn't reach the server. Please check your connection and try again."
		);
	}

	const text = await response.text();
	let payload = null;
	try {
		payload = text ? JSON.parse(text) : null;
	} catch {
		// Non-JSON response (proxy error page, empty body, etc.)
	}

	if (!response.ok) {
		throw new ApiError(payload?.message || `Request failed (${response.status})`, {
			status: response.status,
			details: payload?.details,
		});
	}

	return payload;
}

export function getJson(path, options) {
	return request(path, options);
}

export function postJson(path, body, options) {
	return request(path, { ...options, method: "POST", body });
}

export function patchJson(path, body, options) {
	return request(path, { ...options, method: "PATCH", body });
}

export function deleteJson(path, options) {
	return request(path, { ...options, method: "DELETE" });
}

// Public form endpoints used by the website.
export const submitInterestForm = (form) => postJson("/interest-submissions", form);

export const submitRegistration = (form) => postJson("/registrations", form);

// Staff/auth endpoints used by the coach admin section.
export async function login(email, password) {
	const payload = await postJson("/auth/login", { email, password });
	return payload.data;
}

export function fetchMe(token = getStoredToken()) {
	return getJson("/auth/me", { token });
}

export function fetchDashboard(token = getStoredToken()) {
	return getJson("/admin/dashboard", { token });
}

export function fetchAdminMeta() {
	return getJson("/admin/meta", { token: getStoredToken() });
}

export function listResource(resource, { page, limit, q, sort, ...filters } = {}) {
	return getJson(`/admin/${resource}`, {
		token: getStoredToken(),
		query: { page, limit, q, sort, ...filters },
	});
}

export function fetchResource(resource, id) {
	return getJson(`/admin/${resource}/${id}`, { token: getStoredToken() });
}

export function createResource(resource, body) {
	return postJson(`/admin/${resource}`, body, { token: getStoredToken() });
}

export function updateResource(resource, id, body) {
	return patchJson(`/admin/${resource}/${id}`, body, { token: getStoredToken() });
}

export function deleteResource(resource, id) {
	return deleteJson(`/admin/${resource}/${id}`, { token: getStoredToken() });
}

export function runResourceAction(resource, id, action) {
	return postJson(`/admin/${resource}/${id}/${action}`, {}, { token: getStoredToken() });
}
