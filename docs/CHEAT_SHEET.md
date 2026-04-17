# 📋 Cheat Sheet - Copiar & Colar

**Salve como favorito! 📌**

---

## 🎨 Cores

```scss
var(--color-brown-900)
var(--color-brown-700)
var(--color-brown-500)
var(--color-brown-300)

var(--color-beige-100|300|500)
var(--color-green-900|700|300)
var(--color-blue-900|700|500|300)
var(--color-gold-900|700|500|300)
```

---

## 🔤 Tipografia

```scss
@include header(1);
@include header(2);
@include header(3);

@include label(1);
@include label(2);
@include label(3);

@include body(2);
@include body(3);
```

---

## 📏 Espaçamento

```scss
var(--spacing-xs)
var(--spacing-sm)
var(--spacing-md)
var(--spacing-lg)
var(--spacing-xl)
```

---

## 📱 Responsivo

```scss
@include media("phone") @include media("tablet-up") @include media("notebook-up") @include
  media("desktop-up");
```

---

## 🔘 Extras

```scss
var(--radius-sm)
var(--radius-full)


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
  background-color: var(--color-beige-100);
  border: 2px solid var(--color-brown-300);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}
```

### Botão

```scss
.button {
  @include label(2);
  background-color: var(--color-gold-500);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);

  &:hover {
    background-color: var(--color-gold-700);
  }
}
```

### Success

```scss
.success {
  background-color: var(--color-green-300);
  border-left: 4px solid var(--color-green-900);
  padding: var(--spacing-md);
}
```

---

📖 **Veja [QUICK_START.md](QUICK_START.md) para exemplos completos**
