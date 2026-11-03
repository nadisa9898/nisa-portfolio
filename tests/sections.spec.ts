import { expect, test } from "@playwright/test";
import { errorsOf, skipIntro } from "./helpers";

test("home renders every section without horizontal overflow or runtime errors", async ({ page }, info) => {
  await skipIntro(page);
  const errors = errorsOf(page);

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Design with");
  await page.waitForTimeout(2000);

  for (const id of ["home", "about", "work", "expertise", "experience", "tools", "recommendations", "contact"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);

  await page.screenshot({ path: `tests/.shots/${info.project.name}-hero.png` });
  expect(errors).toEqual([]);
});

test("intro plays once per session and can be skipped", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-intro", "playing");
  await page.mouse.click(40, 40);
  await expect(page.locator("html")).not.toHaveAttribute("data-intro", "playing", { timeout: 5000 });
  expect(await page.evaluate(() => sessionStorage.getItem("nadia-intro-seen"))).toBe("1");
});

test("reduced motion skips the intro", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveAttribute("data-intro", "playing");
  await context.close();
});
