import { Button } from "@/components/button";
import { Input } from "@/components/input";
import styles from "./index.module.scss";
import { TypeState } from "@/interfaces/typestate";
import { ISignUpRequest } from "@/interfaces/sign-up-type";
import { UseFormReturn } from "react-hook-form";

interface IRegisterCardProps {
  setSectionSelected: TypeState<"login" | "register">;
  isPending: boolean;
  onSubmit: (data: ISignUpRequest) => void;
  form: UseFormReturn<ISignUpRequest>;
}

export const RegisterCard = ({
  setSectionSelected,
  isPending,
  onSubmit,
  form,
}: IRegisterCardProps) => {
  const {
    formState: { errors },
  } = form;

  return (
    <>
      <h2 className={styles.title}>Cadastro</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.inputsContainer}>
          <Input
            {...form.register("email")}
            label="Email:"
            type="email"
            autoComplete="off"
            placeholder="Digite o seu e-mail"
            error={{
              message: errors.email?.message || "",
              isError: !!errors.email,
            }}
          />
          <Input
            {...form.register("username")}
            label="Nome de usuário:"
            type="text"
            autoComplete="off"
            placeholder="Digite o seu nome de usuário"
            error={{
              message: errors.username?.message || "",
              isError: !!errors.username,
            }}
          />
          <Input
            {...form.register("password")}
            label="Senha:"
            type="password"
            autoComplete="new-password"
            placeholder="Digite a sua senha"
            error={{
              message: errors.password?.message || "",
              isError: !!errors.password,
            }}
          />
          <Input
            {...form.register("repeatPassword")}
            label="Confirmar Senha:"
            type="password"
            autoComplete="new-password"
            placeholder="Confirme a sua senha"
            error={{
              message: errors.repeatPassword?.message || "",
              isError: !!errors.repeatPassword,
            }}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            className={styles.buttonStyle}
            type="submit"
            buttonStyle="primary"
            isLoading={isPending}
          >
            Cadastrar
          </Button>
          <Button
            type="button"
            className={styles.buttonStyle}
            buttonStyle="outline"
            onClick={() => setSectionSelected("login")}
            disabled={isPending}
          >
            Voltar
          </Button>
        </div>
      </form>
    </>
  );
};
