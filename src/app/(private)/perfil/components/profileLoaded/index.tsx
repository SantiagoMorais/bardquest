"use client";

import DefaultProfileImage from "@/assets/default-profile-image.png";
import { Input } from "@/components/input";
import { IUserProfileWithUser } from "@/interfaces/api/user";
import Image from "next/image";
import { LuCamera, LuPencil, LuSword, LuX } from "react-icons/lu";
import { SectionDivider } from "./section-divider";
import { StatChip } from "./stat-chip";
import { TagList } from "./tag-list";
import styles from "./index.module.scss";
import { useState } from "react";
import { formatDate, INSTRUMENT_LABEL } from "../../utils/profile-functions-and-helpers";

interface IProfileLoadedProps {
  profile: IUserProfileWithUser;
}

export const ProfileLoaded = ({ profile }: IProfileLoadedProps) => {
  const [isEditing, setIsEditing] = useState(false);

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
                <span className={styles.avatarUsername}>{profile.username}</span>
              </div>
            </div>

            <div className={styles.avatarStats}>
              <StatChip label="Nível" value={profile.user.level ?? 0} />
              <StatChip label="Streak" value={`🔥 ${profile.user.streak ?? 0}d`} />
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
                <label className={styles.fieldLabel}>E-mail</label>
                <p className={styles.fieldValue}>{profile.user.email}</p>
                <Input label="E-mail" readOnly={!isEditing} />
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Idade</span>
                {isEditing ? (
                  <input
                    className={styles.fieldInput}
                    type="text"
                    defaultValue={profile.birth_date ?? ""}
                  />
                ) : (
                  <span className={styles.fieldValue}>
                    {profile.birth_date ? `${profile.birth_date}` : "—"}
                  </span>
                )}
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Instrumento</label>
                <p className={styles.fieldValue}>
                  {INSTRUMENT_LABEL[profile.instrument] ?? profile.instrument}
                </p>
              </div>

              <div className={styles.field}>
                <span className={styles.fieldLabel}>Dificuldade base</span>
                <span className={styles.fieldValue}>{profile.base_difficulty} / 10</span>
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Membro desde</span>
                <span className={styles.fieldValue}>
                  {formatDate(profile.user.created_at)}
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
              <TagList title="Categorias" items={profile.interests.categories} />
              <TagList title="Palavras-chave" items={profile.interests.keywords} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
