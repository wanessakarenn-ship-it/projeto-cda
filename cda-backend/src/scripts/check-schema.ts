/*
 Script para verificar se as tabelas definidas no CDA 2026 foram criadas.
 Roda consultas `SELECT to_regclass` e valida colunas críticas.
*/

import dotenv from 'dotenv';
dotenv.config();

// ✅ IMPORT CORRETO (NodeNext / ESM)
// ⚠️ db.ts deve exportar `pool`
import { pool } from '../config/db.js';

const tables: string[] = [
  'perfil',
  'cargo',
  'usuario',
  'colaborador',
  'ciclo_desempenho',
  'ciclo_colaborador',
  'competencia',
  'meta',
  'avaliacao',
  'pontuacao',
  'nine_box',
  'plano_carreira',
  'colaborador_trilha',
];

async function main(): Promise<void> {
  console.log('--------------------------------------------');
  console.log('🔍 INICIANDO DIAGNÓSTICO DO BANCO CDA 2026');
  console.log('--------------------------------------------');

  const missing: string[] = [];

  try {
    for (const table of tables) {
      const res = await pool.query<{ found: string | null }>(
        'SELECT to_regclass($1) AS found',
        [`public.${table}`]
      );

      const found = res.rows[0]?.found;

      if (!found) {
        console.log(`❌ MISSING: ${table}`);
        missing.push(table);
        continue;
      }

      console.log(`✅ OK: ${table}`);

      /**
       * Validação crítica: usuario.senha
       */
      if (table === 'usuario') {
        const colRes = await pool.query(
          `
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = 'usuario'
            AND column_name = 'senha'
          `
        );

        if (colRes.rowCount && colRes.rowCount > 0) {
          console.log('   ↳ 🔐 Coluna "senha" validada.');
        } else {
          console.log(
            '   ↳ ❌ ERRO: Coluna "senha" NÃO encontrada!'
          );
          missing.push('usuario.senha');
        }
      }
    }

    console.log('--------------------------------------------');

    if (missing.length > 0) {
      console.log('📊 RESULTADO: ❌ FALHA NA ESTRUTURA DO BANCO');
      console.log('Itens ausentes ou inválidos:');
      missing.forEach(item => console.log(` - ${item}`));
      process.exitCode = 2;
    } else {
      console.log('📊 RESULTADO: ✅ BANCO VALIDADO COM SUCESSO');
      console.log('Pronto para backend e frontend.');
      process.exitCode = 0;
    }

    console.log('--------------------------------------------');
  } catch (error) {
    console.error('❌ ERRO INESPERADO DURANTE O DIAGNÓSTICO');
    console.error(error);
    process.exitCode = 1;
  } finally {
    await pool.end();
    console.log('🔌 Pool de conexões encerrado.');
  }
}

// 🚀 EXECUÇÃO
main().catch(err => {
  console.error('❌ Falha fatal ao executar o script:', err);
  process.exit(1);
});
