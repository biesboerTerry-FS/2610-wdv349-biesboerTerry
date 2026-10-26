import puppeteer from "puppeteer-core";
const root="/Users/terry/sandbox/wdv349/lindberghUltimate/2610-wdv349-biesboerTerry";
const browser=await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:"new",defaultViewport:{width:1600,height:900}});
const page=await browser.newPage();
for(const n of [4,9,12]){
  await page.goto(`file://${root}/showcase/index.html?v=${n}#slide-${n}`,{waitUntil:"networkidle0"});
  const info=await page.evaluate(()=>{
    const s=document.querySelector('.slide.is-active');
    const r=(el)=>{const b=el.getBoundingClientRect();return {y:Math.round(b.y),b:Math.round(b.bottom),h:Math.round(b.height),w:Math.round(b.width)}};
    return {
      captions:[...s.querySelectorAll('.caption')].map(r),
      note:[...s.querySelectorAll('.note-line')].map(r),
      figs:[...s.querySelectorAll('figure.browser')].map(f=>({fig:r(f),bar:r(f.querySelector('.browser-bar')),body:r(f.querySelector('.browser-body'))})),
    };
  });
  console.log(n, JSON.stringify(info));
}
await browser.close();
