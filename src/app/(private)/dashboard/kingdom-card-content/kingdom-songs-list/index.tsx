"use client";

import { useState } from "react";
import cn from "classnames";
import styles from "./index.module.scss";
import { IKingdom, IKingdomSong } from "@/interfaces/api/kingdom";
import { ISong } from "@/interfaces/api/song";
import { SongStatus } from "@/interfaces/kingdom-card";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SongWithMeta extends IKingdomSong {
  part: "part_1" | "part_2" | "part_3" | "final_part";
  meta?: ISong;
  status: SongStatus;
}

interface IKingdomSongsListProps {
  kingdom: IKingdom & { songs_metadata?: ISong[] };
  /** Map de song id/title -> status do usuario (injetado pelo parent/store) */
  songStatuses?: Partial<Record<string, SongStatus>>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_LABEL: Record<SongStatus, string> = {
  pending: "À fazer",
  practicing: "Em progresso",
  completed: "Concluída",
};

const STATUS_ICON: Record<SongStatus, string> = {
  pending: "🎵",
  practicing: "🎶",
  completed: "✦",
};

const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: "Iniciante",
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
};

function getDifficultyStars(difficulty: string): number {
  return { beginner: 1, easy: 2, medium: 3, hard: 4 }[difficulty] ?? 2;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const KingdomSongsList = ({
  kingdom,
  songStatuses = {},
}: IKingdomSongsListProps) => {
  const css = styles as Record<string, string>;
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const baseParts: Array<"part_1" | "part_2" | "part_3"> = ["part_1", "part_2", "part_3"];

  const buildSong = (
    part: "part_1" | "part_2" | "part_3" | "final_part"
  ): SongWithMeta => {
    const songId = kingdom.songs[part];
    const meta = kingdom.songs_metadata?.find((s) => s.id === songId);
    const title = meta?.title ?? "Cancao desconhecida";
    const artist = meta?.artist ?? "Artista desconhecido";
    return {
      title,
      artist,
      is_boss: part === "final_part",
      part,
      meta,
      status: songStatuses[songId] ?? songStatuses[title] ?? "pending",
    };
  };

  const baseSongs = baseParts.map(buildSong);
  const bossSong = buildSong("final_part");

  const allBasesDone = baseSongs.every((s) => s.status === "completed");
  const bossLocked = !allBasesDone;

  const getSongCardClass = (status: SongStatus) =>
    cn(
      css.songCard,
      status === "completed"
        ? css["songCard--done"]
        : status === "practicing"
          ? css["songCard--in_progress"]
          : null
    );

  const getSongBadgeClass = (status: SongStatus) =>
    cn(
      css.songStatusBadge,
      status === "completed"
        ? css["badge--done"]
        : status === "practicing"
          ? css["badge--in_progress"]
          : css["badge--not_started"]
    );

  const getBossCardClass = (status: SongStatus, isLocked: boolean) =>
    cn(
      css.bossCard,
      isLocked
        ? css["bossCard--locked"]
        : status === "completed"
          ? css["bossCard--done"]
          : null
    );

  const selectedSong =
    selectedPart === "final_part"
      ? bossSong
      : selectedPart
        ? (baseSongs.find((s) => s.part === selectedPart) ?? null)
        : null;

  const handleSelect = (part: string) => {
    if (part === "final_part" && bossLocked) return;
    setSelectedPart((prev) => (prev === part ? null : part));
  };

  return (
    <div className={styles.wrapper}>
      {/* ── Base songs ── */}
      <p className={styles.sectionLabel}>Canções da jornada</p>
      <div className={styles.baseSongs}>
        {baseSongs.map((song, i) => (
          <button
            key={song.part}
            className={cn(
              getSongCardClass(song.status),
              selectedPart === song.part && css["songCard--selected"]
            )}
            onClick={() => handleSelect(song.part)}
            aria-pressed={selectedPart === song.part}
          >
            <span className={styles.songIndex}>{i + 1}</span>
            <span className={styles.songStatusIcon}>{STATUS_ICON[song.status]}</span>
            <span className={styles.songTitle}>{song.title}</span>
            <span className={styles.songArtist}>{song.artist}</span>
            <span className={getSongBadgeClass(song.status)}>
              {STATUS_LABEL[song.status]}
            </span>
          </button>
        ))}
      </div>

      {/* ── Boss song ── */}
      <div className={styles.bossRow}>
        <div className={styles.bossConnector}>
          <span className={styles.bossConnectorLine} />
          <span className={styles.bossConnectorText}>Confronto Final</span>
          <span className={styles.bossConnectorLine} />
        </div>
        <button
          className={cn(
            getBossCardClass(bossSong.status, bossLocked),
            selectedPart === "final_part" && css["bossCard--selected"]
          )}
          onClick={() => handleSelect("final_part")}
          disabled={bossLocked}
          aria-disabled={bossLocked}
          title={bossLocked ? "Conclua todas as canções para desbloquear" : ""}
        >
          {bossLocked ? (
            <span className={styles.bossLockIcon}>🔒</span>
          ) : (
            <span className={styles.bossLockIcon}>👑</span>
          )}
          <div className={styles.bossInfo}>
            <span className={styles.bossSongTitle}>{bossSong.title}</span>
            <span className={styles.bossSongArtist}>{bossSong.artist}</span>
          </div>
          {bossLocked ? (
            <span className={styles.bossHint}>Conclua as 3 canções para desbloquear</span>
          ) : (
            <span className={getSongBadgeClass(bossSong.status)}>
              {STATUS_LABEL[bossSong.status]}
            </span>
          )}
        </button>
      </div>

      {/* ── Detail panel ── */}
      {selectedSong && (
        <div
          className={cn(
            styles.detailPanel,
            selectedSong.part === "final_part" && css["detailPanel--boss"]
          )}
        >
          <div className={styles.detailHeader}>
            <div>
              <h3 className={styles.detailTitle}>{selectedSong.title}</h3>
              <p className={styles.detailArtist}>por {selectedSong.artist}</p>
            </div>
            <span
              className={cn(styles.detailStatus, getSongBadgeClass(selectedSong.status))}
            >
              {STATUS_ICON[selectedSong.status]} {STATUS_LABEL[selectedSong.status]}
            </span>
          </div>

          {selectedSong.meta && (
            <div className={styles.detailMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Dificuldade</span>
                <span className={styles.metaValue}>
                  {DIFFICULTY_LABEL[selectedSong.meta.difficulty] ??
                    selectedSong.meta.difficulty}
                  {"  "}
                  {"★".repeat(getDifficultyStars(selectedSong.meta.difficulty))}
                  {"☆".repeat(4 - getDifficultyStars(selectedSong.meta.difficulty))}
                </span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Recompensa</span>
                <span className={styles.metaValue}>
                  ✦ {selectedSong.meta.xp_reward} XP
                </span>
              </div>

              {selectedSong.meta.version_tag && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Versão</span>
                  <span className={styles.metaValue}>
                    {selectedSong.meta.version_tag}
                  </span>
                </div>
              )}

              {selectedSong.meta.sheet_music_url && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Partitura</span>
                  <a
                    href={selectedSong.meta.sheet_music_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.metaLink}
                  >
                    Ver partitura →
                  </a>
                </div>
              )}
            </div>
          )}

          {selectedSong.part === "final_part" && (
            <p className={styles.bossFlavorText}>
              ✦ Esta é a canção que pacificará o coração do reino. Toque-a com maestria e
              o reino será transformado para sempre.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
