"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { ChevronDown, ChevronUp } from "lucide-react";

import star from "@/assets/images/characters/StarPick.png";
import type { ChartData, ChartSubject, TscoreIndex } from "@/models/characters/characterTypes";

interface Props {
  tscoreIndex: TscoreIndex;
  onSubjectClick: (subject: ChartSubject) => void;
}

function tscoreToBarData(tscore: TscoreIndex): ChartData[] {
  return [
    { subject: "탐색", score: tscore.exploreTscore },
    { subject: "혜택", score: tscore.benefitTrendTscore },
    { subject: "멀티", score: tscore.multiDeviceTscore },
    { subject: "가족", score: tscore.familyHomeTscore },
    { subject: "보안", score: tscore.internetSecurityTscore },
    { subject: "안정", score: tscore.stabilityTscore },
  ];
}

export function CharacterBarChart({ tscoreIndex, onSubjectClick }: Props) {
  const [animated, setAnimated] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const data = [...tscoreToBarData(tscoreIndex)].sort((a, b) => b.score - a.score);
  const visibleData = expanded ? data : data.slice(0, 3);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setAnimated(true);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative flex flex-col gap-4 rounded-xl border border-neutral-300 bg-neutral-50 px-4 pt-4">
      <Image
        className="absolute -top-4 right-2"
        src={star}
        alt="별 아이콘"
        width={27}
        height={27}
      />
      <p className="font-medium text-neutral-900">사용 패턴 분석</p>

      <div className="flex flex-col gap-3">
        {visibleData.map((item) => {
          const percentage = Math.min(item.score, 100);
          const color = "bg-secondary-500";

          return (
            <div
              role="button"
              tabIndex={0}
              key={item.subject}
              className="flex items-center gap-2"
              onClick={() => onSubjectClick(item.subject)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSubjectClick(item.subject);
                }
              }}>
              <span className="cursor-pointer text-xs font-medium text-neutral-900 hover:text-neutral-500">
                {item.subject}
              </span>
              <div className="bg-secondary-300 h-2 flex-1 cursor-pointer rounded-full">
                <div
                  className={`${color} hover:bg-secondary-700 h-2 rounded-full transition-all duration-700 ease-out`}
                  style={{ width: animated ? `${percentage}%` : "0%" }}
                />
              </div>
              <span className="cursor-pointer text-xs font-medium text-neutral-900 hover:text-neutral-500">
                {Math.round(item.score)}점
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center text-xs font-medium text-neutral-500">
        {!expanded && (
          <button
            className="flex cursor-pointer items-center pb-3"
            onClick={() => setExpanded(true)}>
            더보기
            <ChevronDown className="h-4 w-4" />
          </button>
        )}
        {expanded && (
          <button
            className="flex cursor-pointer items-center pb-3"
            onClick={() => setExpanded(false)}>
            닫기
            <ChevronUp className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
