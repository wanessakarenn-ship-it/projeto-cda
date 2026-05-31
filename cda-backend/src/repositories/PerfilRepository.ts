import { pool } from '../config/db';
import { Perfil } from '../types/Perfil';

export class PerfilRepository {
  async listar(): Promise<Perfil[]> {
    const { rows } = await pool.query(
      'SELECT * FROM perfil ORDER BY id'
    );
    return rows;
  }

  async buscarPorId(id: number): Promise<Perfil | null> {
    const { rows } = await pool.query(
      'SELECT * FROM perfil WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async criar(
    dados: Omit<Perfil, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Perfil> {
    const { nome, descricao } = dados;

    const { rows } = await pool.query(
      `INSERT INTO perfil (nome, descricao)
       VALUES ($1, $2)
       RETURNING *`,
      [nome, descricao ?? null]
    );

    return rows[0];
  }

  async atualizar(
    id: number,
    patch: Partial<Perfil>
  ): Promise<Perfil | null> {
    const atual = await this.buscarPorId(id);
    if (!atual) return null;

    const nome = patch.nome ?? atual.nome;
    const descricao = patch.descricao ?? atual.descricao;

    const { rows } = await pool.query(
      `UPDATE perfil
       SET nome = $1,
           descricao = $2,
           updated_at = now()
       WHERE id = $3
       RETURNING *`,
      [nome, descricao, id]
    );

    return rows[0] || null;
  }

  async remover(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM perfil WHERE id = $1',
      [id]
    );
    return result.rowCount === 1;
  }
}

export default new PerfilRepository();
