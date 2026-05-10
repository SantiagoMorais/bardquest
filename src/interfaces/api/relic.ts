export interface IRelic {
  id: string;
  user_id: string;

  // Dados de Identidade
  name: string;
  type: string;
  description: string | null;
  kingdom_id: string;

  // Dados Musicais e Mágicos
  musical_signature: string | null;
  magical_effect: string | null;
  main_identity: string;

  // Dados de Gamificação e Estética
  power_level: number; // 1 a 10 (o mesmo valor da dificuldade atual do usuário)
  traits: string[];
  color_palette: string[];

  // Mídia
  image_url: string | null;
  created_at: string;
}

/**
 * Tipo específico para o Payload que vem da IA
 */
export type IRelicGenerationAIResponse = Pick<
  IRelic,
  | "name"
  | "type"
  | "description"
  | "musical_signature"
  | "magical_effect"
  | "main_identity"
  | "color_palette"
  | "power_level"
  | "traits"
>;

export interface IRelicWithKingdom extends IRelic {
  kingdoms?: {
    name: string;
    description: string;
  };
}
