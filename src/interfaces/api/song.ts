export type SongDifficulty = "beginner" | "easy" | "medium" | "hard";
export type SongStatus = "not_started" | "in_progress" | "done";
export type SongSource = "custom" | "ai_generated";

export interface ISong {
  id: string;
  created_at: string;
  title: string;
  difficulty: SongDifficulty;
  xp_reward: number;
  kingdom_id: string | null;
  is_boss: boolean;
  artist: string | null;
  version_tag: string | null;
  sheet_music_url: string | null;
}

export interface IUserSong {
  id: string;
  user_id: string;
  song_id: string;
  status: SongStatus;
  source: SongSource;
  completed_at: string | null;

  title: string;
  artist: string | null;
  sheet_music_url: string | null;
  file_path: string | null;
  version_tag: string | null;
}
