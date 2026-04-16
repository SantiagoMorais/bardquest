import { IKingdom, IKingdomWithFullSongs } from "@/interfaces/api/kingdom";

export const MOCK_KINGDOMS: IKingdomWithFullSongs[] = [
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
    difficulty: 3,
    boss_id: null,
    relic_id: null,
    categories: ["classica", "folk"],
    created_at: new Date().toISOString(),
    lore: {
      part_1: {
        title: "O Chamado",
        content:
          "Ao chegar em Brumavale, você encontra uma vila silenciosa, coberta por uma névoa densa que dificulta a visão além de poucos metros. As casas são conectadas por cordas e pequenas engrenagens que rangem lentamente, como se dependessem de algo que não está funcionando corretamente. Um homem idoso se aproxima e explica que a vila depende de arquivos musicais guardados em torres antigas. Cada melodia registrada ativa partes do vale, como pontes, iluminação e transporte de água. Nos últimos meses, vários arquivos foram perdidos ou danificados, e as máquinas começaram a falhar. Ele menciona um nome com certo receio: Arquen, o antigo arquivista-chefe, considerado o melhor músico da região, que abandonou tudo após um erro grave. Enquanto você toca a primeira música, uma fileira de lampiões volta a acender, iluminando uma das ruas principais. Algumas pessoas saem de suas casas, observando com surpresa, mas o clima ainda é de incerteza. Há muito mais para restaurar.",
      },
      part_2: {
        title: "A Névoa da Dúvida",
        content:
          "À medida que você avança, a névoa começa a se dissipar em áreas específicas onde as máquinas voltam a operar. Um sistema de cordas suspensas é reativado, permitindo que cargas sejam transportadas entre as torres. Um grupo de moradores pede sua ajuda para acessar a torre central, onde Arquen vive isolado. Ao tocar mais uma música, um antigo elevador de madeira volta a funcionar, rangendo até parar diante de uma grande porta fechada. Ao entrar, você encontra Arquen cercado por partituras rasgadas e instrumentos abandonados. Ele observa em silêncio enquanto você se aproxima. Um dos moradores explica que, anos atrás, Arquen tentou usar uma melodia experimental para otimizar todos os sistemas do vale de uma vez, mas acabou causando uma falha generalizada que deixou a vila dias no escuro e sem água. Desde então, ele acredita que sua música só causa problemas. O momento de confronto chega.",
      },
      part_3: {
        title: "O Riacho da Prática",
        content:
          "Sem discutir, você se posiciona e começa a tocar. No início, Arquen desvia o olhar, claramente incomodado, mas conforme a música avança, ele observa com mais atenção. As notas ecoam pela torre, e alguns mecanismos internos começam a reagir. Pequenas engrenagens voltam a se mover, gavetas se reorganizam lentamente. Arquen se levanta, hesita por um momento, e então pega um instrumento antigo apoiado na parede. Ele toca junto, ajustando partes da melodia com precisão impressionante. Do lado de fora, moradores percebem que várias áreas do vale começam a funcionar simultaneamente. Quando a música termina, Arquen permanece em silêncio por alguns segundos antes de admitir que estava errado em abandonar tudo. Ele decide retornar ao trabalho, reorganizando os arquivos e ajudando a restaurar o sistema por completo. Antes de você partir, ele entrega uma partitura antiga, afirmando que você conseguiu fazer algo que ele não conseguiu sozinho.",
      },
      final_part: {
        title: "O Encontro",
        content:
          "No coração do vale, onde as águas convergem, a Voz do Silêncio aguarda. Não para destruir — mas para ser enfrentada com a única arma que existe: sua música. Imperfeita, trêmula, mas genuinamente sua.",
      },
    },
    songs: {
      part_1: "s-001-1",
      part_2: "s-001-2",
      part_3: "s-001-3",
      final_part: "s-001-boss",
    },
    songs_parts: {
      part_1: {
        id: "s-001-1",
        created_at: new Date().toISOString(),
        title: "Clair de Lune",
        xp_reward: 100,
        kingdom_id: "k-001",
        is_boss: false,
        artist: "Claude Debussy",
        sheet_music_url: "https://sheets.example.com/debussy-clair-de-lune",
      },
      part_2: {
        id: "s-001-2",
        created_at: new Date().toISOString(),
        title: "River Flows in You",
        xp_reward: 120,
        kingdom_id: "k-001",
        is_boss: false,
        artist: "Yiruma",
        sheet_music_url: "https://sheets.example.com/yiruma-river-flows",
      },
      part_3: {
        id: "s-001-3",
        created_at: new Date().toISOString(),
        title: "Gymnopédie No.1",
        xp_reward: 150,
        kingdom_id: "k-001",
        is_boss: false,
        artist: "Erik Satie",
        sheet_music_url: "https://sheets.example.com/satie-gymnopédie",
      },
      final_part: {
        id: "s-001-boss",
        created_at: new Date().toISOString(),
        title: "Moonlight Sonata",
        xp_reward: 500,
        kingdom_id: "k-001",
        is_boss: true,
        artist: "Ludwig van Beethoven",
        sheet_music_url: "https://sheets.example.com/beethoven-moonlight",
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
    difficulty: 4,
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
      part_1: "s-002-1",
      part_2: "s-002-2",
      part_3: "s-002-3",
      final_part: "s-002-boss",
    },
    songs_parts: {
      part_1: {
        id: "s-002-1",
        created_at: new Date().toISOString(),
        title: "Zelda's Lullaby",
        xp_reward: 150,
        kingdom_id: "k-002",
        is_boss: false,
        artist: "Koji Kondo",
        sheet_music_url: "https://sheets.example.com/kondo-zelda-lullaby",
      },
      part_2: {
        id: "s-002-2",
        created_at: new Date().toISOString(),
        title: "To Zanarkand",
        xp_reward: 180,
        kingdom_id: "k-002",
        is_boss: false,
        artist: "Nobuo Uematsu",
        sheet_music_url: "https://sheets.example.com/uematsu-zanarkand",
      },
      part_3: {
        id: "s-002-3",
        created_at: new Date().toISOString(),
        title: "Aerith's Theme",
        xp_reward: 200,
        kingdom_id: "k-002",
        is_boss: false,
        artist: "Nobuo Uematsu",
        sheet_music_url: "https://sheets.example.com/uematsu-aerith",
      },
      final_part: {
        id: "s-002-boss",
        created_at: new Date().toISOString(),
        title: "One-Winged Angel",
        xp_reward: 600,
        kingdom_id: "k-002",
        is_boss: true,
        artist: "Nobuo Uematsu",
        sheet_music_url: "https://sheets.example.com/uematsu-one-winged",
      },
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
    difficulty: 4,
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
      part_1: "s-003-1",
      part_2: "s-003-2",
      part_3: "s-003-3",
      final_part: "s-003-boss",
    },
    songs_parts: {
      part_1: {
        id: "s-003-1",
        created_at: new Date().toISOString(),
        title: "Maple Leaf Rag",
        xp_reward: 250,
        kingdom_id: "k-003",
        is_boss: false,
        artist: "Scott Joplin",
        sheet_music_url: "https://sheets.example.com/joplin-maple-leaf",
      },
      part_2: {
        id: "s-003-2",
        created_at: new Date().toISOString(),
        title: "Hungarian Rhapsody No.2",
        xp_reward: 300,
        kingdom_id: "k-003",
        is_boss: false,
        artist: "Franz Liszt",
        sheet_music_url: "https://sheets.example.com/liszt-rhapsody",
      },
      part_3: {
        id: "s-003-3",
        created_at: new Date().toISOString(),
        title: "Prelude in C Minor",
        xp_reward: 280,
        kingdom_id: "k-003",
        is_boss: false,
        artist: "Frédéric Chopin",
        sheet_music_url: "https://sheets.example.com/chopin-prelude",
      },
      final_part: {
        id: "s-003-boss",
        created_at: new Date().toISOString(),
        title: "Flight of the Bumblebee",
        xp_reward: 700,
        kingdom_id: "k-003",
        is_boss: true,
        artist: "Rimsky-Korsakov",
        sheet_music_url: "https://sheets.example.com/rimsky-bumblebee",
      },
    },
  },
];
