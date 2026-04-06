export interface IUser {
  id: string;
  created_at: string;
  username: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
  last_practice_date: string | null;
  updated_at: string;
}

export interface IUserProfile {
  user_id: string;
  instrument: "piano" | "guitar";
  base_difficulty: number;
  interests: IUserInterests; // JSONB
  current_kingdom_id: number;
  updated_at: string;
}

export interface IUserInterests {
  categories: string[]; // ['anime', 'games', 'classical']
  keywords: string[]; // ['naruto', 'maplestory', 'bach']
}
