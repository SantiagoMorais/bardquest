import { IKingdom } from "@/interfaces/api/kingdom";

export const MOCK_KINGDOMS: IKingdom[] = [
  {
    id: "k-001",
    name: "Vale das Primeiras Notas",
    description:
      "Um vale sereno onde o vento sussurra melodias antigas. É aqui que toda jornada começa — com silêncio, e a coragem de romper com ele.",
    ambience: "Tranquilo, esperançoso, acolhedor",
    visual_elements: ["flores silvestres", "riachos suaves", "névoa matinal"],
    keywords: ["início", "coragem", "despertar"],
    identity: "O reino do primeiro passo",
    image_url: null,
    level: 1,
    base_difficulty_range: [1, 3],
    boss_id: null,
    relic_id: null,
    categories: ["classica", "folk"],
    created_at: new Date().toISOString(),
    lore: {
      part_1: {
        title: "O Chamado",
        content:
          "Dizem que o vale floresce apenas quando alguém decide tocar pela primeira vez. As flores antigas guardam nas pétalas o eco de cada nota já tocada neste lugar sagrado. Você sente o peso do silêncio — e a urgência de preenchê-lo.",
      },
      part_2: {
        title: "A Névoa da Dúvida",
        content:
          "Uma névoa espessa cobre o caminho, feita dos 'e se eu não for bom o suficiente'. Ela sussurra que outros são mais talentosos, que é tarde demais, que a música não é para você. Mas o riacho à sua frente continua cantando — indiferente às suas dúvidas.",
      },
      part_3: {
        title: "O Riacho da Prática",
        content:
          "Cada nota tocada alimenta o riacho. Cada dia praticado abre novos caminhos por entre as pedras. O segredo que os antigos bardos guardavam: a consistência transforma água em ouro, silêncio em sinfonia.",
      },
      final_part: {
        title: "O Encontro",
        content:
          "No coração do vale, onde as águas convergem, a Voz do Silêncio aguarda. Não para destruir — mas para ser enfrentada com a única arma que existe: sua música. Imperfeita, trêmula, mas genuinamente sua.",
      },
    },
    songs: {
      part_1: { title: "Clair de Lune", artist: "Claude Debussy", is_boss: false },
      part_2: { title: "River Flows in You", artist: "Yiruma", is_boss: false },
      part_3: { title: "Gymnopédie No.1", artist: "Erik Satie", is_boss: false },
      final_part: {
        title: "Moonlight Sonata",
        artist: "Ludwig van Beethoven",
        is_boss: true,
      },
    },
  },
  {
    id: "k-002",
    name: "Floresta das Melodias Perdidas",
    description:
      "Uma floresta ancestral onde as árvores guardam fragmentos de músicas esquecidas. Quem se atreve a entrar, descobre ritmos que o mundo perdeu.",
    ambience: "Misterioso, encantador, melancólico",
    visual_elements: ["cogumelos luminosos", "raízes antigas", "vagalumes"],
    keywords: ["mistério", "ritmo", "memória"],
    identity: "O reino dos ritmos ancestrais",
    image_url: null,
    level: 2,
    base_difficulty_range: [3, 5],
    boss_id: null,
    relic_id: null,
    categories: ["games", "anime"],
    created_at: new Date().toISOString(),
    lore: {
      part_1: {
        title: "Sussurros das Raízes",
        content:
          "As raízes milenares carregam vibrações de músicos que passaram por aqui. Cada raiz é uma história — de quem tentou, de quem desistiu, de quem triunfou. Você coloca as mãos na casca áspera e sente o pulso da floresta.",
      },
      part_2: {
        title: "A Dança dos Vagalumes",
        content:
          "À noite, vagalumes formam partituras vivas no ar. Eles dançam em padrões que revelam segredos rítmicos impossíveis de anotar — só de sentir. Siga a luz mais brilhante.",
      },
      part_3: {
        title: "O Ritmo da Floresta",
        content:
          "A floresta tem seu próprio pulso, antigo como as estrelas. Sincronizar com ele é o segredo que separa os que tocam dos que realmente ouvem. Você começa a entender: a música não é criada. Ela é descoberta.",
      },
      final_part: {
        title: "O Guardião Desperta",
        content:
          "Nas profundezas, onde a luz dos vagalumes não chega, o Guardião do Esquecimento abre os olhos. Ele existe de toda nota não tocada, de toda música abandonada. Vencê-lo é provar que você não será mais um fantasma nesta floresta.",
      },
    },
    songs: {
      part_1: { title: "Zelda's Lullaby", artist: "Koji Kondo", is_boss: false },
      part_2: { title: "To Zanarkand", artist: "Nobuo Uematsu", is_boss: false },
      part_3: { title: "Aerith's Theme", artist: "Nobuo Uematsu", is_boss: false },
      final_part: { title: "One-Winged Angel", artist: "Nobuo Uematsu", is_boss: true },
    },
  },
  {
    id: "k-003",
    name: "Cidadela das Cordas de Aço",
    description:
      "Uma fortaleza no topo de uma montanha de cristal. Seus habitantes acreditam que a técnica perfeita é a única forma de arte verdadeira.",
    ambience: "Grandioso, intimidador, imponente",
    visual_elements: ["torres cristalinas", "estandartes", "ventos gelados"],
    keywords: ["técnica", "disciplina", "grandeza"],
    identity: "O reino da maestria técnica",
    image_url: null,
    level: 3,
    base_difficulty_range: [5, 8],
    boss_id: null,
    relic_id: null,
    categories: ["classica"],
    created_at: new Date().toISOString(),
    lore: {
      part_1: {
        title: "As Torres do Julgamento",
        content:
          "Cada torre representa uma técnica diferente. Escalar todas é o desafio da cidadela. As paredes de cristal refletem seus erros com crueldade implacável — não há onde se esconder aqui.",
      },
      part_2: {
        title: "O Código das Cordas",
        content:
          "A cidadela tem leis rígidas gravadas em pedra: toda nota deve ser perfeita, ou não deve existir. Os habitantes olham com desdém para qualquer hesitação. Mas você começa a perceber — a perfeição deles é uma prisão.",
      },
      part_3: {
        title: "A Rebelião Silenciosa",
        content:
          "Nos subterrâneos, músicos sussurram entre si: 'A imperfeição também é arte'. Eles praticam às escondidas músicas que fazem chorar — imperfeitas, humanas, vivas. Você entende que técnica sem alma é apenas acrobacia.",
      },
      final_part: {
        title: "Lord Perfectionis",
        content:
          "No salão principal, sentado em um trono de partituras imaculadas, o Tirano aguarda. Ele usa sua própria voz para lembrar cada erro que você já cometeu. A resposta não é a perfeição — é tocar mesmo assim.",
      },
    },
    songs: {
      part_1: { title: "Maple Leaf Rag", artist: "Scott Joplin", is_boss: false },
      part_2: { title: "Hungarian Rhapsody No.2", artist: "Franz Liszt", is_boss: false },
      part_3: { title: "Prelude in C Minor", artist: "Frédéric Chopin", is_boss: false },
      final_part: {
        title: "Flight of the Bumblebee",
        artist: "Rimsky-Korsakov",
        is_boss: true,
      },
    },
  },
];
