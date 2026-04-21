import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { IUserProfileWithUser } from "@/interfaces/api/user";
import { CATEGORIES } from "@/interfaces/onboarding-types";
import { IUpdateUserPreferences } from "@/interfaces/services/update-user-data";
import { TypeState } from "@/interfaces/typestate";
import { cn } from "@/utils/functions/cn";
import { User } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { LuCheck, LuPlus, LuSword, LuX } from "react-icons/lu";
import styles from "./index.module.scss";

interface IEditUserPreferencesModalProps {
  form: UseFormReturn<IUpdateUserPreferences>;
  modalIsOpen: boolean;
  setModalIsOpen: TypeState<boolean>;
  user: User | null;
  profile: IUserProfileWithUser;
  onSubmit: (data: IUpdateUserPreferences) => void;
  isPending: boolean;
}

const MAX_CATEGORIES = 5;
const MAX_KEYWORDS = 5;

export const EditUserPreferencesModal = ({
  form,
  modalIsOpen,
  setModalIsOpen,
  user,
  profile,
  onSubmit,
  isPending,
}: IEditUserPreferencesModalProps) => {
  const handleClose = () => {
    setModalIsOpen(false);
    form.reset({
      id: user!.id,
      categories: profile.interests.categories,
      keywords: profile.interests.keywords.length > 0 ? profile.interests.keywords : [""],
    });
  };

  const selectedCategories =
    useWatch({
      control: form.control,
      name: "categories",
      defaultValue: [],
    }) ?? [];

  const toggleCategory = (value: string) => {
    const current = form.getValues("categories") ?? [];
    if (current.includes(value)) {
      form.setValue(
        "categories",
        current.filter((c) => c !== value),
        {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        }
      );
    } else if (current.length < MAX_CATEGORIES) {
      form.setValue("categories", [...current, value], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const pendingFocusRef = useRef<number | null>(null);

  const keywords = useWatch({
    control: form.control,
    name: "keywords",
    defaultValue: [""],
  }) ?? [""];

  const updateKeyword = (index: number, value: string) => {
    const next = [...keywords];
    next[index] = value;
    form.setValue("keywords", next, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const removeKeyword = (index: number, focusAfter = false) => {
    if (keywords.length <= 1) return;
    if (focusAfter) pendingFocusRef.current = Math.min(index, keywords.length - 2);
    const next = keywords.filter((_, i) => i !== index);
    form.setValue("keywords", next.length > 0 ? next : [""], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const addKeyword = (focusNew = false) => {
    if (keywords.length >= MAX_KEYWORDS) return;
    if (focusNew) pendingFocusRef.current = keywords.length;
    form.setValue("keywords", [...keywords, ""], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    const idx = pendingFocusRef.current;
    if (idx === null) return;
    inputRefs.current[idx]?.focus();
    pendingFocusRef.current = null;
  }, [keywords.length]);

  const handleKeywordKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (keywords.length >= MAX_KEYWORDS) {
        e.currentTarget.form?.requestSubmit();
        return;
      }
      addKeyword(true);
    }
    if (e.key === "Delete" && keywords.length > 1) {
      e.preventDefault();
      removeKeyword(index, true);
    }
  };

  const filledCount = keywords.filter((k) => k.trim() !== "").length;
  const keywordExamples = ["Maplestory", "Zelda", "One Piece", "Bach", "Studio Ghibli"];

  return (
    <Modal isOpen={modalIsOpen} onClose={handleClose}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.modalForm}>
        {/* ── Header ── */}
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Preferências Musicais</h3>
          <p className={styles.modalDesc}>
            Ajuste seus gostos para que os reinos e músicas sejam perfeitos para você.
          </p>
        </div>

        {/* ── Categories ── */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Categorias</span>
            <span className={styles.sectionCounter}>
              {selectedCategories.length}/{MAX_CATEGORIES}
            </span>
          </div>

          <div className={styles.categoryGrid}>
            {CATEGORIES.map(({ value, label }) => {
              const isSelected = selectedCategories.includes(value);
              const isDisabled =
                !isSelected && selectedCategories.length >= MAX_CATEGORIES;
              return (
                <button
                  key={value}
                  type="button"
                  className={cn(styles.categoryChip, {
                    [styles.chipSelected]: isSelected,
                    [styles.chipDisabled]: isDisabled,
                  })}
                  onClick={() => toggleCategory(value)}
                  aria-pressed={isSelected}
                >
                  {isSelected && <LuCheck size={13} className={styles.chipCheck} />}
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.sectionDivider} />

        {/* ── Keywords ── */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Palavras-chave</span>
            <span className={styles.sectionCounter}>
              {filledCount}/{MAX_KEYWORDS}
            </span>
          </div>

          <div className={styles.keywordsExamples}>
            <span className={styles.exampleLabel}>Exemplos:</span>
            {keywordExamples.map((ex) => (
              <span key={ex} className={styles.exampleTag}>
                {ex}
              </span>
            ))}
          </div>

          <div className={styles.keywordList}>
            {keywords.map((kw, i) => (
              <div key={i} className={styles.keywordRow}>
                <span className={styles.keywordIndex}>{i + 1}</span>
                <input
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  className={styles.keywordInput}
                  type="text"
                  value={kw}
                  onChange={(e) => updateKeyword(i, e.target.value)}
                  onKeyDown={(e) => handleKeywordKeyDown(e, i)}
                  placeholder={`Ex: ${keywordExamples[i] ?? "Sua referência"}`}
                  maxLength={48}
                />
                {keywords.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeKeyword(i)}
                    aria-label={`Remover palavra-chave ${i + 1}`}
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
              onClick={() => addKeyword(true)}
            >
              <LuPlus size={16} />
              Adicionar referência
            </button>
          )}
        </div>

        {/* ── Footer actions ── */}
        <div className={styles.modalFooter}>
          <Button
            type="button"
            buttonStyle="tertiary"
            onClick={handleClose}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            buttonStyle="primary"
            iconLeft={LuSword}
            isLoading={isPending}
          >
            Salvar preferências
          </Button>
        </div>
      </form>
    </Modal>
  );
};
