export interface IBoss {
  id: string;
  name: string;
  title: string | null;

  instrument: "piano" | "violão";

  personality: string | null;
  main_identity: string | null;
  musical_inspiration: string | null;

  clothing: string | null;
  environment: string | null;
  expression: string | null;
  pose: string | null;
  aura: string | null;
  image_url: string | null;

  color_palette: string[];

  kingdom_id: string | null;
  created_at: string;
}

export type IBossUpdate = Partial<Omit<IBoss, "id" | "created_at">>;

export interface IBossWithKingdom extends IBoss {
  kingdoms?: {
    name: string;
    level: number;
  };
}
