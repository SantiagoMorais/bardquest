"use client";

import { useState } from "react";
import Image from "next/image";
import DefaultProfileImage from "@/assets/default-profile-image.png";
import { LuPencil, LuCamera, LuSword, LuX } from "react-icons/lu";
import { SectionDivider } from "./section-divider";
import { StatChip } from "./stat-chip";
import { TagList } from "./tag-list";
import styles from "./page.module.scss";
import {
  EXPERIENCE_LABEL,
  formatDate,
  INSTRUMENT_LABEL,
  MOCK_NECESSARY_XP,
  MOCK_USER,
} from "./utils/profile-functions-and-helpers";

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const user = MOCK_USER;
  const xpPercent = Math.round(((user.user.xp ?? 0) / MOCK_NECESSARY_XP) * 100);

  return (
    <main className={styles.page}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>✦ Pergaminho do Bardo</h2>
      </div>

      <SectionDivider label="Perfil" />

      <div className={styles.profileGrid}>
        <div className={styles.avatarColumn}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarFrame}>
              <Image
                src={DefaultProfileImage}
                alt="Foto de perfil"
                fill
                className={styles.avatarImage}
              />
            </div>
            <button className={styles.avatarEditBtn} title="Editar imagem">
              <LuCamera size={28} />
            </button>
          </div>
        </div>

        <div className={styles.infoColumn}>
          <div className={styles.profileSummaryCard}>
            <div className={styles.profileSummaryHeader}>
              <div className={styles.avatarName}>
                <span className={styles.avatarRole}>Bardo Aventureiro</span>
                <span className={styles.avatarUsername}>{user.user.username}</span>
              </div>
            </div>

            <div className={styles.avatarStats}>
              <StatChip label="Nível" value={user.user.level ?? 0} />
              <StatChip label="Streak" value={`🔥 ${user.user.streak ?? 0}d`} />
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Dados do Viajante</h3>
              <button
                className={styles.editToggle}
                onClick={() => setIsEditing((p) => !p)}
                title={isEditing ? "Cancelar edição" : "Editar perfil"}
              >
                {isEditing ? <LuX size={14} /> : <LuPencil size={14} />}
                {isEditing ? "Cancelar" : "Editar"}
              </button>
            </div>

            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>E-mail</span>
                <span className={styles.fieldValue}>{user.user.email}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Idade</span>
                {isEditing ? (
                  <input
                    className={styles.fieldInput}
                    type="number"
                    defaultValue={user.age ?? ""}
                  />
                ) : (
                  <span className={styles.fieldValue}>
                    {user.age ? `${user.age} anos` : "—"}
                  </span>
                )}
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Instrumento</span>
                <span className={styles.fieldValue}>
                  {INSTRUMENT_LABEL[user.instrument] ?? user.instrument}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Experiência</span>
                <span className={styles.fieldValue}>
                  {EXPERIENCE_LABEL[user.experience] ?? user.experience}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Dificuldade base</span>
                <span className={styles.fieldValue}>{user.base_difficulty} / 10</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Membro desde</span>
                <span className={styles.fieldValue}>
                  {formatDate(user.user.created_at)}
                </span>
              </div>
            </div>

            {isEditing && (
              <button className={styles.saveBtn}>
                <LuSword size={14} />
                Salvar alterações
              </button>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Preferências Musicais</h3>
            </div>

            <div className={styles.interestsGrid}>
              <TagList title="Categorias" items={user.interests.categories} />
              <TagList title="Palavras-chave" items={user.interests.keywords} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
