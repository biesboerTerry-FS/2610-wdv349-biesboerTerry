import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
	executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
	headless: "new",
	args: ["--hide-scrollbars", "--force-color-profile=srgb"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1.5 });
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.goto("http://localhost:5173/booster-club", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 600));
await page.addStyleTag({ content: "header{display:none!important}" });
const handle = await page.evaluateHandle(() => {
	const heading = [...document.querySelectorAll("h2")].find((element) =>
		element.textContent.includes("Booster Club"),
	);
	return heading?.closest("section");
});
const element = handle.asElement();
await element.screenshot({ path: "showcase/screens/03c-booster-directory.png" });
await browser.close();
