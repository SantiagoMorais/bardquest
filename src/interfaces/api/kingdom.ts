import { ISong } from "./song";

export type IKingdomSong = Pick<
  ISong,
  "id" | "is_boss" | "sheet_music_url" | "title" | "artist"
>;

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
  level: number;
  name: string;
  description: string;
  ambience: string; // descrição física base do reino
  visual_elements: string[]; // elementos físicos visuais do reino
  keywords: string[];
  identity: string;
  image_url: string | null;
  difficulty: number;

  lore: IKingdomPartType<IKingdomLorePart>;
  songs: IKingdomPartType<IKingdomSong>;

  categories: string[];
  created_at: string;

  boss_id: string | null;
  relic_id: string | null;
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
