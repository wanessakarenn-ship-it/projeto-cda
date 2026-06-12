# Projeto CDA

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
- O login depende de usuário cadastrado na tabela `usuario` com a senha hash correspondente.
- A semeadura do banco (`npm run prisma:seed`) foi atualizada para criptografar as senhas automaticamente com `bcryptjs`.

## Usuários de Teste

Para facilitar o teste de todos os fluxos e papéis do sistema (Administrador, Gestor e Colaborador), utilize as seguintes credenciais pré-configuradas no banco através do seed:

### 1. Administrador (ADMIN)
- **E-mail**: `admin@cda.com`
- **Senha**: `cda123`
- **Acesso**: Acesso irrestrito a configurações de ciclos de desempenho, metas globais, cadastro de competências, controle de usuários e configuração do Nine Box.

### 2. Gestor (GESTOR)
- **E-mail**: `gestor@cda.com`
- **Senha**: `cda123`
- **Acesso**: Permissões de acompanhamento de equipe, visualização e cálculo da matriz Nine Box, relatórios analíticos e avaliação de colaboradores subordinados.

### 3. Colaborador (COLABORADOR)
- **E-mail**: `colaborador@cda.com`
- **Senha**: `cda123`
- **Acesso**: Autoavaliação de desempenho, consulta e acompanhamento de metas individuais e visualização de feedbacks.

