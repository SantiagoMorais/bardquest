import z from "zod";
import { IUserInterests } from "../api/user";
import { ISignUpRequest } from "./sign-up-type";
import { passwordSchema } from "../schemas/default-password";
import { usernameSchema } from "../schemas/default-username";

export const updateUserDataSchema = z
  .object({
    username: usernameSchema,
    email: z.email("Insira um email válido"),
    oldPassword: z.string(),
    newPassword: passwordSchema,
    repeatPassword: passwordSchema,
    birth_date: z.string().optional(),
    instrument: z.enum(["piano", "guitar"]).optional(),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: "As senhas não coincidem",
    path: ["repeatPassword"],
  });

export type IUpdateUserDataService = z.infer<typeof updateUserDataSchema>;

export interface IUpdateUserPreferences extends IUserInterests {
  id: string;
}
