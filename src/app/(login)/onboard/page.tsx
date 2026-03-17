"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import characterSecond from "@/assets/images/HoleFlag.png";
import characterFirst from "@/assets/images/HoleGood.png";
import characterThird from "@/assets/images/HoleStar.png";
import characterFourth from "@/assets/images/HoleStar.png";
import onboardFirst from "@/assets/images/onboardFirst.png";
import onboardFourth from "@/assets/images/onboardFourth.png";
import onboardSecond from "@/assets/images/onboardSecond.png";
import onboardThird from "@/assets/images/onboardThird.png";
import OnboardButton from "@/components/common/CommonButton";
const ONBOARDING_DATA = [
  {
    id: 1,
    image: onboardFirst,
    character: characterFirst,
    description: "나의 캐릭터 유형과 이용기록을 이용한\n나에게 꼭 맞는 맞춤 요금제 추천!",
  },
  {
    id: 2,
    image: onboardSecond,
    character: characterSecond,
    description: "이 상품이 왜 추천되었나요?\n상품 추천 페이지에서 확인 가능해요!",
  },
  {
    id: 3,
    image: onboardThird,
    character: characterThird,
    description: "나의 캐릭터 유형이 궁금한가요?\n캐릭터 유형 페이지에서 확인 가능해요!",
  },
  {
    id: 4,
    image: onboardFourth,
    character: characterFourth,
    description: "메인 화면에서는\n사용량들과 쿠폰, 추천들을 구경하러 갈 수 있어요!",
  },
];
export default function OnboardPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const totalSteps = ONBOARDING_DATA.length;
  const isOdd = (step + 1) % 2 !== 0;
  const currentContent = ONBOARDING_DATA[step];

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="bg-neutral-0 flex min-h-screen flex-col items-center justify-between p-6">
      {/* 1. 상단 인디케이터 (점 4개) */}
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === step ? "bg-neutral-800" : "bg-neutral-300"
            }`}
          />
        ))}
      </div>

      {/* 2. 메인 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative mb-6 h-[600px] w-[500px]">
          {/* 이미지 애니메이션 처리를 위해 key값 부여 */}
          <div
            key={`char-${step}`} // 캐릭터 변경 시에도 애니메이션 적용
            className={`absolute bottom-0 z-10 h-35 w-35 transition-all duration-500 ease-in-out ${
              isOdd ? "left-10" : "right-10"
            }`}>
            <Image
              src={currentContent.character}
              alt="character"
              fill
              className="animate-in fade-in zoom-in-75 object-contain duration-700"
            />
          </div>
          <Image
            fill
            key={step}
            src={currentContent.image}
            alt="onboarding image"
            className="animate-in fade-in slide-in-from-right-4 object-contain duration-500"
          />
        </div>
        <p className="text-md items-center text-center whitespace-pre-line text-neutral-900">
          {currentContent.description}
        </p>
      </div>

      {/* 3. 하단 버튼 */}
      <div className="flex w-full items-center justify-center pt-8">
        <OnboardButton variant="outline" size="onboard" onClick={handleNext}>
          {step === totalSteps - 1 ? "시작하기" : "다음"}
        </OnboardButton>
      </div>
    </div>
  );
}
