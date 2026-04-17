import styles from "./index.module.scss";

interface IStatChipProps {
  label: string;
  value: string | number;
}

export const StatChip = ({ label, value }: IStatChipProps) => {
  return (
    <div className={styles.statChip}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  );
};
