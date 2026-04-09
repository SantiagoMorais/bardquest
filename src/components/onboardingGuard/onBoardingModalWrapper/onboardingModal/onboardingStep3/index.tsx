"use client";

import { useEffect, useRef } from "react";
import type { IOnboardingFormValues } from "@/interfaces/onboarding-types";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { LuPlus, LuSparkles, LuX } from "react-icons/lu";
import styles from "./index.module.scss";

interface IOnboardingStep3Props {
  form: UseFormReturn<IOnboardingFormValues>;
}

const MAX_KEYWORDS = 5;

export const OnboardingStep3 = ({ form }: IOnboardingStep3Props) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const pendingFocusIndexRef = useRef<number | null>(null);

  const keywords = useWatch({
    control: form.control,
    name: "interests.keywords",
    defaultValue: [""],
  }) ?? [""];

  const update = (index: number, value: string) => {
    const next = [...keywords];
    next[index] = value;
    form.setValue("interests.keywords", next, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const remove = (index: number, focusAfterRemove = false) => {
    if (keywords.length <= 1) return;

    if (focusAfterRemove) {
      pendingFocusIndexRef.current = Math.min(index, keywords.length - 2);
    }

    const next = keywords.filter((_, i) => i !== index);
    form.setValue("interests.keywords", next.length > 0 ? next : [""], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const add = (focusNewInput = false) => {
    if (keywords.length >= MAX_KEYWORDS) return;

    if (focusNewInput) {
      pendingFocusIndexRef.current = keywords.length;
    }

    form.setValue("interests.keywords", [...keywords, ""], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const filledCount = keywords.filter((k) => k.trim() !== "").length;

  useEffect(() => {
    const pendingFocusIndex = pendingFocusIndexRef.current;
    if (pendingFocusIndex === null) return;

    inputRefs.current[pendingFocusIndex]?.focus();
    pendingFocusIndexRef.current = null;
  }, [keywords.length]);

  const handleKeywordKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (keywords.length >= MAX_KEYWORDS) {
        event.currentTarget.form?.requestSubmit();
        return;
      }

      add(true);
      return;
    }

    if (event.key === "Delete" && keywords.length > 1) {
      event.preventDefault();
      remove(index, true);
    }
  };

  const keywordsExample = ["Maplestory", "Zelda", "One Piece", "Bach", "Studio Ghibli"];

  return (
    <section className={styles.step} aria-labelledby="step-3-title">
      <div className={styles.stepIcon}>
        <LuSparkles size={28} />
      </div>
      <h3 className={styles.stepTitle} id="step-3-title">
        Palavras-chave
      </h3>
      <p className={styles.stepDesc}>
        Adicione até <strong>5 referências</strong> que você ama — games, animes, filmes,
        compositores, séries. Nossa IA usará isso para selecionar músicas especiais para
        você.
      </p>

      <div className={styles.fields}>
        <div className={styles.keywordsExamples}>
          <span className={styles.exampleLabel}>Exemplos:</span>
          {keywordsExample.map((example) => (
            <span key={example} className={styles.exampleTag}>
              {example}
            </span>
          ))}
        </div>

        <div className={styles.keywordList}>
          {keywords.map((kw, i) => (
            <div key={i} className={styles.keywordRow}>
              <span className={styles.keywordIndex}>{i + 1}</span>
              <input
                ref={(element) => {
                  inputRefs.current[i] = element;
                }}
                className={styles.input}
                type="text"
                value={kw}
                onChange={(e) => update(i, e.target.value)}
                onKeyDown={(event) => handleKeywordKeyDown(event, i)}
                placeholder={`Ex: ${["Maplestory", "Zelda", "One Piece", "Bach", "Ghibli"][i] ?? "Sua referência"}`}
                maxLength={48}
              />
              {keywords.length > 1 && (
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => remove(i)}
                  aria-label={`Remover palavra-chave ${i + 1}`}
                  title="⌦ Del"
                >
                  <LuX size={14} />
                </button>
              )}
            </div>
          ))}
        </div>

        {keywords.length < MAX_KEYWORDS && (
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => add()}
            title="↵ Enter"
          >
            <LuPlus size={16} />
            Adicionar referência
          </button>
        )}

        <p className={styles.counter}>
          {filledCount}/{MAX_KEYWORDS} palavras-chave preenchidas
        </p>
      </div>
    </section>
  );
};
