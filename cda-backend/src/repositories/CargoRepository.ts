import { pool } from '../config/db.js';
import { Cargo } from '../types/Cargo.js';

export default class CargoRepository {
  async findAll(): Promise<Cargo[]> {
    const { rows } = await pool.query('SELECT * FROM cargo');
    return rows;
  }

  async findById(id: number): Promise<Cargo | null> {
    const { rows } = await pool.query(
      'SELECT * FROM cargo WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async create(data: Partial<Cargo>): Promise<Cargo> {
    const { titulo, descricao } = data;

    const { rows } = await pool.query(
      `INSERT INTO cargo (titulo, descricao)
       VALUES ($1, $2)
       RETURNING *`,
      [titulo, descricao ?? null]
    );

    return rows[0];
  }

  async update(id: number, data: Partial<Cargo>): Promise<Cargo | null> {
    const { titulo, descricao } = data;

    const { rows } = await pool.query(
      `UPDATE cargo
       SET titulo = $1,
           descricao = $2,
           updated_at = now()
       WHERE id = $3
       RETURNING *`,
      [titulo, descricao ?? null, id]
    );

    return rows[0] || null;
  }

  async delete(id: number): Promise<void> {
    await pool.query(
      'DELETE FROM cargo WHERE id = $1',
      [id]
    );
  }
}
