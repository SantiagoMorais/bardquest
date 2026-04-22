"use client";

import { useState } from "react";
import styles from "./index.module.scss";
import cn from "classnames";
import { Modal } from "@/components/modal";
import { Button } from "@/components/button";
import { isTodayConfirmation } from "@/utils/functions/isTodayConfirmation";
import { useMutation } from "@tanstack/react-query";
import { ProfileService } from "@/services/profile.service";

interface IPracticeButtonProps {
  lastPracticeDate: string | null;
  streak: number;
  userId: string;
}

export const PracticeButton = ({
  lastPracticeDate,
  streak,
  userId,
}: IPracticeButtonProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [practiced, setPracticed] = useState(isTodayConfirmation(lastPracticeDate));

  const updateStreakMutation = useMutation({
    mutationFn: ProfileService.updateUserStreak,
    onSuccess: () => {
      setPracticed(true);
      setModalIsOpen(false);
    },
  });

  const { isPending } = updateStreakMutation;

  const handlePractice = async () => {
    if (practiced || isPending) return;
    const newStreak: number = streak + 1;
    updateStreakMutation.mutate({ userId, newStreak });
  };

  return (
    <>
      <button
        className={cn(styles.button, practiced && styles.buttonDone)}
        disabled={practiced || isPending}
        onClick={() => setModalIsOpen(true)}
        title={practiced ? "Você já praticou hoje!" : "Registrar prática de hoje"}
      >
        <span className={styles.diamond} aria-hidden="true" />
        <span className={styles.content}>
          {practiced ? (
            <>
              <span className={styles.icon}>✦</span>
              <span className={styles.label}>Praticado</span>
            </>
          ) : isPending ? (
            <span className={styles.label}>…</span>
          ) : (
            <>
              <span className={styles.label}>Pratiquei</span>
            </>
          )}
        </span>
        {streak > 0 && (
          <span className={styles.streak} title={`${streak} dias seguidos`}>
            🔥 {streak}
          </span>
        )}
      </button>
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className={styles.modal}>
          <h3 className={styles.modalTitle}>Confirmar prática</h3>
          <p className={styles.modalContent}>
            Deseja confirmar a prática de hoje e receber a recompensa?
          </p>
          <p className={styles.modalContent}>
            Após a confirmação o aventureiro não poderá retornar o seu caminho.
          </p>
          <footer className={styles.modalFooter}>
            <Button buttonStyle="outline" onClick={() => setModalIsOpen(false)}>
              Voltar
            </Button>
            <Button onClick={handlePractice}>Confirmo</Button>
          </footer>
        </div>
      </Modal>
    </>
  );
};
