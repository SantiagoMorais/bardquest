"use client";

import { PropsWithChildren } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { ProfileService } from "@/services/profile.service";
import { LoadingScreen } from "../loadingScreen";
import { OnboardingModalWrapper } from "./onBoardingModalWrapper";

export const OnboardingGuard = ({ children }: PropsWithChildren) => {
  const { user, isLoading: isAuthLoading } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["onboarding-profile", user?.id],
    queryFn: ({ queryKey }) => {
      const [, userId] = queryKey as [string, string];
      return ProfileService.getById(userId);
    },
    enabled: !!user?.id,
    staleTime: Infinity,
  });

  if (isAuthLoading || isLoading) return <LoadingScreen />;

  if (!user) return null;

  if (!profile) return <OnboardingModalWrapper user={user} />;

  return <>{children}</>;
};
