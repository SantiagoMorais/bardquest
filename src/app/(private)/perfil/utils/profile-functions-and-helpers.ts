import { IUserProfileWithUser } from "@/interfaces/api/user";

export const MOCK_USER: IUserProfileWithUser = {
  age: 26,
  base_difficulty: 4,
  experience: "basic",
  instrument: "piano",
  interests: {
    categories: ["classical", "jazz", "anime"],
    keywords: ["improvisation", "composition", "bach", "chopin"],
  },
  user: {
    email: "bardolin@bardquest.com",
    id: "mock-user-id",
    username: "Bardolin",
    last_practice_date: new Date().toDateString(),
    level: 7,
    streak: 3,
    xp: 1500,
    created_at: new Date().toISOString(),
  },
};

export const MOCK_NECESSARY_XP = 2500;

export const EXPERIENCE_LABEL: Record<string, string> = {
  begginer: "Iniciante",
  basic: "Básico",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

export const INSTRUMENT_LABEL: Record<string, string> = {
  piano: "Piano",
  guitar: "Violão",
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
