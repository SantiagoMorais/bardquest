"use client";

import { Modal } from "@/components/modal";
import { useScreenSize } from "@/hooks/useScreenSize";
import { MOCK_KINGDOMS } from "@/utils/mock";
import { useState } from "react";
import { KingdomCardContent } from "./components/kingdom-card-content";
import { KingdomTrail } from "./components/kingdom-trail";
import styles from "./page.module.scss";

export default function Dashboard() {
  const [kingdomSelected, setKingdomSelected] = useState<string | undefined>("k-002");
  const { isTabletUp } = useScreenSize();

  const kingdom = MOCK_KINGDOMS.find((k) => k.id === kingdomSelected);

  return (
    <section className={styles.container}>
      <KingdomTrail kingdoms={MOCK_KINGDOMS} setKingdomSelected={setKingdomSelected} />
      {kingdomSelected && isTabletUp ? (
        <div className={styles.desktopContent}>
          <KingdomCardContent
            setKingdomSelected={setKingdomSelected}
            kingdom={kingdom!}
          />
        </div>
      ) : (
        <Modal
          isOpen={!!kingdomSelected && !isTabletUp}
          onClose={() => setKingdomSelected(undefined)}
        >
          <KingdomCardContent
            setKingdomSelected={setKingdomSelected}
            kingdom={kingdom!}
          />
        </Modal>
      )}
    </section>
  );
}
