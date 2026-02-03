import { test, expect } from "@playwright/test";

test.describe("Wedding Invitation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ko");
  });

  test("should display cover zone with names", async ({ page }) => {
    await expect(page.getByText("지훈")).toBeVisible();
    await expect(page.getByText("수진")).toBeVisible();
  });

  test("should scroll through all zones", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);

    await page.evaluate(() => window.scrollTo(0, 3000));
    await page.waitForTimeout(500);

    await page.evaluate(() => window.scrollTo(0, 5000));
    await page.waitForTimeout(500);

    await page.evaluate(() => window.scrollTo(0, 7000));
    await page.waitForTimeout(500);

    await expect(page.getByText("결혼식에서 뵙겠습니다")).toBeVisible();
  });

  test("should show floating RSVP button after Zone 03", async ({ page }) => {
    await expect(page.getByTestId("floating-rsvp-button")).not.toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 3000));
    await page.waitForTimeout(500);

    await expect(page.getByTestId("floating-rsvp-button")).toBeVisible();
  });

  test("should open RSVP modal when button clicked", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 3000));
    await page.waitForTimeout(500);

    await page.getByTestId("floating-rsvp-button").click();

    await expect(page.getByTestId("rsvp-modal")).toBeVisible();
    await expect(page.getByText("참석 의사 전달")).toBeVisible();
  });

  test("should close RSVP modal when backdrop clicked", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 3000));
    await page.waitForTimeout(500);

    await page.getByTestId("floating-rsvp-button").click();
    await expect(page.getByTestId("rsvp-modal")).toBeVisible();

    await page.getByLabel("Close modal").click();
    await expect(page.getByTestId("rsvp-modal")).not.toBeVisible();
  });

  test("should switch language to English", async ({ page }) => {
    await page.getByText("English").click();

    await expect(page).toHaveURL(/\/en/);
    await expect(page.getByText("Jihun")).toBeVisible();
  });
});

test.describe("RSVP Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ko");
    await page.evaluate(() => window.scrollTo(0, 3000));
    await page.waitForTimeout(500);
    await page.getByTestId("floating-rsvp-button").click();
  });

  test("should complete RSVP flow for attending guest", async ({ page }) => {
    await page.getByLabel("성함").fill("홍길동");
    await page.getByLabel("연락처").fill("010-1234-5678");
    await page.getByText("신랑측").click();
    await page.getByRole("button", { name: "→" }).click();

    await page.getByText(/네, 참석합니다/).click();
    await page.getByRole("button", { name: "→" }).click();

    await page.getByText("2").click();
    await page.getByRole("button", { name: "→" }).click();

    await page.getByText(/직접 이동/).first().click();
    await page.getByRole("button", { name: "→" }).click();

    await page.getByText(/직접 이동/).first().click();
    await page.getByRole("button", { name: "제출하기" }).click();

    await expect(page.getByText("감사합니다!")).toBeVisible();
  });

  test("should complete RSVP flow for non-attending guest", async ({ page }) => {
    await page.getByLabel("성함").fill("김철수");
    await page.getByLabel("연락처").fill("010-9876-5432");
    await page.getByText("신부측").click();
    await page.getByRole("button", { name: "→" }).click();

    await page.getByText(/아니요, 참석이 어렵습니다/).click();
    await page.getByRole("button", { name: "→" }).click();

    await expect(page.getByText("감사합니다!")).toBeVisible();
  });

  test("should navigate back through RSVP steps", async ({ page }) => {
    await page.getByLabel("성함").fill("Test");
    await page.getByLabel("연락처").fill("010-0000-0000");
    await page.getByText("신랑측").click();
    await page.getByRole("button", { name: "→" }).click();

    await expect(page.getByText("참석하실 수 있으신가요?")).toBeVisible();

    await page.getByRole("button", { name: "←" }).click();

    await expect(page.getByLabel("성함")).toBeVisible();
  });
});

test.describe("Visual Regression", () => {
  test("cover zone screenshot", async ({ page }) => {
    await page.goto("/ko");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot("cover-zone.png", {
      maxDiffPixelRatio: 0.1,
    });
  });

  test("skyline zone screenshot", async ({ page }) => {
    await page.goto("/ko");
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot("skyline-zone.png", {
      maxDiffPixelRatio: 0.1,
    });
  });

  test("ground zone screenshot", async ({ page }) => {
    await page.goto("/ko");
    await page.evaluate(() => window.scrollTo(0, 7000));
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot("ground-zone.png", {
      maxDiffPixelRatio: 0.1,
    });
  });

  test("rsvp modal screenshot", async ({ page }) => {
    await page.goto("/ko");
    await page.evaluate(() => window.scrollTo(0, 3000));
    await page.waitForTimeout(500);
    await page.getByTestId("floating-rsvp-button").click();
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot("rsvp-modal.png", {
      maxDiffPixelRatio: 0.1,
    });
  });
});
