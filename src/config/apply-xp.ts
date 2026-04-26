import { getXpToNextLevel } from "./progression";

type LevelProgress = {
  level: number;
  currentXp: number;
  leveledUp?: boolean;
};

/**
 * Applies gained XP, handles level ups, and keeps leftover XP.
 * Use whenever the player earns XP from any source.
 */
export const applyXp = ({
  gainedXp,
  progress,
}: {
  progress: LevelProgress;
  gainedXp: number;
}): LevelProgress => {
  const { currentXp } = progress;
  let { level } = progress;
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
    leveledUp: level > progress.level,
  };
};
