"use client";

import styles from "./index.module.scss";

interface IExperienceBarProps {
  xp: number;
  level: number;
  xpForNextLevel: number;
}

export const ExperienceBar = ({ xp, level, xpForNextLevel }: IExperienceBarProps) => {
  const progress = Math.min((xp / xpForNextLevel) * 100, 100);

  return (
    <div className={styles.wrapper}>
      <div className={styles.barTrack}>
        <div className={styles.barFill} style={{ width: `${progress}%` }} />
        <span className={styles.barLabel}>
          ✦ {xp} / {xpForNextLevel} XP
        </span>
      </div>
      <div className={styles.levelBadge}>
        <span className={styles.levelLabel}>nível</span>
        <span className={styles.levelValue}>{level}</span>
      </div>
    </div>
  );
};
