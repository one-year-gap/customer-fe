"use client";

import { useState } from "react";

import { Eye, X } from "lucide-react";

export default function SignupModal() {
  const [gender, setGender] = useState<"male" | "female">("male");

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-10">
      <div className="w-full max-w-sm bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-bold text-[#1E3A8A]">LG U+NIVERSE</h1>
          <button type="button">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-bold text-blue-950">이름</label>
            <input
              type="text"
              placeholder="이름"
              className="w-full border border-gray-200 bg-gray-100 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-blue-950">전화번호</label>
            <input
              type="text"
              placeholder="휴대전화 번호 - 빼고 작성"
              className="w-full border border-gray-200 bg-gray-100 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-blue-950">성별</label>
            <div className="flex items-center gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="accent-blue-600"
                />
                남자
              </label>
              <label className="flex items-center gap-2">
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
            <label className="mb-2 block text-sm font-bold text-blue-950">생년월일</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="연도"
                className="w-1/3 border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="월"
                className="w-1/3 border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="일"
                className="w-1/3 border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-blue-950">주소</label>
            <div className="mb-2 flex gap-2">
              <input
                type="text"
                placeholder="우편번호"
                className="flex-1 border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500"
              />
              <button type="button" className="border border-blue-600 px-4 text-sm text-blue-600">
                우편번호 찾기
              </button>
            </div>
            <input
              type="text"
              placeholder="주소"
              className="w-full border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-blue-950">아이디 (이메일)</label>
            <input
              type="email"
              placeholder="아이디 입력"
              className="w-full border border-gray-200 bg-gray-100 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-blue-950">비밀번호</label>
            <div className="relative">
              <input
                type="password"
                placeholder="비밀번호 입력"
                className="w-full border border-gray-200 bg-gray-100 px-4 py-3 pr-10 text-sm outline-none focus:border-blue-500"
              />
              <Eye className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-blue-950">비밀번호 확인</label>
            <div className="relative">
              <input
                type="password"
                placeholder="비밀번호 확인"
                className="w-full border border-gray-200 bg-gray-100 px-4 py-3 pr-10 text-sm outline-none focus:border-blue-500"
              />
              <Eye className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-[#1E3A8A] py-3 text-sm font-semibold text-white">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
