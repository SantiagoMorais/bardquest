// app/(protected)/layout.tsx  — ou onde seu Header está
import { Header } from "@/components/header";
import styles from "./index.module.scss";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.main}>{children}</main>
  </div>
);
