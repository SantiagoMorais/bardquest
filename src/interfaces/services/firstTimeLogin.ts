import { IUserInterests } from "../api/user";

export interface IFirstTimeLoginPayload {
  user: {
    id: string;
    email: string;
  };
  profile: {
    gender: "male" | "female" | null;
    username: string;
    instrument: "piano" | "guitar";
    base_difficulty: number;
    interests: IUserInterests;
    birth_date: string | null;
  };
}
