"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import type { ChartData, TscoreIndex } from "@/models/characters/characterTypes";

interface Props {
  tscoreIndex: TscoreIndex;
}

function tscoreToRadarData(tscore: TscoreIndex): ChartData[] {
  return [
    { subject: "탐색", score: tscore.exploreTscore },
    { subject: "혜택", score: tscore.benefitTrendTscore },
    { subject: "멀티", score: tscore.multiDeviceTscore },
    { subject: "결합", score: tscore.familyHomeTscore },
    { subject: "보안", score: tscore.internetSecurityTscore },
    { subject: "안정", score: tscore.stabilityTscore },
  ];
}

const scoreDescription: Record<ChartData["subject"], string> = {
  탐색: "새로운 서비스 탐색 및 요금제 변경에 대한 행동 성향",
  혜택: "혜택/트렌드 및 디지털 서비스에 대한 민감도가 높은 성향",
  멀티: "여러가지 디바이스 활용 및 데이터 쉐어링 소진율이 높은 성향",
  결합: "가족/홈 결합도가 높고, 유아 자녀 보유 가구의 성향",
  보안: "보안 서비스 및 인터넷/가족 결합도가 높은 성향",
  안정: "상품 탐색률이 낮거나, 요금제를 장기 유지하는 안정성을 추구하는 성향",
};

export function CharacterRadarChart({ tscoreIndex }: Props) {
  const data = tscoreToRadarData(tscoreIndex);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />

          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#132c5e", fontSize: 14, fontWeight: 600 }}
          />

          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />

          <Radar
            dataKey="score"
            stroke="#497aed"
            fill="#497aed"
            fillOpacity={0.4}
            dot={{
              r: 3,
              fill: "#497aed",
              fillOpacity: 1,
              stroke: "#497aed",
            }}
            activeDot={false}
            isAnimationActive
            animationDuration={700}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
