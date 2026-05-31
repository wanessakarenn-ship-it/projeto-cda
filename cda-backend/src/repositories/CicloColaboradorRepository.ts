import { pool } from '../config/db.js';
import { CicloColaborador } from '../types/CicloColaborador.js';

class CicloColaboradorRepository {
  async listar(): Promise<CicloColaborador[]> {
    const { rows } = await pool.query(
      'SELECT * FROM ciclo_colaborador ORDER BY created_at DESC'
    );
    return rows;
  }

  async buscarPorId(id: number): Promise<CicloColaborador | null> {
    const { rows } = await pool.query(
      'SELECT * FROM ciclo_colaborador WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async buscarPorCicloId(cicloId: number): Promise<CicloColaborador[]> {
    const { rows } = await pool.query(
      'SELECT * FROM ciclo_colaborador WHERE ciclo_id = $1',
      [cicloId]
    );
    return rows;
  }

  async buscarPorColaboradorId(
    colaboradorId: number
  ): Promise<CicloColaborador[]> {
    const { rows } = await pool.query(
      'SELECT * FROM ciclo_colaborador WHERE colaborador_id = $1',
      [colaboradorId]
    );
    return rows;
  }

  async criar(
    dados: Omit<CicloColaborador, 'id' | 'created_at' | 'updated_at'>
  ): Promise<CicloColaborador> {
    const {
      cicloId,
      colaboradorId,
      statusExperiencia,
      recomendacaoExperiencia,
    } = dados;

    const { rows } = await pool.query(
      `
      INSERT INTO ciclo_colaborador (
        ciclo_id,
        colaborador_id,
        status_experiencia,
        recomendacao_experiencia
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [
        cicloId,
        colaboradorId,
        statusExperiencia ?? null,
        recomendacaoExperiencia ?? null,
      ]
    );

    return rows[0];
  }

  async atualizar(
    id: number,
    patch: Partial<
      Omit<CicloColaborador, 'id' | 'created_at' | 'updated_at'>
    >
  ): Promise<CicloColaborador | null> {
    const fieldMap: Record<string, string> = {
      cicloId: 'ciclo_id',
      colaboradorId: 'colaborador_id',
      statusExperiencia: 'status_experiencia',
      recomendacaoExperiencia: 'recomendacao_experiencia',
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
      return this.buscarPorId(id);
    }

    values.push(id);

    const { rows } = await pool.query(
      `
      UPDATE ciclo_colaborador
      SET ${fields.join(', ')},
          updated_at = now()
      WHERE id = $${index}
      RETURNING *`,
      values
    );

    return rows[0] || null;
  }

  async remover(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM ciclo_colaborador WHERE id = $1',
      [id]
    );
    return result.rowCount === 1;
  }
}

export default new CicloColaboradorRepository();
