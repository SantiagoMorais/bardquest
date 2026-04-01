import { env } from "@/env";
import { ICreateUser, IUpdateUser, IUser } from "@/interfaces/user-type";
import axios from "axios";

export const createUser = async (data: ICreateUser) => {
  await axios.post(env.DATABASE_BASE_API_ACCESS + "/users", data);
};

export const updateUser = async (data: IUpdateUser) => {
  await axios.put(env.DATABASE_BASE_API_ACCESS + "/users/" + data.id, data);
};

export const getUserById = async (id: string): Promise<IUser> => {
  const { data } = await axios.get<IUser>(env.DATABASE_BASE_API_ACCESS + "/users/" + id);
  return data;
};
