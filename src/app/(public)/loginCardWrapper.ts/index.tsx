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

interface ILoginCardWrapperProps {
  setSectionSelected: TypeState<"login" | "register">;
}

export const LoginCardWrapper = ({ setSectionSelected }: ILoginCardWrapperProps) => {
  const router = useRouter();

  const signinMutation = useMutation({
    mutationFn: AuthService.signIn,
    onSuccess: (data) => {
      toast.success(
        `Seja bem-vindo${data.user?.email ?? " viajante"}! Sua aventura te aguarda.`
      );
      router.replace("/dashboard");
    },
    onError: (error) => {
      console.error("Error on signIn:", error);
      toast.error(
        "Verifique suas credenciais e tente novamente. Se o problema persistir, entre em contato com o suporte."
      );
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
