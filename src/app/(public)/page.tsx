import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Bem-vindo</h1>
        <p className={styles.headerSubtitle}>Entre na sua conta</p>
      </header>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Login</h2>
        <p className={styles.cardContent}>Faça login para acessar sua conta.</p>
        <button className={styles.button}>Entrar</button>
        <button className={styles.buttonSecondary}>Criar conta</button>
      </div>
    </div>
  );
}
