"use client";

import { IRelic } from "@/interfaces/api/relic";
import { useState } from "react";
import { LuTrendingUp, LuX, LuZap } from "react-icons/lu";
import styles from "./index.module.scss";

const MOCK_RELICS: IRelic[] = [
  {
    id: "r-001",
    user_id: "u-001",
    kingdom_id: "k-001",
    name: "Plectro das Primeiras Notas",
    type: "Instrumento Sagrado",
    description:
      "Um plectro esculpido em madeira de árvore centenária do Vale. Cada vez que você toca, ele vibra com a memória das primeiras notas que quebraram o silêncio.",
    musical_signature: "Notas suaves que se transformam em ecos eternos",
    magical_effect:
      "Reduz a ansiedade antes de cada prática. Você se lembra: a primeira nota já foi tocada.",
    main_identity: "Símbolo da coragem do começo",
    power_level: 2,
    traits: ["Iniciante", "Coragem", "Memória"],
    color_palette: ["#8B7355", "#D4C4A8", "#F1E9E0"],
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "r-002",
    user_id: "u-001",
    kingdom_id: "k-002",
    name: "Folha de Partitura Eterna",
    type: "Artefato de Conhecimento",
    description:
      "Uma folha que nunca amarelece, encontrada nas raízes da Floresta Ancestral. Nela, melodias esquecidas reaparecem quando o bardo pratica com o coração.",
    musical_signature: "Acordes que ecoam entre as árvores milenares",
    magical_effect:
      "Ao estudar uma nova música, o aprendizado acontece 2x mais rápido. A floresta guia seus dedos.",
    main_identity: "Repositório de sabedoria musical perdida",
    power_level: 5,
    traits: ["Conhecimento", "Floresta", "Memória Ancestral"],
    color_palette: ["#2A3A2A", "#6B8E3F", "#DCE4C4"],
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "r-003",
    user_id: "u-001",
    kingdom_id: "k-003",
    name: "Folha de Partitura Eterna",
    type: "Artefato de Conhecimento",
    description:
      "Uma folha que nunca amarelece, encontrada nas raízes da Floresta Ancestral. Nela, melodias esquecidas reaparecem quando o bardo pratica com o coração.",
    musical_signature: "Acordes que ecoam entre as árvores milenares",
    magical_effect:
      "Ao estudar uma nova música, o aprendizado acontece 2x mais rápido. A floresta guia seus dedos.",
    main_identity: "Repositório de sabedoria musical perdida",
    power_level: 5,
    traits: ["Conhecimento", "Floresta", "Memória Ancestral"],
    color_palette: ["#F9B2D7", "#CFECF3", "#F6FFDC"],
    image_url: null,
    created_at: new Date().toISOString(),
  },
];

interface IRelicDetailProps {
  relic: IRelic;
  onClose: () => void;
}

