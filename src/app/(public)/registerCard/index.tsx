import { Button } from "@/components/button";
import styles from "./index.module.scss";
import { TypeState } from "@/interfaces/typestate";

interface IRegisterCardProps {
  setSectionSelected: TypeState<"login" | "register">;
}

export const RegisterCard = ({ setSectionSelected }: IRegisterCardProps) => {
  return (
    <>
      <h2 className={styles.title}>Cadastro</h2>
      <div className={styles.inputsContainer}>
        <label className={styles.label} htmlFor="register-email">
          Email:
        </label>
        <input
          type="text"
          name="register-email"
          id="register-email"
          placeholder="Digite o seu e-mail"
        />
        <label className={styles.label} htmlFor="register-username">
          Nome de usuário:
        </label>
        <input
          type="text"
          name="register-username"
          id="register-username"
          placeholder="Digite o seu nome de usuário"
        />
        <label className={styles.label} htmlFor="register-password">
          Senha:
        </label>
        <input
          type="password"
          name="register-password"
          id="register-password"
          placeholder="Digite a sua senha"
        />
        <label className={styles.label} htmlFor="register-confirmPassword">
          Confirmar Senha:
        </label>
        <input
          type="password"
          name="register-confirmPassword"
          id="register-confirmPassword"
          placeholder="Confirme a sua senha"
        />
      </div>
      <div className={styles.buttonsContainer}>
        <Button className={styles.buttonStyle} buttonStyle="primary">
          Cadastrar
        </Button>
        <Button
          className={styles.buttonStyle}
          buttonStyle="outline"
          onClick={() => setSectionSelected("login")}
        >
          Voltar
        </Button>
      </div>
    </>
  );
};
