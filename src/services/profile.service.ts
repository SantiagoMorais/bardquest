import { IUser, IUserProfile, IUserProfileWithUser } from "@/interfaces/api/user";
import { IUpdateUserDataService } from "@/interfaces/services/update-user-data";
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
}