const RelicDetail = ({ relic, onClose }: IRelicDetailProps) => (
  <div className={styles.overlay} onClick={onClose}>
    <div className={styles.detailCard} onClick={(e) => e.stopPropagation()}>
      <button className={styles.detailClose} onClick={onClose}>
        <LuX size={16} />
      </button>

      <div
        className={styles.detailOrb}
        style={{
          background: relic.color_palette?.length
            ? `radial-gradient(ellipse at 35% 35%, ${relic.color_palette[2] ?? "#F1E9E0"} 0%, ${relic.color_palette[1] ?? "#D4C4A8"} 40%, ${relic.color_palette[0] ?? "#8B7355"} 100%)`
            : undefined,
        }}
      >
        <span className={styles.detailOrbGlyph}>✦</span>
        <div className={styles.detailOrbShine} />
      </div>

      <div className={styles.detailBody}>
        <div className={styles.detailHeader}>
          <span className={styles.detailType}>{relic.type}</span>
          <h2 className={styles.detailName}>{relic.name}</h2>
          <div className={styles.detailPower}>
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className={`${styles.detailPowerPip} ${i < relic.power_level ? styles.detailPowerPipFilled : ""}`}
              />
            ))}
            <span className={styles.detailPowerLabel}>Poder {relic.power_level}/10</span>
          </div>
        </div>

        {relic.description && (
          <p className={styles.detailDescription}>{relic.description}</p>
        )}

        {relic.main_identity && (
          <div className={styles.detailIdentity}>
            <span className={styles.detailIdentityGlyph}>✦</span>
            <p>{relic.main_identity}</p>
          </div>
        )}

        <div className={styles.detailEffects}>
          {relic.musical_signature && (
            <div className={styles.detailEffect}>
              <div className={styles.detailEffectHeader}>
                <span className={styles.detailEffectGlyph}>♩</span>
                <span className={styles.detailEffectLabel}>Assinatura Musical</span>
              </div>
              <p className={styles.detailEffectText}>{relic.musical_signature}</p>
            </div>
          )}

          {relic.magical_effect && (
            <div className={`${styles.detailEffect} ${styles.detailEffectMagical}`}>
              <div className={styles.detailEffectHeader}>
                <LuZap size={13} className={styles.detailEffectZap} />
                <span className={styles.detailEffectLabel}>Efeito Mágico</span>
              </div>
              <p className={styles.detailEffectText}>{relic.magical_effect}</p>
            </div>
          )}
        </div>

        {relic.traits?.length > 0 && (
          <div className={styles.detailTraits}>
            {relic.traits.map((t) => (
              <span key={t} className={styles.detailTrait}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export const RelicCollection = () => {
  const [selected, setSelected] = useState<IRelic | null>(null);
  const relics = MOCK_RELICS;

  if (!relics.length) {
    return (
      <div className={styles.empty}>
        <LuTrendingUp size={48} className={styles.emptyIcon} />
        <p className={styles.emptyTitle}>Nenhuma relíquia adquirida ainda</p>
        <p className={styles.emptyHint}>
          Conquiste reinos para receber suas relíquias sagradas
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.grid}>
        {relics.map((relic, i) => (
          <button
            key={relic.id}
            className={styles.relicCard}
            onClick={() => setSelected(relic)}
            style={{ animationDelay: `${i * 80}ms` }}
            aria-label={`Ver detalhes de ${relic.name}`}
          >
            <div
              className={styles.relicOrb}
              style={{
                background: relic.color_palette?.length
                  ? `radial-gradient(ellipse at 35% 35%, ${relic.color_palette[2] ?? "#F1E9E0"} 0%, ${relic.color_palette[1] ?? "#D4C4A8"} 40%, ${relic.color_palette[0] ?? "#8B7355"} 100%)`
                  : undefined,
              }}
            >
              <span className={styles.relicOrbGlyph}>✦</span>
              <div className={styles.relicOrbShine} />
            </div>

            <div className={styles.relicInfo}>
              <span className={styles.relicType}>{relic.type}</span>
              <h3 className={styles.relicName}>{relic.name}</h3>

              <div className={styles.relicPower}>
                {Array.from({ length: 10 }).map((_, j) => (
                  <span
                    key={j}
                    className={`${styles.relicPowerPip} ${j < relic.power_level ? styles.relicPowerPipFilled : ""}`}
                    style={
                      j < relic.power_level
                        ? { background: relic.color_palette?.[0] ?? undefined }
                        : undefined
                    }
                  />
                ))}
              </div>

              {relic.traits?.length > 0 && (
                <div className={styles.relicTraits}>
                  {relic.traits.slice(0, 2).map((t) => (
                    <span key={t} className={styles.relicTrait}>
                      {t}
                    </span>
                  ))}
                  {relic.traits.length > 2 && (
                    <span className={styles.relicTrait}>+{relic.traits.length - 2}</span>
                  )}
                </div>
              )}
            </div>

            <div
              className={styles.relicGlow}
              style={{ background: relic.color_palette?.[0] ?? undefined }}
            />
          </button>
        ))}
      </div>

      {selected && <RelicDetail relic={selected} onClose={() => setSelected(null)} />}
    </>
  );
};
