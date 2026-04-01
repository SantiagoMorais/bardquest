# 🎨 Setup Automático de Tipagens CSS Modules

## ✅ Configurado

Seu projeto agora tem geração automática de tipagens para CSS Modules!

### 📦 O que foi instalado:

- **`typed-css-modules`** - Gera tipos TypeScript para CSS Modules
- **`concurrently`** - Executa múltiplos comandos em paralelo

### 🚀 Como usar

#### 1️⃣ **Modo Desenvolvimento (Recomendado)**

Rode este comando para iniciar o **hot reload + geração automática de tipos**:

```bash
pnpm dev
```

Isso vai:

- ✅ Rodar o Next.js em modo desenvolvimento (hot reload automático de CSS)
- ✅ Observar mudanças em arquivos `.module.scss`
- ✅ Gerar tipos TypeScript automaticamente em tempo real

#### 2️⃣ **Gerar tipos manualmente**

Para gerar tipagens sem observar mudanças:

```bash
pnpm types:generate
```

#### 3️⃣ **Apenas observar mudanças (sem Next.js)**

Para debug ou desenvolvimento específico de estilos:

```bash
pnpm types:watch
```

---

## 💻 Exemplo de Uso

### Arquivo SCSS

```scss
// src/app/[public]/page.module.scss
@use "sass:map" as map;
@import "../../styles/variables";
@import "../../styles/mixins";

.container {
  @include flex-column;
  @include padding("lg");
  background-color: $color-light-bg-primary;
}

.title {
  @include heading(2);
  color: $color-light-text-primary;
}

.button {
  @include label("medium");
  background-color: $color-info;
  padding: $spacing-md;
  border-radius: $radius-md;

  &:hover {
    opacity: 0.8;
  }
}
```

### Arquivo TypeScript Gerado

Quando você roda `pnpm dev`, é criado automaticamente:

```typescript
// src/app/[public]/page.module.scss.d.ts
export const container: string;
export const title: string;
export const button: string;

export default {
  container: string;
  title: string;
  button: string;
};
```

### Como usar no componente

```tsx
// src/app/[public]/page.tsx
import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Título</h1>
      <button className={styles.button}>Clique aqui</button>
    </div>
  );
}
```

✅ **TypeScript vai autocompletar** as classes CSS!

---

## 🔄 O que acontece no fluxo

```
1. Você edita page.module.scss
          ↓
2. Sass compila para CSS (hot reload nativo do Next.js)
          ↓
3. typed-css-modules detecta a mudança
          ↓
4. Gera/atualiza page.module.scss.d.ts automaticamente
          ↓
5. TypeScript reconhece os tipos no seu componente
          ↓
6. VSCode oferece autocomplete!
```

---

## ⚙️ Configuração

O arquivo `tcm.json` controla o comportamento:

```json
{
  "camelCase": true, // transforma kebab-case em camelCase
  "searchDir": ["src"], // procura arquivos .module.scss aqui
  "outDir": "", // mantém o .d.ts no mesmo lugar do .scss
  "dropExtension": false, // mantém a extensão .scss no nome do arquivo
  "watch": false // `pnpm types:watch` ativa isso
}
```

---

## 📝 Arquivos gerados

Depois de rodar `pnpm dev` ou `pnpm types:generate`, você verá:

```
src/
├── styles/
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _functions.scss
├── app/
│   └── [public]/
│       ├── page.tsx
│       ├── page.module.scss
│       └── page.module.scss.d.ts  ← Tipagens geradas automaticamente
```

---

## 🎯 Fluxo Recomendado

```bash
# Inicial: gera tipagens para todos os módulos
pnpm types:generate

# Desenvolvimento: hot reload + tipos automáticos
pnpm dev

# Build: gera tipos + compila para produção
pnpm build
```

---

## 💡 Dicas

1. **Não commite os `.d.ts`** - São gerados automaticamente

   ```gitignore
   # .gitignore
   **/*.module.scss.d.ts
   ```

2. **Use camelCase** - No SCSS use kebab-case, TypeScript converte:

   ```scss
   .header-title {
   } // Vira: styles.headerTitle
   ```

3. **Valores dinâmicos** - Use CSS Variables para valores que mudam:
   ```tsx
   <div style={{ '--custom-color': '#ff0000' } as any}>
   ```

---

**Pronto!** Agora toda vez que você editar um `.module.scss`, o TypeScript sabe disso! 🎉
