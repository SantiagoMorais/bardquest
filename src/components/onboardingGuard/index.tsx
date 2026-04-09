"use client";

import { PropsWithChildren } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { ProfileService } from "@/services/profile.service";
import { LoadingScreen } from "../loadingScreen";
import { OnboardingModalWrapper } from "./onBoardingModalWrapper";

type IOnboardingGuardProps = PropsWithChildren;

export const OnboardingGuard = ({ children }: IOnboardingGuardProps) => {
  const { user, isLoading: isAuthLoading } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: () => ProfileService.getById(user!.id),
    enabled: !!user?.id,
    staleTime: Infinity,
  });

  if (isAuthLoading || isLoading) return <LoadingScreen />;

  if (!user) return <LoadingScreen />;

  if (!profile) return <OnboardingModalWrapper user={user} />;

  return <>{children}</>;
};
