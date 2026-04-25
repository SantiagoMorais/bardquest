export const GAME_BALANCE = {
  xpToNextLevel: {
    base: 100,
    growthRate: 1.22,
  },
  missionXp: {
    easy: 20,
    medium: 40,
    hard: 70,
    epic: 110,
  },
  songXp: {
    easy: 50,
    medium: 90,
    hard: 140,
    boss: 220,
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

export type IMissionDifficulty = keyof typeof GAME_BALANCE.missionXp;
export type ISongDifficulty = keyof typeof GAME_BALANCE.songXp;

/**
 * Returns the XP required to reach the next level.
 * Use when checking if the player can level up.
 */
export const getXpToNextLevel = ({ level }: { level: number }): number => {
  return Math.round(
    GAME_BALANCE.xpToNextLevel.base *
      Math.pow(GAME_BALANCE.xpToNextLevel.growthRate, level - 1)
  );
};

/**
 * Returns the XP multiplier based on the realm difficulty.
 * Use when scaling song rewards for harder realms.
 */
export const getRealmMultiplier = ({
  realmDifficulty,
}: {
  realmDifficulty: number;
}): number => {
  return 1 + realmDifficulty * GAME_BALANCE.realmDifficulty.multiplierPerPoint;
};

/**
 * Returns the base XP for a mission difficulty.
 * Use when rewarding the player after completing a mission.
 */
export const getMissionXp = ({
  difficulty,
}: {
  difficulty: IMissionDifficulty;
}): number => {
  return GAME_BALANCE.missionXp[difficulty];
};

/**
 * Returns the final XP for a song based on its difficulty and realm difficulty.
 * Use when rewarding the player after completing a song.
 */
export const getSongXp = ({
  difficulty,
  realmDifficulty,
}: {
  difficulty: ISongDifficulty;
  realmDifficulty: number;
}): number => {
  const baseXp = GAME_BALANCE.songXp[difficulty];
  return Math.round(baseXp * getRealmMultiplier({ realmDifficulty }));
};

/**
 * Returns the bonus XP for defeating a boss.
 * Use right after the player clears a boss song.
 */
export const getBossClearBonus = ({
  realmDifficulty,
}: {
  realmDifficulty: number;
}): number => {
  return (
    GAME_BALANCE.bossClearBonus.base +
    realmDifficulty * GAME_BALANCE.bossClearBonus.perDifficulty
  );
};

/**
 * Returns the bonus XP for completing an entire realm.
 * Use after the player finishes the boss and clears the realm.
 */
export const getRealmCompletionBonus = ({
  realmDifficulty,
}: {
  realmDifficulty: number;
}): number => {
  return (
    GAME_BALANCE.realmCompletionBonus.base +
    realmDifficulty * GAME_BALANCE.realmCompletionBonus.perDifficulty
  );
};

/**
 * Returns the streak bonus XP for the current streak day.
 * Use when rewarding the player for daily practice.
 */
export const getStreakBonus = ({ streakDays }: { streakDays: number }): number => {
  let bonus = 0;

  const range = GAME_BALANCE.streak.dailyBonus.find(
    ({ minDay, maxDay }) => streakDays >= minDay && streakDays <= maxDay
  );

  if (range) {
    bonus += range.xp;
  }

  bonus += GAME_BALANCE.streak.milestones[streakDays] ?? 0;

  return bonus;
};
