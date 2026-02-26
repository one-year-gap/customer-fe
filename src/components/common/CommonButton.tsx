"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "navy" | "danger" | "outline" | "disabled" | "light" | "blue";

type Size = "sm" | "signup" | "md" | "compare";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: Variant;
  size: Size;
}

export default function CommonButton({ children, variant, size, ...props }: Props) {
  const sizeStyle: Record<Size, string> = {
    sm: "w-[118px] h-[41px] rounded-[10px] text-sm",
    signup: "w-[318px] h-[46px] rounded-[10px] text-base",
    md: "w-[358px] h-[41px] rounded-[10px] text-base",
    compare: "w-[350px] h-[39px] rounded-[15px] text-base",
  };

  const variantStyle: Record<Variant, string> = {
    navy: "bg-[#132C5E] text-white",
    danger: "bg-[#EF4444] text-white",
    outline: "bg-white text-gray-400 border border-[#E0E4EB]",
    disabled: "bg-[#B7B7B7] text-white cursor-not-allowed",
    light: "bg-[#F5F7FA] text-gray-600 border border-[#E0E4EB]",
    blue: "bg-gradient-to-r from-[#4C7BEF] to-[#2E5EDC] text-white",
  };

  return (
    <button
      className={`flex items-center justify-center font-semibold ${sizeStyle[size]} ${variantStyle[variant]}`}
      {...props}>
      {children}
    </button>
  );
}
