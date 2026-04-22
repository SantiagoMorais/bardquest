"use client";

import { FaQuestionCircle } from "react-icons/fa";
import DefaultProfileImage from "@/assets/default-profile-image.png";
import { IUserProfileWithUser } from "@/interfaces/api/user";
import { calculateAge } from "@/utils/functions/calculateAge";
import Image from "next/image";
import { useState } from "react";
import { LuCamera } from "react-icons/lu";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { formatDate, INSTRUMENT_LABEL } from "../utils/profile-functions-and-helpers";
import styles from "./index.module.scss";
import { SectionDivider } from "./section-divider";
import { StatChip } from "./stat-chip";
import { UserPreferences } from "./user-preferences";

interface IProfileLoadedProps {
  profile: IUserProfileWithUser;
}

export const ProfileLoaded = ({ profile }: IProfileLoadedProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const baseDifficulty = Math.max(
    0,
    Math.min(10, Math.round(profile.base_difficulty ?? 0))
  );

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
                sizes="(max-width: 768px) 100vw, 600px"
                loading="eager"
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
                <p className={styles.avatarRole}>Bardo Aventureiro</p>
                <p className={styles.avatarUsername}>{profile.username}</p>
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
            </div>

            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>E-mail</label>
                <p className={styles.fieldValue}>{profile.user.email}</p>
              </div>
              <div className={styles.field}>
                <p className={styles.fieldLabel}>Idade</p>
                <p className={styles.fieldValue}>
                  {calculateAge(profile.birth_date ?? "")} anos
                </p>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Instrumento</label>
                <p className={styles.fieldValue}>
                  {INSTRUMENT_LABEL[profile.instrument] ?? profile.instrument}
                </p>
              </div>

              <div className={styles.field}>
                <div className={styles.tooltipWrapper}>
                  <div className={styles.tooltipTrigger}>
                    <p className={styles.fieldLabel}>Dificuldade base</p>
                    <FaQuestionCircle size={16} className={styles.doubtIcon} />
                  </div>

                  <div className={styles.tooltip}>
                    <strong>Dificuldade atual: {baseDifficulty}/10 estrelas.</strong>
                    <br />
                    <br />
                    Essa é a dificuldade dos desafios que você enfrentará. Conforme você
                    avança, completa missões e explora novos reinos, essa dificuldade pode
                    aumentar ou diminuir para se adequar melhor ao seu progresso e estilo
                    de jogo. A dificuldade evolui junto com a sua jornada. Ao concluir
                    cada reino, você poderá compartilhar seu feedback para ajustarmos os
                    próximos desafios e tornar sua experiência cada vez melhor.
                  </div>
                </div>
                <div
                  className={styles.baseDifficultyStars}
                  aria-label={`${baseDifficulty} de 10 estrelas`}
                >
                  {Array.from({ length: 10 }, (_, index) =>
                    index < baseDifficulty ? (
                      <MdOutlineStar
                        key={`difficulty-star-${index}`}
                        className={styles.starFilled}
                        focusable="false"
                        aria-hidden="true"
                      />
                    ) : (
                      <MdOutlineStarBorder
                        key={`difficulty-star-${index}`}
                        className={styles.starEmpty}
                        focusable="false"
                        aria-hidden="true"
                      />
                    )
                  )}
                </div>
              </div>
              <div className={styles.field}>
                <p className={styles.fieldLabel}>Membro desde</p>
                <p className={styles.fieldValue}>{formatDate(profile.user.created_at)}</p>
              </div>
            </div>
          </div>
          <UserPreferences profile={profile} />
        </div>
      </div>
    </main>
  );
};
