import { expect, test } from "@playwright/test";
import { skipIntro, waitForHydration } from "./helpers";

test.beforeEach(async ({ page }) => skipIntro(page));

test("contact form shows validation errors for bad input", async ({ page }) => {
  await page.goto("/#contact");
  await waitForHydration(page, "form[aria-label='Send a message']");
  const form = page.getByRole("form", { name: "Send a message" });
  await form.getByRole("button", { name: "Send message" }).click();
  await expect(form.getByText("Please enter your name.")).toBeVisible();
  await expect(form.getByText("Please enter a valid email address.")).toBeVisible();
  await expect(form.getByText("Please write at least 10 characters.")).toBeVisible();
});

test("contact form submits valid input", async ({ page }) => {
  await page.route("**/api/contact", (route) => route.fulfill({ status: 200, json: { ok: true } }));
  await page.goto("/#contact");
  await waitForHydration(page, "form[aria-label='Send a message']");
  const form = page.getByRole("form", { name: "Send a message" });
  await form.getByLabel("Your name").fill("Test Person");
  await form.getByLabel("Your email").fill("test@example.com");
  await form.getByLabel("Your message").fill("Hello Nadia, I would love to work together.");
  await form.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Thanks! Your message is on its way.")).toBeVisible();
});

test("contact API rejects invalid payloads and cross-origin posts", async ({ request }) => {
  const bad = await request.post("/api/contact", { data: { name: "", email: "nope", message: "x" } });
  expect(bad.status()).toBe(422);

  const foreign = await request.post("/api/contact", {
    data: { name: "A B", email: "a@b.co", message: "long enough message" },
    headers: { origin: "https://evil.example" },
  });
  expect(foreign.status()).toBe(403);
});

test("contact API reports honestly when mail is not configured", async ({ request }) => {
  test.skip(Boolean(process.env.RESEND_API_KEY), "mail is configured in this environment");
  const res = await request.post("/api/contact", {
    data: { name: "Real Person", email: "real@example.com", message: "A perfectly valid message." },
  });
  expect(res.status()).toBe(503);
});
