/*
 Script de teste de conexão CDA 2026
 Valida variáveis de ambiente e tempo de resposta do PostgreSQL.
*/

import dotenv from 'dotenv';
dotenv.config();

// ✅ Import correto (NodeNext / ESM)
import { pool } from '../config/db';

const {
  DB_HOST,
  DB_USER,
  DB_DATABASE,
  DB_PORT,
  DB_PASSWORD,
  SHOW_DB_PASSWORD,
} = process.env;

function printConnectionVars(): void {
  console.log('\n--------------------------------------------');
  console.log('🛠️  DEBUG DE CONFIGURAÇÃO DO BANCO');
  console.log('--------------------------------------------');
  console.log(`📍 Host:     ${DB_HOST ?? 'Não definido'}`);
  console.log(`👤 Usuário:  ${DB_USER ?? 'Não definido'}`);
  console.log(`📦 Banco:    ${DB_DATABASE ?? 'Não definido'}`);
  console.log(`🔌 Porta:    ${DB_PORT ?? 'Não definido'}`);

  if (SHOW_DB_PASSWORD === '1') {
    console.log(`🔑 Senha:    ${DB_PASSWORD ?? 'Não definida'}`);
  } else {
    console.log('🔑 Senha:    ******** (Defina SHOW_DB_PASSWORD=1 para exibir)');
  }

  console.log('--------------------------------------------\n');
}

async function main(): Promise<void> {
  const start = Date.now();

  try {
    printConnectionVars();

    console.log('⏳ Tentando conectar ao PostgreSQL...');

    const res = await pool.query<{
      agora: string;
      db_atual: string;
    }>(
      'SELECT NOW() AS agora, current_database() AS db_atual'
    );

    const duration = Date.now() - start;

    console.log('\n✅ CONEXÃO ESTABELECIDA COM SUCESSO!');
    console.log(`📅 Horário no Banco: ${res.rows[0].agora}`);
    console.log(`📂 Database Ativa:   ${res.rows[0].db_atual}`);
    console.log(`⚡ Latência:         ${duration} ms`);
  } catch (error) {
    const err = error as NodeJS.ErrnoException & { code?: string };

    console.error('\n❌ ERRO DE CONEXÃO COM O BANCO');
    console.error(`🔴 Mensagem: ${err.message}`);
    console.error(`🔴 Código:   ${err.code ?? 'Desconhecido'}`);

    if (err.code === 'ECONNREFUSED') {
      console.error('💡 Dica: O serviço PostgreSQL não está acessível.');
    } else if (err.code === '28P01') {
      console.error('💡 Dica: Usuário ou senha inválidos no .env.');
    } else if (err.code === 'ENOTFOUND') {
      console.error('💡 Dica: Host do banco incorreto.');
    }

    process.exitCode = 1;
  } finally {
    await pool.end();
    console.log('\n🔌 Pool de conexões encerrado.');
  }
}

// 🚀 EXECUÇÃO
main().catch(err => {
  console.error('❌ Falha fatal ao executar o teste:', err);
  process.exit(1);
});
