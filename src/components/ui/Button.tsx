import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all backdrop-blur-sm";

  const variantStyles = {
    primary:
      "bg-green text-bg hover:bg-green/90 shadow-[0_0_20px_rgba(45,218,110,0.3)]",
    secondary:
      "bg-cyan/10 text-cyan border border-cyan/30 hover:bg-cyan/20",
    ghost:
      "bg-white/5 text-text hover:bg-white/10 border border-white/10",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
