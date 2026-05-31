import { pool } from '../config/db.js';
import { Competencia } from '../types/Competencia.js';

export default class CompetenciaRepository {
  /**
   * Busca todas as competências com suporte a filtro de nome/descrição
   */
  async findAll(search?: string): Promise<Competencia[]> {
    let query = 'SELECT * FROM competencia';
    const values: unknown[] = [];

    if (search) {
      query += ' WHERE nome ILIKE $1 OR descricao ILIKE $1';
      values.push(`%${search}%`);
    }

    query += ' ORDER BY nome ASC';

    const { rows } = await pool.query(query, values);
    return rows;
  }

  async findById(id: number): Promise<Competencia | null> {
    const { rows } = await pool.query(
      'SELECT * FROM competencia WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async create(
    data: Omit<Competencia, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Competencia> {
    const { nome, descricao, peso } = data;

    const { rows } = await pool.query(
      `INSERT INTO competencia (nome, descricao, peso)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nome, descricao ?? null, peso ?? 1]
    );

    return rows[0];
  }

  async update(
    id: number,
    data: Partial<Competencia>
  ): Promise<Competencia | null> {
    const atual = await this.findById(id);
    if (!atual) return null;

    const nome = data.nome ?? atual.nome;
    const descricao = data.descricao ?? atual.descricao;
    const peso = data.peso ?? atual.peso;

    const { rows } = await pool.query(
      `UPDATE competencia
       SET nome = $1,
           descricao = $2,
           peso = $3,
           updated_at = now()
       WHERE id = $4
       RETURNING *`,
      [nome, descricao, peso, id]
    );

    return rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM competencia WHERE id = $1',
      [id]
    );
    return result.rowCount === 1;
  }
}
