import Image from "next/image";

import { characterImages } from "@/constants/characterImages";
import type { CharaterType } from "@/models/characters/characterTypes";

interface Props {
  character: CharaterType;
}

export function CharacterImage({ character }: Props) {
  const image = characterImages[character.characterName].image;
  const chracterName = characterImages[character.characterName].name;

  return (
    <div className="flex flex-col items-center gap-6 font-medium">
      <Image src={image} alt={character.characterName} width={220} height={220} />
      <h2 className="text-primary-500 text-center text-lg font-semibold">{chracterName}</h2>
      <p className="text-md text-center text-neutral-500">{character.shortDesc}</p>
      <div className="flex gap-2">
        {character.tags.map((tag) => (
          <span key={tag} className="text-md font-medium text-neutral-900">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
