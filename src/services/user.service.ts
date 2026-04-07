import { IUser } from "@/interfaces/api/user";
import {
  ISignInRequest,
  ISignInResponse,
  ISignUpRequest,
  ISignUpResponse,
} from "@/interfaces/sign-up-type";
import { supabase } from "@/lib/supabase";

export class AuthService {
  /**
   * Passo 1: Registra o usuário apenas no Supabase Authentication.
   * Não tenta inserir no banco de dados ainda para evitar erros de RLS/Confirmação.
   */
  static signUp = async ({
    email,
    password,
    username,
  }: ISignUpRequest): Promise<ISignUpResponse | null> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Guardamos o username nos metadados para recuperar no primeiro login
          data: {
            display_name: username,
          },
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error during auth sign up:", error);
      throw error;
    }
  };

  static signIn = async ({
    email,
    password,
  }: ISignInRequest): Promise<ISignInResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error during auth sign in:", error);
      throw error;
    }
  };

  static signOut = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Error during auth sign out:", error);
      throw error;
    }
  }

  static syncUserProfile = async (user: {
    id: string;
    email?: string;
    username: string;
  }): Promise<IUser | null> => {
    try {
      const { data, error } = await supabase
        .from("users")
        .insert({
          id: user.id,
          email: user.email ?? "",
          username: user.username,
          xp: 0,
          level: 1,
          streak: 0,
        })
        .select()
        .single();

      if (error) {
        // Se o erro for "Duplicate Key", significa que o perfil já existe, o que é OK.
        if (error.code === "23505") return data;
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error syncing user profile:", error);
      throw error;
    }
  };
}
