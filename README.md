# 🎮 BardQuest

> Um jogo de progressão musical onde você evolui na vida real tocando seu instrumento.

---

## 🧠 Sobre o projeto

**BardQuest** é uma aplicação web gamificada para aprendizado de instrumentos como **piano** e **violão**.

A proposta não é ensinar teoria de forma tradicional, mas transformar a prática musical em uma experiência de **progressão, conquista e consistência**, como um jogo.

Você não "estuda".  
Você **evolui**.

---

## 🎯 Objetivo

Criar um sistema que:

- incentive prática diária
- transforme aprendizado em progresso visível
- evite frustração e sobrecarga
- se adapte ao nível do jogador
- faça você querer voltar todos os dias

---

## 🧩 Como o jogo funciona (visão final)

O loop principal do jogador é:

1. Entrar no jogo
2. Receber sua missão do dia
3. Praticar seu instrumento
4. Completar músicas
5. Ganhar XP
6. Evoluir de nível
7. Avançar por reinos
8. Enfrentar desafios (bosses)
9. Receber novos conteúdos gerados dinamicamente

---

## 🏰 Sistema de progressão

### 🎵 Músicas

- Cada música representa um desafio real
- Possuem níveis de dificuldade (easy, medium, hard)
- Ao completar músicas, você progride no jogo

---

### 🏰 Reinos (infinito)

O mundo do jogo é dividido em **reinos**.

Cada reino possui:

- 4 músicas normais
- 1 música "boss" (desafio maior)

Ao completar:

- 4 músicas → desbloqueia o boss
- boss → avanço para o próximo reino

👉 Os reinos são **gerados dinamicamente**, criando progressão infinita.

---

### 🎚️ Dificuldade adaptativa

O jogo aprende com você.

Após cada reino, você avalia a dificuldade:

- fácil
- média
- difícil
- impossível

Com base nisso, o sistema ajusta o nível dos próximos desafios.

---

### 📈 XP e Níveis

- XP é ganho por:
  - prática diária
  - completar músicas
  - concluir missões

- O nível representa sua evolução geral no jogo

⚠️ Importante:

> O progresso real depende das músicas, não apenas do XP.

---

### 🎯 Missões diárias

Todos os dias você recebe uma missão:

- gerada dinamicamente
- com objetivo claro
- com recompensa em XP

Exemplo:

> "Pratique por 10 minutos e avance em uma música em progresso"

---

### 🔓 Modo livre

Você pode estudar qualquer música fora do seu progresso atual:

- ganha XP reduzido
- não afeta progressão de reinos

---

### 🤖 IA no jogo

A inteligência artificial é usada para:

- gerar missões personalizadas
- criar novos reinos
- construir lore do mundo
- gerar imagens (avatar, reinos, bosses)

Tudo de forma leve, sem comprometer performance ou custo.

---

## 🚀 MVP (versão inicial)

A primeira versão do BardQuest foca no essencial:

- autenticação de usuários
- prática diária com streak
- sistema básico de XP
- lista de músicas
- progresso de músicas
- 1 missão diária gerada por IA
- dashboard simples

👉 O objetivo do MVP é validar o loop principal:

> voltar todo dia para praticar.

---

## 🌌 Visão final

BardQuest não é só um app.

É um sistema onde:

- sua evolução no jogo reflete sua evolução real
- o conteúdo nunca acaba
- a dificuldade se adapta a você
- cada sessão tem propósito

Você não está apenas praticando.

Você está avançando em uma jornada.

---

## 🛠️ Tecnologias utilizadas

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![SCSS Modules](https://img.shields.io/badge/SCSS%20Modules-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge)

</div>

---

## 🧠 Filosofia

- progresso > perfeição
- consistência > intensidade
- prática real > teoria passiva

---

## 🔥 Status

🚧 Em desenvolvimento (MVP)

---

## 👤 Uso

Inicialmente desenvolvido para uso pessoal, com foco em consistência diária e evolução real no instrumento.

---

## Contatos do desenvolvedor

- GitHub - [Felipe Santiago Morais](https://github.com/SantiagoMorais)
- Linkedin - [Felipe Santiago](https://www.linkedin.com/in/felipe-santiago-873025288/)
- Email - <a href="mailto:contatofelipesantiago@gmail.com" target="blank">contatofelipesantiago@gmail.com</a>
