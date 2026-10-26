import puppeteer from "puppeteer-core";
const out="/private/var/folders/2m/db4c_p_x12b9fmwsr3151hz00000gn/T/opencode";
const browser=await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:"new",defaultViewport:{width:1600,height:1000,deviceScaleFactor:1}});
const page=await browser.newPage();
for (const [name,url,scroll] of [["home","http://localhost:5173/",0],["hs-top","http://localhost:5173/high-school",0],["hs-coaches","http://localhost:5173/high-school",480]]) {
  await page.goto(url,{waitUntil:"networkidle0"});
  await page.evaluate((y)=>window.scrollTo(0,y),scroll);
  await new Promise(r=>setTimeout(r,1200));
  await page.screenshot({path:`${out}/${name}.png`});
  console.log(name, await page.title(), await page.evaluate(()=>window.scrollY));
}
await browser.close();
