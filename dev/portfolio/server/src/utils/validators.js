export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^\+?[0-9().\-\s]{7,20}$/;

export function normalizeEmail(value) {
	return typeof value === "string" ? value.trim().toLowerCase() : value;
}

export function normalizePhone(value) {
	return typeof value === "string" ? value.trim() : value;
}

export function isEmail(value) {
	return typeof value === "string" && EMAIL_REGEX.test(value.trim());
}

export function isPhone(value) {
	return typeof value === "string" && PHONE_REGEX.test(value.trim());
}
