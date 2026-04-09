"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import styles from "./index.module.scss";
import { AuthService } from "@/services/auth.service";
import { toast } from "@/components/toast";
import classNames from "classnames";

interface ILogoutButtonProps {
  variant: "mobile" | "desktop";
  isExpanded?: boolean;
  onSuccess?: () => void;
}

export const LogoutButton = ({ variant, onSuccess, isExpanded }: ILogoutButtonProps) => {
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: AuthService.signOut,
    onSuccess: () => {
      toast.info("Vamos sentir sua falta!");
      onSuccess?.();
      router.replace("/");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Um erro inesperado ocorreu. Tente novamente.");
    },
  });

  const onSubmit = () => {
    logoutMutation.mutate();
  };

  return (
    <button
      type="button"
      className={classNames(styles.button, styles[variant], {
        [styles.pending]: logoutMutation.isPending,
        [styles.expanded]: isExpanded && variant === "desktop",
      })}
      onClick={onSubmit}
      disabled={logoutMutation.isPending}
      aria-busy={logoutMutation.isPending}
    >
      <span className={styles.icon}>
        <LuLogOut size={variant === "mobile" ? 18 : 20} />
      </span>
      <span className={styles.label}>
        {logoutMutation.isPending ? "Saindo..." : "Sair"}
      </span>
    </button>
  );
};
