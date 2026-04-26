"use client";

import { toast } from "@/components/toast";
import { IMissionDifficulty } from "@/config/progression";
import { IMission } from "@/interfaces/api/mission";
import { IUser } from "@/interfaces/api/user";
import { MissionService } from "@/services/mission.service";
import { cn } from "@/utils/functions/cn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import styles from "./index.module.scss";

const DIFFICULTY_LABEL: Record<IMissionDifficulty, string> = {
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
  epic: "Épica",
};

interface IMissionCardProps {
  mission: IMission;
  user: IUser;
  isExpanded: boolean;
  onToggle: () => void;
  handleLevelUp: (newLevel: number) => void;
}

export const MissionCard = ({
  mission,
  user,
  isExpanded,
  onToggle,
  handleLevelUp,
}: IMissionCardProps) => {
  const queryClient = useQueryClient();

  const completeMutation = useMutation({
    mutationFn: () =>
      MissionService.completeMission({
        userId: user.id,
        mission,
        currentXp: user.xp,
        level: user.level,
      }),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["sessionProfile", user.id] });
      if (result.leveledUp) handleLevelUp(result.newLevel);
    },
    onError: () => {
      toast.error("Não foi possível concluir a missão.");
    },
  });

  const MISSION_CARD_CLASS: Record<IMissionDifficulty, string> = {
    easy: styles.missionCardEasy,
    medium: styles.missionCardMedium,
    hard: styles.missionCardHard,
    epic: styles.missionCardEpic,
  };

  const DIFFICULTY_DOT_CLASS: Record<IMissionDifficulty, string> = {
    easy: styles.difficultyDotEasy,
    medium: styles.difficultyDotMedium,
    hard: styles.difficultyDotHard,
    epic: styles.difficultyDotEpic,
  };

  const DIFFICULTY_BADGE_CLASS: Record<IMissionDifficulty, string> = {
    easy: styles.difficultyBadgeEasy,
    medium: styles.difficultyBadgeMedium,
    hard: styles.difficultyBadgeHard,
    epic: styles.difficultyBadgeEpic,
  };

  return (
    <div className={cn(styles.missionCard, MISSION_CARD_CLASS[mission.difficulty])}>
      <button className={styles.missionHeader} onClick={onToggle}>
        <div className={styles.missionHeaderLeft}>
          <span
            className={cn(styles.difficultyDot, DIFFICULTY_DOT_CLASS[mission.difficulty])}
          />
          <span className={styles.missionTitle}>{mission.title}</span>
        </div>

        <div className={styles.missionHeaderRight}>
          <span
            className={cn(
              styles.difficultyBadge,
              DIFFICULTY_BADGE_CLASS[mission.difficulty]
            )}
          >
            {DIFFICULTY_LABEL[mission.difficulty]}
          </span>
          <LuChevronDown
            size={14}
            className={cn(styles.missionChevron, isExpanded && styles.missionChevronOpen)}
          />
        </div>
      </button>
      {isExpanded && (
        <div className={styles.missionDetail}>
          <p className={styles.missionDescription}>{mission.description}</p>

          <div className={styles.missionMeta}>
            <div className={styles.metaChip}>
              <span className={styles.metaLabel}>Recompensa</span>
              <span className={styles.metaValue}>✦ {mission.xp_reward} XP</span>
            </div>
            <div className={styles.metaChip}>
              <span className={styles.metaLabel}>Dificuldade</span>
              <span className={styles.metaValue}>
                {DIFFICULTY_LABEL[mission.difficulty]}
              </span>
            </div>
          </div>

          <button
            className={styles.completeBtn}
            onClick={() => completeMutation.mutate()}
            disabled={completeMutation.isPending}
          >
            <LuCheck size={13} />
            {completeMutation.isPending ? "Concluindo…" : "Marcar como concluída"}
          </button>
        </div>
      )}
    </div>
  );
};
