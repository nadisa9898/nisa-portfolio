import { expect, test } from "@playwright/test";
import { projects } from "../src/data/projects";
import { errorsOf, skipIntro, waitForHydration } from "./helpers";

test.beforeEach(async ({ page }) => skipIntro(page));

test("projects page filters between all projects and case studies", async ({ page }) => {
  await page.goto("/projects");
  await waitForHydration(page, "main button[aria-pressed]");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Every project");
  const cards = page.locator("main ul > li");
  await expect(cards).toHaveCount(18);
  await page.getByRole("button", { name: /Case Study/ }).click();
  await expect(cards).toHaveCount(6);
});

test("a project card opens its page and the next-project bar navigates", async ({ page }) => {
  await page.goto("/projects");
  await page.locator("main ul > li a").first().click();
  await expect(page).toHaveURL(/\/projects\/.+/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByText("NEXT PROJECT").click();
  await expect(page).toHaveURL(/\/projects\/.+/);
});

test("every project page renders a heading without runtime errors", async ({ page }) => {
  test.setTimeout(180_000);
  const errors = errorsOf(page);
  for (const project of projects) {
    const response = await page.goto(`/projects/${project.slug}`);
    expect(response?.status(), project.slug).toBe(200);
    await expect(page.getByRole("heading", { level: 1 }), project.slug).toContainText(project.title);
  }
  // WebKit reports prefetches aborted by our rapid navigation as errors; they are not app failures.
  expect(errors.filter((e) => !e.includes("_rsc="))).toEqual([]);
});

test("unknown project slug returns a real 404 status", async ({ page, request }) => {
  expect((await request.get("/projects/does-not-exist")).status()).toBe(404);
  const response = await page.goto("/projects/does-not-exist");
  expect(response?.status()).toBe(404);
});

test("cv page offers a download of the PDF", async ({ page, request }) => {
  await page.goto("/cv");
  const link = page.getByRole("link", { name: /Download CV/ }).first();
  await expect(link).toHaveAttribute("href", "/images/proj/Nadia_Nisa.pdf");
  await expect(link).toHaveAttribute("download", "Nadia_Nisa_CV.pdf");
  const pdf = await request.get("/images/proj/Nadia_Nisa.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("pdf");
});

test("sitemap and robots are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/projects/solid-match");
  expect((await request.get("/robots.txt")).status()).toBe(200);
});
