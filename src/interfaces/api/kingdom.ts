export interface IKingdomLore {
  part_1: string;
  part_2: string;
  part_3: string;
  part_4: string;
  boss_intro: string;
}

export interface IKingdomSongReference {
  title: string;
  is_boss: boolean;
  suggested_difficulty: string;
}

export interface IKingdom {
  id: string;
  level: number;
  name: string;
  base_difficulty_range: number[]; // [min, max]
  lore: IKingdomLore; // JSONB
  songs: IKingdomSongReference[]; // JSONB Array
  categories: string[];
  created_at: string;
}

export interface IKingdomFeedback {
  id: string;
  user_id: string;
  kingdom_id: number;
  difficulty_rating: number; // 1-10
  feedback_type: "easy" | "medium" | "hard" | "impossible";
  adjustment_made: number; // +1, 0, -1, -2
  created_at: string;
}
