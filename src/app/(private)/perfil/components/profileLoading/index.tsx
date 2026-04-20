import styles from "./index.module.scss";

export const ProfileLoading = () => (
  <div className={styles.wrapper}>
    <div className={styles.staffWrapper} aria-hidden="true">
      <div className={styles.staff} />
      <div className={styles.staff} />
      <div className={styles.staff} />
      <div className={styles.staff} />
      <div className={styles.staff} />
      <span
        className={styles.note}
        style={{ "--delay": "0s", "--pos": "20%" } as React.CSSProperties}
      >
        ♩
      </span>
      <span
        className={styles.note}
        style={{ "--delay": "0.4s", "--pos": "45%" } as React.CSSProperties}
      >
        ♪
      </span>
      <span
        className={styles.note}
        style={{ "--delay": "0.8s", "--pos": "68%" } as React.CSSProperties}
      >
        ♫
      </span>
      <span
        className={styles.note}
        style={{ "--delay": "1.2s", "--pos": "82%" } as React.CSSProperties}
      >
        ♩
      </span>
    </div>
    <p className={styles.loadingLabel}>Consultando os pergaminhos…</p>
  </div>
);
