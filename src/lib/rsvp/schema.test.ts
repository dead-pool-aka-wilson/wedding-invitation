import { describe, test, expect } from "vitest";
import { rsvpSchema } from "./schema";

describe("rsvpSchema", () => {
  test("validates valid RSVP data", () => {
    const validData = {
      name: "John Doe",
      phone: "010-1234-5678",
      attendance: "yes",
      guestCount: 2,
    };

    const result = rsvpSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test("validates with optional fields", () => {
    const validData = {
      name: "Jane Doe",
      phone: "010-9876-5432",
      attendance: "maybe",
      guestCount: 1,
      dietaryRestrictions: "Vegetarian",
      message: "Looking forward to it!",
    };

    const result = rsvpSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  test("rejects empty name", () => {
    const invalidData = {
      name: "",
      phone: "010-1234-5678",
      attendance: "yes",
      guestCount: 1,
    };

    const result = rsvpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  test("rejects invalid attendance value", () => {
    const invalidData = {
      name: "John",
      phone: "010-1234-5678",
      attendance: "invalid",
      guestCount: 1,
    };

    const result = rsvpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  test("rejects guest count over 10", () => {
    const invalidData = {
      name: "John",
      phone: "010-1234-5678",
      attendance: "yes",
      guestCount: 11,
    };

    const result = rsvpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  test("rejects guest count under 1", () => {
    const invalidData = {
      name: "John",
      phone: "010-1234-5678",
      attendance: "yes",
      guestCount: 0,
    };

    const result = rsvpSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  test("defaults guestCount to 1 if not provided", () => {
    const data = {
      name: "John",
      phone: "010-1234-5678",
      attendance: "yes",
    };

    const result = rsvpSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.guestCount).toBe(1);
    }
  });
});
