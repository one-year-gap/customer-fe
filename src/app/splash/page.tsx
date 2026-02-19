"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import logo from "@/assets/images/Logo.png";
import splash from "@/assets/images/splash.png";

export default function Splash() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (progress === 100) {
      router.push("/login");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex min-h-screen cursor-pointer flex-col items-center justify-center bg-white pt-10">
      <Image src={logo} alt="LG U+NIVERSE 로고" width={70} height={70} priority />

      <h2 className="mt-6 text-xl font-bold">LG U+NIVERSE</h2>

      <p className="text-sm text-neutral-500">우주에서 만나는 새로운 경험</p>

      <Image src={splash} alt="space image" width={120} height={120} className="mt-8" />

      <div className="mt-10 h-1 w-64 rounded bg-gray-300">
        <div
          className="h-full rounded bg-[#1e2a4a] transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-gray-600">{progress}%</p>
    </div>
  );
}
