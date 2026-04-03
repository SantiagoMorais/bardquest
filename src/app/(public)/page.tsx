"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import logo from "@/assets/logo-bardquest.png";
import { Button } from "@/components/button";
import { useState } from "react";
import { LoginCard } from "./loginCard";
import { RegisterCard } from "./registerCard";

export default function Home() {
  const [sectionSelected, setSectionSelected] = useState<"login" | "register">("login");

  return (
    <main className={styles.container}>
      <Image src={logo} alt="BardQuest Logo" className={styles.logo} />
      <div className={styles.card}>
        {sectionSelected === "login" ? (
          <LoginCard setSectionSelected={setSectionSelected} />
        ) : (
          <RegisterCard setSectionSelected={setSectionSelected} />
        )}
      </div>
    </main>
  );
}
