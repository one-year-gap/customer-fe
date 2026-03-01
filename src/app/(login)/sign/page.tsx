"use client";

import { useRef,useState } from "react";
import Script from "next/script";

import { Eye, EyeOff, X } from "lucide-react";

import type { DaumPostcodeData } from "@/types/daum";

export default function SignupModal() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    zonecode: "",
    roadAddress: "",
    sido: "",
    sigungu: "",
  });

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleOpenPostcode = () => {
    setIsPostcodeOpen(true);
    setTimeout(() => {
      if (wrapRef.current && window.daum) {
        new window.daum.Postcode({
          oncomplete: (data: DaumPostcodeData) => {
            setAddressInfo((prev) => ({
              ...prev,
              zonecode: data.zonecode,
              roadAddress: data.roadAddress,
              sido: data.sido,
              sigungu: data.sigungu,
            }));
            setIsPostcodeOpen(false);
          },
          onresize: (size) => {
            if (wrapRef.current) {
              wrapRef.current.style.height = `${size.height}px`;
            }
          },
          width: "100%",
          height: "100%",
        }).embed(wrapRef.current);
      }
    }, 0);
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-6 py-10">
      <Script src="//t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />

      {isPostcodeOpen && (
        <div className="bg-card fixed inset-0 z-[100] mx-auto flex max-w-sm flex-col overflow-hidden">
          <div className="border-muted bg-card flex h-14 items-center justify-between border-b px-4">
            <div className="font-bold">주소 검색</div>
            <button type="button" onClick={() => setIsPostcodeOpen(false)}>
              <X className="text-muted-foreground h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pt-2">
            <div ref={wrapRef} className="w-100%" />
          </div>
        </div>
      )}
      <div className="bg-card text-card-foreground w-full max-w-sm rounded-xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-primary-500 font-display2 font-regular text-lg">LG U+NIVERSE</h1>
          <button type="button">
            <X className="text-muted-foreground h-5 w-5" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="text-primary-500 mb-1 block text-sm font-bold">
              이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="이름"
              className="bg-input text-foreground focus:ring-ring w-full rounded-md px-4 py-3 text-sm outline-none focus:ring-2"
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-primary-500 mb-1 block text-sm font-bold">
              전화번호
            </label>
            <input
              id="phone"
              type="text"
              placeholder="휴대전화 번호 - 빼고 작성"
              className="bg-input text-foreground focus:ring-ring w-full rounded-md px-4 py-3 text-sm outline-none focus:ring-2"
            />
          </div>

          <fieldset>
            <legend className="text-primary-700 mb-2 block text-sm font-bold">성별</legend>
            <div className="text-foreground flex items-center gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="accent-secondary-500"
                />
                남자
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="accent-secondary-500"
                />
                여자
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-primary-700 mb-2 block text-sm font-bold">생년월일</legend>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="연도"
                className="bg-input text-foreground focus:ring-ring w-1/3 rounded-md px-3 py-3 text-sm outline-none focus:ring-2"
              />
              <input
                type="number"
                placeholder="월"
                className="bg-input text-foreground focus:ring-ring w-1/3 rounded-md px-3 py-3 text-sm outline-none focus:ring-2"
              />
              <input
                type="number"
                placeholder="일"
                className="bg-input text-foreground focus:ring-ring w-1/3 rounded-md px-3 py-3 text-sm outline-none focus:ring-2"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-primary-500 mb-2 block text-sm font-bold">주소</legend>
            <div className="mb-2 flex gap-2">
              <input
                type="text"
                placeholder="우편번호"
                value={addressInfo.zonecode}
                readOnly
                className="bg-input text-foreground focus:ring-ring flex-1 rounded-md px-3 py-3 text-sm outline-none focus:ring-2"
              />
              <button
                type="button"
                onClick={handleOpenPostcode}
                className="text-primary-300 hover:bg-accent hover:text-accent-foreground rounded-md px-4 text-sm font-medium">
                우편번호 찾기
              </button>
            </div>
            <input
              type="text"
              placeholder="도로명 주소"
              value={addressInfo.roadAddress}
              readOnly
              className="bg-input text-foreground focus:ring-ring mb-2 w-full rounded-md px-3 py-3 text-sm outline-none focus:ring-2"
            />
          </fieldset>

          <div>
            <label htmlFor="email" className="text-primary-500 mb-1 block text-sm font-bold">
              아이디 (이메일)
            </label>
            <input
              id="email"
              type="email"
              placeholder="아이디 입력"
              className="bg-input text-foreground focus:ring-ring w-full rounded-md px-4 py-3 text-sm outline-none focus:ring-2"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-primary-500 mb-1 block text-sm font-bold">
              비밀번호
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="비밀번호 입력"
                className="bg-input text-foreground focus:ring-ring w-full rounded-md px-4 py-3 pr-10 text-sm outline-none focus:ring-2"
              />
              <button
                type="button"
                onClick={() => setShowPw((prev) => !prev)}
                className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="password-confirm"
              className="text-primary-500 mb-1 block text-sm font-bold">
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                id="password-confirm"
                type={showPwConfirm ? "text" : "password"}
                placeholder="비밀번호 확인"
                className="bg-input text-foreground focus:ring-ring w-full rounded-md px-4 py-3 pr-10 text-sm outline-none focus:ring-2"
              />
              <button
                type="button"
                onClick={() => setShowPwConfirm((prev) => !prev)}
                className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2">
                {showPwConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary text-primary-foreground mt-4 w-full rounded-md px-4 py-3 text-sm font-semibold transition-opacity hover:opacity-90">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
