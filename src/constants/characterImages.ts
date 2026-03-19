import c6 from "@/assets/images/characters/HoleExplorer.png";
import c2 from "@/assets/images/characters/HoleGravity.png";
import c5 from "@/assets/images/characters/HoleGuardian.png";
import c3 from "@/assets/images/characters/HoleOctopus.png";
import c1 from "@/assets/images/characters/HoleSherlock.png";
import c4 from "@/assets/images/characters/HoleSurfer.png";

export const characterImages = {
  SPACE_SHERLOCK: {
    image: c1,
    name: "우주 셜록 홈즈",
    shortdesc: "1원 단위의 누수도 허락하지 않는다!",
    description: "혜택과 요금제 정보를 분석해 가장 유리한 선택을 찾는 전략가형 사용자",
    tags: ["혜택", "분석", "합리적"],
  },
  SPACE_GRAVITY: {
    image: c2,
    name: "우주 그래비티 홈즈",
    shortdesc: "우리는 뭉쳐야 싸고, 흩어지면 비싸다.",
    description: "가족 결합과 홈 서비스를 중심으로 안정적인 통신 환경을 만드는 사용자",
    tags: ["가족", "결합", "홈서비스"],
  },
  SPACE_OCTOPUS: {
    image: c3,
    name: "우주 문어발",
    shortdesc: "기기는 늘어날수록 좋다!",
    description: "여러 디바이스와 데이터를 적극적으로 활용하는 멀티 디바이스 사용자",
    tags: ["멀티디바이스", "데이터쉐어", "활용"],
  },
  SPACE_SURFER: {
    image: c4,
    name: "우주 트렌드 서퍼",
    shortdesc: "요금제는 콘텐츠를 담는 그릇일 뿐!",
    description: "새로운 요금제와 서비스를 탐색하며 변화를 즐기는 사용자",
    tags: ["탐색", "신규서비스", "트렌드"],
  },
  SPACE_GUARDIAN: {
    image: c5,
    name: "우주 세이프 가디언",
    shortdesc: "나의 우주(개인정보)는 내가 지킨다!",
    description: "보안과 안전을 중요하게 생각하는 신중한 사용자",
    tags: ["보안", "안전", "인터넷"],
  },
  SPACE_EXPLORER: {
    image: c6,
    name: "우주 탐험가",
    shortdesc: "복잡한 건 질색! 내 요금제는 늘 평화롭다.",
    description: "복잡한 변화보다 현재의 안정적인 통신 환경을 선호하는 사용자",
    tags: ["안정", "유지", "평화"],
  },
};
