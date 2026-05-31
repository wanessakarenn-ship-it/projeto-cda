# CDA Backend

API do Ciclo de Desempenho Automatizado.

## Como rodar

```bash
cd cda-backend
npm install
cp .env.example .env
npm run dev
```

A API sobe em `http://localhost:4000`.

Teste rápido:

```bash
curl http://localhost:4000/api/health
```

## Variáveis de ambiente

Veja `.env.example`.

## Scripts

```bash
npm run dev       # desenvolvimento com tsx watch
npm run build     # valida TypeScript sem emitir arquivos
npm run start     # roda a API com tsx
npm run test-db   # testa conexão com banco
```
