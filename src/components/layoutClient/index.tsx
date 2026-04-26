"use client";

import { User } from "@supabase/supabase-js";

import { LoadingScreen } from "@/components/loadingScreen";
import { ProfileError } from "@/components/profileError";
import { ProfileNotFound } from "@/components/profileNotFound";
import { IGetUserProfileAndBaseDataResponse } from "@/interfaces/services/getUserProfileAndBaseData";
import { ProfileService } from "@/services/profile.service";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { OnboardingModalWrapper } from "../onBoardingModalWrapper";
import { SessionLayout } from "./sessionLayout";
import { IUserProfileWithUser } from "@/interfaces/api/user";

type ILayoutClientProps = PropsWithChildren & {
  user: User;
};

export const LayoutClient = ({ user, children }: ILayoutClientProps) => {
  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery<IGetUserProfileAndBaseDataResponse | null>({
    queryKey: ["sessionProfile", user?.id],
    queryFn: () => ProfileService.getUserProfileAndBaseData(user.id),
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ProfileError />;
  if (!userProfile) return <ProfileNotFound />;
  if (!userProfile.profile || !userProfile.user)
    return <OnboardingModalWrapper user={user} />;

  const profileWithUserMapper: IUserProfileWithUser = {
    profile: {
      ...userProfile.profile,
    },
    user: userProfile.user,
  };

  return <SessionLayout userProfile={profileWithUserMapper}>{children}</SessionLayout>;
};
