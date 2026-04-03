import Image from "next/image";
import styles from "./page.module.scss";
import logo from "@/assets/logo-bardquest.png";
import { Button } from "@/components/button";

export default function Home() {
  return (
    <main className={styles.container}>
      <Image src={logo} alt="BardQuest Logo" className={styles.logo} />
      <div className={styles.loginCard}>
        <h2 className={styles.title}>
          Bem-vindo ao BardQuest!
          <br />
          Sua Aventura Aguarda
        </h2>

        <div className={styles.inputsContainer}>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input type="text" name="email" id="email" placeholder="Digite o seu e-mail" />
          <label className={styles.label} htmlFor="password">
            Senha:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite a sua senha"
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button className={styles.buttonStyle} buttonStyle="primary">
            Entrar
          </Button>
          <Button className={styles.buttonStyle} buttonStyle="outline">
            Cadastrar
          </Button>
        </div>
      </div>
    </main>
  );
}
