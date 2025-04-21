# 💸 Simulador de Renda Familiar

Este é um projeto completo de simulação de renda familiar, desenvolvido com **React + Next.js** e diversas tecnologias modernas. Ele permite gerenciar entradas de renda, gastos, poupança e patrimônio ao longo do tempo, com funcionalidades visuais, interativas e persistentes.

---

## 🧠 Funcionalidades

- ✅ Cadastro de entradas de renda personalizadas
- ✅ Cadastro de gastos manuais e com base em percentual das entradas
- ✅ Cálculo do saldo final mensal
- ✅ Salvar dados históricos por ano e mês
- ✅ Exportação do histórico em PDF (visual idêntico ao da aplicação)
- ✅ Gerenciamento de patrimônio (casa, carro, dinheiro etc.)
- ✅ Edição e exclusão de registros
- ✅ Dados persistentes no navegador com Zustand
- ✅ Interface amigável e responsiva

---

## 🚀 Tecnologias utilizadas

| Tecnologia       | Descrição                             |
| ---------------- | ------------------------------------- |
| **Next.js**      | Framework React com SSR e Rotas       |
| **React**        | Biblioteca principal da UI            |
| **TypeScript**   | Tipagem estática e segura             |
| **Zustand**      | Gerenciador de estado simples e leve  |
| **html2canvas**  | Captura visual da interface para PDF  |
| **jsPDF**        | Geração de arquivos PDF               |
| **Tailwind CSS** | Utilitário de estilização rápida      |
| **Lucide Icons** | Ícones modernos (edição, lixeira etc) |

---

## 🖥️ Pré-visualização

![preview](https://user-images.githubusercontent.com/your-screenshot.png)

## 🖥️ Pré-visualização

Acesse a versão em produção aqui: [👉 Acessar Sistema](https://simulador-de-rendimento-para-testar.vercel.app)

---

## 📂 Organização do projeto

```
📁 src
├── components/              # Componentes reutilizáveis
├── pages/                  # Rotas e páginas principais
├── store/                  # Estados globais com Zustand
├── utils/                  # Funções auxiliares (ex: formatarReal)
├── types/                  # Tipagens TypeScript compartilhadas
├── styles/                 # Estilizações (se usar algo além do Tailwind)
```

---

## 🛠️ Como rodar localmente

### 1. Clone o projeto

```bash
git clone https://github.com/michael-petterson-06/Simulador-de-Rendimento-para-testar.git
cd seu-repositorio
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Rode o projeto

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📦 Funcionalidades destacadas

### 📋 Simulação de Renda

- Digite suas entradas (ex: salário, extra)
- Cadastre seus gastos (fixos ou percentuais)
- Calcule saldo final e exporte

### 📜 Histórico de Renda

- Visualização detalhada de cada simulação
- Exclusão individual de registros
- Exportação visual em PDF

### 🏠 Patrimônio

- Cadastro de bens (ex: Casa, Terreno, Carro)
- Edição e exclusão com confirmação
- Visualização do total acumulado

---

## 📄 PDF Export

A exportação utiliza `html2canvas` + `jsPDF`, garantindo que o visual do PDF seja fiel à interface.  
Incluso barra de progresso animada para feedback do usuário durante a geração.

---

## 📌 Melhorias futuras (To-Do)

- [ ] Adicionar autenticação (login por e-mail)
- [ ] Filtrar histórico por intervalo de datas
- [ ] Backup na nuvem (Firebase ou Supabase)
- [ ] Gráficos analíticos com Chart.js ou ApexCharts

---

## 🙋‍♂️ Autor

Desenvolvido por **Michael Petterson**  
📫 Contato: michaelpetterson06@gmail.com  
🌐 [Portfólio](https://michael-petterson-06.github.io/portfolio-mike)

---

## 📃 Licença

Este projeto está sob a licença MIT.  
Sinta-se livre para usar, estudar e modificar!

---
