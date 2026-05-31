import { Pool } from 'pg';
import dotenv from 'dotenv';

// Garante que o .env seja carregado antes de tudo
dotenv.config();

/**
 * Pool de conexão com o PostgreSQL (Supabase Transaction Pooler)
 * ⚠️ Importante: NÃO usa prepared statements
 */
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  // Obrigatório para Supabase
  ssl: {
    rejectUnauthorized: false,
  },

  // Ajustes seguros para pooler
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

/**
 * Teste rápido de conexão ao subir a API
 * (opcional, mas recomendado em dev)
 */
pool.on('connect', () => {
  console.log('🟢 Conectado ao PostgreSQL (Supabase)');
});

pool.on('error', (err) => {
  console.error('🔴 Erro inesperado no pool PostgreSQL:', err);
  process.exit(1);
});

export default pool;
