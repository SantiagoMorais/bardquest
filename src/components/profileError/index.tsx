import styles from "./index.module.scss";

interface IProfileErrorProps {
  message?: string;
}

export const ProfileError = ({ message }: IProfileErrorProps) => (
  <div className={styles.wrapper}>
    <div className={styles.errorScroll} aria-hidden="true">
      <span className={styles.scrollCap} />
      <div className={styles.scrollBody}>
        <span className={styles.errorIcon}>𝄢</span>
        <p className={styles.errorTitle}>A melodia se perdeu…</p>
        <p className={styles.errorSub}>
          {message ?? "Os ventos levaram as notas antes de chegarem ao bardo."}
        </p>
      </div>
      <span className={styles.scrollCap} />
    </div>
    <button className={styles.retryBtn} onClick={() => window.location.reload()}>
      ✦ Tentar novamente
    </button>
  </div>
);
