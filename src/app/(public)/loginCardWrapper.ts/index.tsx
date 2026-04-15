import { useMutation } from "@tanstack/react-query";
import styles from "./index.module.scss";
import { AuthService } from "@/services/auth.service";
import { toast } from "@/components/toast";
import { ISignInRequest, signInSchema } from "@/interfaces/sign-up-type";
import { useForm } from "react-hook-form";
import { LoginCard } from "./loginCard";
import { TypeState } from "@/interfaces/typestate";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { AuthApiError } from "@supabase/supabase-js";

interface ILoginCardWrapperProps {
  setSectionSelected: TypeState<"login" | "register">;
}

export const LoginCardWrapper = ({ setSectionSelected }: ILoginCardWrapperProps) => {
  const router = useRouter();

  const signinMutation = useMutation({
    mutationFn: AuthService.signIn,
    onSuccess: (data) => {
      toast.success(
        `Seja bem-vindo ${data.user?.user_metadata.display_name ?? " viajante"}! Sua aventura te aguarda.`
      );
      router.replace("/dashboard");
    },
    onError: (error) => {
      console.error("Error on signIn:", error);
      let errorMessage = "Ocorreu um erro inesperado. Tente novamente.";
      if (error instanceof AuthApiError && error.status === 400)
        errorMessage = "E-mail ou senha incorretas";
      toast.error(errorMessage);
    },
  });

  const { isPending } = signinMutation;

  const onSubmit = (data: ISignInRequest) => {
    signinMutation.mutate(data);
  };

  const form = useForm<ISignInRequest>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <LoginCard
      setSectionSelected={setSectionSelected}
      isPending={isPending}
      onSubmit={onSubmit}
      form={form}
    />
  );
};
