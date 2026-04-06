import { IAuditInfo } from "../audit-info";

export interface IUser extends IAuditInfo {
  username: string;
  email: string;
  xp?: number;
  level?: number;
  streak?: number;
  last_practice_date?: string | null;
}

export type ICreateUserRequest = Pick<IUser, "id" | "email" | "username"> &
  Partial<Pick<IUser, "xp" | "level" | "streak" | "last_practice_date">>;
