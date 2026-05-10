export const GAME_BALANCE = {
  xpToNextLevel: {
    base: 100,
    growthRate: 1.22,
  },
  songXp: {
    base: 45,
    perDifficultyPoint: 12,
    perRealmOrder: 4,
    bossMultiplier: 1.6,
  },
  realmDifficulty: {
    multiplierPerPoint: 0.06,
  },
  bossClearBonus: {
    base: 80,
    perDifficulty: 12,
  },
  realmCompletionBonus: {
    base: 120,
    perDifficulty: 20,
  },
  playerLevelBonus: {
    bonusPerLevel: 0.01,
    maxBonus: 0.25,
  },
  streak: {
    dailyBonus: [
      { minDay: 2, maxDay: 6, xp: 10 },
      { minDay: 7, maxDay: 13, xp: 15 },
      { minDay: 14, maxDay: 29, xp: 20 },
      { minDay: 30, maxDay: 45, xp: 25 },
      { minDay: 46, maxDay: 60, xp: 30 },
      { minDay: 61, maxDay: Infinity, xp: 40 },
    ],
    milestones: {
      7: 40,
      10: 50,
      14: 70,
      20: 100,
      30: 150,
      40: 200,
      50: 250,
    } as Record<number, number>,
  },
} as const;

export type IMissionDifficulty = "easy" | "medium" | "hard" | "epic";

/**
 * Returns the XP required to reach the next level.
 * Use when checking if the player can level up.
 */
export const getXpToNextLevel = ({ level }: { level: number }): number => {
  return Math.ceil(
    GAME_BALANCE.xpToNextLevel.base *
      Math.pow(GAME_BALANCE.xpToNextLevel.growthRate, level - 1)
  );
};

/**
 * Returns the XP multiplier based on the realm difficulty.
 * Use when scaling song and realm rewards.
 */
export const getRealmMultiplier = ({
  realmDifficulty,
}: {
  realmDifficulty: number;
}): number => {
  return 1 + realmDifficulty * GAME_BALANCE.realmDifficulty.multiplierPerPoint;
};

/**
 * Returns the XP multiplier based on the player's level.
 * Use when rewarding the player to give a small boost as they level up.
 */
export const getPlayerLevelMultiplier = ({ level }: { level: number }): number => {
  const safeLevel = Math.max(level, 1);

  const bonus = Math.min(
    (safeLevel - 1) * GAME_BALANCE.playerLevelBonus.bonusPerLevel,
    GAME_BALANCE.playerLevelBonus.maxBonus
  );

  return 1 + bonus;
};

/**
 * Returns the final XP for a mission based on its own reward and player level.
 * Use when rewarding the player after completing a mission.
 */
export const getMissionXp = ({
  xp_reward,
  level,
}: {
  xp_reward: number;
  level?: number;
}): number => {
  return Math.ceil(xp_reward * getPlayerLevelMultiplier({ level: level ?? 1 }));
};

/**
 * Returns the final XP for a song based on the user's base difficulty,
 * whether the song is a boss, and the player's level.
 * Use when rewarding the player after completing a song.
 */
export const getSongXp = ({
  realmBaseDifficulty,
  realmOrder,
  isBoss = false,
  level,
}: {
  realmBaseDifficulty: number;
  realmOrder: number;
  isBoss?: boolean;
  level?: number;
}): number => {
  const safeDifficulty = Math.min(Math.max(realmBaseDifficulty, 1), 10);
  const safeRealmOrder = Math.max(realmOrder, 1);

  const baseXp =
    GAME_BALANCE.songXp.base +
    safeDifficulty * GAME_BALANCE.songXp.perDifficultyPoint +
    safeRealmOrder * GAME_BALANCE.songXp.perRealmOrder;

  const bossMultiplier = isBoss ? GAME_BALANCE.songXp.bossMultiplier : 1;

  return Math.ceil(
    baseXp * bossMultiplier * getPlayerLevelMultiplier({ level: level ?? 1 })
  );
};

/**
 * Returns the bonus XP for defeating a boss.
 * Use right after the player clears a boss song.
 */
export const getBossClearBonus = ({
  realmDifficulty,
  level,
}: {
  realmDifficulty: number;
  level?: number;
}): number => {
  const baseBonus =
    GAME_BALANCE.bossClearBonus.base +
    realmDifficulty * GAME_BALANCE.bossClearBonus.perDifficulty;

  return Math.ceil(baseBonus * getPlayerLevelMultiplier({ level: level ?? 1 }));
};

/**
 * Returns the bonus XP for completing an entire realm.
 * Use after the player finishes the boss and clears the realm.
 */
export const getRealmCompletionBonus = ({
  realmDifficulty,
  level,
}: {
  realmDifficulty: number;
  level?: number;
}): number => {
  const baseBonus =
    GAME_BALANCE.realmCompletionBonus.base +
    realmDifficulty * GAME_BALANCE.realmCompletionBonus.perDifficulty;

  return Math.ceil(baseBonus * getPlayerLevelMultiplier({ level: level ?? 1 }));
};

/**
 * Returns the streak bonus XP for the current streak day.
 * Use when rewarding the player for daily practice.
 */
export const getStreakBonus = ({
  streakDays,
  level,
}: {
  streakDays: number;
  level?: number;
}): number => {
  let bonus = 0;

  const range = GAME_BALANCE.streak.dailyBonus.find(
    ({ minDay, maxDay }) => streakDays >= minDay && streakDays <= maxDay
  );

  if (range) {
    bonus += range.xp;
  }

  bonus += GAME_BALANCE.streak.milestones[streakDays] ?? 0;

  return Math.ceil(bonus * getPlayerLevelMultiplier({ level: level ?? 1 }));
};
