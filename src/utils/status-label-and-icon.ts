import { IKingdomSongStatus } from "@/interfaces/kingdom-card";

export const STATUS_LABEL: Record<IKingdomSongStatus, string> = {
  pending: "À fazer",
  practicing: "Em progresso",
  completed: "Concluída",
};

export const STATUS_ICON: Record<IKingdomSongStatus, string> = {
  pending: "🎵",
  practicing: "🎶",
  completed: "✦",
};
