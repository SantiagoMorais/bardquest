import {
  ISignInRequest,
  ISignInResponse,
  ISignUpRequest,
  ISignUpResponse,
} from "@/interfaces/sign-up-type";
import { supabase } from "@/lib/supabase";

export class AuthService {
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

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error during auth sign out:", error);
      throw error;
    }
  };
}
