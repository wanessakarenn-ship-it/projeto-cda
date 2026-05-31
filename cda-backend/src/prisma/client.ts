import { PrismaClient } from '@prisma/client';

// Criamos uma única instância do PrismaClient
// Passamos a configuração de log para facilitar o seu debug no terminal
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['query', 'error', 'warn'],
});

// Nota: Não declare "const prisma" novamente abaixo. 
// Use apenas o export acima em todo o seu projeto.