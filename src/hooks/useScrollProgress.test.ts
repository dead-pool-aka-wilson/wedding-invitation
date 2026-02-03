/**
 * @vitest-environment jsdom
 */
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollProgress } from "./useScrollProgress";

describe("useScrollProgress", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollY", 0);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("returns 0 initially when at top", () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBe(0);
  });

  test("updates progress on scroll", () => {
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      vi.stubGlobal("scrollY", 4000);
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(0.5);
  });

  test("returns 1 at bottom (8000px)", () => {
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      vi.stubGlobal("scrollY", 8000);
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(1);
  });

  test("clamps progress beyond total height", () => {
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      vi.stubGlobal("scrollY", 10000);
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(1);
  });

  test("removes scroll listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useScrollProgress());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
    removeEventListenerSpy.mockRestore();
  });
});
