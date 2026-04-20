import { IAuditInfo } from "../audit-info";

export interface IUser extends IAuditInfo {
  email: string;
  xp?: number;
  level?: number;
  streak?: number;
  last_practice_date?: string | null;
}

export interface IUserProfile {
  user_id: string;
  username: string;
  gender: "male" | "female";
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
