import z from "zod";

export const createUserPreferencesSchema = z.object({
  authId: z.string(),
  email: z.email({ error: "Escolha um e-mail válido." }),
});

export interface ICreateUser {
  authId: string;
  email: string;
}
