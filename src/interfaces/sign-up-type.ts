import { Session, User } from "@supabase/supabase-js";
import z from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
      .max(20, "O nome de usuário deve ter no máximo 20 caracteres"),
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
