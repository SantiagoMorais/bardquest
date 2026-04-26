import { toast } from "@/components/toast";
import { applyXp } from "@/config/apply-xp";
import { getStreakBonus } from "@/config/progression";
import {
  IIncreaseUserStreak,
  IResetUserStreak,
} from "@/interfaces/services/update-user-streak";
import { supabase } from "@/lib/supabase";

export class StreakService {
  static resetUserStreak = async (data: IResetUserStreak) => {
    const { data: result, error } = await supabase
      .from("users")
      .update({
        streak: 0,
      })
      .eq("id", data.userId)
      .select()
      .single();

    if (error) throw error;

    return result;
  };

  static increaseUserStreak = async (
    data: IIncreaseUserStreak
  ): Promise<{ newLevel: number; leveledUp?: boolean; result: unknown }> => {
    const streak = data.currentStreak + 1;
    const gainedXp = getStreakBonus({
      streakDays: streak,
    });

    const updatedProgress = applyXp({
      gainedXp,
      progress: {
        currentXp: data.xp,
        level: data.level,
      },
    });

    const { data: result, error } = await supabase
      .from("users")
      .update({
        streak,
        last_practice_date: data.lastPracticeDate,
        xp: updatedProgress.currentXp,
        level: updatedProgress.level,
      })
      .eq("id", data.userId)
      .select()
      .single();

    if (error) throw error;

    toast.success(`Streak aumentada para ${streak} dias! +${gainedXp} XP!`);

    return {
      newLevel: updatedProgress.level,
      leveledUp: updatedProgress.leveledUp,
      result,
    };
  };
}
