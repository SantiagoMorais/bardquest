import { applyXp } from "@/config/apply-xp";
import { getStreakBonus } from "@/config/progression";
import { IUser, IUserProfile, IUserProfileWithUser } from "@/interfaces/api/user";
import {
  IUpdateUserDataService,
  IUpdateUserPreferences,
} from "@/interfaces/services/update-user-data";
import {
  IIncreaseUserStreak,
  IResetUserStreak,
} from "@/interfaces/services/update-user-streak";
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
  ): Promise<IUserProfileWithUser | null> => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select(
        `
      *,
      user:users!user_id (
        id,
        email,
        xp,
        level,
        streak,
        created_at
      )
    `
      )
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      console.error("Erro no Supabase:", error.message);
      throw error;
    }

    return data as unknown as IUserProfileWithUser;
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

  static resetUserStreak = async (data: IResetUserStreak) => {
    const { data: result, error } = await supabase
      .from("users")
      .update({
        streak: 0,
      })
      .eq("id", data.userId)
      .select()
      .single();

    if (error) throw error;

    return result;
  };

  static increaseUserStreak = async (data: IIncreaseUserStreak) => {
    const streak = data.currentStreak + 1;
    const gainedXp = getStreakBonus({
      streakDays: streak,
    });

    const updatedProgress = applyXp({
      gainedXp,
      progress: {
        currentXp: data.xp,
        level: data.level,
      },
    });

    const { data: result, error } = await supabase
      .from("users")
      .update({
        streak,
        last_practice_date: data.lastPracticeDate,
        xp: updatedProgress.currentXp,
        level: updatedProgress.level,
      })
      .eq("id", data.userId)
      .select()
      .single();

    if (error) throw error;

    return result;
  };
}
