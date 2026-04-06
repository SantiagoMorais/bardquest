"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const user = useAuth();

  return <>Bem vindo ao seu dashboard, {user?.email}!</>;
}
