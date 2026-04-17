import { IBoss } from "./boss";
import { ISong } from "./song";

export interface IKingdomSong {
  title: string;
  artist: string;
  is_boss: boolean;
}

export type IKingdomPartType<T> = {
  part_1: T;
  part_2: T;
  part_3: T;
  final_part: T;
};

export interface IKingdomLorePart {
  title: string;
  content: string;
}

export interface IKingdom {
  id: string;
  name: string;
  description: string;
  ambience: string;
  visual_elements: string[];
  keywords: string[];
  identity: string;
  image_url: string | null;
  level: number;
  difficulty: number;

  lore: IKingdomPartType<IKingdomLorePart>;
  songs: IKingdomPartType<string>;

  categories: string[];
  created_at: string;

  boss_id: string | null;
  relic_id: string | null;

  bosses?: IBoss;
}

export interface IKingdomFeedback {
  id: string;
  user_id: string;
  kingdom_id: string;
  difficulty_rating: number;
  feedback_type: "easy" | "medium" | "hard" | "impossible";
  adjustment_made: number;
  created_at: string;
}

export interface IKingdomWithFullSongs extends IKingdom {
  songs_parts: IKingdomPartType<ISong>;
}
