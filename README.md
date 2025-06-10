## 📝 Descrição do Projeto

O **contai-backend** está em desenvolvimento para otimizar a gestão contábil da empresa ContAI, referência no mercado contábil.

O sistema visa automatizar e facilitar o registro, organização e visualização dos lançamentos financeiros, proporcionando maior controle e eficiência no acompanhamento das finanças empresariais.

A plataforma permite:
- Cadastro diário e estruturado dos lançamentos contábeis
- Visualização dos dados em tabelas mensais
- Armazenamento seguro em banco de dados
- Acompanhamento do fluxo de caixa
- Análises estratégicas rápidas para o setor contábil, gestores e responsáveis financeiros

## 🚀 Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## ⚙️ Como rodar localmente

1. **Clone o repositório**
    ```bash
    git clone git@github.com:vinigs22/contai-backend.git
    cd contai-backend
    ```

2. **Crie o arquivo `.env`**
    - Copie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário.

3. **Inicie o container do Postgres**
    ```bash
    docker compose up -d
    ```

4. **Instale as dependências**
    ```bash
    npm ci
    ```

5. **Inicie o servidor**
    ```bash
    npm start
    ```

Pronto! O backend estará rodando localmente e pronto para receber requisições.