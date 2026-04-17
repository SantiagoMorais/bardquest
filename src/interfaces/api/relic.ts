export interface IRelic {
  id: string;
  name: string;
  type: string | null;
  description: string | null;
  musical_signature: string | null;
  magical_effect: string | null;
  main_identity: string | null;
  image_url: string | null;
  color_palette: string[];

  kingdom_id: string | null;
  created_at: string;
}

export interface IRelicWithKingdom extends IRelic {
  kingdoms?: {
    name: string;
    description: string;
  };
}
