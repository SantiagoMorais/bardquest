import z from "zod";

export const usernameSchema = z
  .string()
  .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
  .max(30, "O nome de usuário deve ter no máximo 30 caracteres");

export type IUsername = z.infer<typeof usernameSchema>;
