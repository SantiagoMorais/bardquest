import z from "zod";
import { IAuditInfo } from "./audit-info";
import { id } from "zod/locales";

export interface IUser extends IAuditInfo {
  username: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
  lastPracticeDate: Date | null;
}

export const createUserSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.email(),
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
});

export type ICreateUser = z.infer<typeof createUserSchema>;

export const updateUserInput = createUserSchema.extend({
  id: z.uuid(),
});

export type IUpdateUser = z.infer<typeof updateUserInput>;
