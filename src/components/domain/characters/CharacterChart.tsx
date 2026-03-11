"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import type { TscoreIndex } from "@/models/characters/characterTypes";

import { CustomRadarTick } from "./CustomRadarTick";

interface Props {
  tscoreIndex: TscoreIndex;
}

function tscoreToRadarData(tscore: TscoreIndex) {
  return [
    { subject: "탐험", score: tscore.exploreTscore },
    { subject: "혜택", score: tscore.benefitTrendTscore },
    { subject: "멀티", score: tscore.multiDeviceTscore },
    { subject: "가정", score: tscore.familyHomeTscore },
    { subject: "보안", score: tscore.internetSecurityTscore },
    { subject: "안정", score: tscore.stabilityTscore },
  ];
}

export function CharacterChart({ tscoreIndex }: Props) {
  const data = tscoreToRadarData(tscoreIndex);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />

          <PolarAngleAxis dataKey="subject" tick={<CustomRadarTick />} />

          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />

          <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
