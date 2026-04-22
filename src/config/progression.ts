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
      { minDay: 30, maxDay: Infinity, xp: 25 },
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

export const getXpToNextLevel = ({ level }: { level: number }): number => {
  return Math.round(
    GAME_BALANCE.xpToNextLevel.base *
      Math.pow(GAME_BALANCE.xpToNextLevel.growthRate, level - 1)
  );
};

export const getRealmMultiplier = ({
  realmDifficulty,
}: {
  realmDifficulty: number;
}): number => {
  return 1 + realmDifficulty * GAME_BALANCE.realmDifficulty.multiplierPerPoint;
};

export const getMissionXp = ({
  difficulty,
}: {
  difficulty: IMissionDifficulty;
}): number => {
  return GAME_BALANCE.missionXp[difficulty];
};

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
