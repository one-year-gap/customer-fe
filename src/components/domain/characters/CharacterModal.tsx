import Image from "next/image";

import { X } from "lucide-react";

import { characterImages } from "@/constants/characterImages";
import type { ChartSubject } from "@/models/characters/characterTypes";

interface Props {
  subject: ChartSubject | null;
  onClose: () => void;
}

const subjectCharacterMap: Record<ChartSubject, keyof typeof characterImages> = {
  탐색: "SPACE_SURFER",
  혜택: "SPACE_SHERLOCK",
  멀티: "SPACE_OCTOPUS",
  가족: "SPACE_GRAVITY",
  보안: "SPACE_GUARDIAN",
  안정: "SPACE_EXPLORER",
};

export function CharacterModal({ subject, onClose }: Props) {
  if (!subject) return null;

  const characterKey = subjectCharacterMap[subject];
  const character = characterImages[characterKey];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}>
      {/* 배경 */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* 모달창 */}
      <div
        role="dialog"
        aria-modal="true"
        tabIndex={0}
        autoFocus
        className="relative z-10 w-full rounded-xl border border-neutral-300 bg-neutral-50 p-4 shadow-lg">
        <button
          className="text-neutral-0 absolute top-3 right-3 cursor-pointer rounded-full bg-neutral-300 p-0.5 hover:bg-neutral-500"
          onClick={onClose}>
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col gap-3">
          <p className="text-primary-500 text-center text-lg font-semibold">{`나는 ${character.name}!`}</p>
          <div className="mt-4 flex justify-center">
            <Image src={character.image} alt={character.name} width={140} height={140} />
          </div>
          <div className="flex items-center justify-center gap-3">
            {character.tags.map((tag) => (
              <span key={tag} className="text-sm font-medium text-neutral-700">
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-center text-sm font-medium text-neutral-700">
            {character.description}
          </p>
        </div>
      </div>
    </div>
  );
}
