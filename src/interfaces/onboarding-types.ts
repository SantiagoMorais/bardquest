export interface IOnboardingFormValues {
  username: string;
  birth_date: string | null;
  gender: "male" | "female" | null;
  experience: "begginer" | "basic" | "intermediate" | "advanced";
  instrument: "piano" | "guitar";
  interests: {
    categories: string[];
    keywords: string[];
  };
}

export const EXPERIENCE_TO_DIFFICULTY: Record<
  IOnboardingFormValues["experience"],
  number
> = {
  begginer: 1,
  basic: 3,
  intermediate: 6,
  advanced: 9,
};

export const CATEGORIES = [
  { value: "anime", label: "🎌 Anime" },
  { value: "games", label: "🎮 Jogos" },
  { value: "classica", label: "🎻 Clássica" },
  { value: "pop", label: "🎤 Pop" },
  { value: "medieval", label: "⚔️ Medieval / Celta" },
  { value: "folk", label: "🪕 Folk / Acústico" },
  { value: "fantasia", label: "🐉 Fantasia / RPG" },
  { value: "religiosa", label: "⛪ Religiosa / Sacra" },
  { value: "jazz", label: "🎷 Jazz" },
  { value: "lofi", label: "☕ Lo-fi / Relaxante" },
  { value: "cinematic", label: "🎬 Cinematográfica" },
  { value: "natal", label: "🎄 Natalina" },
];
