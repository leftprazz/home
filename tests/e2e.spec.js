const { test, expect } = require("@playwright/test");

const EXPECTED_LINKS = [
  ["Instagram", "https://instagram.com/leftprazz"],
  ["Web Portfolio", "https://portfolio.akhmadprasetya.com"],
  ["GitHub", "https://github.com/leftprazz"],
  ["LinkedIn", "https://www.linkedin.com/in/akhmadprasetya27/"],
  [
    "Stream Last Voice — Spotify, iTunes, etc",
    "https://songwhip.com/lastvoice",
  ],
];

const REMOVED_LINKS = [["simple game", "https://games.akhmadprasetya.com"]];

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("renders profile with name and role", async ({ page }) => {
  await expect(page).toHaveTitle("Akhmad Prasetya Atmanegara");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Akhmad Prasetya Atmanegara"
  );
  await expect(page.locator(".eyebrow")).toHaveText(
    "AWS Certified · DevOps Engineer"
  );
  await expect(page.locator(".role")).toHaveText(
    "Cloud AI & Automation · Vibe Coder"
  );
  await expect(page.locator(".avatar")).toBeVisible();
});

test("removed game link stays removed", async ({ page }) => {
  for (const [label, href] of REMOVED_LINKS) {
    await expect(page.locator(".links a", { hasText: label })).toHaveCount(0);
    await expect(page.locator(`.links a[href="${href}"]`)).toHaveCount(0);
  }
});

test("loading spinner is removed after page load", async ({ page }) => {
  await page.waitForLoadState("load");
  await expect(page.locator("#loading")).toHaveCount(0, { timeout: 5000 });
});

test("all links render with correct hrefs and open in a new tab", async ({
  page,
}) => {
  const links = page.locator(".links a");
  await expect(links).toHaveCount(EXPECTED_LINKS.length);

  for (const [label, href] of EXPECTED_LINKS) {
    const link = links.filter({ hasText: label });
    await expect(link, label).toHaveAttribute("href", href);
    await expect(link, label).toHaveAttribute("target", "_blank");
    await expect(link, label).toHaveAttribute("rel", /noopener/);
  }
});

test("clicking a link opens the correct URL in a new tab", async ({ page }) => {
  const popupPromise = page.waitForEvent("popup");
  await page.locator(".links a", { hasText: "GitHub" }).click();
  const popup = await popupPromise;
  expect(popup.url().replace(/\/$/, "")).toBe("https://github.com/leftprazz");
  await popup.close();
});

test("links are staggered and end fully visible", async ({ page }) => {
  const links = page.locator(".links a");
  for (let i = 0; i < (await links.count()); i++) {
    await expect(links.nth(i)).toHaveCSS("opacity", "1", { timeout: 3000 });
  }
});

test("footer shows the current year", async ({ page }) => {
  await expect(page.locator("#year")).toHaveText(
    String(new Date().getFullYear())
  );
});

test.describe("mobile viewport", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("has no horizontal overflow on small screens", async ({ page }) => {
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - window.innerWidth;
    });
    expect(overflow).toBeLessThanOrEqual(0);
    for (const [label] of EXPECTED_LINKS) {
      await expect(page.locator(".links a", { hasText: label })).toBeVisible();
    }
  });
});
