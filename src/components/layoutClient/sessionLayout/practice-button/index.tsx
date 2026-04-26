"use client";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { StreakService } from "@/services/streak.service";
import { isTodayConfirmation } from "@/utils/functions/isTodayConfirmation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cn from "classnames";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";

interface IPracticeButtonProps {
  lastPracticeDate: string | null;
  streak: number;
  userId: string;
  level: number;
  xp: number;
  handleLevelUp: (newLevel: number) => void;
}

export const PracticeButton = ({
  lastPracticeDate,
  streak,
  userId,
  level,
  xp,
  handleLevelUp,
}: IPracticeButtonProps) => {
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [practiced, setPracticed] = useState(isTodayConfirmation(lastPracticeDate));

  useEffect(() => {
    setPracticed(isTodayConfirmation(lastPracticeDate));
  }, [lastPracticeDate]);

  const updateStreakMutation = useMutation({
    mutationFn: StreakService.increaseUserStreak,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["sessionProfile", userId] });
      setPracticed(true);
      setModalIsOpen(false);
      if (result.leveledUp) handleLevelUp(result.newLevel);
    },
  });

  const { isPending } = updateStreakMutation;

  const handlePractice = async () => {
    if (practiced || isPending) return;
    updateStreakMutation.mutate({
      userId,
      level,
      xp,
      lastPracticeDate: new Date().toISOString(),
      currentStreak: streak,
    });
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
