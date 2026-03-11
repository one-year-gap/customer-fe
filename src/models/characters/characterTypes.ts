export type ChartSubject = "탐색" | "혜택" | "멀티" | "가족" | "보안" | "안정";

export type ChartData = {
  subject: ChartSubject;
  score: number;
};

export type CharacterName =
  | "SPACE_SHERLOCK"
  | "SPACE_GRAVITY"
  | "SPACE_OCTOPUS"
  | "SPACE_SURFER"
  | "SPACE_GUARDIAN"
  | "SPACE_EXPLORER";

export interface TscoreIndex {
  snapshotDate: string | null;
  exploreTscore: number;
  benefitTrendTscore: number;
  multiDeviceTscore: number;
  familyHomeTscore: number;
  internetSecurityTscore: number;
  stabilityTscore: number;
}

export interface CharaterType {
  personaTypeId: number;
  characterName: CharacterName;
  shortDesc: string;
  characterDescription: string;
  version: number;
  isActive: boolean;
  tags: string[];
  tscoreIndex: TscoreIndex;
}

export interface CharaterTypeResponse {
  status: string;
  data: CharaterType;
  timestamp: string;
}
