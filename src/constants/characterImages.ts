import c1 from "@/assets/images/characters/HoleDefault.png";
import c7 from "@/assets/images/characters/HoleExplorer.png";
import c3 from "@/assets/images/characters/HoleGravity.png";
import c6 from "@/assets/images/characters/HoleGuardian.png";
import c4 from "@/assets/images/characters/HoleOctopus.png";
import c2 from "@/assets/images/characters/HoleSherlock.png";
import c5 from "@/assets/images/characters/HoleSurfer.png";

// export const characterImages = {
//   DEFAULT: c1,
//   SPACE_SHERLOCK: c2,
//   SPACE_GRAVITY: c3,
//   SPACE_OCTOPUS: c4,
//   SPACE_SURFER: c5,
//   SPACE_GUARDIAN: c6,
//   SPACE_EXPLORER: c7,
// };

export const characterImages = {
  DEFAULT: {
    image: c1,
    name: "홀맨",
  },
  SPACE_SHERLOCK: {
    image: c2,
    name: "우주 셜록 홈즈",
  },
  SPACE_GRAVITY: {
    image: c3,
    name: "우주 그래비티 홈즈",
  },
  SPACE_OCTOPUS: {
    image: c4,
    name: "우주 문어발",
  },
  SPACE_SURFER: {
    image: c5,
    name: "우주 트렌드 서퍼",
  },
  SPACE_GUARDIAN: {
    image: c6,
    name: "우주 세이프 가디언",
  },
  SPACE_EXPLORER: {
    image: c7,
    name: "우주 탐험가",
  },
};

// ////////////////////////////////////

import stability from "@/assets/images/characters/HoleExplorer.png";
import family from "@/assets/images/characters/HoleGravity.png";
import security from "@/assets/images/characters/HoleGuardian.png";
import multi from "@/assets/images/characters/HoleOctopus.png";
import benefit from "@/assets/images/characters/HoleSherlock.png";
import explore from "@/assets/images/characters/HoleSurfer.png";

export const radarIcons = {
  탐험: explore,
  혜택: benefit,
  멀티: multi,
  가정: family,
  보안: security,
  안정: stability,
};
