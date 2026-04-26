"use client";

import type { IOnboardingFormValues } from "@/interfaces/onboarding-types";
import { CATEGORIES } from "@/interfaces/onboarding-types";
import classNames from "classnames";
import { UseFormReturn, useWatch } from "react-hook-form";
import { LuCheck, LuTag } from "react-icons/lu";
import styles from "./index.module.scss";

interface IOnboardingStep2Props {
  form: UseFormReturn<IOnboardingFormValues>;
}

export const OnboardingStep2 = ({ form }: IOnboardingStep2Props) => {
  const selected =
    useWatch({
      control: form.control,
      name: "interests.categories",
      defaultValue: [],
    }) ?? [];
  const MAX = 5;

  const toggle = (value: string) => {
    const current = form.getValues("interests.categories") ?? [];

    if (current.includes(value)) {
      form.setValue(
        "interests.categories",
        current.filter((c) => c !== value),
        { shouldDirty: true, shouldTouch: true, shouldValidate: true }
      );
    } else if (current.length < MAX) {
      form.setValue("interests.categories", [...current, value], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  return (
    <section className={styles.step} aria-labelledby="step-2-title">
      <div className={styles.stepIcon}>
        <LuTag size={28} />
      </div>
      <h3 className={styles.stepTitle} id="step-2-title">
        Seus interesses
      </h3>
      <p className={styles.stepDesc}>
        Escolha até <strong>5 categorias</strong> que representam seus gostos musicais.
        Isso ajuda nossa IA a criar reinos e selecionar músicas perfeitas para você.
      </p>

      <div className={styles.categoryGrid}>
        {CATEGORIES.map(({ value, label }) => {
          const isSelected = selected.includes(value);
          const isDisabled = !isSelected && selected.length >= MAX;

          return (
            <button
              key={value}
              type="button"
              className={classNames(styles.categoryChip, {
                [styles.chipSelected]: isSelected,
                [styles.chipDisabled]: isDisabled,
              })}
              onClick={() => toggle(value)}
              aria-pressed={isSelected}
            >
              {isSelected && <LuCheck size={13} className={styles.chipCheck} />}
              {label}
            </button>
          );
        })}
      </div>

      <p className={styles.counter}>
        {selected.length}/{MAX} categorias selecionadas
      </p>
    </section>
  );
};
