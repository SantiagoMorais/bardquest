"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import DefaultKingdomImage from "@/assets/default-kingdom-image.png";
import { Button } from "@/components/button";
import { MOCK_KINGDOMS } from "@/utils/mock";
import { TypeState } from "@/interfaces/typestate";
import { KingdomSongsList } from "./kingdom-songs-list";
import { KingdomLore } from "./kingdom-lore";
import { useScreenSize } from "@/hooks/useScreenSize";
import { LuChevronLeft, LuBookOpen } from "react-icons/lu";
import { IKingdomSongStatus } from "@/interfaces/kingdom-card";

interface IKingdomCardContentProps {
  setKingdomSelected: TypeState<string | undefined>;
  kingdom: (typeof MOCK_KINGDOMS)[0];
}

export const KingdomCardContent = ({
  setKingdomSelected,
  kingdom,
}: IKingdomCardContentProps) => {
  const { isTabletUp } = useScreenSize();
  const [showLore, setShowLore] = useState(false);

  const SONG_STATUSES: Partial<Record<string, IKingdomSongStatus>> = {
    [kingdom.songs.part_1]: "completed",
    [kingdom.songs.part_2]: "completed",
    [kingdom.songs.part_3]: "completed",
  };

  if (showLore) {
    return (
      <div className={styles.kingdomModal}>
        <KingdomLore
          kingdom={kingdom}
          songStatuses={SONG_STATUSES}
          onClose={() => setShowLore(false)}
        />
      </div>
    );
  }

  return (
    <div className={styles.kingdomModal}>
      <div className={styles.kingdomImageContainer}>
        <Image
          quality={60}
          fill
          className={styles.kingdomImage}
          src={DefaultKingdomImage}
          alt="Imagem padrão do reino"
        />
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{kingdom.name}</h2>
        <div className={styles.kingdomDescription}>{kingdom.description}</div>
        <KingdomSongsList kingdom={kingdom} songStatuses={SONG_STATUSES} />
        <Button
          iconLeft={LuBookOpen}
          buttonStyle="secondary"
          onClick={() => setShowLore(true)}
        >
          Crônicas do Reino
        </Button>
        {!isTabletUp && (
          <Button
            iconLeft={LuChevronLeft}
            buttonStyle="tertiary"
            onClick={() => setKingdomSelected(undefined)}
          >
            Retornar
          </Button>
        )}
      </div>
    </div>
  );
};
