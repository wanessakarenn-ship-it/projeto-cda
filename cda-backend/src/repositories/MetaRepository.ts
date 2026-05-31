import { pool } from '../config/db';
import { Meta } from '../types/Meta';

export default class MetaRepository {
  async findAll(): Promise<Meta[]> {
    const { rows } = await pool.query(
      'SELECT * FROM meta ORDER BY id'
    );
    return rows;
  }

  async findById(id: number): Promise<Meta | null> {
    const { rows } = await pool.query(
      'SELECT * FROM meta WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async create(
    data: Omit<Meta, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Meta> {
    const { titulo, descricao, peso, prazo } = data;

    const { rows } = await pool.query(
      `INSERT INTO meta (titulo, descricao, peso, prazo)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [titulo, descricao ?? null, peso ?? 1, prazo ?? null]
    );

    return rows[0];
  }

  async update(
    id: number,
    patch: Partial<Meta>
  ): Promise<Meta | null> {
    const atual = await this.findById(id);
    if (!atual) return null;

    const titulo = patch.titulo ?? atual.titulo;
    const descricao = patch.descricao ?? atual.descricao;
    const peso = patch.peso ?? atual.peso;
    const prazo = patch.prazo ?? atual.prazo;

    const { rows } = await pool.query(
      `UPDATE meta
       SET titulo = $1,
           descricao = $2,
           peso = $3,
           prazo = $4,
           updated_at = now()
       WHERE id = $5
       RETURNING *`,
      [titulo, descricao, peso, prazo, id]
    );

    return rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM meta WHERE id = $1',
      [id]
    );
    return result.rowCount === 1;
  }
}
