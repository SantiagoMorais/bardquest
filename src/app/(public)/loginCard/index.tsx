import { Button } from "@/components/button";
import styles from "./index.module.scss";
import { TypeState } from "@/interfaces/typestate";

interface ILoginCardProps {
  setSectionSelected: TypeState<"login" | "register">;
}

export const LoginCard = ({ setSectionSelected }: ILoginCardProps) => {
  return (
    <>
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
        <Button
          className={styles.buttonStyle}
          buttonStyle="outline"
          onClick={() => setSectionSelected("register")}
        >
          Cadastrar
        </Button>
      </div>
    </>
  );
};
