import z from "zod";

export const passwordSchema = z
  .string()
  .min(6, "A senha deve ter pelo menos 6 caracteres")
  .max(20, "A senha deve ter no máximo 20 caracteres")
  .refine((value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  }, "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial");

export type IPassword = z.infer<typeof passwordSchema>;
