import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:5173";
const OUT = resolve("showcase/screens");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function settle(page) {
	await page
		.waitForFunction(() => document.fonts?.status === "loaded", { timeout: 15000 })
		.catch(() => {});
	await sleep(500);
}

async function sectionShot(page, label, file, exact = false) {
	const handle = await page.evaluateHandle(
		({ text, mustMatchExactly }) => {
			const headings = [...document.querySelectorAll("h1,h2")];
			const heading = headings.find((element) => {
				const content = element.textContent.trim().toLowerCase();
				return mustMatchExactly ? content === text : content.includes(text);
			});
			if (!heading) return null;
			return heading.closest("section") || heading.parentElement;
		},
		{ text: label.toLowerCase(), mustMatchExactly: exact },
	);
	const element = handle.asElement();
	if (!element) throw new Error(`Section not found: ${label}`);
	await element.screenshot({ path: `${OUT}/${file}` });
	console.log(`captured ${file}`);
	await element.dispose();
}

async function main() {
	await mkdir(OUT, { recursive: true });
	const browser = await puppeteer.launch({
		executablePath: CHROME,
		headless: "new",
		args: ["--hide-scrollbars", "--force-color-profile=srgb", "--font-render-hinting=none"],
	});
	const page = await browser.newPage();
	await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1.5 });
	await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);

	await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
	await settle(page);
	await sectionShot(page, "Welcome to Lindbergh Ultimate!", "01c-home-welcome.png");
	await sectionShot(page, "What is Ultimate?", "01d-home-what-is.png");
	await sectionShot(page, "Program History & Highlights", "01e-home-highlights.png");

	await page.goto(`${BASE}/high-school`, { waitUntil: "networkidle0" });
	await settle(page);
	await sectionShot(page, "Meet the Coaches", "02c-high-school-coaches.png");

	await page.goto(`${BASE}/booster-club`, { waitUntil: "networkidle0" });
	await settle(page);
	await sectionShot(page, "Booster Club & Coaches", "03c-booster-directory.png");

	await page.goto(`${BASE}/media`, { waitUntil: "networkidle0" });
	await settle(page);
	await sectionShot(page, "Photo Galleries", "04c-media-galleries.png");

	await browser.close();
	console.log("section captures complete");
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
