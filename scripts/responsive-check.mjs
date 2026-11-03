// Usage: node scripts/responsive-check.mjs [route=/] [deviceFilter]   (FULL=1 adds a full-page shot; on Git Bash omit the route for "/", it gets path-converted)
// Full-page screenshots + horizontal-overflow report for the device matrix in Skills.md §13.
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const devices = [
  { name: "phone-390", width: 390, height: 844, mobile: true },
  { name: "phone-430", width: 430, height: 932, mobile: true },
  { name: "phone-360", width: 360, height: 800, mobile: true },
  { name: "tablet-768", width: 768, height: 1024, mobile: true },
  { name: "tablet-820", width: 820, height: 1180, mobile: true },
  { name: "tablet-1024", width: 1024, height: 1366, mobile: true },
  { name: "tablet-land-1180", width: 1180, height: 820, mobile: true },
  { name: "laptop-1280", width: 1280, height: 720, mobile: false },
  { name: "laptop-1440", width: 1440, height: 900, mobile: false },
  { name: "desktop-1920", width: 1920, height: 1080, mobile: false },
];

const [routeArg, filter] = process.argv.slice(2);
const route = routeArg?.startsWith("/") && !routeArg.includes(":") ? routeArg : "/";
const base = process.env.BASE_URL ?? "http://localhost:3000";
const out = `tests/.shots/responsive`;
await mkdir(out, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
for (const d of devices.filter((x) => !filter || x.name.includes(filter))) {
  const ctx = await browser.newContext({ viewport: { width: d.width, height: d.height }, hasTouch: d.mobile, isMobile: d.mobile });
  const page = await ctx.newPage();
  await page.addInitScript(() => sessionStorage.setItem("nadia-intro-seen", "1"));
  await page.goto(base + route, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  // Scroll through so scroll-triggered entrances have played before the capture.
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += d.height * 0.6) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(250);
  }
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(600);
  const overflow = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const bad = [];
    for (const el of document.body.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.width && (r.right > vw + 1 || r.left < -1) && !el.closest("[aria-hidden='true']")) {
        bad.push(`${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}.${String(el.className).split(" ")[0]} (${Math.round(r.left)}..${Math.round(r.right)})`);
      }
    }
    return { scrollWidth: document.documentElement.scrollWidth, vw, bad: bad.slice(0, 6) };
  });
  const slug = route === "/" ? "home" : route.replace(/\W+/g, "-").replace(/^-|-$/g, "");
  if (process.env.FULL) await page.screenshot({ path: `${out}/${d.name}-${slug}.png`, fullPage: true });
  // One image per section keeps each capture readable when reviewed.
  for (const el of await page.$$("main > section[id], main > [id], footer")) {
    const id = (await el.getAttribute("id")) ?? "footer";
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await el.screenshot({ path: `${out}/${d.name}-${slug}-${id}.png` });
  }
  console.log(d.name, overflow.scrollWidth > overflow.vw ? "OVERFLOW" : "ok", JSON.stringify(overflow.bad));
  await ctx.close();
}
await browser.close();
