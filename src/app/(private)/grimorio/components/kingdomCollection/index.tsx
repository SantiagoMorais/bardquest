"use client";

import { IKingdom } from "@/interfaces/api/kingdom";
import Image from "next/image";
import { useState } from "react";
import { LuBookOpen, LuChevronLeft, LuChevronRight, LuCrown, LuX } from "react-icons/lu";
import styles from "./index.module.scss";

const MOCK_KINGDOMS: IKingdom[] = [
  {
    id: "k-001",
    level: 1,
    name: "Vale das Primeiras Notas",
    description:
      "Um vale sereno onde o vento sussurra melodias antigas. É aqui que toda jornada começa — com silêncio, e a coragem de romper com ele.",
    ambience: "Tranquilo, esperançoso, acolhedor",
    visual_elements: ["flores silvestres", "riachos suaves", "névoa matinal"],
    keywords: ["início", "coragem", "despertar"],
    identity: "O reino do primeiro passo",
    image_url: null,
    difficulty: 2,
    boss_id: "b-001",
    relic_id: "r-001",
    categories: ["classica"],
    created_at: new Date().toISOString(),
    lore: {
      part_1: {
        title: "O Chamado",
        content:
          "Dizem que o vale floresce apenas quando alguém decide tocar pela primeira vez. As flores antigas guardam nas pétalas o eco de cada nota já tocada neste lugar sagrado. Você sente o peso do silêncio — e a urgência de preenchê-lo. O vento carrega fragmentos de melodias que ninguém mais lembra, esperando por mãos dispostas a reanimá-las.",
      },
      part_2: {
        title: "A Névoa da Dúvida",
        content:
          "Uma névoa espessa cobre o caminho, feita dos 'e se eu não for bom o suficiente'. Ela sussurra que outros são mais talentosos, que é tarde demais, que a música não é para você. Mas o riacho à sua frente continua cantando — indiferente às suas dúvidas. A água sempre encontra seu caminho.",
      },
      part_3: {
        title: "O Riacho da Prática",
        content:
          "Cada nota tocada alimenta o riacho. Cada dia praticado abre novos caminhos por entre as pedras. O segredo que os antigos bardos guardavam: a consistência transforma água em ouro, silêncio em sinfonia. Não há atalho para o vale florescido — apenas o próximo passo, e o próximo, e o próximo.",
      },
      final_part: {
        title: "O Encontro",
        content:
          "No coração do vale, onde as águas convergem, a Voz do Silêncio aguarda. Não para destruir — mas para ser enfrentada com a única arma que existe: sua música. Imperfeita, trêmula, mas genuinamente sua. E quando a última nota ressoa pelo vale, as flores antigas finalmente encontram paz.",
      },
    },
    songs: {
      part_1: {
        id: "s1",
        title: "Clair de Lune",
        artist: "Claude Debussy",
        is_boss: false,
        sheet_music_url: null,
      },
      part_2: {
        id: "s2",
        title: "River Flows in You",
        artist: "Yiruma",
        is_boss: false,
        sheet_music_url: null,
      },
      part_3: {
        id: "s3",
        title: "Gymnopédie No.1",
        artist: "Erik Satie",
        is_boss: false,
        sheet_music_url: null,
      },
      final_part: {
        id: "s4",
        title: "Moonlight Sonata",
        artist: "Beethoven",
        is_boss: true,
        sheet_music_url: null,
      },
    },
  },
];

type LorePart = "part_1" | "part_2" | "part_3" | "final_part";
const LORE_PARTS: LorePart[] = ["part_1", "part_2", "part_3", "final_part"];
const LORE_LABELS: Record<LorePart, string> = {
  part_1: "Parte I",
  part_2: "Parte II",
  part_3: "Parte III",
  final_part: "Epílogo",
};

function formatContent(raw: string): string[] {
  const byDouble = raw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (byDouble.length > 1) return byDouble;
  const sentences = raw.match(/[^.!?]+[.!?]+/g) ?? [raw];
  const paras: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if ((cur + s).length > 360 && cur.length > 0) {
      paras.push(cur.trim());
      cur = s;
    } else cur += s;
  }
  if (cur.trim()) paras.push(cur.trim());
  return paras.length ? paras : [raw];
}

interface ILoreViewerProps {
  kingdom: IKingdom;
  onClose: () => void;
}

