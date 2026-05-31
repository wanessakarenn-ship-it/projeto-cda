import { pool } from '../config/db';
import { PlanoCarreira } from '../types/PlanoCarreira';

export default class PlanoCarreiraRepository {
  async findAll(): Promise<PlanoCarreira[]> {
    const { rows } = await pool.query(
      'SELECT * FROM plano_carreira ORDER BY id'
    );
    return rows;
  }

  async findById(id: number): Promise<PlanoCarreira | null> {
    const { rows } = await pool.query(
      'SELECT * FROM plano_carreira WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async create(
    data: Omit<PlanoCarreira, 'id' | 'created_at' | 'updated_at'>
  ): Promise<PlanoCarreira> {
    const { nome, descricao, versao, publicado } = data;

    const { rows } = await pool.query(
      `INSERT INTO plano_carreira (nome, descricao, versao, publicado)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nome, descricao ?? null, versao ?? null, publicado ?? false]
    );

    return rows[0];
  }

  async update(
    id: number,
    patch: Partial<PlanoCarreira>
  ): Promise<PlanoCarreira | null> {
    const atual = await this.findById(id);
    if (!atual) return null;

    const nome = patch.nome ?? atual.nome;
    const descricao = patch.descricao ?? atual.descricao;
    const versao = patch.versao ?? atual.versao;
    const publicado = patch.publicado ?? atual.publicado;

    const { rows } = await pool.query(
      `UPDATE plano_carreira
       SET nome = $1,
           descricao = $2,
           versao = $3,
           publicado = $4,
           updated_at = now()
       WHERE id = $5
       RETURNING *`,
      [nome, descricao, versao, publicado, id]
    );

    return rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM plano_carreira WHERE id = $1',
      [id]
    );
    return result.rowCount === 1;
  }
}
