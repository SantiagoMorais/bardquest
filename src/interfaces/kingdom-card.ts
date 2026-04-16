export type IKingdomPartKey = "part_1" | "part_2" | "part_3" | "final_part";

export type IKingdomSongStatus = "pending" | "practicing" | "completed";

export interface IKingdomProgress {
  kingdomId: string;
  songStatuses: Record<IKingdomPartKey, IKingdomSongStatus>;
}

export const PART_KEYS: IKingdomPartKey[] = ["part_1", "part_2", "part_3", "final_part"];

export const PART_LABELS: Record<IKingdomPartKey, string> = {
  part_1: "Capítulo I",
  part_2: "Capítulo II",
  part_3: "Capítulo III",
  final_part: "Confronto Final",
};

export const STATUS_LABELS: Record<IKingdomSongStatus, string> = {
  pending: "Não iniciada",
  practicing: "Praticando",
  completed: "Concluída",
};

export const STATUS_NEXT: Record<IKingdomSongStatus, IKingdomSongStatus> = {
  pending: "practicing",
  practicing: "completed",
  completed: "pending",
};
