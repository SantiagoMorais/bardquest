# ⚡ Como Usar (5 minutos)

## 1️⃣ Template Básico

```scss
// src/app/components/Card.module.scss
@import "../../styles/variables";
@import "../../styles/mixins";

.card {
  @include flex-column;
  background-color: var(--color-beige-100);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
}

.title {
  @include header(2);
  margin-bottom: var(--spacing-md);
}

.text {
  @include body(2);
}

@include media("desktop-up") {
  .card {
    padding: var(--spacing-xl);
  }
}
```

## 2️⃣ No React

```tsx
import styles from "./Card.module.scss";

export default function Card() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Título</h2>
      <p className={styles.text}>Conteúdo</p>
    </div>
  );
}
```

## 3️⃣ O Essencial

| O quê          | Como                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| **Cores**      | `var(--color-{brown,beige,green,blue,gold}-{900,700,500,300})`          |
| **Tipografia** | `@include header(1-6)` \| `@include label(1-4)` \| `@include body(1-4)` |
| **Espaço**     | `var(--spacing-{xs,sm,md,lg,xl,2xl,3xl})`                               |
| **Responsivo** | `@include media("phone", "tablet-up", "notebook-up", "desktop-up")`     |
| **Layouts**    | `@include flex-center`, `@include flex-column`, `@include grid-center`  |

---

**Veja CHEAT_SHEET.md para copiar/colar rápido! 📋**
