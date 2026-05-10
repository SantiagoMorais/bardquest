"use client";

import { IKingdom, IKingdomSong } from "@/interfaces/api/kingdom";
import { ISong } from "@/interfaces/api/song";
import { IKingdomSongStatus } from "@/interfaces/kingdom-card";
import { STATUS_ICON, STATUS_LABEL } from "@/utils/status-label-and-icon";
import cn from "classnames";
import { useState } from "react";
import styles from "./index.module.scss";
import { SheetMusic } from "./sheet-music";
import { StatusAction } from "./status-action";
import { getSongXp } from "@/config/progression";

interface SongWithMeta extends IKingdomSong {
  part: "part_1" | "part_2" | "part_3" | "final_part";
  meta?: Omit<ISong, "created_at" | "kingdom_id">;
  status: IKingdomSongStatus;
}

interface IKingdomSongsListProps {
  kingdom: IKingdom;
  songStatuses?: Partial<Record<string, IKingdomSongStatus>>;
  kingdomOrder: number;
}

export const KingdomSongsList = ({
  kingdom,
  songStatuses = {},
  kingdomOrder,
}: IKingdomSongsListProps) => {
  const css = styles as Record<string, string>;
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const baseParts: Array<"part_1" | "part_2" | "part_3"> = ["part_1", "part_2", "part_3"];

  const buildSong = (
    part: "part_1" | "part_2" | "part_3" | "final_part"
  ): SongWithMeta => {
    const meta = kingdom.songs[part];
    const songId = meta.id;
    const title = meta?.title ?? "Canção desconhecida";
    const artist = meta?.artist ?? "Artista desconhecido";
    return {
      title,
      artist,
      is_boss: part === "final_part",
      part,
      meta,
      status: songStatuses[songId] ?? songStatuses[title] ?? "pending",
      sheet_music_url: meta?.sheet_music_url ?? null,
      id: songId,
    };
  };

  const baseSongs = baseParts.map(buildSong);
  const bossSong = buildSong("final_part");

  const allBasesDone = baseSongs.every((s) => s.status === "completed");
  const bossLocked = !allBasesDone;

  const getSongCardClass = (status: IKingdomSongStatus) =>
    cn(
      css.songCard,
      status === "completed"
        ? css["songCard--done"]
        : status === "practicing"
          ? css["songCard--in_progress"]
          : null
    );

  const getSongBadgeClass = (status: IKingdomSongStatus) =>
    cn(
      css.songStatusBadge,
      status === "completed"
        ? css["badge--done"]
        : status === "practicing"
          ? css["badge--in_progress"]
          : css["badge--not_started"]
    );

  const getBossCardClass = (status: IKingdomSongStatus, isLocked: boolean) =>
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

  const songXpReward = (isBoss: boolean) =>
    getSongXp({
      realmBaseDifficulty: kingdom.difficulty,
      isBoss,
      realmOrder: kingdomOrder,
      level: kingdom.level,
    });

  return (
    <div className={styles.wrapper}>
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
            <>
              <div className={styles.detailMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Recompensa</span>
                  <span className={styles.metaValue}>
                    ✦ {songXpReward(selectedSong.meta.is_boss)} XP
                  </span>
                </div>
              </div>

              <div className={styles.detailDivider} />

              <div className={styles.detailActions}>
                <div className={styles.actionBlock}>
                  <span className={styles.actionBlockLabel}>Partitura</span>
                  <SheetMusic
                    url={selectedSong.meta.sheet_music_url}
                    songId={selectedSong.meta.id}
                  />
                </div>

                <div className={styles.actionBlock}>
                  <span className={styles.actionBlockLabel}>Progresso</span>
                  <StatusAction
                    status={selectedSong.status}
                    songId={selectedSong.meta.id}
                  />
                </div>
              </div>
            </>
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
