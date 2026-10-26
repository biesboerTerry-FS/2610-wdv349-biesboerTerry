import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = "/Users/terry/sandbox/wdv349/lindberghUltimate/2610-wdv349-biesboerTerry";
const deck = "file://" + path.join(root, "showcase/index.html");
const outDir = path.join(root, "showcase/tools/preview");
await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--allow-file-access-from-files", "--font-render-hinting=none"],
  defaultViewport: { width: 1600, height: 900, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
page.on("requestfailed", (req) => errors.push(`FAILED ${req.url()} ${req.failure()?.errorText}`));

const slides = [];
for (let i = 1; i <= 16; i++) {
  await page.goto(`${deck}?v=${i}#slide-${i}`, { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; })));
  });
  await new Promise((r) => setTimeout(r, 3200));
  const info = await page.evaluate(() => {
    const active = document.querySelector(".slide.is-active");
    const sr = active.getBoundingClientRect();
    const overflow = [];
    for (const el of active.querySelectorAll("*")) {
      if (el.closest("template")) continue;
      const cs = getComputedStyle(el);
      if (cs.position === "absolute" || cs.position === "fixed") continue;
      if (cs.overflow !== "visible") continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const bottom = r.bottom - sr.bottom;
      const right = r.right - sr.right;
      if (bottom > 1 || right > 1) {
        overflow.push({
          tag: el.tagName, cls: el.className?.toString().slice(0, 60),
          text: (el.textContent || "").trim().slice(0, 55),
          bottom: Math.round(bottom), right: Math.round(right),
        });
      }
    }
    return {
      title: active.dataset.title,
      slideH: Math.round(sr.height),
      scrollH: active.scrollHeight,
      clientH: active.clientHeight,
      overflow: overflow.slice(0, 12),
      overflowCount: overflow.length,
    };
  });
  slides.push(info);
  await page.screenshot({ path: path.join(outDir, `slide-${String(i).padStart(2, "0")}.png`) });
}

// index + notes + a couple of states
await page.goto(`${deck}#slide-1`, { waitUntil: "networkidle0" });
await page.keyboard.press("g");
await new Promise((r) => setTimeout(r, 350));
await page.screenshot({ path: path.join(outDir, "state-index.png") });
await page.keyboard.press("Escape");
await page.keyboard.press("n");
await new Promise((r) => setTimeout(r, 350));
await page.screenshot({ path: path.join(outDir, "state-notes.png") });

console.log(JSON.stringify({ errors, slides }, null, 2));
await browser.close();
