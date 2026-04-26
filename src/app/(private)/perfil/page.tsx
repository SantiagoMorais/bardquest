"use client";

import { ProfileError } from "@/components/profileError";
import { ProfileLoading } from "@/components/profileLoading";
import { ProfileNotFound } from "@/components/profileNotFound";
import { IUserProfileWithUser } from "@/interfaces/api/user";
import { IGetUserProfileAndBaseDataResponse } from "@/interfaces/services/getUserProfileAndBaseData";
import { ProfileService } from "@/services/profile.service";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";
import { ProfileLoaded } from "./profileLoaded";

export default function ProfilePage() {
  const { user } = useAuthStore();

  const {
    data,
    error,
    isLoading: isLoadingProfile,
  } = useQuery<IGetUserProfileAndBaseDataResponse | null>({
    queryKey: ["sessionProfile", user?.id],
    queryFn: () => ProfileService.getUserProfileAndBaseData(user!.id),
    enabled: !!user?.id,
    staleTime: Infinity,
  });

  if (isLoadingProfile) return <ProfileLoading />;
  if (error)
    return (
      <ProfileError message="Erro ao carregar o perfil. Os ventos levaram as notas antes de chegarem ao bardo. Tente novamente mais tarde." />
    );
  if (!data || !data.user || !data.profile) return <ProfileNotFound />;

  return <ProfileLoaded userProfile={data as IUserProfileWithUser} />;
}
