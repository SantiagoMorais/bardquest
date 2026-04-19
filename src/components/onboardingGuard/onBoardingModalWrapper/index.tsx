"use client";

import { toast } from "@/components/toast";
import { IUserProfileWithUser } from "@/interfaces/api/user";
import { IOnboardingFormValues } from "@/interfaces/onboarding-types";
import { UserService } from "@/services/user.service";
import { User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { OnboardingModal } from "./onboardingModal";

interface IOnboardingModalWrapperProps {
  user: User;
}

export const OnboardingModalWrapper = ({ user }: IOnboardingModalWrapperProps) => {
  const navigate = useRouter();
  const queryClient = useQueryClient();

  const firstTimeLoginMutation = useMutation({
    mutationFn: UserService.firstTimeLogin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-profile", user.id] });
      toast.success(`Perfil criado com sucesso! Bem-vindo à aventura!`);
      navigate.replace("/dashboard");
      navigate.refresh();
    },
    onError: (error) => {
      console.error("Error creating user profile:", error);
      toast.error(
        "Erro ao criar perfil. Tente novamente ou entre em contato com o suporte."
      );
    },
  });

  const { isPending } = firstTimeLoginMutation;

  const form = useForm<IOnboardingFormValues>({
    defaultValues: {
      username: "",
      birth_date: null,
      experience: "basic",
      instrument: "guitar",
      interests: {
        categories: [],
        keywords: [""],
      },
    },
  });

  const onSubmit = (data: IUserProfileWithUser) => firstTimeLoginMutation.mutate(data);

  return (
    <OnboardingModal
      user={user}
      onSubmit={onSubmit}
      isPending={isPending}
      form={form}
      modalIsOpen={true}
    />
  );
};
