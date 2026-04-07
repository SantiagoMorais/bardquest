"use client";

import logo from "@/assets/logo-bardquest.png";
import Image from "next/image";
import { useState } from "react";
import { LoginCard } from "./loginCardWrapper.ts/loginCard";
import styles from "./page.module.scss";
import { RegisterCardWrapper } from "./registerCardWrapper";
import { LoginCardWrapper } from "./loginCardWrapper.ts";

export default function Home() {
  const [sectionSelected, setSectionSelected] = useState<"login" | "register">("login");

  return (
    <main className={styles.container}>
      <Image src={logo} alt="BardQuest Logo" className={styles.logo} />
      <div className={styles.card}>
        {sectionSelected === "login" ? (
          <LoginCardWrapper setSectionSelected={setSectionSelected} />
        ) : (
          <RegisterCardWrapper setSectionSelected={setSectionSelected} />
        )}
      </div>
    </main>
  );
}
