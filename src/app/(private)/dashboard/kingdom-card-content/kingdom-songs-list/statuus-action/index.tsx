import { IKingdomSongStatus } from "@/interfaces/kingdom-card";
import styles from "./index.module.scss";
import { cn } from "@/utils/functions/cn";
import { LuCheck, LuRotateCcw } from "react-icons/lu";

interface IStatusActionProps {
  status: IKingdomSongStatus;
  songId: string;
}

export const StatusAction = ({ status, songId }: IStatusActionProps) => {
  const css = styles as Record<string, string>;

  // ── Handlers (vazios — lógica via API) ──────────────────────────────────
  const handleMarkPracticing = () => {
    // TODO: PATCH /songs/:id -> status: "practicing"
  };

  const handleMarkCompleted = () => {
    // TODO: PATCH /songs/:id -> status: "completed"
  };

  const handleUnmark = () => {
    // TODO: PATCH /songs/:id -> status: "pending"
  };

  if (status === "completed") {
    return (
      <button
        className={cn(styles.statusBtn, css["statusBtn--unmark"])}
        onClick={handleUnmark}
        disabled
      >
        <LuCheck size={13} />
        Concluído
      </button>
    );
  }

  if (status === "pending") {
    return (
      <button
        className={cn(styles.statusBtn, css["statusBtn--practice"])}
        onClick={handleMarkPracticing}
      >
        <LuCheck size={13} />
        Iniciar prática
      </button>
    );
  }

  // practicing
  return (
    <button
      className={cn(styles.statusBtn, css["statusBtn--complete"])}
      onClick={handleMarkCompleted}
    >
      <LuCheck size={13} />
      Marcar como concluída
    </button>
  );
};
