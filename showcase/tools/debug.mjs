import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
	executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
	headless: "new",
});
const page = await browser.newPage();
page.on("console", (msg) => console.log("console:", msg.type(), msg.text()));
page.on("pageerror", (err) => console.log("pageerror:", err.message));
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/admin/login", { waitUntil: "networkidle0" });
await page.type("#admin-email", "admin@lindberghultimate.com");
await page.type("#admin-password", "ChangeMe123!");
await page.evaluate(() => {
	[...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Sign in").click();
});
await page.waitForFunction(() => document.body.innerText.includes("Welcome back"));
await page.goto("http://localhost:5173/admin/players", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 800));
console.log("new button disabled?", await page.evaluate(() => [...document.querySelectorAll("button")].find((b) => b.textContent.includes("New player"))?.disabled));
await page.evaluate(() => {
	const row = [...document.querySelectorAll("tbody tr")].find((el) => el.textContent.includes("Eli Larson"));
	row?.click();
});
await page.waitForFunction(() => document.body.innerText.includes("Raw JSON"));
console.log("detail buttons:", await page.evaluate(() => [...document.querySelectorAll("button")].map((b) => b.textContent.trim()).filter(Boolean)));
await page.evaluate(() => {
	[...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Edit").click();
});
await new Promise((r) => setTimeout(r, 1000));
console.log("body excerpt:", (await page.evaluate(() => document.body.innerText)).slice(0, 1200));
await page.screenshot({ path: "showcase/screens/debug-edit.png" });
await browser.close();
