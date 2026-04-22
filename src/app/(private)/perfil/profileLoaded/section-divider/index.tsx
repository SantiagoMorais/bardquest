import styles from "./index.module.scss";

interface ISectionDividerProps {
  label: string;
}

export const SectionDivider = ({ label }: ISectionDividerProps) => {
  return (
    <div className={styles.divider}>
      <span className={styles.dividerLine} />
      <span className={styles.dividerLabel}>{label}</span>
      <span className={styles.dividerLine} />
    </div>
  );
};
