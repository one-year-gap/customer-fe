import type { ReactNode } from "react";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  // return <div className="grid grid-cols-4 gap-4 p-4">{children}</div>;
  return <div className="p-4">{children}</div>;
}
