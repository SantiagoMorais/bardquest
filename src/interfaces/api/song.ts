export type SongStatus = "not_started" | "in_progress" | "done";

export interface ISong {
  id: string;
  created_at: string;
  title: string;
  kingdom_id: string | null;
  is_boss: boolean;
  artist: string | null;
  sheet_music_url: string | null;
}

export interface IUserSong {
  id: string;
  user_id: string;
  song_id: string;
  status: SongStatus;
  completed_at: string | null;
  source: "ui-generated" | "imported";
}
