"use client";

import { useState } from "react";
import Image from "next/image";
import { LuSwords, LuSkull, LuMusic, LuX } from "react-icons/lu";
import { IBoss } from "@/interfaces/api/boss";
import styles from "./index.module.scss";

const MOCK_BOSSES: IBoss[] = [
  {
    id: "b-001",
    name: "A Voz do Silêncio",
    title: "Guardião do Primeiro Medo",
    instrument: "piano",
    personality: "Sombria e paralisante. Sussurra dúvidas no ouvido do bardo.",
    main_identity: "Encarnação do medo de errar a primeira nota",
    musical_inspiration: "John Cage — 4'33\"",
    clothing: "Manto de névoa negra com bordados de pautas vazias",
    environment: "Vale coberto por névoa perpétua",
    expression: "Olhar vazio, sorriso ausente",
    pose: "Sentada em silêncio absoluto, mãos no colo",
    aura: "Ondas de silêncio que apagam todos os sons ao redor",
    image_url: null,
    color_palette: ["#1E1813", "#3D3226", "#6B5A4A"],
    kingdom_id: "k-001",
    created_at: new Date().toISOString(),
  },
  {
    id: "b-002",
    name: "Guardião do Esquecimento",
    title: "Apagador de Melodias",
    instrument: "piano",
    personality: "Melancólico e inevitável. Não ataca — simplesmente faz você esquecer.",
    main_identity: "Espírito das músicas abandonadas antes do fim",
    musical_inspiration: "Schubert — Sinfonia Inacabada",
    clothing: "Robes translúcidos que se dissolvem em notas musicais",
    environment: "Floresta onde as árvores têm partituras gravadas na casca",
    expression: "Expressão serena e distante, como quem já viu tudo",
    pose: "De pé entre as árvores, braços abertos como ramos",
    aura: "Névoa que apaga memórias musicais ao toque",
    image_url: null,
    color_palette: ["#2A3A2A", "#4A6B4A", "#8BAD7F"],
    kingdom_id: "k-002",
    created_at: new Date().toISOString(),
  },
];

interface IBossDetailProps {
  boss: IBoss;
  onClose: () => void;
}

const BossDetail = ({ boss, onClose }: IBossDetailProps) => (
  <div className={styles.detailOverlay} onClick={onClose}>
    <div className={styles.detailCard} onClick={(e) => e.stopPropagation()}>
      <button className={styles.detailClose} onClick={onClose} aria-label="Fechar">
        <LuX size={16} />
      </button>

      <div
        className={styles.detailHero}
        style={{
          background: boss.color_palette?.length
            ? `linear-gradient(135deg, ${boss.color_palette[0]} 0%, ${boss.color_palette[1] ?? boss.color_palette[0]} 100%)`
            : undefined,
        }}
      >
        {boss.image_url ? (
          <Image
            src={boss.image_url}
            alt={boss.name}
            fill
            className={styles.detailHeroImg}
          />
        ) : (
          <div className={styles.detailHeroPlaceholder}>
            <LuSkull size={64} className={styles.detailSkull} />
          </div>
        )}
        <div className={styles.detailHeroGradient} />
        <div className={styles.detailHeroText}>
          {boss.title && <span className={styles.detailBossTitle}>{boss.title}</span>}
          <h2 className={styles.detailBossName}>{boss.name}</h2>
        </div>
      </div>

      <div className={styles.detailBody}>
        {boss.main_identity && (
          <div className={styles.detailSection}>
            <p className={styles.detailSectionLabel}>Identidade</p>
            <p className={styles.detailSectionText}>{boss.main_identity}</p>
          </div>
        )}

        {boss.personality && (
          <div className={styles.detailSection}>
            <p className={styles.detailSectionLabel}>Personalidade</p>
            <p className={styles.detailSectionText}>{boss.personality}</p>
          </div>
        )}

        <div className={styles.detailGrid}>
          {boss.instrument && (
            <div className={styles.detailGridItem}>
              <LuMusic size={13} />
              <div>
                <span className={styles.detailGridLabel}>Instrumento</span>
                <span className={styles.detailGridValue}>{boss.instrument}</span>
              </div>
            </div>
          )}
          {boss.musical_inspiration && (
            <div className={styles.detailGridItem}>
              <span className={styles.detailGridNote}>♩</span>
              <div>
                <span className={styles.detailGridLabel}>Inspiração musical</span>
                <span className={styles.detailGridValue}>{boss.musical_inspiration}</span>
              </div>
            </div>
          )}
        </div>

        {boss.environment && (
          <div className={styles.detailSection}>
            <p className={styles.detailSectionLabel}>Habitat</p>
            <p className={styles.detailSectionText}>{boss.environment}</p>
          </div>
        )}

        {boss.aura && (
          <div className={styles.detailAura}>
            <span className={styles.detailAuraLabel}>✦ Aura</span>
            <p className={styles.detailAuraText}>{boss.aura}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export const BossCollection = () => {
  const [selected, setSelected] = useState<IBoss | null>(null);

  const bosses = MOCK_BOSSES;

  if (!bosses.length) {
    return (
      <div className={styles.empty}>
        <LuSwords size={48} className={styles.emptyIcon} />
        <p className={styles.emptyTitle}>Nenhum chefe derrotado ainda</p>
        <p className={styles.emptyHint}>
          Complete músicas dos reinos para enfrentar seus guardiões
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.grid}>
        {bosses.map((boss, i) => (
          <button
            key={boss.id}
            className={styles.bossCard}
            onClick={() => setSelected(boss)}
            style={{ animationDelay: `${i * 80}ms` }}
            aria-label={`Ver detalhes de ${boss.name}`}
          >
            <div
              className={styles.bossCardHero}
              style={{
                background: boss.color_palette?.length
                  ? `linear-gradient(135deg, ${boss.color_palette[0]} 0%, ${boss.color_palette[1] ?? boss.color_palette[0]} 70%)`
                  : undefined,
              }}
            >
              {boss.image_url ? (
                <Image
                  src={boss.image_url}
                  alt={boss.name}
                  fill
                  className={styles.bossCardImg}
                />
              ) : (
                <LuSkull size={40} className={styles.bossCardSkull} />
              )}
              <div className={styles.bossCardGradient} />
            </div>

            <div className={styles.bossCardBody}>
              {boss.title && <span className={styles.bossCardTitle}>{boss.title}</span>}
              <h3 className={styles.bossCardName}>{boss.name}</h3>
              {boss.instrument && (
                <span className={styles.bossCardInstrument}>
                  <LuMusic size={11} /> {boss.instrument}
                </span>
              )}
            </div>

            <div className={styles.defeatedSeal}>
              <LuSwords size={12} />
              <span>Derrotado</span>
            </div>
          </button>
        ))}
      </div>

      {selected && <BossDetail boss={selected} onClose={() => setSelected(null)} />}
    </>
  );
};
