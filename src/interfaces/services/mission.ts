import { IMission } from "../api/mission";

export interface IAddDailyMissionRequest {
  userId: string;
  newMission: IMission;
}

export interface ICompleteMissionRequest {
  userId: string;
  mission: IMission;
  currentXp?: number;
  level?: number;
}
