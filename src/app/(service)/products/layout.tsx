import type { ReactNode } from "react";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return <div className="grid-col-4 grid gap-4 p-4">{children}</div>;
}
