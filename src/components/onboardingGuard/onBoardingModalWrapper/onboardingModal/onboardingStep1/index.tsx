import { LuUser } from "react-icons/lu";
import type { UseFormRegister } from "react-hook-form";
import type { IOnboardingFormValues } from "@/interfaces/onboarding-types";
import styles from "./index.module.scss";
import classNames from "classnames";

interface IOnboardingStep1Props {
  register: UseFormRegister<IOnboardingFormValues>;
  username: string;
}

export const OnboardingStep1 = ({ register, username }: IOnboardingStep1Props) => {
  const handleAgeInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    if (value === "") return;

    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      event.currentTarget.value = "";
      return;
    }

    const clampedValue = Math.min(120, Math.max(1, numericValue));
    event.currentTarget.value = String(clampedValue);
  };

  const preventInvalidAgeChars = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-", ".", ","].includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <section className={styles.step} aria-labelledby="step-1-title">
      <div className={styles.stepIcon}>
        <LuUser size={28} />
      </div>
      <h3 className={styles.stepTitle} id="step-1-title">
        Sobre você
      </h3>
      <p className={styles.stepDesc}>Seu perfil de aventureiro musical.</p>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.label}>Como quer ser chamado?</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Ex: João"
            maxLength={30}
            {...register("username", { maxLength: 30 })}
          />
          <span className={classNames(styles.label, styles.counter)}>
            {username.length}/30
          </span>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Qual sua idade?</span>
          <input
            className={styles.input}
            type="number"
            placeholder="Ex: 24"
            min={1}
            max={120}
            step={1}
            onInput={handleAgeInput}
            onKeyDown={preventInvalidAgeChars}
            {...register("age", { valueAsNumber: true, min: 1, max: 120 })}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Nível de experiência com música</span>
          <select className={styles.select} {...register("experience")}>
            <option value="">Selecione...</option>
            <option value="begginer">Iniciante — nunca estudei</option>
            <option value="basic">Básico — conheço o essencial</option>
            <option value="intermediate">Intermediário — toco um instrumento</option>
            <option value="advanced">Avançado — tenho muita prática</option>
          </select>
        </label>

        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>Qual instrumento você quer tocar?</legend>
          <div className={styles.instrumentGrid}>
            <label className={styles.instrumentCard}>
              <input
                type="radio"
                value="piano"
                {...register("instrument")}
                className={styles.radioHidden}
              />
              <span className={styles.instrumentIcon}>🎹</span>
              <span className={styles.instrumentName}>Piano</span>
              <span className={styles.instrumentSub}>Clássico & versátil</span>
            </label>

            <label className={styles.instrumentCard}>
              <input
                type="radio"
                value="guitar"
                {...register("instrument")}
                className={styles.radioHidden}
              />
              <span className={styles.instrumentIcon}>🎸</span>
              <span className={styles.instrumentName}>Guitarra / Violão</span>
              <span className={styles.instrumentSub}>Folk & aventura</span>
            </label>
          </div>
        </fieldset>
      </div>
    </section>
  );
};
