"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Eye, Lock, User } from "lucide-react";

import logo from "@/assets/images/Logo.png";

export default function Login() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-90">
        <div className="flex flex-col items-center">
          <Image src={logo} alt="logo" width={96} height={96} className="rounded-2xl" priority />

          <h2 className="text-primary-500 mt-6 text-[20px] font-bold">LG U+NIVERSE</h2>
          <p className="mt-2 text-[13px] text-neutral-900">계정에 로그인하세요</p>
        </div>

        <div className="mt-12 space-y-5">
          <div className="bg-background flex items-center rounded-xl px-4 py-3 shadow-md">
            <User className="mr-3 h-5 w-5 text-neutral-700" />
            <input
              type="text"
              placeholder="아이디 입력"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="bg-background flex items-center rounded-xl px-4 py-3 shadow-md">
            <Lock className="mr-3 h-5 w-5 text-neutral-700" />
            <input
              type={show ? "text" : "password"}
              placeholder="비밀번호 입력"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="ml-3 flex items-center justify-center">
              <Eye className="h-5 w-5 text-neutral-900" />
            </button>
          </div>

          <button
            type="button"
            className="mt-2 w-full rounded-xl bg-neutral-300 py-3 text-[14px] font-semibold text-white">
            로그인
          </button>

          <Link href="/signup" className="block text-center text-[12px] text-neutral-500">
            회원가입
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-100 bg-neutral-200 text-sm text-neutral-500">
          G
        </div>
      </div>
    </div>
  );
}
