import { pool } from '../config/db';
import bcrypt from 'bcryptjs';

async function main() {
  try {
    console.log('🔍 Buscando usuários no banco...');
    const { rows } = await pool.query('SELECT u.id, u.email, u.senha, p.nome as perfil_nome FROM usuario u JOIN perfil p ON p.id = u.perfil_id');
    
    console.log('Resultados no Banco:');
    console.log(rows);

    if (rows.length === 0) {
      console.log('❌ Nenhum usuário cadastrado no banco!');
    } else {
      for (const row of rows) {
        const match = await bcrypt.compare('cda123', row.senha);
        console.log(`Email: ${row.email} | Perfil: ${row.perfil_nome} | Hash: ${row.senha} | Senha 'cda123' coincide? ${match}`);
      }
    }
  } catch (error) {
    console.error('Erro de diagnóstico:', error);
  } finally {
    await pool.end();
  }
}

main();
