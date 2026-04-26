"use client";

import { IMission } from "@/interfaces/api/mission";
import classNames from "classnames";
import { LuScrollText, LuSwords } from "react-icons/lu";
import { Modal } from "@/components/modal";
import styles from "./index.module.scss";
import { IMissionDifficulty } from "@/config/progression";

// ---------------------------------------------------------------------------
// Maps (sem interpolação de string)
// ---------------------------------------------------------------------------

const DIFFICULTY_LABEL: Record<IMissionDifficulty, string> = {
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
  epic: "Épica",
};

const DIFFICULTY_FLAVOR: Record<IMissionDifficulty, string> = {
  easy: "Uma tarefa acessível para aquecer os dedos.",
  medium: "Um desafio que testará sua dedicação.",
  hard: "Apenas os bardos mais determinados chegam ao fim.",
  epic: "Uma missão lendária. A história guardará seu nome.",
};

const DIFFICULTY_HEADER_CLASS: Record<IMissionDifficulty, string> = {
  easy: styles.headerEasy,
  medium: styles.headerMedium,
  hard: styles.headerHard,
  epic: styles.headerEpic,
};

const DIFFICULTY_BADGE_CLASS: Record<IMissionDifficulty, string> = {
  easy: styles.badgeEasy,
  medium: styles.badgeMedium,
  hard: styles.badgeHard,
  epic: styles.badgeEpic,
};

const DIFFICULTY_GLOW_CLASS: Record<IMissionDifficulty, string> = {
  easy: styles.glowEasy,
  medium: styles.glowMedium,
  hard: styles.glowHard,
  epic: styles.glowEpic,
};

const DIFFICULTY_XP_CLASS: Record<IMissionDifficulty, string> = {
  easy: styles.xpEasy,
  medium: styles.xpMedium,
  hard: styles.xpHard,
  epic: styles.xpEpic,
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface INewMissionModalProps {
  mission: IMission | null;
  isOpen: boolean;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const NewMissionModal = ({ mission, isOpen, onClose }: INewMissionModalProps) => {
  if (!mission) return null;

  const { difficulty } = mission;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        {/* ── Glowing background pulse ── */}
        <div className={classNames(styles.glow, DIFFICULTY_GLOW_CLASS[difficulty])} />

        {/* ── Header band ── */}
        <div className={classNames(styles.header, DIFFICULTY_HEADER_CLASS[difficulty])}>
          <div className={styles.headerOrnamentLeft}>✦</div>
          <div className={styles.headerCenter}>
            <LuScrollText size={22} className={styles.headerIcon} />
            <span className={styles.headerEyebrow}>Nova Missão</span>
          </div>
          <div className={styles.headerOrnamentRight}>✦</div>
        </div>

        {/* ── Body ── */}
        <div className={styles.body}>
          {/* top ornament */}
          <div className={styles.ornamentRow}>
            <span className={styles.ornamentLine} />
            <span className={styles.ornamentGlyph}>⚔ ✦ ⚔</span>
            <span className={styles.ornamentLine} />
          </div>

          {/* call-to-arms */}
          <p className={styles.callToArms}>Um novo desafio se ergue no horizonte!</p>

          {/* mission title */}
          <h2 className={styles.missionTitle}>{mission.title}</h2>

          {/* difficulty + xp row */}
          <div className={styles.metaRow}>
            <span
              className={classNames(
                styles.difficultyBadge,
                DIFFICULTY_BADGE_CLASS[difficulty]
              )}
            >
              <LuSwords size={12} />
              {DIFFICULTY_LABEL[difficulty]}
            </span>

            <span
              className={classNames(styles.xpReward, DIFFICULTY_XP_CLASS[difficulty])}
            >
              ✦ {mission.xp_reward} XP
            </span>
          </div>

          {/* divider */}
          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerDot} />
            <span className={styles.dividerLine} />
          </div>

          {/* description */}
          <p className={styles.description}>{mission.description}</p>

          {/* flavor text */}
          <p className={styles.flavorText}>— {DIFFICULTY_FLAVOR[difficulty]}</p>

          {/* bottom ornament */}
          <div className={styles.ornamentRow}>
            <span className={styles.ornamentLine} />
            <span className={styles.ornamentGlyph}>✦</span>
            <span className={styles.ornamentLine} />
          </div>

          {/* CTA */}
          <button
            className={classNames(styles.acceptBtn, DIFFICULTY_HEADER_CLASS[difficulty])}
            onClick={onClose}
          >
            Aceitar o Desafio
          </button>
        </div>
      </div>
    </Modal>
  );
};
