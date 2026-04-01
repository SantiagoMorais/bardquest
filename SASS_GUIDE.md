# 📚 Guia Completo de Sass no Projeto

## 📁 Estrutura de Pastas

```
src/
├── styles/
│   ├── _variables.scss    # Cores, espaçamento, tipografia
│   ├── _mixins.scss       # Funções reutilizáveis (layouts, temas, responsividade)
│   ├── _functions.scss    # Funções Sass (conversões, cálculos)
│   └── globals.scss       # Estilos globais da aplicação
└── app/
    └── [public]/
        └── page.module.scss # Exemplo de uso
```

## 🎨 Como Usar em CSS Modules

### 1️⃣ Importar os recursos

```scss
@import "../../styles/variables";
@import "../../styles/mixins";
@import "../../styles/functions";
```

### 2️⃣ Usar Variáveis

```scss
.container {
  background-color: $color-light-bg-primary;
  color: $color-light-text-primary;
  padding: $spacing-md;
  border-radius: $radius-md;
  font-family: $font-family-heading;
}
```

### 3️⃣ Usar Mixins (Funções Reutilizáveis)

```scss
/* TIPOGRAFIA */
.titulo {
  @include heading(1); // H1 com font, weight, line-height
}

.label {
  @include label("medium"); // Label médio
}

.descricao {
  @include body-text("large"); // Texto de corpo
}

/* LAYOUT */
.flexCenter {
  @include flex-center; // Centraliza flex
}

.flexBetween {
  @include flex-between; // Espaço entre itens
}

.gridResponsivo {
  @include grid-center; // Grid centralizado
}

/* ESPAÇAMENTO */
.box {
  @include padding("lg"); // 24px de padding
  @include margin("md"); // 16px de margin
  @include gap("sm"); // 8px de gap
}

/* RESPONSIVIDADE */
.container {
  font-size: 14px;

  @include respond-to("md") {
    font-size: 16px;
  }

  @include respond-to("lg") {
    font-size: 18px;
  }

  @include mobile-only {
    padding: $spacing-sm;
  }

  @include desktop-only {
    padding: $spacing-lg;
  }
}

/* TEMAS */
.card {
  background-color: $color-light-bg-secondary;

  body[data-theme="dark"] & {
    background-color: $color-dark-bg-secondary;
  }
}

/* EFEITOS */
.botao {
  @include smooth-transition(background-color, $transition-base);

  @include hover-effect {
    opacity: 0.8;
  }

  &:focus-visible {
    @include focus-ring;
  }
}

/* UTILITÁRIOS */
.titulo-truncado {
  @include truncate; // Uma linha com ellipsis
}

.descricao-limitada {
  @include line-clamp(3); // 3 linhas máximo
}

.scrollbar-invisivel {
  @include invisible-scrollbar;
}

.centrado {
  @include center-absolute; // Centraliza em absolute
}
```

### 4️⃣ Usar Functions

```scss
.element {
  /* Converter unidades */
  font-size: px-to-rem(16px); // 1rem
  padding: px-to-em(24px); // 1.5em

  /* Obter cores do mapa */
  color: color("text-primary", "light"); // #1a1a1a
  background: color("bg-secondary", "dark"); // #2d2d2d

  /* Obter espaçamento */
  margin: spacing("xl"); // 32px

  /* Sombras */
  box-shadow: shadow("md"); // Sombra média

  /* Z-index organizado */
  z-index: z("modal"); // 500

  /* Opacidade com alpha */
  color: alpha($color-info, 0.5);

  /* Escurecer/Iluminar cor */
  border-color: darken-color($color-info, 15%);
  background: lighten-color($color-info, 20%);
}
```

## 📊 Mapa de Valores

### Espaçamento

- `$spacing-xs` = 4px
- `$spacing-sm` = 8px
- `$spacing-md` = 16px
- `$spacing-lg` = 24px
- `$spacing-xl` = 32px
- `$spacing-2xl` = 48px
- `$spacing-3xl` = 64px

### Tipografia - Títulos

- `$typography-h1` → 32px, weight 700
- `$typography-h2` → 28px, weight 700
- `$typography-h3` → 24px, weight 600
- `$typography-h4` → 20px, weight 600

### Tipografia - Labels

- `label-large` → 16px, weight 600
- `label-medium` → 14px, weight 600
- `label-small` → 12px, weight 500

### Tipografia - Body

- `body-large` → 16px, weight 400
- `body-medium` → 14px, weight 400
- `body-small` → 12px, weight 400

### Border Radius

- `$radius-sm` = 4px
- `$radius-md` = 8px
- `$radius-lg` = 12px
- `$radius-xl` = 16px
- `$radius-full` = 9999px

### Cores Semânticas

- `$color-success` = #10b981 (verde)
- `$color-error` = #ef4444 (vermelho)
- `$color-warning` = #f59e0b (amarelo)
- `$color-info` = #3b82f6 (azul)

### Breakpoints

- `$breakpoint-sm` = 640px
- `$breakpoint-md` = 768px
- `$breakpoint-lg` = 1024px
- `$breakpoint-xl` = 1280px
- `$breakpoint-2xl` = 1536px

### Z-index Organizado

- `z('hide')` = -1
- `z('base')` = 0
- `z('dropdown')` = 100
- `z('sticky')` = 200
- `z('fixed')` = 300
- `z('modal-backdrop')` = 400
- `z('modal')` = 500
- `z('popover')` = 600
- `z('tooltip')` = 700

## 🎯 Vantagens do Sass Configurado

✅ **Sem repetição** - Use variáveis em vez de valores hardcodeados  
✅ **Responsive automático** - Mixins prontos para @include  
✅ **Temas integrados** - Light/Dark com suporte  
✅ **Tipografia profissional** - Escalas pré-definidas  
✅ **Manutenção fácil** - Mude tudo em um lugar  
✅ **Código limpo** - Menos CSS na saída  
✅ **Performance** - Sass compila para CSS otimizado

## 💡 Exemplos Práticos

### Componente Completo

```scss
.card {
  @include flex-column;
  @include padding("lg");
  background-color: $color-light-bg-primary;
  border: 1px solid $color-light-border;
  border-radius: $radius-lg;
  box-shadow: shadow("md");
  @include smooth-transition(all, $transition-base);

  &:hover {
    box-shadow: shadow("lg");
  }

  @include respond-to("md") {
    @include padding("xl");
  }

  body[data-theme="dark"] & {
    background-color: $color-dark-bg-primary;
    border-color: $color-dark-border;
  }
}

.cardTitle {
  @include heading(2);
  margin-bottom: spacing("md");
  color: $color-light-text-primary;

  body[data-theme="dark"] & {
    color: $color-dark-text-primary;
  }
}

.cardContent {
  @include body-text("medium");
  color: $color-light-text-secondary;

  body[data-theme="dark"] & {
    color: $color-dark-text-secondary;
  }
}
```

## 🔄 Next Steps

1. **Importe em todos os CSS modules:**

   ```scss
   @import "../../styles/variables";
   @import "../../styles/mixins";
   @import "../../styles/functions";
   ```

2. **Use as variáveis e mixins** em vez de valores hardcodeados

3. **Mantenha os estilos consistentes** usando o design system

4. **Adicione novos valores** em `_variables.scss` conforme necessário

---

**Dúvidas?** Consulte o arquivo `page.module.scss` para exemplos práticos!
