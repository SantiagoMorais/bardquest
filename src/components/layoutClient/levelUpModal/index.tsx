"use client";

import { Modal } from "@/components/modal";
import classNames from "classnames";
import { LuStar } from "react-icons/lu";
import styles from "./index.module.scss";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const LEVEL_TITLE: Record<number, string> = {
  2: "Aprendiz das Notas",
  3: "Trovador Iniciante",
  4: "Músico Errante",
  5: "Bardo das Estradas",
  6: "Cantor dos Reinos",
  7: "Mestre da Melodia",
  8: "Guardião do Acorde",
  9: "Sábio da Harmonia",
  10: "Lenda Viva",
};

const LEVEL_FLAVOR: Record<number, string> = {
  2: "Seus primeiros acordes ecoam pelos vilarejos. A jornada começa.",
  3: "As tavernas já guardam seu lugar reservado ao canto da lareira.",
  4: "Estradas desconhecidas chamam por suas canções.",
  5: "Cada reino ouve seu nome com crescente admiração.",
  6: "Rainhas e reis pedem sua música em seus banquetes.",
  7: "Discípulos buscam seus ensinamentos ao luar.",
  8: "Sua melodia ressoa até nas muralhas mais distantes.",
  9: "Os anciãos curvam a cabeça ao ouvir seu nome.",
  10: "Bardos de todo o mundo cantam suas façanhas.",
};

function getLevelTitle(level: number): string {
  return LEVEL_TITLE[level] ?? `Bardo Nível ${level}`;
}

function getLevelFlavor(level: number): string {
  return LEVEL_FLAVOR[level] ?? "Sua música transcende os limites do conhecido.";
}

function getLevelTier(level: number): "bronze" | "silver" | "gold" | "epic" {
  if (level <= 3) return "bronze";
  if (level <= 6) return "silver";
  if (level <= 9) return "gold";
  return "epic";
}

const TIER_HEADER_CLASS: Record<string, string> = {
  bronze: styles.headerBronze,
  silver: styles.headerSilver,
  gold: styles.headerGold,
  epic: styles.headerEpic,
};

const TIER_GLOW_CLASS: Record<string, string> = {
  bronze: styles.glowBronze,
  silver: styles.glowSilver,
  gold: styles.glowGold,
  epic: styles.glowEpic,
};

const TIER_LEVEL_CLASS: Record<string, string> = {
  bronze: styles.levelNumberBronze,
  silver: styles.levelNumberSilver,
  gold: styles.levelNumberGold,
  epic: styles.levelNumberEpic,
};

const TIER_BTN_CLASS: Record<string, string> = {
  bronze: styles.acceptBtnBronze,
  silver: styles.acceptBtnSilver,
  gold: styles.acceptBtnGold,
  epic: styles.acceptBtnEpic,
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ILevelUpModalProps {
  isOpen: boolean;
  newLevel: number | null;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const LevelUpModal = ({ isOpen, newLevel, onClose }: ILevelUpModalProps) => {
  if (!newLevel) return null;

  const tier = getLevelTier(newLevel);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        {/* ── Glow ── */}
        <div className={classNames(styles.glow, TIER_GLOW_CLASS[tier])} />

        {/* ── Stars burst (decoração) ── */}
        <div className={styles.starsBurst} aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className={styles.starParticle}
              style={{ "--i": i } as React.CSSProperties}
            >
              ✦
            </span>
          ))}
        </div>

        {/* ── Header ── */}
        <div className={classNames(styles.header, TIER_HEADER_CLASS[tier])}>
          <span className={styles.headerEyebrow}>Nível alcançado</span>
          <div className={styles.headerIconRow}>
            <LuStar size={18} className={styles.headerStarLeft} />
            <span className={classNames(styles.levelNumber, TIER_LEVEL_CLASS[tier])}>
              {newLevel}
            </span>
            <LuStar size={18} className={styles.headerStarRight} />
          </div>
        </div>

        {/* ── Body ── */}
        <div className={styles.body}>
          {/* ornament top */}
          <div className={styles.ornamentRow}>
            <span className={styles.ornamentLine} />
            <span className={styles.ornamentGlyph}>⚜ ✦ ⚜</span>
            <span className={styles.ornamentLine} />
          </div>

          <p className={styles.callToArms}>Parabéns, Bardo!</p>

          <h2 className={styles.title}>{getLevelTitle(newLevel)}</h2>

          {/* divider */}
          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerDot} />
            <span className={styles.dividerLine} />
          </div>

          <p className={styles.flavor}>{getLevelFlavor(newLevel)}</p>

          {/* ornament bottom */}
          <div className={styles.ornamentRow}>
            <span className={styles.ornamentLine} />
            <span className={styles.ornamentGlyph}>✦</span>
            <span className={styles.ornamentLine} />
          </div>

          <button
            className={classNames(styles.acceptBtn, TIER_BTN_CLASS[tier])}
            onClick={onClose}
          >
            Continuar a Jornada
          </button>
        </div>
      </div>
    </Modal>
  );
};
