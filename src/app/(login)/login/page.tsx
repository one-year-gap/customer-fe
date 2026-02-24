"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Eye, Lock, User } from "lucide-react";

import logo from "@/assets/images/Logo.png";

export default function Login() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-[360px] text-center">
        <Image src={logo} alt="logo" width={70} height={70} className="mx-auto" />

        <h2 className="mt-6 text-xl font-bold">LG U+NIVERSE</h2>
        <p className="mt-2 text-[13px] text-neutral-500">계정에 로그인 하세요</p>

        <div className="mt-10 space-y-6">
          <div className="flex items-center rounded-xl border-gray-500 bg-white px-4 py-3 shadow-sm">
            <User className="mr-3 h-5 w-5 shrink-0 text-gray-400" />
            <input
              type="text"
              placeholder="아이디 입력"
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>

          <div className="flex items-center rounded-xl border-gray-500 bg-white px-4 py-3 shadow-sm">
            <Lock className="mr-3 h-5 w-5 shrink-0 text-gray-400" />
            <input
              type={show ? "text" : "password"}
              placeholder="비밀번호 입력"
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <Eye
              onClick={() => setShow(!show)}
              className="ml-3 h-5 w-5 shrink-0 cursor-pointer text-gray-400"
            />
          </div>

          <div className="flex items-center justify-center rounded-xl bg-gray-300 px-4 py-3 shadow-sm">
            <p className="flex items-center justify-center font-bold text-white">로그인</p>
          </div>
          <p
            onClick={() => router.push("/sign")}
            className="justify-center text-[10px] text-gray-500">
            회원가입
          </p>
        </div>
      </div>
    </div>
  );
}
