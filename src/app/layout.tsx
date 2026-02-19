import "./globals.css";

import localFont from "next/font/local";

import { TanstackProvider } from "@/lib/tanstack/provider";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  weight: "100 900",
  variable: "--font-pretendard",
  display: "swap",
});

const dunggeunmo = localFont({
  src: "../assets/fonts/DungGeunMo.woff2",
  weight: "400",
  variable: "--font-dunggeunmo",
  display: "swap",
});

const mulmaru = localFont({
  src: "../assets/fonts/Mulmaru.woff2",
  weight: "400",
  variable: "--font-mulmaru",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${dunggeunmo.variable} ${mulmaru.variable}`}>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
