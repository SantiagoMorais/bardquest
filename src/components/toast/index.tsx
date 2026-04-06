"use client";

import * as RadixToast from "@radix-ui/react-toast";
import { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

type ToastVariant = "success" | "error" | "warn" | "info";

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
}

type ToastInput = {
  title: string;
  description?: string;
  duration?: number;
};

type ToastListener = (item: ToastItem) => void;

const listeners = new Set<ToastListener>();

const DEFAULT_DURATION = 3500;

const createToast = (variant: ToastVariant, input: string | ToastInput): ToastItem => {
  if (typeof input === "string") {
    return {
      id: crypto.randomUUID(),
      title: input,
      variant,
      duration: DEFAULT_DURATION,
    };
  }

  return {
    id: crypto.randomUUID(),
    title: input.title,
    description: input.description,
    variant,
    duration: input.duration ?? DEFAULT_DURATION,
  };
};

const emitToast = (item: ToastItem) => {
  listeners.forEach((listener) => listener(item));
};

export const toast = {
  success: (input: string | ToastInput) => {
    emitToast(createToast("success", input));
  },
  error: (input: string | ToastInput) => {
    emitToast(createToast("error", input));
  },
  warn: (input: string | ToastInput) => {
    emitToast(createToast("warn", input));
  },
  info: (input: string | ToastInput) => {
    emitToast(createToast("info", input));
  },
};

export const Toaster = () => {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const listener: ToastListener = (item) => {
      setItems((prev) => [...prev, item]);
    };

    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const removeToast = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <RadixToast.Provider swipeDirection="right">
      {items.map((item) => (
        <RadixToast.Root
          key={item.id}
          className={classNames(styles.toast, {
            [styles.success]: item.variant === "success",
            [styles.error]: item.variant === "error",
            [styles.warn]: item.variant === "warn",
            [styles.info]: item.variant === "info",
          })}
          duration={item.duration}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              removeToast(item.id);
            }
          }}
        >
          <div className={styles.textContainer}>
            <RadixToast.Title className={styles.title}>{item.title}</RadixToast.Title>
            {item.description ? (
              <RadixToast.Description className={styles.description}>
                {item.description}
              </RadixToast.Description>
            ) : null}
          </div>

          <RadixToast.Close className={styles.closeButton} aria-label="Fechar toast">
            x
          </RadixToast.Close>
        </RadixToast.Root>
      ))}

      <RadixToast.Viewport className={styles.viewport} />
    </RadixToast.Provider>
  );
};
