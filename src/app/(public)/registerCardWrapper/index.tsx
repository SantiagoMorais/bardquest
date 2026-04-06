import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/toast";
import { ISignUpRequest, signUpSchema } from "@/interfaces/sign-up-type";
import { TypeState } from "@/interfaces/typestate";
import { AuthService } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { RegisterCard } from "./registerCard";
import { useForm } from "react-hook-form";

interface IRegisterCardWrapperProps {
  setSectionSelected: TypeState<"login" | "register">;
}

export const RegisterCardWrapper = ({
  setSectionSelected,
}: IRegisterCardWrapperProps) => {
  const createUserMutation = useMutation({
    mutationFn: AuthService.signUp,
    onSuccess: () => {
      toast.success("Sucesso! Enviamos um e-mail para você confirmar seu cadastro!");
      setSectionSelected("login");
    },
    onError: (error) => {
      console.error("Erro na mutation:", error);
      toast.error(
        "Erro ao criar conta. Tente novamente ou entre em contato com o suporte."
      );
    },
  });

  const { isPending } = createUserMutation;

  const onSubmit = (data: ISignUpRequest) => createUserMutation.mutate(data);

  const form = useForm<ISignUpRequest>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  return (
    <RegisterCard
      setSectionSelected={setSectionSelected}
      isPending={isPending}
      onSubmit={onSubmit}
      form={form}
    />
  );
};
