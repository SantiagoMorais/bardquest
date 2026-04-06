export type SongStatus = 'learning' | 'mastered' | 'wishlist';
export type SongSource = 'kingdom' | 'custom' | 'ai_generated';

export interface ISong {
  id: string;
  created_at: string;
  title: string;
  difficulty: string; // 'beginner', 'intermediate', 'advanced'
  xp_reward: number;
  realm_id: string | null;
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
  completed_at: string | null;
  source: SongSource;
  // Campos redundantes para busca rápida ou músicas custom sem template
  title: string;
  sheet_music_url: string | null;
  file_path: string | null; // Caminho no Storage do Supabase
  version_tag: string | null;
}