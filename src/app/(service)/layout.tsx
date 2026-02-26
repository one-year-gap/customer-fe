import React from "react";

import { BottomNavbar } from "@/components/common/BottomNavbar";

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main>{children}</main>
      <BottomNavbar />
    </div>
  );
}
