import { IAuditInfo } from "../audit-info";

export interface IUser extends IAuditInfo {
  username: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
  last_practice_date: string | null;
}

export interface IUserProfile {
  user_id: string;
  instrument: "piano" | "guitar";
  base_difficulty: number;
  interests: IUserInterests; // JSONB
  current_kingdom_id: number;
  updated_at: string;
  age: number | null;
}

export interface IUserInterests {
  categories: string[]; // ['anime', 'games', 'classical']
  keywords: string[]; // ['naruto', 'maplestory', 'bach']
}

export interface IUserProfileWithUser extends Omit<
  IUserProfile,
  "updated_at" | "current_kingdom_id" | "user_id"
> {
  user: IUser;
  experience: "begginer" | "basic" | "intermediate" | "advanced";
}
