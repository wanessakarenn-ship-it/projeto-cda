Guia de Instalação e Configuração
Sistema de Ciclo de Desempenho (CDA 2026)
🔧 Pré-requisitos

Antes de iniciar, certifique-se de que os seguintes softwares estejam instalados:

1. Node.js (v18 ou superior)

Download: https://nodejs.org

Verificação:

node --version

2. PostgreSQL (v14 ou superior)

Download: https://www.postgresql.org/download/

Verificação:

psql --version

3. Redis (v6 ou superior)

Windows: https://redis.io/docs/getting-started/installation/install-redis-on-windows/

Linux / Mac: https://redis.io/docs/getting-started/

Verificação:

redis-cli --version

4. Git

Download: https://git-scm.com/downloads

Verificação:

git --version

5. Editor de Código (recomendado)

VS Code: https://code.visualstudio.com/

📦 Passo 1: Clonar o Repositório
git clone <url-do-repositorio>
cd ciclo-desempenho-backend

📥 Passo 2: Instalar Dependências
npm install


Alternativamente:

yarn install

Principais dependências utilizadas

express — Framework web

typescript — Superset JavaScript

pg — Cliente PostgreSQL

redis — Cliente Redis

bull — Fila de processamento

dotenv — Variáveis de ambiente

cors — Controle de CORS

express-validator — Validação

swagger-ui-express — Documentação da API

⚙️ Passo 3: Configurar Variáveis de Ambiente
3.1 Criar o arquivo .env
cp .env.example .env

3.2 Configurar o .env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=ciclo_desempenho
DATABASE_USER=postgres
DATABASE_PASSWORD=sua_senha_postgres

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=seu_secret_super_secreto
JWT_EXPIRATION=24h

# Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=text/csv,application/vnd.ms-excel

🗄️ Passo 4: Configurar PostgreSQL
4.1 Iniciar o PostgreSQL

Windows:

Geralmente inicia automaticamente após a instalação

Linux / Mac:

sudo service postgresql start
# ou
sudo systemctl start postgresql

4.2 Criar o Banco de Dados
psql -U postgres

CREATE DATABASE ciclo_desempenho;

\q

4.3 Executar os Scripts SQL
psql -U postgres -d ciclo_desempenho -f scripts/create-database.sql
psql -U postgres -d ciclo_desempenho -f scripts/massa-de-testes.sql

🔁 Alternativa (opcional): Script automatizado em TypeScript
import { Pool } from 'pg';
import fs from 'fs';

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
});

async function setupDatabase() {
  const ddl = fs.readFileSync('scripts/create-database.sql', 'utf8');
  const seed = fs.readFileSync('scripts/massa-de-testes.sql', 'utf8');

  await pool.query(ddl);
  await pool.query(seed);

  console.log('Banco de dados configurado com sucesso!');
  await pool.end();
}

setupDatabase();

🚀 Passo 5: Configurar o Redis
Iniciar o Redis

Windows (WSL/Docker):

redis-server


Linux:

sudo service redis-server start


Mac:

brew services start redis

Verificar funcionamento
redis-cli ping
# Deve retornar: PONG

🧱 Passo 6: Compilar o Projeto
npm run build

▶️ Passo 7: Iniciar o Servidor
Modo Desenvolvimento
npm run dev


Servidor disponível em:

http://localhost:3000

Modo Produção
npm run build
npm start

🧪 Passo 8: Verificações
8.1 Health Check
http://localhost:3000/api/health


Resposta esperada:

{
  "status": "OK",
  "database": "connected",
  "redis": "connected"
}

8.2 Swagger
http://localhost:3000/api-docs

8.3 Tela do Colaborador
http://localhost:3000/colaborador

🛠️ Ferramentas Recomendadas
APIs

Postman — https://www.postman.com/

Insomnia — https://insomnia.rest/

PostgreSQL

pgAdmin — https://www.pgadmin.org/

DBeaver — https://dbeaver.io/

Redis

RedisInsight — https://redis.com/redis-enterprise/redis-insight/

🧯 Solução de Problemas Comuns
PostgreSQL não conecta

Verifique se está rodando

Confirme .env

Banco criado corretamente

Redis não conecta
redis-cli ping

Porta 3000 em uso
# Linux / Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <pid> /F

📜 Scripts NPM
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts"
  }
}