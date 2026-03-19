"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { isAxiosError } from "axios";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { toast } from "sonner";

import google from "@/assets/images/Google.png";
import logo from "@/assets/images/Logo.png";
import { useLogin, useRefresh } from "@/lib/tanstack/mutation/user";
import { cn } from "@/lib/utils";

export default function Login() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isValid = formData.email && formData.password;

  const router = useRouter();

  const { mutateAsync: refreshAsync } = useRefresh();
  const { mutate: login, isPending } = useLogin({
    onSuccess: async () => {
      try {
        await refreshAsync();
        toast.success("로그인 성공!");
        router.push("/");
      } catch {
        toast.error("세션 갱신 실패. 다시 로그인해주세요.");
      }
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message;
        toast.error(message ?? "아이디 또는 비밀번호를 확인해주세요.");
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    },
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleClickLogin = () => {
    if (!formData.email || !formData.password) {
      toast.warning("아이디와 비밀번호를 확인해주세요.");
      return;
    }
    login(formData);
  };
  const NEXT_PUBLIC_API_BASE_URL = "https://api.holliverse.site";

  const googleLoginUrl = `${NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/google`;
  const handleGoogleLogin = async () => {
    router.push(googleLoginUrl);
  };

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center">
          <Image src={logo} alt="logo" width={96} height={96} className="rounded-2xl" priority />

          <h2 className="text-primary-500 font-display2 font-regular mt-6 text-[20px]">
            HOLLIVERSE
          </h2>
          <p className="mt-2 text-sm text-neutral-500">계정에 로그인하세요</p>
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
              className="ml-3 cursor-pointer text-neutral-400">
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <button
            type="button"
            disabled={!isValid || isPending}
            onClick={handleClickLogin}
            className={cn(
              "text-neutral-0 text-md mt-2 w-full rounded-xl bg-neutral-300 py-3 font-semibold",
              "cursor-pointer",
              isValid
                ? "bg-primary-500 hover:opacity-60 active:opacity-60"
                : "cursor-default bg-neutral-300",
            )}>
            로그인
          </button>

          <Link href="/sign" className="text-md block text-center font-medium text-neutral-500">
            회원가입
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className={cn(
            "bg-neutral-0 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 p-1 text-sm text-neutral-500",
            "cursor-pointer hover:opacity-60 active:opacity-60",
          )}>
          <Image src={google} alt="google image" />
        </button>
      </div>
    </div>
  );
}
