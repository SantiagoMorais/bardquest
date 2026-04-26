import { toast } from "@/components/toast";
import { applyXp } from "@/config/apply-xp";
import { getMissionXp } from "@/config/progression";
import { IUser } from "@/interfaces/api/user";
import {
  IAddDailyMissionRequest,
  ICompleteMissionRequest,
} from "@/interfaces/services/mission";
import { supabase } from "@/lib/supabase";

export class MissionService {
  static addDailyMission = async ({ newMission, userId }: IAddDailyMissionRequest) => {
    const { data: user } = (await supabase
      .from("users")
      .select("daily_missions, last_mission_at")
      .eq("id", userId)
      .single()) as { data: Pick<IUser, "daily_missions" | "last_mission_at"> | null };

    if (!user) throw new Error("Usuário não encontrado.");

    const today = new Date().toISOString().split("T")[0];
    const lastMissionDate = user.last_mission_at?.split("T")[0];

    // Regra 1: No máximo 3
    if (user.daily_missions.length >= 3) throw new Error("Limite de missões atingido.");

    // Regra 2: Só uma por dia
    if (lastMissionDate === today) throw new Error("Você já recebeu uma missão hoje.");

    // Se passou, adiciona
    const updatedMissions = [...user.daily_missions, newMission];

    await supabase
      .from("users")
      .update({
        daily_missions: updatedMissions,
        last_mission_at: new Date().toISOString(),
      })
      .eq("id", userId);
  };

  static completeMission = async ({
    userId,
    mission,
    currentXp,
    level,
  }: ICompleteMissionRequest): Promise<{ newLevel: number; leveledUp?: boolean }> => {
    const gainedXp = getMissionXp({
      level,
      xp_reward: mission.xp_reward,
    });

    const updatedProgress = applyXp({
      gainedXp,
      progress: {
        currentXp: currentXp ?? 0,
        level: level ?? 1,
      },
    });

    const { data: user } = (await supabase
      .from("users")
      .select("daily_missions")
      .eq("id", userId)
      .single()) as { data: Pick<IUser, "daily_missions"> | null };

    if (!user) throw new Error("Usuário não encontrado.");

    const updatedMissions = user.daily_missions.filter((m) => m.id !== mission.id);

    await supabase
      .from("users")
      .update({
        daily_missions: updatedMissions,
        xp: updatedProgress.currentXp,
        level: updatedProgress.level,
      })
      .eq("id", userId);

    toast.success(`Missão concluída! +${gainedXp}XP (Bônus de nível aplicado)`);

    return {
      newLevel: updatedProgress.level,
      leveledUp: updatedProgress.leveledUp,
    };
  };
}
