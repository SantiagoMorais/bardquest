import styles from "./index.module.scss";

export const ProfileNotFound = () => (
  <div className={styles.wrapper}>
    <div className={styles.errorScroll} aria-hidden="true">
      <span className={styles.scrollCap} />
      <div className={styles.scrollBody}>
        <span className={styles.errorIcon}>♭</span>
        <p className={styles.errorTitle}>Bardo não encontrado</p>
        <p className={styles.errorSub}>
          Este viajante parece ter partido para terras desconhecidas.
        </p>
      </div>
      <span className={styles.scrollCap} />
    </div>
  </div>
);
