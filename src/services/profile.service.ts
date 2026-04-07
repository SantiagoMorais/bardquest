import { IUser, IUserProfile } from "@/interfaces/api/user";
import { supabase } from "@/lib/supabase";

export class ProfileService {
  static getById = async (userId: string): Promise<IUser | null> => {
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

  static createFullProfile = async (
    profile: Omit<IUserProfile, "updated_at">
  ): Promise<IUserProfile | null> => {
    const { data, error } = await supabase
      .from("users")
      .insert(profile)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  static getUserPreferences = async (userId: string): Promise<IUserProfile | null> => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }
    return data;
  };
}
