"use client";

import { useState } from "react";
import styles from "./index.module.scss";
import { IKingdomWithFullSongs } from "@/interfaces/api/kingdom";
import { IKingdomSongStatus } from "@/interfaces/kingdom-card";
import { LuChevronLeft, LuChevronRight, LuLock } from "react-icons/lu";
import { Button } from "@/components/button";
import { cn } from "@/utils/functions/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface IKingdomLoreProps {
  kingdom: IKingdomWithFullSongs;
  songStatuses: Partial<Record<string, IKingdomSongStatus>>;
  onClose: () => void;
}

type LorePart = "part_1" | "part_2" | "part_3" | "final_part";

const LORE_PARTS: LorePart[] = ["part_1", "part_2", "part_3", "final_part"];

const LORE_PART_LABEL: Record<LorePart, string> = {
  part_1: "Parte I",
  part_2: "Parte II",
  part_3: "Parte III",
  final_part: "Epílogo",
};

const LORE_UNLOCK_HINT: Record<LorePart, string> = {
  part_1: "Conclua a 1ª canção para revelar este capítulo.",
  part_2: "Conclua a 2ª canção para revelar este capítulo.",
  part_3: "Conclua a 3ª canção para revelar este capítulo.",
  final_part: "Conclua todas as canções para revelar o epílogo.",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function countCompleted(statuses: Partial<Record<string, IKingdomSongStatus>>): number {
  return Object.values(statuses).filter((s) => s === "completed").length;
}

function isPartUnlocked(part: LorePart, completed: number): boolean {
  const required: Record<LorePart, number> = {
    part_1: 1,
    part_2: 2,
    part_3: 3,
    final_part: 4,
  };
  return completed >= required[part];
}

/**
 * Quebra o texto em parágrafos usando \n\n como separador.
 * Se não houver quebras duplas, tenta partir em ~400 chars nos pontos finais.
 */
function formatLoreContent(raw: string): string[] {
  if (!raw) return [];

  const byDouble = raw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (byDouble.length > 1) return byDouble;

  // fallback: tenta quebrar em sentenças agrupadas de ~400 chars
  const sentences = raw.match(/[^.!?]+[.!?]+/g) ?? [raw];
  const paragraphs: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length > 380 && current.length > 0) {
      paragraphs.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) paragraphs.push(current.trim());

  return paragraphs.length ? paragraphs : [raw];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const KingdomLore = ({ kingdom, songStatuses, onClose }: IKingdomLoreProps) => {
  const css = styles as Record<string, string>;
  const completed = countCompleted(songStatuses);
  const [activePart, setActivePart] = useState<LorePart>("part_1");

  const currentLore = kingdom.lore[activePart];
  const unlocked = isPartUnlocked(activePart, completed);
  const paragraphs = unlocked ? formatLoreContent(currentLore.content) : [];

  const currentIndex = LORE_PARTS.indexOf(activePart);
  const prevPart = currentIndex > 0 ? LORE_PARTS[currentIndex - 1] : null;
  const nextPart =
    currentIndex < LORE_PARTS.length - 1 ? LORE_PARTS[currentIndex + 1] : null;

  return (
    <div className={styles.loreWrapper}>
      {/* ── Header ── */}
      <div className={styles.loreHeader}>
        <Button
          className={styles.loreHeaderButton}
          iconLeft={LuChevronLeft}
          buttonStyle="tertiary"
          onClick={onClose}
          size="sm"
        >
          Voltar
        </Button>
        <h2 className={styles.loreKingdomTitle}>{kingdom.name}</h2>
        <span className={styles.loreKingdomSubtitle}>Crônicas do Reino</span>
      </div>

      <div className={styles.loreTabs} role="tablist">
        {LORE_PARTS.map((part) => {
          const isUnlocked = isPartUnlocked(part, completed);
          return (
            <button
              key={part}
              role="tab"
              aria-selected={activePart === part}
              className={cn(
                styles.loreTab,
                activePart === part && css["loreTab--active"],
                !isUnlocked && css["loreTab--locked"]
              )}
              onClick={() => setActivePart(part)}
              title={!isUnlocked ? LORE_UNLOCK_HINT[part] : undefined}
            >
              {!isUnlocked && <LuLock size={11} className={styles.loreTabLockIcon} />}
              {LORE_PART_LABEL[part]}
            </button>
          );
        })}
      </div>

      <div
        className={cn(
          styles.bookPage,
          !unlocked && css["bookPage--locked"],
          activePart === "final_part" && unlocked && css["bookPage--epilogue"]
        )}
      >
        <div className={styles.bookOrnamentTop}>✦ ✦ ✦</div>

        <h3 className={styles.bookChapterLabel}>{LORE_PART_LABEL[activePart]}</h3>
        <h4 className={styles.bookChapterTitle}>{currentLore.title}</h4>

        <div className={styles.bookDivider} />

        {unlocked ? (
          <div className={styles.bookText}>
            {paragraphs.map((p, i) => (
              <p key={i} className={styles.bookParagraph}>
                {i === 0 && <span className={styles.bookDropCap}>{p[0]}</span>}
                {i === 0 ? p.slice(1) : p}
              </p>
            ))}
          </div>
        ) : (
          <div className={styles.lockedContent}>
            <LuLock size={32} className={styles.lockedIcon} />
            <p className={styles.lockedTitle}>Capítulo Oculto</p>
            <p className={styles.lockedHint}>{LORE_UNLOCK_HINT[activePart]}</p>
          </div>
        )}

        <div className={styles.bookOrnamentBottom}>— ✦ —</div>
      </div>

      <div className={styles.loreNav}>
        <button
          className={cn(styles.loreNavBtn, !prevPart && css["loreNavBtn--hidden"])}
          onClick={() => prevPart && setActivePart(prevPart)}
          disabled={!prevPart}
        >
          <LuChevronLeft size={16} />
          {prevPart && LORE_PART_LABEL[prevPart]}
        </button>

        <span className={styles.lorePageIndicator}>
          {currentIndex + 1} / {LORE_PARTS.length}
        </span>

        <button
          className={cn(styles.loreNavBtn, !nextPart && css["loreNavBtn--hidden"])}
          onClick={() => nextPart && setActivePart(nextPart)}
          disabled={!nextPart}
        >
          {nextPart && LORE_PART_LABEL[nextPart]}
          <LuChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
