import { IUserProfileWithUser } from "@/interfaces/api/user";
import {
  EXPERIENCE_TO_DIFFICULTY,
  IOnboardingFormValues,
} from "@/interfaces/onboarding-types";
import { User } from "@supabase/supabase-js";

export const payloadForFirstLogin = ({
  data,
  user,
}: {
  data: IOnboardingFormValues;
  user: User;
}): IUserProfileWithUser => ({
  instrument: data.instrument,
  age: data.age,
  experience: data.experience,
  base_difficulty: EXPERIENCE_TO_DIFFICULTY[data.experience],
  interests: {
    categories: data.interests.categories,
    keywords: data.interests.keywords.filter((k) => k.trim() !== ""),
  },
  user: {
    id: user.id,
    email: user.email!,
    username: data.username,
    created_at: user.created_at,
    xp: 0,
    level: 1,
    streak: 0,
    last_practice_date: null,
    updated_at: user.created_at,
  },
});
