import { describe, test, expect } from "vitest";
import {
  ZONES,
  TOTAL_HEIGHT,
  getZoneByPosition,
  getZoneProgress,
  getScrollProgress,
} from "./zones";

describe("zones configuration", () => {
  test("TOTAL_HEIGHT is 8000px", () => {
    expect(TOTAL_HEIGHT).toBe(8000);
  });

  test("zones are contiguous (no gaps)", () => {
    const zoneArray = Object.values(ZONES);
    for (let i = 1; i < zoneArray.length; i++) {
      expect(zoneArray[i].start).toBe(zoneArray[i - 1].end);
    }
  });

  test("zones cover full height", () => {
    const lastZone = ZONES.GROUND;
    expect(ZONES.SKY.start).toBe(0);
    expect(lastZone.end).toBe(TOTAL_HEIGHT);
  });

  test("zone ids are sequential 1-5", () => {
    expect(ZONES.SKY.id).toBe(1);
    expect(ZONES.SKYLINE.id).toBe(2);
    expect(ZONES.MIDLEVELS.id).toBe(3);
    expect(ZONES.STREET.id).toBe(4);
    expect(ZONES.GROUND.id).toBe(5);
  });
});

describe("getZoneByPosition", () => {
  test("returns zone 1 (SKY) for 0-799px", () => {
    expect(getZoneByPosition(0)).toBe(1);
    expect(getZoneByPosition(400)).toBe(1);
    expect(getZoneByPosition(799)).toBe(1);
  });

  test("returns zone 2 (SKYLINE) for 800-2399px", () => {
    expect(getZoneByPosition(800)).toBe(2);
    expect(getZoneByPosition(1600)).toBe(2);
    expect(getZoneByPosition(2399)).toBe(2);
  });

  test("returns zone 3 (MIDLEVELS) for 2400-4499px", () => {
    expect(getZoneByPosition(2400)).toBe(3);
    expect(getZoneByPosition(3500)).toBe(3);
    expect(getZoneByPosition(4499)).toBe(3);
  });

  test("returns zone 4 (STREET) for 4500-6799px", () => {
    expect(getZoneByPosition(4500)).toBe(4);
    expect(getZoneByPosition(5500)).toBe(4);
    expect(getZoneByPosition(6799)).toBe(4);
  });

  test("returns zone 5 (GROUND) for 6800px and beyond", () => {
    expect(getZoneByPosition(6800)).toBe(5);
    expect(getZoneByPosition(7400)).toBe(5);
    expect(getZoneByPosition(8000)).toBe(5);
    expect(getZoneByPosition(10000)).toBe(5);
  });

  test("handles negative values by returning zone 1", () => {
    expect(getZoneByPosition(-100)).toBe(1);
  });
});

describe("getZoneProgress", () => {
  test("returns 0 at zone start", () => {
    expect(getZoneProgress(0, 1)).toBe(0);
    expect(getZoneProgress(800, 2)).toBe(0);
    expect(getZoneProgress(2400, 3)).toBe(0);
  });

  test("returns 1 at zone end", () => {
    expect(getZoneProgress(800, 1)).toBe(1);
    expect(getZoneProgress(2400, 2)).toBe(1);
    expect(getZoneProgress(8000, 5)).toBe(1);
  });

  test("returns 0.5 at SKY midpoint (400px)", () => {
    expect(getZoneProgress(400, 1)).toBe(0.5);
  });

  test("returns 0.5 at SKYLINE midpoint (1600px)", () => {
    expect(getZoneProgress(1600, 2)).toBe(0.5);
  });

  test("clamps progress to 0 when scrollY is before zone start", () => {
    expect(getZoneProgress(0, 2)).toBe(0);
    expect(getZoneProgress(500, 3)).toBe(0);
  });

  test("clamps progress to 1 when scrollY is beyond zone end", () => {
    expect(getZoneProgress(1000, 1)).toBe(1);
    expect(getZoneProgress(10000, 5)).toBe(1);
  });

  test("returns 0 for invalid zone id", () => {
    expect(getZoneProgress(500, 99 as never)).toBe(0);
  });
});

describe("getScrollProgress", () => {
  test("returns 0 at top", () => {
    expect(getScrollProgress(0)).toBe(0);
  });

  test("returns 1 at bottom (8000px)", () => {
    expect(getScrollProgress(8000)).toBe(1);
  });

  test("returns 0.5 at midpoint (4000px)", () => {
    expect(getScrollProgress(4000)).toBe(0.5);
  });

  test("clamps to 0 for negative values", () => {
    expect(getScrollProgress(-100)).toBe(0);
  });

  test("clamps to 1 for values beyond total height", () => {
    expect(getScrollProgress(10000)).toBe(1);
  });
});
