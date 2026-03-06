import React from "react";

import { BottomNavbar } from "@/components/common/BottomNavbar";

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    // <div className="flex min-h-screen flex-col">
    <div className="min-h-dvh">
      {/* <main>{children}</main> */}
      <main className="pb-15">{children}</main>
      <BottomNavbar />
    </div>
  );
}
