"use client";

import logo from "@/assets/logo-bardquest.png";
import Image from "next/image";
import { useState } from "react";
import { LoginCard } from "./loginCard";
import styles from "./page.module.scss";
import { RegisterCardWrapper } from "./registerCardWrapper";

export default function Home() {
  const [sectionSelected, setSectionSelected] = useState<"login" | "register">("login");

  return (
    <main className={styles.container}>
      <Image src={logo} alt="BardQuest Logo" className={styles.logo} />
      <div className={styles.card}>
        {sectionSelected === "login" ? (
          <LoginCard setSectionSelected={setSectionSelected} />
        ) : (
          <RegisterCardWrapper setSectionSelected={setSectionSelected} />
        )}
      </div>
    </main>
  );
}
