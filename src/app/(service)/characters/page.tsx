// export default function CharacterPage() {
//   return (
//     <div className="grid grid-cols-4 gap-4 p-4">
//       <section className="col-span-4">
//         {/* <CharacterHead /> */}
//         <div className="font-display2 flex flex-col gap-3">
//           <span className="text-primary-500 text-lg">나의 고객 유형</span>
//           <span className="text-xs text-neutral-500">MBTI처럼 알아보는 나의 통신 스타일</span>
//         </div>
//       </section>
//       <section className="col-span-4">{/* <CharacterImage /> */}</section>
//       <section className="col-span-4">{/* <CharacterChart /> */}</section>
//     </div>
//   );
// }
"use client";
import { CharacterChart } from "@/components/domain/characters/CharacterChart";
import { CharacterImage } from "@/components/domain/characters/CharacterImage";
import { useCharacterType } from "@/lib/tanstack/query/characters/useCharacterType";

export default function CharacterPage() {
  const { data, isLoading } = useCharacterType();

  if (isLoading) return <div>캐릭터 배정중...</div>;

  if (!data) {
    return <div>에러</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <section className="col-span-4">
        <div className="font-display2 flex flex-col gap-3 pb-4">
          <span className="text-primary-500 text-lg">나의 고객 유형</span>
          <span className="text-xs text-neutral-500">MBTI처럼 알아보는 나의 통신 스타일</span>
        </div>
      </section>
      <CharacterImage character={data} />
      <CharacterChart tscoreIndex={data.tscoreIndex} />
    </div>
  );
}
