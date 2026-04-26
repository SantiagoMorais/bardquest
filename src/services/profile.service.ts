import { IUser, IUserProfile } from "@/interfaces/api/user";
import { IGetUserProfileAndBaseDataResponse } from "@/interfaces/services/getUserProfileAndBaseData";
import {
  IUpdateUserDataService,
  IUpdateUserPreferences,
} from "@/interfaces/services/update-user-data";
import { supabase } from "@/lib/supabase";

export class ProfileService {
  static getById = async (userId: string): Promise<IUserProfile | null> => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }
    return data;
  };

  static createFullProfile = async (
    profile: Omit<IUserProfile, "updated_at">
  ): Promise<IUserProfile | null> => {
    const { data, error } = await supabase
      .from("user_profiles")
      .insert(profile)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  static getUserProfile = async (userId: string): Promise<IUserProfile | null> => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }
    return data;
  };

  static getUserData = async (userId: string): Promise<IUser | null> => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }
    return data;
  };

  static getUserProfileAndBaseData = async (
    userId: string
  ): Promise<IGetUserProfileAndBaseDataResponse | null> => {
    const { data, error } = await supabase
      .from("users")
      .select(
        `
      id,
      email,
      xp,
      level,
      streak,
      created_at,
      daily_missions,
      last_mission_at,
      last_practice_date,
      profile:user_profiles!user_profiles_user_id_fkey (
        username,
        gender,
        instrument,
        base_difficulty,
        interests,
        current_kingdom_id,
        birth_date
      )
    `
      )
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Erro no Supabase:", error.message);
      throw error;
    }

    if (!data) {
      return { user: null, profile: null };
    }

    const { profile, ...user } = data;

    return {
      user: user as IUser,
      profile: (profile ?? null) as unknown as IUserProfile | null,
    };
  };

  static updateUserData = async (payload: IUpdateUserDataService) => {
    const { data, error } = await supabase.auth.updateUser({
      current_password: payload.oldPassword,
      ...(payload.email ? { email: payload.email } : {}),
      ...(payload.newPassword ? { password: payload.newPassword } : {}),
      ...(payload.username ? { data: { username: payload.username } } : {}),
    });

    if (error) {
      throw error;
    }

    return data;
  };

  static updateUserPreferences = async (payload: IUpdateUserPreferences) => {
    const { data, error } = await supabase
      .from("user_profiles")
      .update({
        interests: {
          categories: payload.categories,
          keywords: payload.keywords,
        },
      })
      .eq("user_id", payload.id)
      .select()
      .single();

    if (error) throw error;

    return data;
  };
}
