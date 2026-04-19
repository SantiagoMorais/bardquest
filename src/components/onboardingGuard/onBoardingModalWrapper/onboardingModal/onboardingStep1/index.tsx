import { LuUser } from "react-icons/lu";
import { Controller, UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import type { IOnboardingFormValues } from "@/interfaces/onboarding-types";
import styles from "./index.module.scss";
import classNames from "classnames";

interface IOnboardingStep1Props {
  form: UseFormReturn<IOnboardingFormValues>;
  username: string;
}

export const OnboardingStep1 = ({ form, username }: IOnboardingStep1Props) => {
  const { register } = form;
  const [birthDateMasked, setBirthDateMasked] = useState("");
  const today = new Date();
  const minBirthDate = new Date(today);
  minBirthDate.setFullYear(today.getFullYear() - 120);
  const maxBirthDate = new Date(today);

  const maskDate = (rawValue: string): string => {
    const digitsOnly = rawValue.replace(/\D/g, "").slice(0, 8);

    if (digitsOnly.length <= 2) return digitsOnly;
    if (digitsOnly.length <= 4) {
      return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
    }

    return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}/${digitsOnly.slice(4, 8)}`;
  };

  const parseMaskedDateToIso = (maskedDate: string): string | null => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(maskedDate)) return null;

    const [dayRaw, monthRaw, yearRaw] = maskedDate.split("/");
    const day = Number(dayRaw);
    const month = Number(monthRaw);
    const year = Number(yearRaw);

    const parsedDate = new Date(year, month - 1, day);
    const isValidDate =
      parsedDate.getFullYear() === year &&
      parsedDate.getMonth() === month - 1 &&
      parsedDate.getDate() === day;

    if (!isValidDate) return null;

    return parsedDate.toISOString();
  };

  const clampNumber = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

  const normalizeBirthDateOnBlur = (
    maskedValue: string
  ): { masked: string; iso: string } | null => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(maskedValue)) return null;

    const [dayRaw, monthRaw, yearRaw] = maskedValue.split("/");
    let day = Number(dayRaw);
    let month = Number(monthRaw);
    let year = Number(yearRaw);

    year = clampNumber(year, minBirthDate.getFullYear(), maxBirthDate.getFullYear());
    month = clampNumber(month, 1, 12);
    day = clampNumber(day, 1, daysInMonth(year, month));

    let date = new Date(year, month - 1, day);

    if (date < minBirthDate) {
      date = new Date(minBirthDate);
    }

    if (date > maxBirthDate) {
      date = new Date(maxBirthDate);
    }

    const finalDay = String(date.getDate()).padStart(2, "0");
    const finalMonth = String(date.getMonth() + 1).padStart(2, "0");
    const finalYear = date.getFullYear();

    return {
      masked: `${finalDay}/${finalMonth}/${finalYear}`,
      iso: date.toISOString(),
    };
  };

  useEffect(() => {
    const currentBirthDate = form.getValues("birth_date");
    if (!currentBirthDate) {
      setBirthDateMasked("");
      return;
    }

    const parsedDate = new Date(currentBirthDate);
    if (Number.isNaN(parsedDate.getTime())) {
      setBirthDateMasked("");
      return;
    }

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();
    setBirthDateMasked(`${day}/${month}/${year}`);
  }, [form]);

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

        <div className={styles.field}>
          <span className={styles.label}>Qual sua data de nascimento?</span>
          <Controller
            name="birth_date"
            control={form.control}
            render={({ field }) => (
              <input
                className={styles.input}
                type="text"
                inputMode="numeric"
                maxLength={10}
                placeholder="dd/mm/aaaa"
                value={birthDateMasked}
                onChange={(event) => {
                  const maskedValue = maskDate(event.target.value);
                  setBirthDateMasked(maskedValue);

                  const isoDate = parseMaskedDateToIso(maskedValue);
                  field.onChange(isoDate);
                }}
                onBlur={(event) => {
                  const normalized = normalizeBirthDateOnBlur(event.target.value);

                  if (normalized) {
                    setBirthDateMasked(normalized.masked);
                    field.onChange(normalized.iso);
                  } else {
                    field.onChange(null);
                  }

                  field.onBlur();
                }}
                name={field.name}
                ref={field.ref}
              />
            )}
          />
        </div>

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
