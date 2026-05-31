import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // 💡 Usando a URL que funcionou no seu ambiente
    // Adicionamos ?pgbouncer=true para garantir estabilidade no pooler do Supabase
    url: "postgresql://postgres.errdtulgxmlmngrmqfif:%23@cda7412589630@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1",
  },
  // Configuração opcional para garantir que o CLI saiba onde está o schema
  schema: "./prisma/schema.prisma",
});