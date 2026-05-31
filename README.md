# CDA — Projeto Corrigido e Organizado

Este pacote contém o sistema CDA separado em duas aplicações:

```text
cda-backend/   API Node.js + Express + TypeScript + PostgreSQL
cda-frontend/  Interface React + Rsbuild + Tailwind
/docs          Documentação de apoio do projeto
```

## O que foi corrigido

- Corrigida a entrada principal do backend: `src/server.ts` agora usa `src/app.ts`, carregando todas as rotas registradas.
- Corrigido o erro clássico de `app.use(...)` causado por router/exports inconsistentes.
- Removida dependência direta de Firebase no frontend, que quebrava a compilação por falta de arquivos `../lib/firebase`.
- Implementado fluxo de autenticação do frontend via API `/auth/login`, salvando `token` e `user` no `localStorage`.
- Corrigido o arquivo quebrado `src/config/navigation.ts`.
- Alinhados nomes de propriedades do usuário no frontend: `perfil` no lugar de `papel`.
- Corrigidos ícones faltantes do menu lateral.
- Ajustada dependência `bcrypt` para `bcryptjs`, evitando erro de instalação por binário nativo no Windows/Node mais recente.
- Adicionadas dependências que estavam faltando no backend: `pg` e `@types/pg`.
- Criados arquivos `.env.example` para backend e frontend.
- Removido `.env` real do pacote para evitar exposição de credenciais.

## Como rodar no VS Code

### 1. Abrir o projeto

Abra a pasta `cda` no VS Code.

### 2. Rodar o backend

No terminal:

```bash
cd cda-backend
npm install
copy .env.example .env
npm run dev
```

No Windows PowerShell, se `copy` não funcionar:

```powershell
Copy-Item .env.example .env
```

Depois edite o `.env` e coloque sua `DATABASE_URL` real.

Teste:

```bash
http://localhost:4000/api/health
```

Deve retornar:

```json
{"status":"ok","service":"CDA Backend 2026"}
```

### 3. Rodar o frontend

Abra outro terminal:

```bash
cd cda-frontend
npm install
copy .env.example .env
npm run dev
```

No `.env` do frontend, deixe:

```env
PUBLIC_API_URL=http://localhost:4000/api
```

## Comandos de validação

Backend:

```bash
cd cda-backend
npm run build
```

Frontend:

```bash
cd cda-frontend
npm run check
npm run build
```

## Observações importantes

- O backend depende de PostgreSQL/Supabase configurado em `DATABASE_URL`.
- A rota `/api/health` funciona mesmo sem testar dados do banco.
- O login depende de usuário cadastrado na tabela `usuario` e senha compatível com o formato salvo no banco.
- Se suas senhas no banco estiverem sem hash, ajuste temporariamente o login ou gere hashes com `bcryptjs`.
