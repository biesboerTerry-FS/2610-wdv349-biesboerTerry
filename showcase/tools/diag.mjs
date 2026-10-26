import puppeteer from "puppeteer-core";
import path from "node:path";
const root="/Users/terry/sandbox/wdv349/lindberghUltimate/2610-wdv349-biesboerTerry";
const browser=await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:"new",defaultViewport:{width:1600,height:900}});
const page=await browser.newPage();
for(const n of [4,9,12]){
  await page.goto(`file://${root}/showcase/index.html?v=${n}#slide-${n}`,{waitUntil:"networkidle0"});
  const info=await page.evaluate(()=>{
    const s=document.querySelector('.slide.is-active');
    const r=(el)=>{const b=el.getBoundingClientRect();return {y:Math.round(b.y),b:Math.round(b.bottom),h:Math.round(b.height),w:Math.round(b.width)}};
    const content=s.querySelector('.content');
    return {
      head:r(s.querySelector('.slide-head')),
      content:r(content),
      contentScroll:[content.scrollHeight,content.clientHeight],
      children:[...content.children].map(c=>({cls:c.className, ...r(c), scroll:[c.scrollHeight,c.clientHeight]})),
      split: content.querySelector('.split') ? [...content.querySelector('.split').children].map(c=>({cls:c.className,...r(c)})) : null,
    };
  });
  console.log(n, JSON.stringify(info,null,1));
}
await browser.close();
