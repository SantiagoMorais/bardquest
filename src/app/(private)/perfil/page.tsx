"use client";

import { IUserProfileWithUser } from "@/interfaces/api/user";
import { ProfileService } from "@/services/profile.service";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";
import { ProfileLoaded } from "./components/profileLoaded";
import { ProfileLoading } from "./components/profileLoading";
import { ProfileNotFound } from "./components/profileNotFound";
import { ProfileError } from "./components/profileError";

export default function Perfil() {
  const { isLoading, user } = useAuthStore();

  if (isLoading) return <ProfileLoading />;
  if (!user) return <ProfileNotFound />;

  const {
    data,
    error,
    isLoading: isLoadingProfile,
  } = useQuery<IUserProfileWithUser | null>({
    queryKey: ["user-profile", user.id],
    queryFn: () => ProfileService.getUserProfileAndBaseData(user.id),
    staleTime: Infinity,
  });

  if (isLoadingProfile) return <ProfileLoading />;
  if (error)
    return (
      <ProfileError message="Erro ao carregar o perfil. Os ventos levaram as notas antes de chegarem ao bardo. Tente novamente mais tarde." />
    );
  if (!data) return <ProfileNotFound />;

  return <ProfileLoaded profile={data} />;
}
