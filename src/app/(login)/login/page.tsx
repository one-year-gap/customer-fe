"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Eye, EyeOff, Lock, User } from "lucide-react";

import logo from "@/assets/images/Logo.png";

export default function Login() {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center">
          <Image src={logo} alt="logo" width={96} height={96} className="rounded-2xl" priority />

          <h2 className="text-primary-500 font-display2 font-regular mt-6 text-[20px]">
            LG U+NIVERSE
          </h2>
          <p className="mt-2 text-[13px] text-neutral-500">계정에 로그인하세요</p>
        </div>

        <div className="mt-12 space-y-5">
          <div className="bg-neutral-0 flex items-center rounded-xl border border-neutral-300 px-4 py-3 shadow-sm">
            <User className="mr-3 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="아이디 입력"
              className="flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </div>

          <div className="bg-neutral-0 flex items-center rounded-xl border border-neutral-300 px-4 py-3 shadow-sm">
            <Lock className="mr-3 h-5 w-5 text-neutral-400" />
            <input
              type={show ? "text" : "password"}
              placeholder="비밀번호 입력"
              className="flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="ml-3 text-neutral-400">
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <button
            type="button"
            className="text-neutral-0 mt-2 w-full rounded-xl bg-neutral-300 py-3 text-[14px] font-semibold">
            로그인
          </button>

          <Link href="/signup" className="block text-center text-[12px] text-neutral-500">
            회원가입
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-neutral-100 text-sm text-neutral-500">
          G
        </div>
      </div>
    </div>
  );
}
