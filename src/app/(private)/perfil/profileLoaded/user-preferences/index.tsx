"use client";

import { Button } from "@/components/button";
import { toast } from "@/components/toast";
import { useAuth } from "@/hooks/useAuth";
import { IUserProfile } from "@/interfaces/api/user";
import { IUpdateUserPreferences } from "@/interfaces/services/update-user-data";
import { ProfileService } from "@/services/profile.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuPencil } from "react-icons/lu";
import { EditUserPreferencesModal } from "./edit-user-preferences-modal";
import styles from "./index.module.scss";
import { TagList } from "./tag-list";

interface IUserPreferencesProps {
  profile: IUserProfile;
}

export const UserPreferences = ({ profile }: IUserPreferencesProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const form = useForm<IUpdateUserPreferences>({
    defaultValues: {
      id: user!.id,
      categories: profile.interests.categories,
      keywords: profile.interests.keywords.length > 0 ? profile.interests.keywords : [""],
    },
  });

  const changeUserPreferencesMutation = useMutation({
    mutationFn: ProfileService.updateUserPreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile", user!.id] });
      setModalIsOpen(false);
      toast.success("Preferências atualizadas com sucesso!");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao atualizar as preferências.");
    },
  });

  const { isPending } = changeUserPreferencesMutation;

  const onSubmit = (data: IUpdateUserPreferences) => {
    const cleanKeywords = data.keywords.filter((k) => k.trim() !== "");
    changeUserPreferencesMutation.mutate({ ...data, keywords: cleanKeywords });
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Preferências Musicais</h3>
          <Button
            buttonStyle="outlineGold"
            size="sm"
            iconLeft={LuPencil}
            onClick={() => {
              form.reset({
                id: user!.id,
                categories: profile.interests.categories,
                keywords:
                  profile.interests.keywords.length > 0
                    ? profile.interests.keywords
                    : [""],
              });
              setModalIsOpen(true);
            }}
          >
            Editar
          </Button>
        </div>

        <div className={styles.interestsGrid}>
          <TagList title="Categorias" items={profile.interests.categories} />
          <TagList title="Palavras-chave" items={profile.interests.keywords} />
        </div>
      </div>

      <EditUserPreferencesModal
        form={form}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        user={user}
        profile={profile}
        onSubmit={onSubmit}
        isPending={isPending}
      />
    </>
  );
};
