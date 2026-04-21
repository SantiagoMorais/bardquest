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
