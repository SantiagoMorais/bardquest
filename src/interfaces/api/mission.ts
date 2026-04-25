import { IMissionDifficulty } from "@/config/progression";

export interface IMission {
  id: string;
  title: string;
  description: string;
  difficulty: IMissionDifficulty;
  xp_reward: number;
  created_at: string;
}
