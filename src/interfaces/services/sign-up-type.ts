import { Session, User, WeakPassword } from "@supabase/supabase-js";
import z from "zod";
import { passwordSchema } from "../schemas/default-password";
import { usernameSchema } from "../schemas/default-username";

export const signUpSchema = z
  .object({
    email: z.email("Insira um email válido"),
    password: passwordSchema,
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "As senhas não coincidem",
    path: ["repeatPassword"],
  });
export type ISignUpRequest = z.infer<typeof signUpSchema>;
export type ISignUpResponse =
  | {
      user: User | null;
      session: Session | null;
    }
  | {
      user: null;
      session: null;
    };

export const signInSchema = z.object({
  email: z.email("Insira um email válido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

export type ISignInRequest = z.infer<typeof signInSchema>;

export type ISignInResponse =
  | {
      user: User;
      session: Session;
      weakPassword?: WeakPassword;
    }
  | {
      user: null;
      session: null;
      weakPassword?: null | undefined;
    };
