"use client";

import { useState } from "react";
import Image from "next/image";

import { Check } from "lucide-react";

import mascot from "@/assets/images/splash.png";

export default function Terms() {
  const [terms1, setTerms1] = useState(false);
  const [terms2, setTerms2] = useState(false);
  const [terms3, setTerms3] = useState(false);
  const [terms4, setTerms4] = useState(false);

  const agreeAll = terms1 && terms2 && terms3 && terms4;
  const requiredAgreed = terms1 && terms2 && terms3;

  const toggleAll = () => {
    const newValue = !agreeAll;
    setTerms1(newValue);
    setTerms2(newValue);
    setTerms3(newValue);
    setTerms4(newValue);
  };

  const toggleSingle = (setter: (v: boolean) => void, value: boolean) => {
    setter(!value);
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-[#F3F4F6] px-6 py-10">
      <div className="w-full max-w-90">
        <h1 className="text-2xl font-bold text-[#1E2A4A]">약관 동의</h1>
        <p className="mt-2 text-sm text-gray-500">서비스 이용을 위해 아래 약관에 동의해주세요</p>

        <div className="mt-8 space-y-4">
          <div
            onClick={toggleAll}
            className={`flex cursor-pointer items-start rounded-2xl border px-4 py-4 shadow-sm transition ${
              agreeAll ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
            }`}>
            <Check
              className={`mt-1 mr-3 h-5 w-5 ${agreeAll ? "text-blue-500" : "text-gray-300"}`}
            />
            <div>
              <p className="font-semibold">전체 동의하기</p>
              <p className="text-xs text-gray-500">필수 및 선택 항목을 모두 포함합니다</p>
            </div>
          </div>

          <AgreementItem
            title="LG U+ 서비스 이용 약관"
            description="서비스 이용에 관한 기본 약관입니다"
            required
            checked={terms1}
            onClick={() => toggleSingle(setTerms1, terms1)}
          />

          <AgreementItem
            title="개인정보 수집 및 이용 동의"
            description="서비스 제공을 위한 개인정보 처리에 관한 동의입니다."
            required
            checked={terms2}
            onClick={() => toggleSingle(setTerms2, terms2)}
          />

          <AgreementItem
            title="통신사 가입 약관"
            description="이동통신 서비스 가입에 필요한 약관입니다."
            required
            checked={terms3}
            onClick={() => toggleSingle(setTerms3, terms3)}
          />

          <AgreementItem
            title="위치정보 이용 동의"
            description="서비스 이용 품질 향상을 위해 위치정보를 활용합니다."
            checked={terms4}
            onClick={() => toggleSingle(setTerms4, terms4)}
          />
        </div>

        <div className="mt-8 flex flex-col items-center text-sm">
          <Image src={mascot} alt="mascot" width={60} height={60} />
          <p
            className={`mt-2 transition-opacity duration-300 ${
              requiredAgreed ? "opacity-0" : "text-red-500 opacity-100"
            }`}>
            필수 약관에 모두 동의해 주세요
          </p>
        </div>

        <button
          disabled={!requiredAgreed}
          className={`mt-8 w-full rounded-2xl py-4 font-semibold transition ${
            requiredAgreed
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "border-2 border-gray-200 bg-white text-gray-500"
          }`}>
          동의하고 가입 완료
        </button>
      </div>
    </div>
  );
}

function AgreementItem({
  title,
  description,
  required,
  checked,
  onClick,
}: {
  title: string;
  description?: string;
  required?: boolean;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-start rounded-2xl border px-4 py-4 shadow-sm transition ${
        checked ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
      }`}>
      <Check className={`mt-1 mr-3 h-5 w-5 ${checked ? "text-blue-500" : "text-gray-300"}`} />

      <div className="flex flex-col">
        <p className="text-sm font-medium">
          {title}
          <span
            className={`ml-2 rounded px-2 py-0.5 text-xs ${
              required ? "bg-red-100 text-red-500" : "bg-gray-100 text-blue-950"
            }`}>
            {required ? "필수" : "선택"}
          </span>
        </p>

        {description && <p className="mt-1 text-[11px] text-gray-400">{description}</p>}
      </div>
    </div>
  );
}
