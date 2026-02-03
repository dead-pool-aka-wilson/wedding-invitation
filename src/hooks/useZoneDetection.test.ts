/**
 * @vitest-environment jsdom
 */
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useZoneDetection } from "./useZoneDetection";

describe("useZoneDetection", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollY", 0);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("returns zone 1 (SKY) initially", () => {
    const { result } = renderHook(() => useZoneDetection());
    expect(result.current).toBe(1);
  });

  test("returns zone 2 (SKYLINE) at 800px", () => {
    const { result } = renderHook(() => useZoneDetection());

    act(() => {
      vi.stubGlobal("scrollY", 800);
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(2);
  });

  test("returns zone 3 (MIDLEVELS) at 2400px", () => {
    const { result } = renderHook(() => useZoneDetection());

    act(() => {
      vi.stubGlobal("scrollY", 2400);
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(3);
  });

  test("returns zone 4 (STREET) at 4500px", () => {
    const { result } = renderHook(() => useZoneDetection());

    act(() => {
      vi.stubGlobal("scrollY", 4500);
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(4);
  });

  test("returns zone 5 (GROUND) at 6800px", () => {
    const { result } = renderHook(() => useZoneDetection());

    act(() => {
      vi.stubGlobal("scrollY", 6800);
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(5);
  });

  test("removes scroll listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useZoneDetection());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
    removeEventListenerSpy.mockRestore();
  });
});
