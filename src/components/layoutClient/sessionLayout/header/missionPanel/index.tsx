"use client";

import { IMission } from "@/interfaces/api/mission";
import { IUser } from "@/interfaces/api/user";
import { cn } from "@/utils/functions/cn";
import { useEffect, useRef, useState } from "react";
import { LuScrollText, LuSwords } from "react-icons/lu";
import styles from "./index.module.scss";
import { MissionCard } from "./missionCard";

interface IMissionPanelProps {
  missions: IMission[];
  user: IUser;
  handleLevelUp: (newLevel: number) => void;
}

export const MissionPanel = ({ missions, user, handleLevelUp }: IMissionPanelProps) => {
  const [open, setOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleExpanded = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const pendingCount = missions.length;

  return (
    <div className={styles.wrapper} ref={panelRef}>
      <button
        className={cn(styles.trigger, open && styles.triggerActive)}
        onClick={() => setOpen((p) => !p)}
        aria-label="Missões do dia"
        title="Missões do dia"
      >
        <LuScrollText size={20} />
        {pendingCount > 0 && <span className={styles.triggerBadge}>{pendingCount}</span>}
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitleRow}>
              <LuSwords size={16} className={styles.panelIcon} />
              <span className={styles.panelTitle}>Missões do Dia</span>
            </div>
            {missions.length > 0 && (
              <span className={styles.panelCount}>{missions.length} / 3 pendentes</span>
            )}
          </div>

          <div className={styles.panelDivider}>
            <span className={styles.panelDividerLine} />
            <span className={styles.panelDividerGlyph}>✦</span>
            <span className={styles.panelDividerLine} />
          </div>

          {missions.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyGlyph}>♪</span>
              <p className={styles.emptyTitle}>Nenhuma missão pendente</p>
              <p className={styles.emptyHint}>Novas missões surgirão em sua jornada.</p>
            </div>
          ) : (
            <ul className={styles.missionList}>
              {missions.map((mission) => (
                <li key={mission.id}>
                  <MissionCard
                    mission={mission}
                    user={user}
                    isExpanded={expandedId === mission.id}
                    onToggle={() => toggleExpanded(mission.id)}
                    handleLevelUp={handleLevelUp}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
