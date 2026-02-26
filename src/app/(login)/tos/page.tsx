"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import splash from "@/assets/images/splash.png";

type TermKey = "all" | "service" | "privacy" | "carrier" | "location";

const TERMS = [
  {
    key: "service",
    title: "LG U+ 서비스 이용 약관",
    desc: "서비스 이용에 관한 기본 약관입니다.",
    required: true,
  },
  {
    key: "privacy",
    title: "개인정보 수집 및 이용 동의",
    desc: "서비스 제공을 위한 개인정보 처리에 관한 동의입니다.",
    required: true,
  },
  {
    key: "carrier",
    title: "통신사 가입 약관",
    desc: "이동통신 서비스 가입에 필요한 약관입니다.",
    required: true,
  },
  {
    key: "location",
    title: "위치정보 이용 동의",
    desc: "서비스 이용 품질 향상을 위해 위치정보를 활용합니다.",
    required: false,
  },
] as const;

function CheckIcon({ checked }: { checked: boolean }) {
  return (
    <div
      className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${
        checked ? "border-primary bg-primary" : "bg-neutral-0 border-neutral-300"
      }`}>
      {checked && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 6L9 17l-5-5"
            stroke="white"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

function Badge({ required }: { required: boolean }) {
  return required ? (
    <span className="bg-hit-100 text-hit-500 ml-2 rounded px-2 py-0.5 text-[10px] font-semibold">
      필수
    </span>
  ) : (
    <span className="bg-secondary-100 text-secondary-700 ml-2 rounded px-2 py-0.5 text-[10px] font-semibold">
      선택
    </span>
  );
}

function StepIndicator() {
  return (
    <div className="mt-6 flex items-center justify-between text-xs">
      <div className="flex items-center gap-2">
        <div className="bg-secondary-500 text-neutral-0 flex h-6 w-6 items-center justify-center rounded-full font-semibold">
          1
        </div>
        <span className="font-semibold text-neutral-900">약관 동의</span>
      </div>

      <div className="bg-secondary-500 mx-2 h-0.5 flex-1" />

      <div className="flex items-center gap-2">
        <div className="bg-secondary-500 text-neutral-0 flex h-6 w-6 items-center justify-center rounded-full font-semibold">
          2
        </div>
        <span className="font-semibold text-neutral-900">회원 가입</span>
      </div>

      <div className="bg-secondary-500 mx-2 h-0.5 flex-1" />

      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-300 font-semibold text-neutral-700">
          3
        </div>
        <span className="text-neutral-500">완료</span>
      </div>
    </div>
  );
}

function TermCard({
  title,
  desc,
  required,
  checked,
  onClick,
}: {
  title: string;
  desc: string;
  required: boolean;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border px-4 py-4 text-left shadow-sm transition ${
        checked ? "border-primary bg-primary-100" : "bg-neutral-0 border-neutral-200"
      }`}>
      <div className="flex items-start gap-3">
        <CheckIcon checked={checked} />
        <div className="flex-1">
          <div className="flex items-center">
            <p className="text-[14px] font-bold text-neutral-900">{title}</p>
            <Badge required={required} />
          </div>
          <p className="mt-1 text-[12px] text-neutral-500">{desc}</p>
        </div>
      </div>
    </button>
  );
}

export default function TermsPage() {
  const [state, setState] = useState<Record<TermKey, boolean>>({
    all: false,
    service: false,
    privacy: false,
    carrier: false,
    location: false,
  });

  const requiredKeys = useMemo(() => TERMS.filter((t) => t.required).map((t) => t.key), []);
  const isAllChecked = useMemo(() => TERMS.every((t) => state[t.key]), [state]);
  const isRequiredOk = useMemo(() => requiredKeys.every((k) => state[k]), [state, requiredKeys]);

  const toggleOne = (key: Exclude<TermKey, "all">) => {
    setState((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      next.all = TERMS.every((t) => next[t.key]);
      return next;
    });
  };

  const toggleAll = () => {
    const next = !isAllChecked;
    setState({
      all: next,
      service: next,
      privacy: next,
      carrier: next,
      location: next,
    });
  };

  return (
    <div className="bg-background flex min-h-screen justify-center px-6 py-10">
      <div className="w-full max-w-[402px]">
        <h1 className="font-regular text-[20px] text-neutral-900">약관 동의</h1>
        <p className="mt-1 text-[12px] text-neutral-500">
          서비스 이용을 위해 아래 약관에 동의해주세요
        </p>

        <StepIndicator />

        <div className="mt-6 space-y-3">
          <TermCard
            title="전체 동의하기"
            desc="필수 및 선택 항목을 모두 포함합니다"
            required={false}
            checked={isAllChecked}
            onClick={toggleAll}
          />

          {TERMS.map((t) => (
            <TermCard
              key={t.key}
              title={t.title}
              desc={t.desc}
              required={t.required}
              checked={state[t.key]}
              onClick={() => toggleOne(t.key)}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center">
          <Image src={splash} alt="robot" width={70} height={70} />
          {!isRequiredOk && (
            <p className="text-primary-700 mt-2 text-[12px] font-semibold">
              필수 약관에 모두 동의해 주세요
            </p>
          )}
        </div>

        <button
          type="button"
          disabled={!isRequiredOk}
          className={`mt-6 w-full rounded-2xl border py-3 text-sm font-semibold transition ${
            isRequiredOk
              ? "border-primary bg-primary-100 text-primary-700"
              : "border-neutral-300 bg-neutral-100 text-neutral-400"
          }`}>
          동의하고 가입 완료
        </button>
      </div>
    </div>
  );
}
