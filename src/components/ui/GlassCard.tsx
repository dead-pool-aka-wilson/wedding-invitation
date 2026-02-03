import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "highlight";
}

export function GlassCard({
  children,
  className = "",
  variant = "default",
}: GlassCardProps) {
  const baseStyles =
    "backdrop-blur-[20px] rounded-xl border transition-colors";
  const variantStyles = {
    default:
      "bg-white/[0.06] border-white/10 hover:border-border-hi",
    highlight:
      "bg-white/[0.08] border-white/[0.12] hover:border-white/20",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}
