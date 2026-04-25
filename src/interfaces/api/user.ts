import { IAuditInfo } from "../audit-info";
import { IMission } from "./mission";

export interface IUser extends IAuditInfo {
  email: string;
  xp?: number;
  level?: number;
  streak?: number;
  last_practice_date?: string | null;
  daily_missions: IMission[]; // Máximo 3
  last_mission_at: string | null; // Data da última missão recebida
}

export interface IUserProfile {
  user_id: string;
  username: string;
  gender: "male" | "female" | null;
  experience: "begginer" | "basic" | "intermediate" | "advanced";
  instrument: "piano" | "guitar";
  base_difficulty: number;
  interests: IUserInterests;
  current_kingdom_id: number;
  updated_at: string;
  birth_date: string | null;
}

export interface IUserInterests {
  categories: string[];
  keywords: string[];
}

export interface IUserProfileWithUser extends Omit<
  IUserProfile,
  "updated_at" | "current_kingdom_id" | "user_id"
> {
  user: IUser;
}
