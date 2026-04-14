import DefaultKingdomImage from "@/assets/default-kingdom-image.png";
import { IKingdom } from "@/interfaces/api/kingdom";
import styles from "./index.module.scss";
import Image from "next/image";
import KingdomFrame from "@/assets/kingdom-frame.png";
import { TypeState } from "@/interfaces/typestate";

interface IKingdomTrailProps {
  kingdoms: IKingdom[];
  setKingdomSelected: TypeState<string | undefined>;
}

export const KingdomTrail = ({ kingdoms, setKingdomSelected }: IKingdomTrailProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Caminho dos reinos</h2>
      <ul className={styles.kingdomsListContainer}>
        {kingdoms.map((kingdom, index) => (
          <li
            key={kingdom.id}
            className={styles.kingdomListItem}
            onClick={() => setKingdomSelected(kingdom.id)}
          >
            <p className={styles.kingdomIndex}>{index + 1}</p>
            <div className={styles.kingdomImageContainer}>
              <Image
                src={kingdom.image_url ?? DefaultKingdomImage}
                alt={kingdom.name}
                width={500}
                height={500}
                quality={50}
                className={styles.kingdomImage}
              />
              <Image
                src={KingdomFrame}
                alt="Borda"
                fill
                className={styles.kingdomFrame}
              />
              <h3 className={styles.kingdomTitle}>{kingdom.name}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
