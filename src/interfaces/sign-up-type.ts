import { Session, User, WeakPassword } from "@supabase/supabase-js";
import z from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
      .max(30, "O nome de usuário deve ter no máximo 30 caracteres"),
    email: z.email("Insira um email válido"),
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .max(20, "A senha deve ter no máximo 20 caracteres")
      .refine((value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      }, "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"),
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
