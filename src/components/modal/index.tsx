"use client";

import { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";
import styles from "./index.module.scss";

type IModalProps = PropsWithChildren & {
  isOpen: boolean;
  onClose?: () => void;
  persistent?: boolean;
};

export const Modal = ({ isOpen, onClose, children, persistent = false }: IModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canRender = isOpen && typeof document !== "undefined";

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || persistent) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, persistent]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !canRender || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => {
        if (!persistent && e.target === overlayRef.current) onClose?.();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.panel}>
        {!persistent && onClose && (
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
            <LuX size={18} />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};
