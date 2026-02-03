/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Heading, Text, MonoText } from "./Typography";

describe("Heading", () => {
  it("renders as h2 by default", () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders as specified heading level", () => {
    render(<Heading as="h1">Title</Heading>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("applies text-bright color", () => {
    render(<Heading>Title</Heading>);
    const heading = screen.getByRole("heading");
    expect(heading.className).toContain("text-text-bright");
  });
});

describe("Text", () => {
  it("renders paragraph text", () => {
    render(<Text>Body text</Text>);
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });

  it("applies dim style when specified", () => {
    render(<Text dim>Dim text</Text>);
    const text = screen.getByText("Dim text");
    expect(text.className).toContain("text-text-dim");
  });
});

describe("MonoText", () => {
  it("renders monospace text", () => {
    render(<MonoText>Code</MonoText>);
    const mono = screen.getByText("Code");
    expect(mono.className).toContain("font-mono");
  });

  it("applies size classes", () => {
    render(<MonoText size="xs">Small</MonoText>);
    const mono = screen.getByText("Small");
    expect(mono.className).toContain("text-xs");
  });
});
