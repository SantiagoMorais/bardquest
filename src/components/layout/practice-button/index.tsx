"use client";

import { useState } from "react";
import styles from "./index.module.scss";
import cn from "classnames";
import { Modal } from "@/components/modal";
import { Button } from "@/components/button";

interface IPracticeButtonProps {
  lastPracticeDate: string | null;
  streak: number;
}

function isToday(dateStr: string | null): boolean {
  if (!dateStr) return false;
  const today = new Date();
  const d = new Date(dateStr);
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

export const PracticeButton = ({ lastPracticeDate, streak }: IPracticeButtonProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [practiced, setPracticed] = useState(isToday(lastPracticeDate));
  const [isLoading, setIsLoading] = useState(false);

  const handlePractice = async () => {
    if (practiced || isLoading) return;
    setIsLoading(true);
    try {
      // TODO: PATCH /users/me -> last_practice_date: today, increment streak
    } finally {
      setPracticed(true);
      setIsLoading(false);
      setModalIsOpen(false);
    }
  };

  return (
    <>
      <button
        className={cn(styles.button, practiced && styles["button--done"])}
        disabled={practiced || isLoading}
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
          ) : isLoading ? (
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