const LoreViewer = ({ kingdom, onClose }: ILoreViewerProps) => {
  const [part, setPart] = useState<LorePart>("part_1");
  const idx = LORE_PARTS.indexOf(part);
  const lore = kingdom.lore[part];
  const paragraphs = formatContent(lore.content);

  return (
    <div className={styles.loreOverlay} onClick={onClose}>
      <div className={styles.loreModal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.loreClose} onClick={onClose}>
          <LuX size={16} />
        </button>

        <div className={styles.loreHead}>
          <span className={styles.loreHeadOrn}>✦ ✦ ✦</span>
          <h2 className={styles.loreHeadTitle}>{kingdom.name}</h2>
          <span className={styles.loreHeadSub}>Crônicas do Reino</span>
        </div>

        <div className={styles.loreTabs}>
          {LORE_PARTS.map((p) => (
            <button
              key={p}
              className={`${styles.loreTab} ${p === part ? styles.loreTabActive : ""}`}
              onClick={() => setPart(p)}
            >
              {LORE_LABELS[p]}
            </button>
          ))}
        </div>

        <div
          className={`${styles.bookPage} ${part === "final_part" ? styles.bookPageEpilogue : ""}`}
        >
          <div className={styles.bookOrn}>✦ ✦ ✦</div>
          <p className={styles.bookChapterLabel}>{LORE_LABELS[part]}</p>
          <h3 className={styles.bookChapterTitle}>{lore.title}</h3>
          <div className={styles.bookDivider} />
          <div className={styles.bookText}>
            {paragraphs.map((p, i) => (
              <p key={i} className={styles.bookParagraph}>
                {i === 0 && <span className={styles.bookDropCap}>{p[0]}</span>}
                {i === 0 ? p.slice(1) : p}
              </p>
            ))}
          </div>
          <div className={styles.bookOrn}>— ✦ —</div>
        </div>

        <div className={styles.loreNav}>
          <button
            className={styles.loreNavBtn}
            onClick={() => idx > 0 && setPart(LORE_PARTS[idx - 1])}
            disabled={idx === 0}
          >
            <LuChevronLeft size={14} />
            {idx > 0 ? LORE_LABELS[LORE_PARTS[idx - 1]] : ""}
          </button>
          <span className={styles.loreNavIndicator}>
            {idx + 1} / {LORE_PARTS.length}
          </span>
          <button
            className={styles.loreNavBtn}
            onClick={() => idx < LORE_PARTS.length - 1 && setPart(LORE_PARTS[idx + 1])}
            disabled={idx === LORE_PARTS.length - 1}
          >
            {idx < LORE_PARTS.length - 1 ? LORE_LABELS[LORE_PARTS[idx + 1]] : ""}
            <LuChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

interface IKingdomCardProps {
  kingdom: IKingdom;
  index: number;
}

const KingdomCard = ({ kingdom, index }: IKingdomCardProps) => {
  const [showLore, setShowLore] = useState(false);

  return (
    <>
      <div className={styles.kingdomCard} style={{ animationDelay: `${index * 100}ms` }}>
        <div className={styles.kingdomHero}>
          {kingdom.image_url ? (
            <Image
              src={kingdom.image_url}
              alt={kingdom.name}
              fill
              className={styles.kingdomHeroImg}
            />
          ) : (
            <div className={styles.kingdomHeroPlaceholder}>
              <LuCrown size={48} className={styles.kingdomHeroCrown} />
            </div>
          )}
          <div className={styles.kingdomHeroGradient} />
          <div className={styles.kingdomHeroOverlay}>
            <span className={styles.kingdomLevel}>Reino {kingdom.level}</span>
            <h3 className={styles.kingdomName}>{kingdom.name}</h3>
          </div>
          <div className={styles.conqueredBadge}>
            <LuCrown size={11} />
            <span>Conquistado</span>
          </div>
        </div>

        <div className={styles.kingdomBody}>
          <p className={styles.kingdomDescription}>{kingdom.description}</p>

          <div className={styles.kingdomMeta}>
            <span className={styles.kingdomMetaItem}>🌿 {kingdom.ambience}</span>
          </div>

          <div className={styles.kingdomSongs}>
            {(["part_1", "part_2", "part_3", "final_part"] as LorePart[]).map((p, i) => {
              const song = kingdom.songs[p];
              return (
                <div
                  key={p}
                  className={`${styles.songRow} ${song.is_boss ? styles.songRowBoss : ""}`}
                >
                  <span className={styles.songRowGlyph}>
                    {song.is_boss ? "☠" : ["♩", "♪", "♫"][i]}
                  </span>
                  <div className={styles.songRowInfo}>
                    <span className={styles.songRowTitle}>{song.title}</span>
                    <span className={styles.songRowArtist}>{song.artist}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button className={styles.loreBtn} onClick={() => setShowLore(true)}>
            <LuBookOpen size={14} />
            Ler Crônicas do Reino
          </button>
        </div>
      </div>

      {showLore && <LoreViewer kingdom={kingdom} onClose={() => setShowLore(false)} />}
    </>
  );
};

export const KingdomCollection = () => {
  const kingdoms = MOCK_KINGDOMS;

  if (!kingdoms.length) {
    return (
      <div className={styles.empty}>
        <LuCrown size={48} className={styles.emptyIcon} />
        <p className={styles.emptyTitle}>Nenhum reino conquistado ainda</p>
        <p className={styles.emptyHint}>
          Complete todas as músicas de um reino para conquistá-lo
        </p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {kingdoms.map((k, i) => (
        <KingdomCard key={k.id} kingdom={k} index={i} />
      ))}
    </div>
  );
};
