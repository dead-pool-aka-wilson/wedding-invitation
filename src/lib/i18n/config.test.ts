import { test, expect } from "bun:test";
import { locales, defaultLocale } from "./config";

test("locales should include ko and en", () => {
  expect(locales).toContain("ko");
  expect(locales).toContain("en");
});

test("locales should have exactly 2 languages", () => {
  expect(locales.length).toBe(2);
});

test("defaultLocale should be ko", () => {
  expect(defaultLocale).toBe("ko");
});

test("ko should be the first locale", () => {
  expect(locales[0]).toBe("ko");
});

test("en should be the second locale", () => {
  expect(locales[1]).toBe("en");
});
