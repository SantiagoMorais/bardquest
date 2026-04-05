import { Button } from "@/components/button";
import { Input } from "@/components/input";
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
        <Input
          label="Email:"
          type="text"
          name="register-email"
          placeholder="Digite o seu e-mail"
        />
        <Input
          label="Nome de usuário:"
          type="text"
          name="register-username"
          placeholder="Digite o seu nome de usuário"
        />
        <Input
          label="Senha:"
          type="password"
          name="register-password"
          placeholder="Digite a sua senha"
        />
        <Input
          label="Confirmar Senha:"
          type="password"
          name="register-confirmPassword"
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
