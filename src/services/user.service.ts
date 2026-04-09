import { IUser, IUserProfile, IUserProfileWithUser } from "@/interfaces/api/user";
import { supabase } from "@/lib/supabase";

export class UserService {
  static syncUserProfile = async (user: {
    id: string;
    email: string;
    username: string;
  }): Promise<IUser | null> => {
    try {
      const { data, error } = await supabase
        .from("users")
        .insert({
          id: user.id,
          email: user.email,
          username: user.username,
          xp: 0,
          level: 1,
          streak: 0,
        })
        .select()
        .single();

      if (error) {
        // Se o erro for "Duplicate Key", significa que o perfil já existe, o que é OK.
        if (error.code === "23505") {
          const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .single();

          if (fetchError) throw fetchError;
          return existingUser;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error syncing user profile:", error);
      throw error;
    }
  };

  static firstTimeLogin = async (
    data: IUserProfileWithUser
  ): Promise<{ user: unknown; profile: unknown }> => {
    try {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert({
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          xp: data.user.xp,
          level: data.user.level,
          streak: data.user.streak,
          created_at: new Date().toISOString(),
        } as IUser)
        .select()
        .single();

      if (userError) {
        if (userError.code !== "23505") {
          // Se o erro não for "Duplicate Key", lança o erro
          throw userError;
        }
      }

      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .insert({
          user_id: data.user.id,
          instrument: data.instrument,
          base_difficulty: data.base_difficulty,
          interests: data.interests,
        } as IUserProfile)
        .select()
        .single();

      if (profileError) {
        if (profileError.code !== "23505") {
          // Se o erro não for "Duplicate Key", lança o erro
          throw profileError;
        }
      }

      return { user: userData, profile: profileData };
    } catch (error) {
      console.error("Error during first-time login:", error);
      throw error;
    }
  };

  static getCurrentUser = async (): Promise<IUser | null> => {
    const user = await supabase.auth.getUser();
    if (!user) return null;

    // Tenta buscar o perfil do usuário
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.data.user?.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Perfil não encontrado, mas usuário existe
      throw error;
    }

    return data;
  };
}
