import { getXpToNextLevel } from "./progression";

type LevelProgress = {
  level: number;
  currentXp: number;
};

export const applyXp = ({
  gainedXp,
  progress,
}: {
  progress: LevelProgress;
  gainedXp: number;
}): LevelProgress => {
  let { level, currentXp } = progress;
  let totalXp = currentXp + gainedXp;

  let xpNeeded = getXpToNextLevel({ level });

  while (totalXp >= xpNeeded) {
    totalXp -= xpNeeded;
    level += 1;
    xpNeeded = getXpToNextLevel({ level });
  }

  return {
    level,
    currentXp: totalXp,
  };
};
