"use client";

import { useState } from "react";

import { Eye, EyeOff, X } from "lucide-react";

export default function SignupModal() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);

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
            <label htmlFor="name" className="mb-1 block text-sm font-bold text-blue-950">
              이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="이름"
              className="w-full border border-gray-200 bg-gray-100 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-bold text-blue-950">
              전화번호
            </label>
            <input
              id="phone"
              type="text"
              placeholder="휴대전화 번호 - 빼고 작성"
              className="w-full border border-gray-200 bg-gray-100 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <fieldset>
            <legend className="mb-2 block text-sm font-bold text-blue-950">성별</legend>
            <div className="flex items-center gap-6 text-sm">
              <label htmlFor="gender-male" className="flex items-center gap-2">
                <input
                  id="gender-male"
                  type="radio"
                  name="gender"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="accent-blue-600"
                />
                남자
              </label>
              <label htmlFor="gender-female" className="flex items-center gap-2">
                <input
                  id="gender-female"
                  type="radio"
                  name="gender"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="accent-blue-600"
                />
                여자
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 block text-sm font-bold text-blue-950">생년월일</legend>
            <div className="flex gap-2">
              <input
                id="birth-year"
                type="number"
                placeholder="연도"
                className="w-1/3 border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500"
              />
              <input
                id="birth-month"
                type="number"
                placeholder="월"
                className="w-1/3 border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500"
              />
              <input
                id="birth-day"
                type="number"
                placeholder="일"
                className="w-1/3 border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 block text-sm font-bold text-blue-950">주소</legend>
            <div className="mb-2 flex gap-2">
              <input
                id="zipcode"
                type="text"
                placeholder="우편번호"
                className="flex-1 border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500"
              />
              <button type="button" className="border border-blue-600 px-4 text-sm text-blue-600">
                우편번호 찾기
              </button>
            </div>
            <input
              id="address"
              type="text"
              placeholder="주소"
              className="w-full border border-gray-200 bg-gray-100 px-3 py-3 text-sm outline-none focus:border-blue-500"
            />
          </fieldset>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-bold text-blue-950">
              아이디 (이메일)
            </label>
            <input
              id="email"
              type="email"
              placeholder="아이디 입력"
              className="w-full border border-gray-200 bg-gray-100 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-bold text-blue-950">
              비밀번호
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="비밀번호 입력"
                className="w-full border border-gray-200 bg-gray-100 px-4 py-3 pr-10 text-sm outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPw((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2">
                {showPw ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="password-confirm"
              className="mb-1 block text-sm font-bold text-blue-950">
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                id="password-confirm"
                type={showPwConfirm ? "text" : "password"}
                placeholder="비밀번호 확인"
                className="w-full border border-gray-200 bg-gray-100 px-4 py-3 pr-10 text-sm outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPwConfirm((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2">
                {showPwConfirm ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
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
