import { ReactNode, createElement } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps {
  as?: HeadingLevel;
  children: ReactNode;
  className?: string;
}

const headingSizes: Record<HeadingLevel, string> = {
  h1: "text-4xl md:text-5xl font-bold",
  h2: "text-3xl md:text-4xl font-bold",
  h3: "text-2xl md:text-3xl font-semibold",
  h4: "text-xl md:text-2xl font-semibold",
  h5: "text-lg md:text-xl font-medium",
  h6: "text-base md:text-lg font-medium",
};

export function Heading({ as = "h2", children, className = "" }: HeadingProps) {
  return createElement(
    as,
    { className: `text-text-bright tracking-tight ${headingSizes[as]} ${className}` },
    children
  );
}

interface TextProps {
  children: ReactNode;
  className?: string;
  dim?: boolean;
}

export function Text({ children, className = "", dim = false }: TextProps) {
  const colorClass = dim ? "text-text-dim" : "text-text";
  return <p className={`${colorClass} leading-relaxed ${className}`}>{children}</p>;
}

interface MonoTextProps {
  children: ReactNode;
  className?: string;
  size?: "xs" | "sm" | "base";
}

export function MonoText({ children, className = "", size = "sm" }: MonoTextProps) {
  const sizeClass = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
  };
  return (
    <span className={`font-mono ${sizeClass[size]} tracking-wide ${className}`}>
      {children}
    </span>
  );
}
