import { pool } from '../config/db.js';
import { Gestor } from '../types/Gestor.js';

const tableName = 'colaborador';

class GestorRepository {
  async create(
    dados: Omit<Gestor, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Gestor> {
    const {
      usuarioId,
      nome,
      cargoId,
      gestorId,
      matricula,
      ativo,
    } = dados;

    const { rows } = await pool.query(
      `
      INSERT INTO ${tableName}
        (usuario_id, nome, cargo_id, gestor_id, matricula, ativo)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        usuarioId,
        nome,
        cargoId,
        gestorId,
        matricula,
        ativo,
      ]
    );

    return rows[0];
  }

  /**
   * Gestores são colaboradores SEM gestor_id
   */
  async findAll(): Promise<Gestor[]> {
    const { rows } = await pool.query(
      `SELECT * FROM ${tableName} WHERE gestor_id IS NULL`
    );
    return rows;
  }

  async findById(id: number): Promise<Gestor | null> {
    const { rows } = await pool.query(
      `SELECT * FROM ${tableName} WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async update(
    id: number,
    patch: Partial<Omit<Gestor, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<Gestor | null> {
    const fieldMap: Record<string, string> = {
      usuarioId: 'usuario_id',
      nome: 'nome',
      cargoId: 'cargo_id',
      gestorId: 'gestor_id',
      matricula: 'matricula',
      ativo: 'ativo',
    };

    const fields: string[] = [];
    const values: unknown[] = [];
    let index = 1;

    for (const [key, value] of Object.entries(patch)) {
      if (value !== undefined && fieldMap[key]) {
        fields.push(`${fieldMap[key]} = $${index}`);
        values.push(value);
        index++;
      }
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    const { rows } = await pool.query(
      `
      UPDATE ${tableName}
      SET ${fields.join(', ')},
          updated_at = now()
      WHERE id = $${index}
      RETURNING *
      `,
      values
    );

    return rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM ${tableName} WHERE id = $1`,
      [id]
    );
    return result.rowCount === 1;
  }
}

export default new GestorRepository();
