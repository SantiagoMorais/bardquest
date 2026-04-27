"use client";

import { Modal } from "@/components/modal";
import classNames from "classnames";
import { LuStar } from "react-icons/lu";
import styles from "./index.module.scss";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type LevelTier = "bronze" | "silver" | "gold" | "epic";

type LevelRange = {
  min: number;
  max: number;
  title: string;
  flavor: string;
};

const LEVEL_RANGES: LevelRange[] = [
  {
    min: 2,
    max: 5,
    title: "Aprendiz das Notas",
    flavor:
      "Seus primeiros acordes ecoam pelos vilarejos. A estrada musical finalmente começou.",
  },
  {
    min: 6,
    max: 10,
    title: "Trovador Errante",
    flavor:
      "Seu nome já percorre tavernas e feiras. Onde há fogueira, há espaço para sua música.",
  },
  {
    min: 11,
    max: 15,
    title: "Bardo das Estradas",
    flavor: "Você atravessa reinos levando esperança em forma de melodia.",
  },
  {
    min: 16,
    max: 20,
    title: "Guardião da Harmonia",
    flavor: "Canções antigas despertam quando seus dedos tocam as cordas e teclas.",
  },
  {
    min: 21,
    max: 25,
    title: "Mestre da Melodia",
    flavor: "Discípulos observam seus movimentos tentando entender sua arte.",
  },
  {
    min: 26,
    max: 30,
    title: "Virtuoso dos Reinos",
    flavor: "Sua música já influencia povos inteiros e une cidades rivais.",
  },
  {
    min: 31,
    max: 35,
    title: "Arauto Celestial",
    flavor: "Notas brilhantes cruzam os céus e anunciam sua chegada.",
  },
  {
    min: 36,
    max: 40,
    title: "Lenda da Harmonia",
    flavor: "Histórias sobre sua jornada são contadas por bardos em terras distantes.",
  },
  {
    min: 41,
    max: 45,
    title: "Sábio das Mil Canções",
    flavor: "Os antigos se curvam ao ouvir a profundidade de sua arte.",
  },
  {
    min: 46,
    max: 50,
    title: "Avatar Musical",
    flavor:
      "Você transcendeu técnica e emoção. Sua presença já inspira sem tocar uma nota.",
  },
];

function getLevelRange(level: number): LevelRange | undefined {
  return LEVEL_RANGES.find((range) => level >= range.min && level <= range.max);
}

export function getLevelTitle(level: number): string {
  if (level <= 1) return "Iniciante";
  const range = getLevelRange(level);
  if (range) return range.title;
  if (level <= 75) return "Lenda Viva";
  if (level <= 100) return "Arquimestre do Som";
  return `Entidade Musical Nível ${level}`;
}

export function getLevelFlavor(level: number): string {
  if (level <= 1) return "Toda grande jornada começa com uma única nota.";
  const range = getLevelRange(level);
  if (range) return range.flavor;
  if (level <= 75) return "Bardos de todo o mundo cantam suas façanhas.";
  if (level <= 100) return "Sua música já não pertence apenas aos mortais.";
  return "Sua melodia transcende os limites do conhecido.";
}

export function getLevelTier(level: number): LevelTier {
  if (level <= 10) return "bronze";
  if (level <= 25) return "silver";
  if (level <= 40) return "gold";
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
        <div className={classNames(styles.glow, TIER_GLOW_CLASS[tier])} />

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

        <div className={styles.body}>
          <div className={styles.ornamentRow}>
            <span className={styles.ornamentLine} />
            <span className={styles.ornamentGlyph}>⚜ ✦ ⚜</span>
            <span className={styles.ornamentLine} />
          </div>

          <p className={styles.callToArms}>Parabéns, Bardo!</p>

          <h2 className={styles.title}>{getLevelTitle(newLevel)}</h2>

          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerDot} />
            <span className={styles.dividerLine} />
          </div>

          <p className={styles.flavor}>{getLevelFlavor(newLevel)}</p>

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
