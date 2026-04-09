"use client";

import { useAuth } from "@/hooks/useAuth";
import styles from "./page.module.scss";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <section className={styles.container}>
      <p>Bem vindo ao seu dashboard, {user?.email}!</p>
    </section>
  );
}
