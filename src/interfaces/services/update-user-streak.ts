export interface IResetUserStreak {
  userId: string;
}

export interface IIncreaseUserStreak {
  userId: string;
  currentStreak: number;
  lastPracticeDate: string;
  xp: number;
  level: number;
}
