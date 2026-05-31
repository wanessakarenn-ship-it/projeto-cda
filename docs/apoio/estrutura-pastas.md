# Estrutura de Pastas do Projeto

## Sistema de Ciclo de Desempenho - Backend Node.js + TypeScript

ciclo-desempenho-backend/
│
├── src/
│   ├── config/                       # Configurações gerais
│   │   ├── database.ts               # Configuração PostgreSQL
│   │   ├── redis.ts                  # Configuração Redis
│   │   ├── env.ts                    # Variáveis de ambiente
│   │   └── swagger.ts                # Configuração Swagger
│   │
│   ├── models/                       # Modelos / Entidades do domínio
│   │   ├── Usuario.ts
│   │   ├── Colaborador.ts
│   │   ├── CicloDesempenho.ts
│   │   ├── Competencia.ts
│   │   ├── Meta.ts
│   │   ├── Avaliacao.ts
│   │   └── ResultadoCiclo.ts
│   │
│   ├── repositories/                 # Acesso a dados (SQL)
│   │   ├── UsuarioRepository.ts
│   │   ├── ColaboradorRepository.ts
│   │   ├── CicloDesempenhoRepository.ts
│   │   ├── CompetenciaRepository.ts
│   │   ├── MetaRepository.ts
│   │   ├── AvaliacaoRepository.ts
│   │   └── ResultadoCicloRepository.ts
│   │
│   ├── services/                     # Regras de negócio
│   │   ├── UsuarioService.ts
│   │   ├── ColaboradorService.ts
│   │   ├── CicloDesempenhoService.ts
│   │   ├── AvaliacaoService.ts
│   │   ├── CalculoMeritoService.ts   # Cálculo de mérito
│   │   ├── NineBoxService.ts         # Lógica Nine Box
│   │   └── RelatorioService.ts       # Relatórios e consolidações
│   │
│   ├── controllers/                  # Camada HTTP (Express)
│   │   ├── UsuarioController.ts
│   │   ├── ColaboradorController.ts
│   │   ├── CicloDesempenhoController.ts
│   │   ├── AvaliacaoController.ts
│   │   ├── GestorController.ts       # Endpoints do Gestor
│   │   ├── RHController.ts           # Endpoints do RH
│   │   └── ImportacaoController.ts   # Importação CSV
│   │
│   ├── routes/                       # Definição das rotas da API
│   │   ├── index.ts                  # Agregador de rotas
│   │   ├── usuario.routes.ts
│   │   ├── colaborador.routes.ts
│   │   ├── cicloDesempenho.routes.ts
│   │   ├── avaliacao.routes.ts
│   │   ├── gestor.routes.ts
│   │   └── rh.routes.ts
│   │
│   ├── middlewares/                  # Middlewares globais
│   │   ├── auth.middleware.ts        # Autenticação (JWT)
│   │   ├── errorHandler.middleware.ts# Tratamento de erros
│   │   ├── validation.middleware.ts  # Validações
│   │   └── upload.middleware.ts      # Upload de arquivos
│   │
│   ├── jobs/                         # Processamento assíncrono
│   │   ├── queue.ts                  # Configuração da fila (Bull/Redis)
│   │   ├── CalculoMeritoJob.ts
│   │   └── RelatorioJob.ts
│   │
│   ├── utils/                        # Funções utilitárias
│   │   ├── dateHelper.ts
│   │   ├── csvParser.ts
│   │   ├── logger.ts
│   │   └── validators.ts
│   │
│   ├── types/                        # Tipos globais / Extensões
│   │   ├── index.d.ts
│   │   └── express.d.ts
│   │
│   ├── database/                     # Banco de dados
│   │   ├── migrations/               # Migrations
│   │   └── seeds/                    # Dados iniciais
│   │
│   ├── app.ts                        # Configuração do Express
│   └── server.ts                     # Bootstrap da aplicação
│
├── public/                           # Arquivos estáticos
│   └── index.html
│
├── tests/                            # Testes automatizados
│   ├── unit/
│   └── integration/
│
├── docs/                             # Documentação
│   ├── api/                          # Docs da API
│   ├── fluxos/                       # Diagramas e fluxos
│   ├── INSTALACAO.md
│   ├── CONFIGURACAO.md
│   └── README.md
│
├── scripts/                          # Scripts auxiliares
│   ├── create-database.sql
│   ├── massa-de-testes.sql
│   └── queries-gestor.sql
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── nodemon.json
└── README.md

Descrição das Principais Pastas
/src/config

Configurações globais do sistema: banco de dados, Redis, Swagger e variáveis de ambiente.

/src/models

Define os modelos de domínio, alinhados às tabelas do banco de dados.

/src/repositories

Responsável por consultas SQL e persistência de dados.

/src/services

Implementa toda a lógica de negócio, validações e regras do domínio.

/src/controllers

Camada que recebe as requisições HTTP e delega o processamento aos services.

/src/routes

Define os endpoints da API e mapeia para os controllers.

/src/middlewares

Funções intermediárias (auth, validação, tratamento de erros).

/src/jobs

Processamentos assíncronos (cálculo de mérito, geração de relatórios).

/src/utils

Funções auxiliares reutilizáveis.

🔄 Fluxo de uma Requisição
Cliente → Route → Middleware → Controller → Service → Repository → Database


Resposta:

Database → Repository → Service → Controller → Cliente

🧱 Convenções de Nomenclatura

Arquivos e Classes: PascalCase

Pastas: camelCase ou kebab-case

Funções/Métodos: camelCase

Constantes: UPPER_SNAKE_CASE

Interfaces: PascalCase (IUsuario opcional)

⚙️ Arquivos de Configuração
package.json
{
  "name": "ciclo-desempenho-backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}

tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}

.env.example
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=ciclo_desempenho
DATABASE_USER=postgres
DATABASE_PASSWORD=

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=seu_secret_aqui
JWT_EXPIRATION=24h