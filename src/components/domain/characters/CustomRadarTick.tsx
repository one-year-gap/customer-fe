import { radarIcons } from "@/constants/characterImages";

interface Props {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
}

export function CustomRadarTick({ x = 0, y = 0, payload }: Props) {
  if (!payload) return null;

  const icon = radarIcons[payload.value as keyof typeof radarIcons];

  return (
    <g transform={`translate(${x - 12}, ${y - 12})`}>
      <image href={icon.src} width={24} height={24} />
    </g>
  );
}
