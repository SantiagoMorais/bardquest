import Image from "next/image";
import styles from "./index.module.scss";
import DefaultKingdomImage from "@/assets/default-kingdom-image.png";
import { Button } from "@/components/button";
import { MOCK_KINGDOMS } from "@/utils/mock";
import { TypeState } from "@/interfaces/typestate";
import { KingdomSongsList } from "./kingdom-songs-list";

interface IKingdomCardContentProps {
  setKingdomSelected: TypeState<string | undefined>;
  kingdom: (typeof MOCK_KINGDOMS)[0];
}

export const KingdomCardContent = ({
  setKingdomSelected,
  kingdom,
}: IKingdomCardContentProps) => {
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

        <KingdomSongsList
          kingdom={kingdom}
          songStatuses={{
            [kingdom.songs.part_1]: "completed",
            [kingdom.songs.part_2]: "practicing",
            [kingdom.songs.part_3]: "pending",
          }}
        />
        <Button onClick={() => setKingdomSelected(undefined)}>X</Button>
      </div>
    </div>
  );
};
