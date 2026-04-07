"use client";

import { Header } from "@/components/header";
import { Layout } from "@/components/layout";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const user = useAuth();

  return (
    <Layout>
      <p>Bem vindo ao seu dashboard, {user?.email}!</p>
    </Layout>
  );
}
