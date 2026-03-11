import type { ReactNode } from "react";

export default function CharatersLayout({ children }: { children: ReactNode }) {
  // return <div className="grid grid-cols-4 gap-4 p-4">{children}</div>;
  return <div>{children}</div>;
}
