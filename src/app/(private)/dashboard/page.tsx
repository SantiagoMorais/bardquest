"use client";

import { Layout } from "@/components/layout";
import { useAuth } from "@/hooks/useAuth";
import styles from "./page.module.scss";

export default function Dashboard() {
  const user = useAuth();

  return (
    <Layout>
      <div className={styles.container}>
        <p>Bem vindo ao seu dashboard, {user?.email}!</p>
      </div>
    </Layout>
  );
}
