"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./index.module.scss";
import { User } from "@supabase/supabase-js";
import { ProfileService } from "@/services/profile.service";

import { ProfileNotFound } from "@/components/profileNotFound";
import { Header } from "./header";
import { PropsWithChildren } from "react";
import { PracticeButton } from "./practice-button";
import { ExperienceBar } from "./experience-bar";
import { ProfileError } from "@/components/profileError";
import { toast } from "@/components/toast";
import { useEffect, useRef } from "react";
import { daysSince } from "@/utils/functions/daysSince";
import { LoadingScreen } from "@/components/loadingScreen";
import { getXpToNextLevel } from "@/config/progression";

type ILayoutClientProps = PropsWithChildren & {
  user: User;
};

export const LayoutClient = ({ user, children }: ILayoutClientProps) => {
  const queryClient = useQueryClient();
  const resetAttemptedRef = useRef(false);
  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", user?.id],
    queryFn: () => ProfileService.getUserData(user.id),
  });

  const resetStreakMutation = useMutation({
    mutationFn: ProfileService.resetUserStreak,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", user.id] });
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
    resetStreakMutation.mutate({
      userId: user.id,
    });
  }, [
    currentUser?.last_practice_date,
    currentUser?.streak,
    resetStreakMutation,
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
        level={currentUser.level ?? 1}
        xp={currentUser.xp ?? 0}
      />

      <ExperienceBar
        xp={currentUser.xp ?? 0}
        level={currentUser.level ?? 1}
        xpForNextLevel={getXpToNextLevel({ level: currentUser.level ?? 1 })}
      />
    </div>
  );
};
