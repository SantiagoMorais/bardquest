import { IKingdom, IKingdomFeedback } from "./kingdom";
import { ISong, IUserSong } from "./song";
import { IUser, IUserProfile } from "./user";

export interface IDatabase {
  public: {
    Tables: {
      users: {
        Row: IUser;
        Insert: Omit<IUser, "id" | "created_at" | "updated_at"> & { id?: string };
        Update: Partial<IUser>;
      };
      user_profiles: {
        Row: IUserProfile;
        Insert: IUserProfile;
        Update: Partial<IUserProfile>;
      };
      songs: {
        Row: ISong;
        Insert: Omit<ISong, "id" | "created_at">;
        Update: Partial<ISong>;
      };
      user_songs: {
        Row: IUserSong;
        Insert: Omit<IUserSong, "id" | "completed_at">;
        Update: Partial<IUserSong>;
      };
      kingdoms: {
        Row: IKingdom;
        Insert: Omit<IKingdom, "id" | "created_at">;
        Update: Partial<IKingdom>;
      };
      kingdom_feedbacks: {
        Row: IKingdomFeedback;
        Insert: Omit<IKingdomFeedback, "id" | "created_at">;
        Update: Partial<IKingdomFeedback>;
      };
    };
  };
}
