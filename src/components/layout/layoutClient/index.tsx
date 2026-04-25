"use client";

import { ProfileService } from "@/services/profile.service";
import { User } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./index.module.scss";

import { LoadingScreen } from "@/components/loadingScreen";
import { ProfileError } from "@/components/profileError";
import { ProfileNotFound } from "@/components/profileNotFound";
import { toast } from "@/components/toast";
import { getXpToNextLevel } from "@/config/progression";
import { StreakService } from "@/services/streak.service";
import { daysSince } from "@/utils/functions/daysSince";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ExperienceBar } from "./experience-bar";
import { Header } from "./header";
import { PracticeButton } from "./practice-button";
import { NewMissionModal } from "./newMissionModal";
import { MissionService } from "@/services/mission.service";
import { selectRandomMission } from "@/utils/select-random-mission";

type ILayoutClientProps = PropsWithChildren & {
  user: User;
};

export const LayoutClient = ({ user, children }: ILayoutClientProps) => {
  const queryClient = useQueryClient();
  const resetAttemptedRef = useRef(false);
  const missionModalShownRef = useRef(false);
  const [missionModalOpen, setMissionModalOpen] = useState(false);

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", user?.id],
    queryFn: () => ProfileService.getUserData(user.id),
  });

  const resetStreakMutation = useMutation({
    mutationFn: StreakService.resetUserStreak,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", user.id] });
      toast.warn(
        "Sua sequência foi interrompida após 2 dias sem prática. Mas toda grande jornada tem pausas — retome hoje e comece uma nova sequência ainda mais forte!"
      );
    },
  });

  const addMissionPayload = useMutation({
    mutationFn: MissionService.addDailyMission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", user.id] });
      missionModalShownRef.current = true;
      sessionStorage.setItem(MISSION_MODAL_SESSION_KEY, "true");
      setMissionModalOpen(true);
    },
  });

  const MISSION_MODAL_SESSION_KEY = `mission_modal_shown_${user.id}`;

  useEffect(() => {
    if (!currentUser) return;
    if (missionModalShownRef.current) return;

    if (sessionStorage.getItem(MISSION_MODAL_SESSION_KEY)) return;

    const today = new Date().toISOString().split("T")[0];
    const lastMissionDay = currentUser.last_mission_at?.split("T")[0];

    if (lastMissionDay === today) {
      missionModalShownRef.current = true;
      sessionStorage.setItem(MISSION_MODAL_SESSION_KEY, "true");
      const timer = setTimeout(() => setMissionModalOpen(true), 600);
      return () => clearTimeout(timer);
    }

    if (currentUser.daily_missions && currentUser.daily_missions.length >= 3) return;
    const newMission = selectRandomMission({
      activeMissionIds: currentUser.daily_missions?.map((m) => m.id) ?? [],
    });
    if (!newMission) return;

    missionModalShownRef.current = true;
    addMissionPayload.mutate({ newMission, userId: user.id });
  }, [currentUser, addMissionPayload, user.id, MISSION_MODAL_SESSION_KEY]);

  useEffect(() => {
    if (!currentUser?.last_practice_date) return;
    const daysWithoutPractice = daysSince(currentUser.last_practice_date);
    if (daysWithoutPractice === null || daysWithoutPractice < 2) return;
    if (resetAttemptedRef.current || (currentUser.streak ?? 0) === 0) return;

    resetAttemptedRef.current = true;
    resetStreakMutation.mutate({ userId: user.id });
  }, [
    currentUser?.last_practice_date,
    currentUser?.streak,
    resetStreakMutation,
    user.id,
  ]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ProfileError />;
  if (!currentUser) return <ProfileNotFound />;

  const latestMission = currentUser.daily_missions?.at(-1) ?? null;

  return (
    <div className={styles.layout}>
      <Header
        streak={currentUser.streak ?? 0}
        user={currentUser}
        missions={currentUser.daily_missions ?? []}
      />
      <main className={styles.main}>{children}</main>

      <PracticeButton
        lastPracticeDate={currentUser.last_practice_date!}
        userId={user.id}
        streak={currentUser.streak ?? 0}
        level={currentUser.level ?? 1}
        xp={currentUser.xp ?? 0}
      />

      <ExperienceBar
        xp={currentUser.xp ?? 0}
        level={currentUser.level ?? 1}
        xpForNextLevel={getXpToNextLevel({ level: currentUser.level ?? 1 })}
      />

      <NewMissionModal
        mission={latestMission}
        isOpen={missionModalOpen}
        onClose={() => setMissionModalOpen(false)}
      />
    </div>
  );
};
