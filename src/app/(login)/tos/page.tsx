"use client";

import { useState } from "react";

import { Eye, EyeOff, X } from "lucide-react";

export default function SignupModal() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-bold text-[#1E3A8A]">LG U+NIVERSE</h1>
          <button type="button">
            <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">이름</label>
            <input
              type="text"
              placeholder="이름"
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">전화번호</label>
            <input
              type="text"
              placeholder="휴대전화 번호 - 빼고 작성"
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">성별</label>
            <div className="flex items-center gap-6 text-sm">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="accent-blue-600"
                />
                남자
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="accent-blue-600"
                />
                여자
              </label>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">생년월일</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="연도"
                className="w-1/3 appearance-none rounded-xl border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
              <input
                type="number"
                placeholder="월"
                className="w-1/3 appearance-none rounded-xl border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
              <input
                type="number"
                placeholder="일"
                className="w-1/3 appearance-none rounded-xl border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">주소</label>
            <div className="mb-2 flex gap-2">
              <input
                type="text"
                placeholder="우편번호"
                className="flex-1 rounded-xl border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
              <button
                type="button"
                className="rounded-xl border border-blue-600 px-4 text-sm text-blue-600 transition hover:bg-blue-50">
                우편번호 찾기
              </button>
            </div>
            <input
              type="text"
              placeholder="주소"
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">아이디 (이메일)</label>
            <input
              type="email"
              placeholder="아이디 입력"
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">비밀번호</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="비밀번호 입력"
                className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 pr-10 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">비밀번호 확인</label>
            <div className="relative">
              <input
                type={showPwConfirm ? "text" : "password"}
                placeholder="비밀번호 확인"
                className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 pr-10 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPwConfirm(!showPwConfirm)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
                {showPwConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-[#1E3A8A] py-3 text-sm font-semibold text-white transition hover:bg-[#162d6a]">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
