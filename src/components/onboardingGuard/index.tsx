"use client";

import { PropsWithChildren } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { ProfileService } from "@/services/profile.service";
import { LoadingScreen } from "../loadingScreen";
import { OnboardingModal } from "./onboardingModal";

type IOnboardingGuardProps = PropsWithChildren;

export const OnboardingGuard = ({ children }: IOnboardingGuardProps) => {
  const user = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: () => ProfileService.getById(user!.id),
    enabled: !!user?.id,
    staleTime: Infinity,
  });

  if (isLoading) return <LoadingScreen />;

  if (user && !profile) {
    return <OnboardingModal user={user} />;
  }

  return <>{children}</>;
};
