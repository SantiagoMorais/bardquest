// src/app/(protected)/dashboard/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import DefaultKingdomImage from "@/assets/default-kingdom-image.png";

import styles from "./page.module.scss";
import { KingdomTrail } from "./kingdom-trail";
import { MOCK_KINGDOMS } from "@/utils/mock";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { Button } from "@/components/button";
import { useScreenSize } from "@/hooks/useScreenSize";
import Image from "next/image";
import { redirect } from "next/navigation";

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
            <div>
              <h2>Reino XPTO</h2>
              <ul>
                <li key={MOCK_KINGDOMS[0].songs.part_1.title}>
                  {MOCK_KINGDOMS[0].songs.part_1.title}
                </li>
                <li key={MOCK_KINGDOMS[0].songs.part_2.title}>
                  {MOCK_KINGDOMS[0].songs.part_2.title}
                </li>
                <li key={MOCK_KINGDOMS[0].songs.part_3.title}>
                  {MOCK_KINGDOMS[0].songs.part_3.title}
                </li>
                <li key={MOCK_KINGDOMS[0].songs.final_part.title}>
                  {MOCK_KINGDOMS[0].songs.final_part.title}
                </li>
              </ul>
              <Button onClick={() => setKingdomSelected(undefined)}>X</Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
