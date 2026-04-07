import { IUser } from "@/interfaces/api/user";
import styles from "./index.module.scss";
import { User } from "@supabase/supabase-js";

interface IOnboardingModalProps {
  user: User | null;
}

export const OnboardingModal = ({}: IOnboardingModalProps) => {
  return (
    <>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque eligendi aperiam
      deserunt tempora ipsam ratione non quam. Velit asperiores obcaecati, et hic possimus
      inventore incidunt placeat necessitatibus? Asperiores, ab autem?
    </>
  );
};
