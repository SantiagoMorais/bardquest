"use client";

import { useState, type SyntheticEvent } from "react";
import { User } from "@supabase/supabase-js";
import { LuChevronRight, LuChevronLeft, LuSparkles } from "react-icons/lu";
import { Modal } from "@/components/modal";
import { useWatch, type UseFormReturn } from "react-hook-form";
import styles from "./index.module.scss";
import { OnboardingStep0 } from "./onboardingStep0";
import { OnboardingStep1 } from "./onboardingStep1";
import { OnboardingStep2 } from "./onboardingStep2";
import { OnboardingStep3 } from "./onboardingStep3";
import type { IOnboardingFormValues } from "@/interfaces/onboarding-types";
import { EXPERIENCE_TO_DIFFICULTY } from "@/interfaces/onboarding-types";
import type { IUserProfileWithUser } from "@/interfaces/api/user";
import classNames from "classnames";
import { payloadForFirstLogin } from "@/utils/payload-for-first-login";

interface IOnboardingModalProps {
  user: User;
  onSubmit: (data: IUserProfileWithUser) => void;
  isPending?: boolean;
  form: UseFormReturn<IOnboardingFormValues>;
  modalIsOpen: boolean;
}

const TOTAL_STEPS = 4;

export const OnboardingModal = ({
  user,
  onSubmit,
  form,
  isPending = false,
  modalIsOpen,
}: IOnboardingModalProps) => {
  const [step, setStep] = useState(0);

  const birthDate = useWatch({ control: form.control, name: "birth_date" });
  const username = useWatch({
    control: form.control,
    name: "username",
    defaultValue: "",
  });
  const experience = useWatch({ control: form.control, name: "experience" });
  const instrument = useWatch({ control: form.control, name: "instrument" });
  const categories =
    useWatch({
      control: form.control,
      name: "interests.categories",
      defaultValue: [],
    }) ?? [];
  const keywords = useWatch({
    control: form.control,
    name: "interests.keywords",
    defaultValue: [""],
  }) ?? [""];

  const today = new Date();
  const minBirthDate = new Date(today);
  minBirthDate.setFullYear(today.getFullYear() - 120);
  const maxBirthDate = new Date(today);
  const parsedBirthDate = birthDate ? new Date(birthDate) : null;

  const isBirthDateComplete =
    parsedBirthDate instanceof Date &&
    !Number.isNaN(parsedBirthDate.getTime()) &&
    parsedBirthDate >= minBirthDate &&
    parsedBirthDate <= maxBirthDate;

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const isStep1Complete =
    isBirthDateComplete && Boolean(experience) && Boolean(instrument);
  const isStep2Complete = categories.length >= 1;
  const isStep3Complete = keywords.some((keyword) => keyword.trim() !== "");

  const canAdvance =
    step === 0 || (step === 1 && isStep1Complete) || (step === 2 && isStep2Complete);
  const canSubmit = step === 3 && isStep3Complete;

  const handleSubmit = (data: IOnboardingFormValues) => {
    const payload = payloadForFirstLogin({ data, user });
    onSubmit(payload);
  };

  const handleFormSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    if (!canSubmit) return event.preventDefault();

    return form.handleSubmit(handleSubmit)(event);
  };

  return (
    <Modal isOpen={modalIsOpen} persistent>
      <form className={styles.container} onSubmit={handleFormSubmit}>
        {step === 0 && <OnboardingStep0 user={user} />}
        {step === 1 && <OnboardingStep1 form={form} username={username} />}
        {step === 2 && <OnboardingStep2 form={form} />}
        {step === 3 && <OnboardingStep3 form={form} />}

        <div className={styles.footer}>
          <div className={styles.progress}>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${i === step ? styles.dotActive : ""} ${i < step ? styles.dotDone : ""}`}
              />
            ))}
          </div>

          <div className={styles.actions}>
            {step > 0 && (
              <button
                className={styles.btnBack}
                type="button"
                onClick={prev}
                disabled={isPending}
              >
                <LuChevronLeft size={16} />
                Voltar
              </button>
            )}

            <button
              className={classNames(styles.btnNext, {
                [styles.btnHidden]: step === TOTAL_STEPS - 1,
              })}
              type="button"
              onClick={next}
              disabled={isPending || !canAdvance}
            >
              {step === 0 ? "Começar" : "Próximo"}
              <LuChevronRight size={16} />
            </button>
            <button
              className={classNames(styles.btnFinish, {
                [styles.btnHidden]: step !== TOTAL_STEPS - 1,
              })}
              type="submit"
              disabled={isPending || !canSubmit}
            >
              <LuSparkles size={16} />
              {isPending ? "Iniciando..." : "Iniciar jornada"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
