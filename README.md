# 📊 Sistema de Controle Financeiro Pessoal

Este projeto é uma aplicação web voltada para o gerenciamento de finanças pessoais, permitindo que usuários registrem receitas e despesas, organizem transações em categorias e visualizem relatórios detalhados por meio de dashboards interativos.

## 🎯 Objetivos

- Oferecer uma plataforma simples e eficiente para controle financeiro individual
- Fornecer uma interface moderna e intuitiva para acompanhamento de despesas, receitas e alertas
- Utilizar tecnologias modernas para garantir desempenho, escalabilidade e flexibilidade

## ⚙️ Principais Funcionalidades

1. Cadastro e autenticação de usuários
2. Registro, edição e exclusão de transações (receitas e despesas)
3. Criação e gerenciamento de categorias financeiras
4. Geração de relatórios e dashboards com indicadores financeiros
5. Gerenciamento de limites financeiros
6. Emissão de alertas para situações específicas (ex.: saldo negativo ou limite atingido)

## 🛠 Tecnologias Utilizadas

- **Node.js** – Plataforma de desenvolvimento
- **React** – Biblioteca para construção de interfaces
- **TypeScript** – Linguagem tipada para maior robustez no desenvolvimento
- **Vite** – Build tool e desenvolvimento frontend
- **MySQL** – Banco de dados relacional
- **Docker** – Containerização da aplicação
- **Nginx** – Servidor web para produção

---

## 🚀 Como Executar o Projeto

### 📦 Execução com Docker [Desatualizado]

A forma mais simples de executar o projeto é utilizando Docker Compose, que automatiza a configuração de todos os serviços.

#### Pré-requisitos

- [Docker](https://www.docker.com/) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado

#### Passos para execução

1. **Clone o repositório**

   ```bash
   git clone https://github.com/Luizagso/projeto_integrador
   cd projeto_integrador
   ```

2. **Execute os containers**

   ```bash
   docker-compose up -d --build
   ```

   Este comando irá:

   - Baixar e configurar o MySQL 8.0
   - Executar os scripts de inicialização do banco de dados
   - Construir e executar o backend Node.js
   - Construir e executar o frontend React

3. **Acesse a aplicação**
   - **Frontend**: http://localhost (porta 80)
   - **Backend**: http://localhost:3000
   - **MySQL**: localhost:3307 (porta externa)

### 💻 Execução Local

Para desenvolvimento local ou se preferir não usar Docker:

#### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [MySQL 8.0](https://dev.mysql.com/downloads/) instalado e configurado

#### 1. Configuração do Banco de Dados

1. **Instale o MySQL 8.0** em sua máquina

2. **Execute o script de inicialização**
   ```bash
   # Conecte ao MySQL e execute o script
   mysql -u root -p < ./init-db/01-initdb.sql
   ```

#### 2. Configuração do Backend

1. **Navegue até a pasta do backend**

   ```bash
   cd backend
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Inclua um arquivo `.env` na pasta backend com as configurações a seguir:

   ```env
      # Configuração do Banco de Dados
      NAME_DATABASE=bd_projeto_integrador
      USERNAME_DATABASE=root
      PASSWORD_DATABASE=root
      HOST_DATABASE=localhost
      
      # Configuração do Ambiente
      NODE_ENV=development
      HOST_NODE=localhost
      SECRET_KEY=CHAVECRIPTOGRAFIA
      
      # Configuração de Portas
      PORT_NODE=3000
      PORT_FRONTEND=80
      PORT_DATABASE=3306
      
      # Configuração do MySQL para Docker
      MYSQL_ROOT_PASSWORD=root
      MYSQL_DATABASE=bd_projeto_integrador
   ```

   Ajuste as variáveis conforme necessário para seu ambiente local.

4. **Execute o backend**

   ```bash
   node index.js
   ```

   O backend estará disponível em: http://localhost:3000

#### 3. Configuração do Frontend

1. **Abra um novo terminal e navegue até a pasta do frontend**

   ```bash
   cd frontend
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute o frontend**

   ```bash
   npm run dev
   ```

   O frontend estará disponível em: http://localhost:5173

---

## 📁 Estrutura do Projeto

```
projeto_integrador/
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
├── init-db/
│   └── 01-initdb.sql
├── docker-compose.yml
├── .dockerignore
└── README.md
```
