import { IUser, IUserProfile } from "../api/user";

export interface IGetUserProfileAndBaseDataResponse {
  user: IUser | null;
  profile: IUserProfile | null;
}
