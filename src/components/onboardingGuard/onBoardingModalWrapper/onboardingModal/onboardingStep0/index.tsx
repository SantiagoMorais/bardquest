import { LuScroll } from "react-icons/lu";
import styles from "./index.module.scss";
import { User } from "@supabase/supabase-js";

interface IOnboardingStep0Props {
  user: User;
}

export const OnboardingStep0 = ({ user }: IOnboardingStep0Props) => {
  return (
    <div className={styles.step}>
      <div className={styles.welcomeIcon}>
        <LuScroll size={48} />
      </div>
      <h2 className={styles.welcomeTitle}>
        Bem-vindo ao Bard Quest,
        <br />
        <span className={styles.accent}>Aventureiro</span>!
      </h2>
      <p className={styles.welcomeText}>
        Antes de começar sua jornada, precisamos conhecer você melhor. Responda algumas
        perguntas rápidas para personalizarmos sua experiência musical e medieval.
      </p>
      <p className={styles.welcomeHint}>🎵 Levará menos de 2 minutos.</p>
    </div>
  );
};
