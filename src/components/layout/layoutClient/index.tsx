"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import styles from "./index.module.scss";
import { User } from "@supabase/supabase-js";
import { ProfileService } from "@/services/profile.service";

import { ProfileNotFound } from "@/components/profileNotFound";
import { ProfileLoading } from "@/components/profileLoading";
import { Header } from "./header";
import { PropsWithChildren } from "react";
import { PracticeButton } from "./practice-button";
import { ExperienceBar } from "./experience-bar";
import { ProfileError } from "@/components/profileError";
import { toast } from "@/components/toast";
import { useEffect, useRef } from "react";
import { daysSince } from "@/utils/functions/daysSince";
import { LoadingScreen } from "@/components/loadingScreen";

type ILayoutClientProps = PropsWithChildren & {
  user: User;
};

function xpForNextLevel(level: number): number {
  return level * 300;
}

export const LayoutClient = ({ user, children }: ILayoutClientProps) => {
  const resetAttemptedRef = useRef(false);
  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => ProfileService.getUserData(user.id),
  });

  const updateStreakMutation = useMutation({
    mutationFn: ProfileService.updateUserStreak,
    onSuccess: () => {
      toast.warn(
        "Sua sequência foi interrompida após 2 dias sem prática. Mas toda grande jornada tem pausas — retome hoje e comece uma nova sequência ainda mais forte!"
      );
    },
  });

  useEffect(() => {
    if (!currentUser?.last_practice_date) return;

    const daysWithoutPractice = daysSince(currentUser.last_practice_date);
    if (daysWithoutPractice === null || daysWithoutPractice < 2) return;
    if (resetAttemptedRef.current || (currentUser.streak ?? 0) === 0) return;

    resetAttemptedRef.current = true;
    updateStreakMutation.mutate({
      userId: user.id,
      newStreak: 0,
    });
  }, [
    currentUser?.last_practice_date,
    currentUser?.streak,
    updateStreakMutation,
    user.id,
  ]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ProfileError />;
  if (!currentUser) return <ProfileNotFound />;

  return (
    <div className={styles.layout}>
      <Header streak={currentUser.streak ?? 0} />
      <main className={styles.main}>{children}</main>

      <PracticeButton
        lastPracticeDate={currentUser.last_practice_date!}
        userId={user.id}
        streak={currentUser.streak ?? 0}
      />

      <ExperienceBar
        xp={currentUser.xp!}
        level={currentUser.level!}
        xpForNextLevel={xpForNextLevel(currentUser.level!)}
      />
    </div>
  );
};
