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
  id: string; // UUID
  name: string;
  description: string;
  ambience: string;
  visual_elements: string[];
  keywords: string[];
  identity: string;
  image_url: string | null;
  level: number;
  base_difficulty_range: [number, number];

  lore: IKingdomPartType<IKingdomLorePart>;
  songs: IKingdomPartType<IKingdomSong>;

  categories: string[];
  created_at: string;

  boss_id: string | null;
  relic_id: string | null;

  bosses?: IBoss;
}

export interface IKingdomFeedback {
  id: string; // UUID
  user_id: string; // UUID
  kingdom_id: string; // UUID
  difficulty_rating: number;
  feedback_type: "easy" | "medium" | "hard" | "impossible";
  adjustment_made: number;
  created_at: string;
}

export interface IKingdomWithSongs extends IKingdom {
  songs_metadata?: ISong[];
}

// const { data, error } = await supabase
//   .from('kingdoms')
//   .select(`
//     *,
//     songs_in_catalog: songs (
//       id,
//       title,
//       difficulty,
//       is_boss
//     )
//   `)
//   .eq('id', kingdomId)
//   .single();
