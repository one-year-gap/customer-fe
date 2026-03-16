"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import type { ChartData, ChartSubject, TscoreIndex } from "@/models/characters/characterTypes";

interface Props {
  tscoreIndex: TscoreIndex;
  onSubjectClick: (subject: ChartSubject) => void;
}

function tscoreToRadarData(tscore: TscoreIndex): ChartData[] {
  return [
    { subject: "탐색", score: tscore.exploreTscore },
    { subject: "혜택", score: tscore.benefitTrendTscore },
    { subject: "멀티", score: tscore.multiDeviceTscore },
    { subject: "가족", score: tscore.familyHomeTscore },
    { subject: "보안", score: tscore.internetSecurityTscore },
    { subject: "안정", score: tscore.stabilityTscore },
  ];
}

export function CharacterRadarChart({ tscoreIndex, onSubjectClick }: Props) {
  const data = tscoreToRadarData(tscoreIndex);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />

          <PolarAngleAxis
            dataKey="subject"
            tick={({ payload, x, y, textAnchor }) => (
              <text
                x={x}
                y={y}
                textAnchor={textAnchor}
                fill="#132c5e"
                fontSize={14}
                fontWeight={600}
                style={{ cursor: "pointer" }}
                onClick={() => onSubjectClick(payload.value as ChartSubject)}>
                {payload.value}
              </text>
            )}
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
