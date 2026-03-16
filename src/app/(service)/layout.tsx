import React from "react";

import { BottomNavbar } from "@/components/common/BottomNavbar";

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <main className="pb-16">{children}</main>

      <BottomNavbar />
    </div>
  );
}
