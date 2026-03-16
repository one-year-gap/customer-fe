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
      className="bg-background flex min-h-screen cursor-pointer flex-col items-center justify-center pt-10">
      <Image src={logo} alt="LG U+NIVERSE 로고" width={70} height={70} priority />

      <h2 className="text-primary-500 font-display2 font-regular mt-6 text-xl">HOLLIVERSE</h2>

      <p className="text-muted-foreground text-sm">우주에서 만나는 새로운 경험</p>

      <Image src={splash} alt="space image" width={120} height={120} className="mt-8" />

      <div className="mt-10 h-1 w-64 rounded-full bg-neutral-100">
        <div
          className="bg-primary-700 h-full rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-foreground mt-2 text-xs">{progress}%</p>
    </div>
  );
}
