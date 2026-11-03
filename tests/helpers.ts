import type { Page } from "@playwright/test";

/** Marks the intro as already seen so tests start on the real page. */
export async function skipIntro(page: Page) {
  await page.addInitScript(() => sessionStorage.setItem("nadia-intro-seen", "1"));
}

export const errorsOf = (page: Page) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
};

/** Waits until React has attached its props to the element, i.e. its handlers will fire. */
export async function waitForHydration(page: Page, selector: string) {
  await page.waitForFunction(
    (sel) => {
      const el = document.querySelector(sel);
      return !!el && Object.keys(el).some((k) => k.startsWith("__reactProps$"));
    },
    selector,
  );
}
