import { Button } from "@/components/button";
import { Input } from "@/components/input";
import styles from "./index.module.scss";
import { TypeState } from "@/interfaces/typestate";
import { ISignInRequest } from "@/interfaces/sign-up-type";
import { UseFormReturn } from "react-hook-form";

interface ILoginCardProps {
  setSectionSelected: TypeState<"login" | "register">;
  isPending: boolean;
  onSubmit: (data: ISignInRequest) => void;
  form: UseFormReturn<ISignInRequest>;
}

export const LoginCard = ({
  setSectionSelected,
  isPending,
  onSubmit,
  form,
}: ILoginCardProps) => {
  const {
    formState: { errors },
  } = form;

  return (
    <>
      <h2 className={styles.title}>
        Bem-vindo ao BardQuest!
        <br />
        Sua Aventura Aguarda
      </h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.formContainer}>
        <Input
          {...form.register("email")}
          label="Email:"
          type="email"
          autoComplete="email"
          placeholder="Digite o seu e-mail"
          error={{
            isError: !!errors.email,
            message: errors.email?.message || "",
          }}
        />
        <Input
          {...form.register("password")}
          label="Senha:"
          type="password"
          autoComplete="current-password"
          placeholder="Digite a sua senha"
          error={{
            isError: !!errors.password,
            message: errors.password?.message || "",
          }}
        />
        <div className={styles.buttonsContainer}>
          <Button
            className={styles.buttonStyle}
            buttonStyle="primary"
            type="submit"
            disabled={isPending}
            isLoading={isPending}
          >
            Entrar
          </Button>
          <Button
            className={styles.buttonStyle}
            buttonStyle="outline"
            type="button"
            onClick={() => setSectionSelected("register")}
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </>
  );
};
