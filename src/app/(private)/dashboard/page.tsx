// src/app/(protected)/dashboard/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";

import styles from "./page.module.scss";
import { KingdomTrail } from "./kingdom-trail";
import { MOCK_KINGDOMS } from "@/utils/mock";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { Button } from "@/components/button";

export default function Dashboard() {
  const { user } = useAuth();
  const [kingdomSelected, setKingdomSelected] = useState<string>();

  // TODO: buscar reinos reais do usuário via API
  // Mostrar apenas os reinos desbloqueados (já vêm filtrados da API)
  const currentKingdomId = "k-002"; // TODO: vem do perfil do usuário

  return (
    <section className={styles.container}>
      <KingdomTrail kingdoms={MOCK_KINGDOMS} setKingdomSelected={setKingdomSelected} />
      {!!kingdomSelected && (
        <div>
          <h2>Reino XPTO</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, tempore
            laudantium delectus consequatur possimus architecto, amet optio esse similique
            repellendus accusamus, maxime commodi! A aliquam magnam doloremque
            perferendis, molestias sed.
          </p>
          <Button onClick={() => setKingdomSelected(undefined)}>X</Button>
        </div>
      )}
    </section>
  );
}
