// src/app/(protected)/dashboard/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";

import { Modal } from "@/components/modal";
import { useScreenSize } from "@/hooks/useScreenSize";
import { MOCK_KINGDOMS } from "@/utils/mock";
import { useState } from "react";
import { KingdomCardContent } from "./kingdom-card-content";
import { KingdomTrail } from "./kingdom-trail";
import styles from "./page.module.scss";

export default function Dashboard() {
  const { user } = useAuth();
  const [kingdomSelected, setKingdomSelected] = useState<string>();
  const { isTabletUp } = useScreenSize();

  // TODO: buscar reinos reais do usuário via API
  // Mostrar apenas os reinos desbloqueados (já vêm filtrados da API)
  const currentKingdomId = "k-002"; // TODO: vem do perfil do usuário

  return (
    <section className={styles.container}>
      <KingdomTrail kingdoms={MOCK_KINGDOMS} setKingdomSelected={setKingdomSelected} />
      {!kingdomSelected && isTabletUp ? (
        <></>
      ) : (
        <Modal isOpen>
          <KingdomCardContent
            setKingdomSelected={setKingdomSelected}
            kingdom={MOCK_KINGDOMS[0]}
          />
        </Modal>
      )}
    </section>
  );
}
