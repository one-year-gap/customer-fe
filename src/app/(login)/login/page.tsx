"use client";

import type { ChangeEvent} from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, Lock, User } from "lucide-react";

import logo from "@/assets/images/Logo.png";
import { useLogin } from "@/lib/tanstack/mutation/user";

export default function Login() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { mutate: login, isPending } = useLogin({
    onSuccess: () => {
      console.log("로그인 성공하였습니다.");
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleClickLogin = () => {
    if (!formData.email || !formData.password) {
      alert("아이디와 비밀번호를 확인해주세요.");
      return;
    }
    login(formData);
  };

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
              id="email"
              type="email"
              placeholder="아이디 입력"
              value={formData.email}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </div>

          <div className="bg-neutral-0 flex items-center rounded-xl border border-neutral-300 px-4 py-3 shadow-sm">
            <Lock className="mr-3 h-5 w-5 text-neutral-400" />
            <input
              id="password"
              type={show ? "text" : "password"}
              placeholder="비밀번호 입력"
              value={formData.password}
              onChange={handleInputChange}
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
            disabled={isPending}
            onClick={handleClickLogin}
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
