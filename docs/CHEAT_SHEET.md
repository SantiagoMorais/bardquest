# 📋 Cheat Sheet - Copiar & Colar

**Salve como favorito! 📌**

---

## 🎨 Cores

```scss
// Browns
var(--base-color-brown-900)  // Escuro
var(--base-color-brown-700)  // Base
var(--base-color-brown-500)  // Claro
var(--base-color-brown-300)  // Muito claro

// Beige - Greens - Blues - Golds
var(--base-color-beige-100|300|500)
var(--base-color-green-900|700|300)
var(--base-color-blue-900|700|500|300)
var(--base-color-gold-900|700|500|300)
```

---

## 🔤 Tipografia

```scss
// Headers (1-6)
@include header(1); // 44px, bold
@include header(2); // 36px, bold
@include header(3); // 32px, semi-bold

// Labels (1-4)
@include label(1); // 20px, semi-bold
@include label(2); // 16px, semi-bold
@include label(3); // 14px, medium

// Body (1-4)
@include body(2); // 18px, normal
@include body(3); // 16px, normal
```

---

## 📏 Espaçamento

```scss
var(--spacing-xs)  // 4px
var(--spacing-sm)  // 8px
var(--spacing-md)  // 16px
var(--spacing-lg)  // 24px
var(--spacing-xl)  // 32px
```

---

## 📱 Responsivo

```scss
@include media("phone") // Mobile
  @include media("tablet-up") // 768px+
  @include media("notebook-up") // 1024px+
  @include media("desktop-up"); // 1366px+
```

---

## 🔘 Extras

```scss
var(--radius-sm)       // 4px
var(--radius-full)     // 9999px (círculo)

// Layouts
@include flex-center;
@include flex-between;
@include flex-column;
@include truncate;
@include line-clamp(3);
```

---

## 💡 Templates Prontos

### Card

```scss
.card {
  background-color: var(--base-color-beige-100);
  border: 2px solid var(--base-color-brown-300);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}
```

### Botão

```scss
.button {
  @include label(2);
  background-color: var(--base-color-gold-500);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);

  &:hover {
    background-color: var(--base-color-gold-700);
  }
}
```

### Success

```scss
.success {
  background-color: var(--base-color-green-300);
  border-left: 4px solid var(--base-color-green-900);
  padding: var(--spacing-md);
}
```

---

📖 **Veja [QUICK_START.md](QUICK_START.md) para exemplos completos**
