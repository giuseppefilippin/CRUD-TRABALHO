# CRUD-TRABALHO

Este projeto é uma aplicação Full Stack composta por:

- **Backend:** Node.js com MySQL
- **Frontend:** React

Abaixo você encontrará as instruções para rodar o projeto localmente.

---

## ✅ Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

---

## 🔧 Como rodar o projeto localmente

### 1. Clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/giuseppefilippin/CRUD-TRABALHO.git
cd CRUD-TRABALHO
```

---

### 2. Rodar o Backend

Entre na pasta do backend e instale as dependências:

```bash
cd backend
npm install
npm start
```

#### ⚙️ Configuração do Banco de Dados

Antes de iniciar o servidor, configure o acesso ao seu banco MySQL.  
Abra o arquivo `backend/Routes/db.js` e altere com suas credenciais:

```js
const db = mysql.createConnection({
  host: "localhost",
  user: "SEU_USUARIO",
  password: "SUA_SENHA",
  database: "NOME_DO_BANCO"
});
```

> O backend estará disponível em: `http://localhost:8800`

---

### 3. Rodar o Frontend

Abra um novo terminal na raiz do projeto e execute:

```bash
cd frontend
npm install
npm start
```

> O frontend será iniciado automaticamente em: `http://localhost:3000`

---

## ✅ Projeto em execução

Com o backend e frontend rodando, você pode acessar a aplicação no navegador:

```
http://localhost:3000
```

E ela se comunicará com a API Node.js em:

```
http://localhost:8800
```

---

Pronto! Agora o sistema CRUD está funcionando localmente.