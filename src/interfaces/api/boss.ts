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

export interface IBossUpdate extends Partial<Omit<IBoss, "id" | "created_at">> {}

export interface IBossWithKingdom extends IBoss {
  kingdoms?: {
    name: string;
    level: number;
  };
}

// const { data: boss } = await supabase
//   .from('bosses')
//   .select('*')
//   .eq('id', someId)
//   .single();

// // O 'boss' aqui será do tipo IBoss
// console.log(boss.name); // "O Maestro das Sombras"