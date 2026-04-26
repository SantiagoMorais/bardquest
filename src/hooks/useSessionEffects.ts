"use client";

import { toast } from "@/components/toast";
import { IUserProfileWithUser } from "@/interfaces/api/user";
import { TypeState } from "@/interfaces/typeState";
import { MissionService } from "@/services/mission.service";
import { StreakService } from "@/services/streak.service";

import { daysSince } from "@/utils/functions/daysSince";
import { selectRandomMission } from "@/utils/select-random-mission";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface IUseSessionEffectsProps {
  userProfile: IUserProfileWithUser;
}

interface IUseSessionEffectsReturn {
  missionModalOpen: boolean;
  setMissionModalOpen: TypeState<boolean>;
}

/**
 * React hook to handle user session effects after login.
 *
 * This hook manages:
 * - Fetching and updating the current user profile
 * - Streak reset logic if the user hasn't practiced for 2+ days
 * - Daily mission assignment and modal control
 * - Toast notifications for streak resets
 *
 * Returns loading and error states, the current user, and modal state handlers.
 *
 * @param {Object} params - Hook parameters
 * @param {User} params.user - The logged-in user object
 * @returns {Object} Hook state and handlers
 */
export const useSessionEffects = ({
  userProfile,
}: IUseSessionEffectsProps): IUseSessionEffectsReturn => {
  const queryClient = useQueryClient();
  const resetAttemptedRef = useRef(false);
  const missionModalShownRef = useRef(false);
  const [missionModalOpen, setMissionModalOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const MODAL_KEY = `mission_modal_${userProfile.user.id}_${today}`;

  const resetStreakMutation = useMutation({
    mutationFn: StreakService.resetUserStreak,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sessionProfile", userProfile.user.id],
      });
      toast.warn(
        "Sua sequência foi interrompida após 2 dias sem prática. Mas toda grande jornada tem pausas — retome hoje e comece uma nova sequência ainda mais forte!"
      );
    },
  });

  const addMissionPayload = useMutation({
    mutationFn: MissionService.addDailyMission,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sessionProfile", userProfile.user.id],
      });
      missionModalShownRef.current = true;
      localStorage.setItem(MODAL_KEY, today);
      setMissionModalOpen(true);
    },
  });

  // Handles daily mission modal logic and assignment
  useEffect(() => {
    if (!userProfile) return;
    if (missionModalShownRef.current) return;

    if (localStorage.getItem(MODAL_KEY)) return;

    const { user } = userProfile;
    const lastMissionDay = user.last_mission_at?.split("T")[0];

    if (lastMissionDay === today) {
      missionModalShownRef.current = true;
      localStorage.setItem(MODAL_KEY, "shown");
      const timer = setTimeout(() => setMissionModalOpen(true), 600);
      return () => clearTimeout(timer);
    }

    if (user.daily_missions && user.daily_missions.length >= 3) return;

    const newMission = selectRandomMission({
      activeMissionIds: user.daily_missions?.map((m) => m.id) ?? [],
    });
    if (!newMission) return;

    missionModalShownRef.current = true;
    addMissionPayload.mutate({ newMission, userId: user.id });
  }, [userProfile]);

  // Handles streak reset if user hasn't practiced for 2+ days
  useEffect(() => {
    if (!userProfile) return;
    if (!userProfile?.user?.last_practice_date) return;
    const { user } = userProfile;
    const daysWithoutPractice = daysSince(user.last_practice_date);
    if (daysWithoutPractice === null || daysWithoutPractice < 2) return;
    if (resetAttemptedRef.current || (user.streak ?? 0) === 0) return;

    resetAttemptedRef.current = true;
    resetStreakMutation.mutate({ userId: userProfile.user.id });
  }, [userProfile]);

  return {
    missionModalOpen,
    setMissionModalOpen,
  };
};
