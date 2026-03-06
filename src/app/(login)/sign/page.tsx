"use client";

import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

import { Eye, EyeOff, X } from "lucide-react";

import { useSignup } from "@/lib/tanstack/mutation/user";
import type { SignupRequestDTO } from "@/models/user";
import type { DaumPostcodeData } from "@/types/daum";

export default function SignupJwt() {
  const [formData, setFormData] = useState({
    email: "",
    password: "", //비번 입력시 비밀번호는 8자 이상 64자 이하로 입력해야함
    passwordConfirm: "",
    name: "",
    phone: "",
    year: "",
    month: "",
    day: "",
    gender: "",
  });
  const [gender, setGender] = useState<"male" | "female">("male");
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    zonecode: "", //우편번호
    roadAddress: "", //도로명 주소
    sido: "",
    sigungu: "",
  });

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { mutate: signup, isPending } = useSignup({
    onSuccess: () => {
      router.push("/tos");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleOpenPostcode = () => {
    setIsPostcodeOpen(true);
    setTimeout(() => {
      if (wrapRef.current && window.daum) {
        new window.daum.Postcode({
          oncomplete: (data: DaumPostcodeData) => {
            setAddressInfo({
              zonecode: data.zonecode,
              roadAddress: data.roadAddress,
              sido: data.sido,
              sigungu: data.sigungu,
            });
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

  const handleClickSign = () => {
    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 주소 가공: roadAddress에서 sido + sigungu 부분을 제거
    const streetAddress = addressInfo.roadAddress
      .replace(addressInfo.sido, "")
      .replace(addressInfo.sigungu, "")
      .trim();

    const payload: SignupRequestDTO = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      phone: formData.phone,
      birthDate: `${formData.year}-${formData.month.padStart(2, "0")}-${formData.day.padStart(2, "0")}`,
      gender: gender === "male" ? "M" : "F",
      membership: "GOLD",
      address: {
        province: addressInfo.sido,
        city: addressInfo.sigungu,
        streetAddress: streetAddress,
        postalCode: addressInfo.zonecode,
      },
    };

    signup(payload);
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center overflow-y-auto px-6 py-10">
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
      <div className="bg-card text-card-foreground h-fit w-full max-w-sm rounded-xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-primary-500 font-display2 font-regular text-lg">LG U+NIVERSE</h1>
          <button type="button">
            <X className="text-muted-foreground h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="text-primary-500 mb-1 block text-sm font-bold">
              이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="이름"
              value={formData.name}
              onChange={handleInputChange}
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
              value={formData.phone}
              onChange={handleInputChange}
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
                id="year"
                placeholder="연도"
                value={formData.year}
                onChange={handleInputChange}
                className="bg-input text-foreground focus:ring-ring w-1/3 rounded-md px-3 py-3 text-sm outline-none focus:ring-2"
              />
              <input
                type="number"
                id="month"
                placeholder="월"
                value={formData.month}
                onChange={handleInputChange}
                className="bg-input text-foreground focus:ring-ring w-1/3 rounded-md px-3 py-3 text-sm outline-none focus:ring-2"
              />
              <input
                type="number"
                id="day"
                placeholder="일"
                value={formData.day}
                onChange={handleInputChange}
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
              value={formData.email}
              onChange={handleInputChange}
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
                value={formData.password}
                onChange={handleInputChange}
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
                id="passwordConfirm"
                type={showPwConfirm ? "text" : "password"}
                placeholder="비밀번호 확인"
                value={formData.passwordConfirm}
                onChange={handleInputChange}
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
            onClick={handleClickSign}
            disabled={isPending}
            type="button"
            className="bg-primary-500 text-primary-foreground mt-4 w-full rounded-md px-4 py-3 text-sm font-semibold hover:opacity-90">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
