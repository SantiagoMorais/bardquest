"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { LuSwords, LuCrown, LuTrendingUp } from "react-icons/lu";
import styles from "./page.module.scss";
import { KingdomCollection } from "./components/kingdomCollection";
import { RelicCollection } from "./components/relicCollection";
import { BossCollection } from "./components/bossColection";

type GrimorioTab = "chefes" | "reinos" | "evolucao";

const TABS: {
  key: GrimorioTab;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}[] = [
  { key: "chefes", label: "Chefes Derrotados", icon: LuSwords },
  { key: "reinos", label: "Reinos Conquistados", icon: LuCrown },
  { key: "evolucao", label: "Relíquias", icon: LuTrendingUp },
];

function GrimorioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = (searchParams.get("tipo") ?? "chefes") as GrimorioTab;

  const setTab = (t: GrimorioTab) => router.push(`/grimorio?tipo=${t}`);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerOrn}>✦</div>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Grimório do Bardo</h1>
          <p className={styles.subtitle}>Registro eterno das suas conquistas musicais</p>
        </div>
        <div className={styles.headerOrn}>✦</div>
      </header>

      <nav className={styles.tabs} role="tablist">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            className={`${styles.tab} ${tab === key ? styles.tabActive : ""}`}
            onClick={() => setTab(key)}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <main className={styles.content}>
        {tab === "chefes" && <BossCollection />}
        {tab === "reinos" && <KingdomCollection />}
        {tab === "evolucao" && <RelicCollection />}
      </main>
    </div>
  );
}

export default function GrimorioPage() {
  return (
    <Suspense>
      <GrimorioContent />
    </Suspense>
  );
}
