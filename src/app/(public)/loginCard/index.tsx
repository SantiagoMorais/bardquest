import { Button } from "@/components/button";
import { Input } from "@/components/input";
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
        <Input
          label="Email:"
          type="email"
          name="login-email"
          autoComplete="email"
          placeholder="Digite o seu e-mail"
        />
        <Input
          label="Senha:"
          type="password"
          name="login-password"
          autoComplete="current-password"
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
