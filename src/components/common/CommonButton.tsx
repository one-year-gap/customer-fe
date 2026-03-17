"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "danger" | "outline" | "disabled" | "light" | "secondary";

type Size = "sm" | "main" | "md" | "compare" | "onboard";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: Variant;
  size: Size;
}

export default function CommonButton({ children, variant, size, ...props }: Props) {
  const sizeStyle: Record<Size, string> = {
    sm: "w-[118px] h-[41px] rounded-[10px] text-sm",
    main: "w-[318px] h-[46px] rounded-[10px] text-base",
    md: "w-[358px] h-[41px] rounded-[10px] text-base",
    compare: "w-[350px] h-[39px] rounded-[15px] text-base",
    onboard: "w-[300px] h-[50px] rounded-[10px] text-md",
  };

  const variantStyle: Record<Variant, string> = {
    primary: "bg-primary-500 text-primary-foreground",
    danger: "bg-hit-500 text-neutral-0",
    outline: "bg-neutral-0 text-neutral-500 border border-neutral-300",
    disabled: "bg-neutral-400 text-neutral-0 cursor-not-allowed",
    light: "bg-neutral-100 text-neutral-700 border border-neutral-300",
    secondary: "bg-secondary-500 text-secondary-foreground",
  };

  return (
    <button
      className={`flex items-center justify-center font-semibold transition-colors ${sizeStyle[size]} ${variantStyle[variant]}`}
      {...props}>
      {children}
    </button>
  );
}
