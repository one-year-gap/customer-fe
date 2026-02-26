import React from "react";

import { ArrowRight,ArrowUpDown, TrendingUp, X } from "lucide-react";
export default function CompareModal() {
  // props는 isOpen, chooseProdutId, onClose로 할 예정
  const d = {
    priceDiff: 20000,
    current: {
      name: "5G 프리미어 에센셜",
      price: 69000,
      data: "무제한 (일 2GB 후 Mbps)",
      call: "무제한",
      speed: "최대 10Gbps",
      benefits: ["넷플릭스 스탠다드", "지니 뮤직"],
    },
    target: {
      name: "5G 프리미어 슈퍼",
      price: 89000,
      data: "완전 무제한",
      call: "무제한",
      speed: "최대 10Gbps",
      benefits: ["넷플릭스 프리미엄", "디즈니+ 프리미엄", "지니 뮤직", "U+모바일tv"],
    },
  };

  //   if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 pb-[64px] backdrop-blur-[2px]"
      //   onClick={onClose}
    >
      <div
        className="animate-in slide-in-from-bottom relative max-h-[92vh] w-full max-w-[402px] overflow-y-auto rounded-t-[32px] bg-white shadow-2xl duration-300 sm:rounded-t-3xl" // onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 섹션 */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center">
              <ArrowUpDown size={20} className="text-secondary-500" />
            </div>
            <h2 className="font-display2 text-lg">요금제 비교하기</h2>
          </div>
          <button
            // onClick={onClose}
            className="text-neutral-0 rounded-full bg-neutral-400 p-1">
            <X size={20} />
          </button>
        </div>

        <div className="h-[1px] w-full bg-neutral-300" />

        <div className="space-y-5 p-4">
          <div className="bg-hit-100 text-hit-500 flex items-center justify-between rounded-lg p-5">
            <div>
              <p className="mb-0.5 text-xs text-neutral-700">월 요금 차이</p>
              <p className="text-lg">+{d.priceDiff.toLocaleString()}원</p>
            </div>
            <TrendingUp size={20} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* 좌측: 현재 요금제 */}
            <div className="bg-neutral-0 relative flex min-h-[320px] flex-col rounded-lg border-2 border-neutral-300 p-4 font-semibold">
              <span className="mb-1.5 p-1 text-xs text-neutral-500">현재</span>
              <h3 className="mb-1 text-sm">{d.current.name}</h3>
              <p className="text-md mb-5">
                {d.current.price.toLocaleString()}
                <span className="ml-0.5 text-xs text-neutral-500">원</span>
              </p>

              <div className="flex-1 space-y-2 text-xs">
                <div className="p-2">
                  <p className="mb-0.5 text-neutral-500">데이터</p>
                  <p>{d.current.data}</p>
                </div>
                <div className="p-2">
                  <p className="mb-0.5 text-neutral-500">통화</p>
                  <p>{d.current.call}</p>
                </div>
                <div className="p-2">
                  <p className="mb-0.5 text-neutral-500">속도</p>
                  <p>{d.current.speed}</p>
                </div>

                <p className="mb-1.5 p-2 text-neutral-500">혜택</p>
                <ul className="space-y-1">
                  {d.current.benefits.map((b, i) => (
                    <li key={i} className="px-2 text-neutral-500">
                      - {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 우측: 선택한 요금제 */}
            <div className="bg-neutral-0 border-secondary-500 relative flex min-h-[320px] flex-col rounded-lg border-2 p-4 font-semibold">
              <span className="bg-secondary-500 text-neutral-0 mb-1.5 w-fit rounded-md p-1 text-xs">
                변경
              </span>
              <h3 className="mb-1 text-sm">{d.target.name}</h3>
              <p className="text-md text-secondary-500 mb-5">
                {d.target.price.toLocaleString()}
                <span className="ml-0.5 text-xs text-neutral-500">원</span>
              </p>

              <div className="flex-1 space-y-2 text-xs">
                <div className="bg-secondary-100 rounded-lg p-2">
                  <p className="mb-0.5 text-neutral-500">데이터</p>
                  <p>{d.target.data}</p>
                </div>
                <div className="bg-secondary-100 rounded-lg p-2">
                  <p className="mb-0.5 text-neutral-500">통화</p>
                  <p>{d.target.call}</p>
                </div>
                <div className="bg-secondary-100 rounded-lg p-2">
                  <p className="mb-0.5 text-neutral-500">속도</p>
                  <p>{d.target.speed}</p>
                </div>

                <p className="text-secondary-500 mb-1.5 p-2">혜택</p>
                <ul className="space-y-1">
                  {d.target.benefits.map((b, i) => (
                    <li key={i} className="text-secondary-500 px-2">
                      - {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-neutral-300" />

          {/* 확인 버튼 */}
          <button className="bg-secondary-500 text-md text-neutral-0 flex w-full items-center justify-center gap-2 rounded-3xl py-2 font-semibold">
            <ArrowRight size={20} />
            요금제 바꾸기
          </button>
        </div>
      </div>
    </div>
  );
}
