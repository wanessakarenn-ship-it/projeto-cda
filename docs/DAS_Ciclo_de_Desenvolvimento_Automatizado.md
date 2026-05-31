# 📐 Definição de Arquitetura – Ciclo de Desempenho

**Documento:** Definição de Arquitetura – Ciclo de Desempenho  
**Data:** 09/11/2025  

---

## 1. Stack Tecnológico Escolhido

- **Backend:** Node.js com TypeScript  
- **Framework:** Express.js  
- **Banco de Dados:** PostgreSQL  
- **Fila de Mensagens:** Redis + Bull  
- **Documentação de API:** Swagger (OpenAPI)  
- **Controle de Versão:** Git  
- **Gestão de Projeto:** Trello  

---

## 2. Decisões de Desenvolvimento

### 2.1 Padrão de Branches

Será adotado o seguinte padrão de nomenclatura de branches:


**Exemplo:**

---

### 2.2 Revisão de Pull Requests (PR)

- O processo de revisão seguirá o modelo de **programação em pares (pair review)**.
- Alessandra será revisora dos PRs desenvolvidos por André.
- André será revisor dos PRs desenvolvidos por Alessandra.
- Nenhum PR deve ser mergeado sem ao menos uma revisão aprovada.

---

## 3. Estrutura de Pastas (Backend)

ciclo-desempenho-backend/
├── src/
│ ├── config/ # Configurações gerais (DB, Redis, Swagger, Env)
│ ├── repositories/ # Acesso a dados (queries SQL, CRUD por entidade)
│ ├── services/ # Regras de negócio, validações e orquestração
│ ├── controllers/ # Controladores HTTP (Express)
│ ├── routes/ # Definição das rotas da API
│ ├── app.ts # Configuração da aplicação Express
│ └── server.ts # Inicialização do servidor
│
├── public/ # Interface Web do colaborador (frontend simples ou build)
├── scripts/ # Scripts SQL e automações
├── docs/ # Documentação técnica e de negócio
└── README.md # Visão geral do projeto


---

## 4. Princípios Arquiteturais Adotados

- Separação clara de responsabilidades (Controller → Service → Repository)
- Código orientado a domínio (entidades centrais do negócio)
- Baixo acoplamento entre camadas
- Facilitar testes unitários e evolução futura
- Arquitetura preparada para escalar (filas, processamento assíncrono)

---

