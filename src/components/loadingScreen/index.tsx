import Image from "next/image";
import logo from "@/assets/logo-bardquest.png";
import styles from "./index.module.scss";

const NOTES = ["♩", "♪", "♫", "♬", "♭", "♮"];

export const LoadingScreen = () => {
  return (
    <div className={styles.overlay} role="status" aria-label="Carregando...">
      {/* Partículas de notas flutuando ao fundo */}
      {NOTES.map((note, i) => (
        <span
          key={i}
          className={styles.floatingNote}
          style={{ "--i": i } as React.CSSProperties}
          aria-hidden="true"
        >
          {note}
        </span>
      ))}

      <div className={styles.stage}>
        {/* Pentagrama animado */}
        <div className={styles.staff}>
          {[0, 1, 2, 3, 4].map((line) => (
            <div key={line} className={styles.staffLine} />
          ))}

          {/* Nota quicando no pentagrama */}
          <div className={styles.bounceNote} aria-hidden="true">
            ♩
          </div>
        </div>

        <Image className={styles.logo} src={logo} alt="Bard Quest" priority />

        <p className={styles.subtitle}>
          Preparando sua aventura
          <span className={styles.dots} />
        </p>
      </div>
    </div>
  );
};
