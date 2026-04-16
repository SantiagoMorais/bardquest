import { IUser } from "./users-type";

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
