import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:5173";
const OUT = resolve("showcase/screens");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function settle(page) {
	await page
		.waitForFunction(() => document.fonts?.status === "loaded", { timeout: 15000 })
		.catch(() => {});
	await sleep(500);
}

async function shot(page, name, options = {}) {
	await page.screenshot({ path: `${OUT}/${name}`, ...options });
	console.log(`captured ${name}`);
}

async function scrollShot(page, name, y) {
	await page.evaluate((top) => window.scrollTo(0, top), y);
	await sleep(350);
	await shot(page, name);
	await page.evaluate(() => window.scrollTo(0, 0));
}

async function clickText(page, text) {
	const clicked = await page.evaluate((label) => {
		const button = [...document.querySelectorAll("button")].find(
			(element) => element.textContent.trim() === label,
		);
		if (!button) return false;
		button.click();
		return true;
	}, text);
	if (!clicked) throw new Error(`Button not found: ${text}`);
	await sleep(350);
}

async function main() {
	await mkdir(OUT, { recursive: true });

	const browser = await puppeteer.launch({
		executablePath: CHROME,
		headless: "new",
		args: ["--hide-scrollbars", "--force-color-profile=srgb", "--font-render-hinting=none"],
	});

	// ---------------------------------------------------------------- desktop
	const page = await browser.newPage();
	await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1.5 });
	await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);

	await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
	await settle(page);
	await shot(page, "01-home.png");
	await scrollShot(page, "01b-home-sections.png", 880);

	await page.goto(`${BASE}/high-school`, { waitUntil: "networkidle0" });
	await settle(page);
	await shot(page, "02-high-school.png");
	await scrollShot(page, "02b-high-school-coaches.png", 640);

	await page.goto(`${BASE}/booster-club`, { waitUntil: "networkidle0" });
	await settle(page);
	await shot(page, "03-booster-club.png");
	await scrollShot(page, "03b-booster-members.png", 760);

	await page.goto(`${BASE}/media`, { waitUntil: "networkidle0" });
	await settle(page);
	await shot(page, "04-media.png");
	await scrollShot(page, "04b-media-galleries.png", 340);

	await page.goto(`${BASE}/calendar`, { waitUntil: "networkidle0" });
	await settle(page);
	await shot(page, "05-calendar.png");

	// ------------------------------------------------------------ interest form
	await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1.5 });
	await page.goto(`${BASE}/interest-form`, { waitUntil: "networkidle0" });
	await settle(page);

	await page.click('input[placeholder="First and Last Name"]');
	await page.type('input[placeholder="First and Last Name"]', "Sofia Reyes", { delay: 12 });
	await page.click('input[name="grade"][value="9th"]');
	await page.click('input[name="division"][value="Girls"]');
	await page.click('input[name="school"][value="Lindbergh High School"]');

	const phoneInputs = await page.$$('input[placeholder="###—###—###"]');
	await phoneInputs[0].type("(314) 555-0288", { delay: 8 });
	await phoneInputs[1].type("(314) 555-0289", { delay: 8 });
	await page.type('input[placeholder="student@example.com"]', "sofia.reyes@lindberghschools.ws", {
		delay: 6,
	});
	await page.type('input[placeholder="parent@example.com"]', "reyes.family@example.com", {
		delay: 6,
	});
	await page.click('input[name="interestLevel"][value="Definitely playing"]');
	await sleep(300);

	const form = await page.$("form");
	if (form) await form.screenshot({ path: `${OUT}/08-interest-form.png` });
	console.log("captured 08-interest-form.png");

	await shot(page, "08b-interest-form-viewport.png");
	await clickText(page, "Submit");
	await page.waitForFunction(() => document.body.innerText.includes("we've got it"), { timeout: 8000 });
	await sleep(400);
	await page.evaluate(() => window.scrollTo(0, 0));
	await shot(page, "09-interest-success.png");

	// ----------------------------------------------------------------- admin
	await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1.5 });
	await page.goto(`${BASE}/admin/login`, { waitUntil: "networkidle0" });
	await settle(page);
	await shot(page, "10-admin-login.png");

	await page.type("#admin-email", "admin@lindberghultimate.com", { delay: 8 });
	await page.type("#admin-password", "ChangeMe123!", { delay: 8 });
	await clickText(page, "Sign in");
	await page.waitForFunction(() => document.body.innerText.includes("Welcome back"), {
		timeout: 8000,
	});
	await settle(page);
	await shot(page, "11-admin-dashboard.png");
	await shot(page, "11b-admin-dashboard-full.png", { fullPage: true });

	// Form submission visible in the admin table + detail drawer.
	await page.goto(`${BASE}/admin/interest-submissions`, { waitUntil: "networkidle0" });
	await settle(page);
	await page.type('input[aria-label="Search Interest Forms"]', "Sofia", { delay: 30 });
	await sleep(800);
	await shot(page, "12-admin-interest-search.png");
	await page.evaluate(() => {
		const row = [...document.querySelectorAll("tbody tr")].find((element) =>
			element.textContent.includes("Sofia Reyes"),
		);
		row?.click();
	});
	await page.waitForFunction(() => document.body.innerText.includes("Raw JSON"), { timeout: 6000 });
	await sleep(400);
	await shot(page, "13-admin-interest-detail.png");
	await page.keyboard.press("Escape");
	await sleep(300);

	// Players table, search, detail, edit.
	await page.goto(`${BASE}/admin/players`, { waitUntil: "networkidle0" });
	await settle(page);
	await shot(page, "14-admin-players.png");

	await page.type('input[aria-label="Search Players"]', "Larson", { delay: 40 });
	await sleep(900);
	await shot(page, "15-admin-search.png");
	await page.evaluate(() => {
		const row = [...document.querySelectorAll("tbody tr")].find((element) =>
			element.textContent.includes("Eli Larson"),
		);
		row?.click();
	});
	await page.waitForFunction(() => document.body.innerText.includes("Raw JSON"), { timeout: 6000 });
	await sleep(400);
	await shot(page, "16-admin-detail.png");
	await clickText(page, "Edit");
	await page.waitForFunction(
		() => document.body.innerText.toLowerCase().includes("edit player"),
		{ timeout: 6000 },
	);
	await sleep(400);
	await shot(page, "17-admin-edit.png");
	await page.keyboard.press("Escape");
	await sleep(300);
	await page.keyboard.press("Escape");
	await sleep(400);

	// Clear search, create a record, save, then delete it.
	await page.evaluate(() => {
		const input = document.querySelector('input[aria-label="Search Players"]');
		const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
		setter.call(input, "");
		input.dispatchEvent(new Event("input", { bubbles: true }));
	});
	await sleep(900);
	await clickText(page, "New player");
	await page.waitForFunction(
		() => document.body.innerText.toLowerCase().includes("add player"),
		{ timeout: 6000 },
	);
	await page.type("#field-firstName", "Sofia", { delay: 15 });
	await page.type("#field-lastName", "Reyes", { delay: 15 });
	await page.select("#field-grade", "9th");
	await page.select("#field-school", "Lindbergh High School");
	await page.select("#field-division", "Girls");
	await page.type("#field-schoolEmail", "sofia.reyes@lindberghschools.ws", { delay: 5 });
	await page.type("#field-phone", "(314) 555-0288", { delay: 5 });
	await page.select("#field-status", "prospect");
	await sleep(300);
	await shot(page, "18-admin-create.png");
	await clickText(page, "Create player");
	await page.waitForFunction(() => document.body.innerText.includes("Player saved."), {
		timeout: 8000,
	});
	await sleep(400);
	await shot(page, "19-admin-created.png");

	await page.type('input[aria-label="Search Players"]', "Reyes", { delay: 35 });
	await sleep(900);
	await page.evaluate(() => {
		const row = [...document.querySelectorAll("tbody tr")].find((element) =>
			element.textContent.includes("Sofia Reyes"),
		);
		row?.click();
	});
	await page.waitForFunction(() => document.body.innerText.includes("Raw JSON"), { timeout: 6000 });
	await page.once("dialog", async (dialog) => {
		await dialog.accept();
	});
	await clickText(page, "Delete");
	await page.waitForFunction(() => document.body.innerText.includes("Player deleted."), {
		timeout: 8000,
	});
	await page.evaluate(() => {
		const input = document.querySelector('input[aria-label="Search Players"]');
		const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
		setter.call(input, "");
		input.dispatchEvent(new Event("input", { bubbles: true }));
	});
	await sleep(650);
	await shot(page, "20-admin-deleted.png");

	// ----------------------------------------------------------------- mobile
	const mobile = await browser.newPage();
	await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
	await mobile.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
	await mobile.goto(`${BASE}/`, { waitUntil: "networkidle0" });
	await settle(mobile);
	await shot(mobile, "06-mobile-home.png");
	await mobile.click('button[aria-label="Toggle menu"]');
	await sleep(450);
	await shot(mobile, "07-mobile-nav.png");
	await mobile.click('button[aria-label="Toggle menu"]');
	await sleep(300);
	await mobile.goto(`${BASE}/high-school`, { waitUntil: "networkidle0" });
	await settle(mobile);
	await shot(mobile, "06b-mobile-high-school.png");

	await browser.close();
	console.log("all captures complete");
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
