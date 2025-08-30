# AutoU - Case Prático: Classificador de Emails com IA 🚀

## Visão Geral

Este projeto é uma solução para o Case Prático de Desenvolvimento da AutoU. Trata-se de uma aplicação web full-stack que utiliza Inteligência Artificial para classificar o conteúdo de emails em **Produtivo** ou **Improdutivo** e sugerir respostas automáticas, otimizando o fluxo de trabalho e a produtividade de equipes que lidam com um alto volume de mensagens.

---

### ✨ Links Rápidos

- **Aplicação Online (Deploy):** `[LINK PARA A SUA APLICAÇÃO NA VERCEL]`
- **Vídeo Demonstrativo:** `[LINK PARA O SEU VÍDEO NO YOUTUBE]`

---

### 🎥 Demonstração Rápida

`[COLE AQUI O LINK DE UM GIF DA SUA APLICAÇÃO FUNCIONANDO. É UM GRANDE DIFERENCIAL!]`

_(**Dica:** Use uma ferramenta como ScreenToGif ou GIPHY Capture para gravar um GIF de 10-15 segundos mostrando a interface, colando um texto e o resultado aparecendo.)_

![Screenshot da Aplicação](https://i.imgur.com/link-para-uma-imagem-sua.png)
_(**Dica:** Tire um print da sua tela e suba em um site como o [Imgur](https://imgur.com/) para gerar um link)_

---

## ✅ Funcionalidades Principais

- **Classificação Inteligente:** Identifica se um email requer uma ação (`Produtivo`) ou não (`Improdutivo`).
- **Respostas Automáticas:** Gera sugestões de respostas contextuais e bem formatadas.
- **Múltiplos Formatos de Entrada:** Permite a análise de texto colado diretamente ou através do upload de arquivos `.txt` e `.pdf`.
- **Interface Reativa e Intuitiva:** Experiência de usuário fluida, com feedback visual claro durante o processamento e na exibição dos resultados.
- **Visualização do Conteúdo:** Permite ao usuário rever o conteúdo do email que foi analisado.

---

## ⚙️ Tecnologias Utilizadas

Este projeto foi construído utilizando uma stack moderna, focada em performance e escalabilidade.

| Categoria      | Tecnologia                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend**   | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| **Backend**    | ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)                                                                                                                                                                                                                                                                          |
| **IA & Cloud** | ![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B9?style=for-the-badge&logo=google-gemini&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)                                                                                                                                 |

---

## 🔧 Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar a aplicação no seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [Python](https://www.python.org/downloads/) (versão 3.9 ou superior)
- Uma chave de API do [Google Gemini](https://aistudio.google.com/)

### Passos para a Instalação

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/](https://github.com/)[SEU-USUARIO]/[NOME-DO-REPOSITORIO].git
    cd [NOME-DO-REPOSITORIO]
    ```

2.  **Configure o Backend:**

    ```bash
    # Navegue até a pasta do backend
    cd backend

    # Crie e ative um ambiente virtual
    python -m venv venv
    source venv/bin/activate  # No Windows: venv\Scripts\activate

    # Instale as dependências
    pip install -r requirements.txt

    # Crie o arquivo .env para a sua chave de API
    # 1. Crie um arquivo chamado .env na pasta 'backend/'
    # 2. Adicione a seguinte linha a ele:
    GOOGLE_API_KEY="SUA_CHAVE_SECRETA_DO_GEMINI_AQUI"
    ```

3.  **Configure o Frontend:**

    ```bash
    # A partir da pasta raiz, navegue até a pasta do frontend
    cd frontend

    # Instale as dependências
    npm install
    ```

4.  **Execute a Aplicação:**
    Você precisará de **dois terminais** abertos.

    - **Terminal 1 (na pasta `backend/` com `venv` ativado):**

      ```bash
      uvicorn app.main:app --reload
      ```

      _O backend estará rodando em `http://127.0.0.1:8000`_

    - **Terminal 2 (na pasta `frontend/`):**
      ```bash
      npm run dev
      ```
      _O frontend estará acessível em `http://localhost:3000`_

---

## 💡 Decisões Técnicas Relevantes

- **Uso de LLM vs. NLP Clássico:** O requisito mencionava o uso de técnicas de NLP tradicionais (stop words, stemming). Optei por uma abordagem mais moderna e eficaz utilizando um Large Language Model (Gemini). A decisão foi deliberada, pois LLMs entendem o contexto completo do texto, e o pré-processamento manual na verdade prejudicaria a precisão da análise.

- **Engenharia de Prompt:** O "treinamento" e "ajuste" da IA foram realizados via engenharia de prompt, utilizando a técnica de "few-shot learning". Forneci ao modelo exemplos claros de emails produtivos e improdutivos, o que o treinou em tempo real para executar a tarefa com alta precisão e consistência, cumprindo o requisito de "ajuste da IA".

- **Arquitetura Desacoplada:** A escolha de separar Frontend (Next.js) e Backend (FastAPI) cria uma solução mais escalável e manutenível, seguindo as melhores práticas de desenvolvimento de software.

---

## 🗺️ Visão do Produto e Próximos Passos

Esta aplicação serve como uma robusta Prova de Conceito (PoC). Para evoluir para uma solução completa capaz de lidar com o alto volume de emails mencionado no desafio, os próximos passos seriam:

- **Integração Direta com Provedores de Email:** Conectar a aplicação via API (Google, Microsoft) para ingerir emails automaticamente, eliminando a necessidade de upload manual.
- **Processamento Assíncrono:** Implementar uma fila de tarefas (com Celery e Redis) para analisar emails em segundo plano, garantindo que a interface do usuário permaneça rápida e responsiva, mesmo com milhares de emails chegando.
- **Dashboard de Triagem:** Transformar a interface em um dashboard completo, permitindo a visualização de todos os emails analisados, com filtros e, o mais importante, **ações em massa** (ex: "Arquivar todos os improdutivos").

---

## 👤 Autor

- **Nome:** `[SEU NOME COMPLETO]`
- **LinkedIn:** `[LINK PARA SEU PERFIL NO LINKEDIN]`
- **GitHub:** `[LINK PARA SEU PERFIL NO GITHUB]`
