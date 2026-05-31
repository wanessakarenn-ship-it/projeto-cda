import { pool } from '../config/db.js';
import { NineBox } from '../types/NineBox.js';
import type { NineBoxFilters } from '../types/NineBoxFilters.js';

class NineBoxRepository {
  async create(
    dados: Omit<NineBox, 'id' | 'created_at' | 'updated_at'>
  ): Promise<NineBox> {
    const {
      cicloColaboradorId,
      posicaoXPotencial,
      posicaoYDesempenho,
      scoreCompetencias,
      scoreMetas,
      scoreFinalMerito,
      elegivelCarreira,
    } = dados;

    const { rows } = await pool.query(
      `
      INSERT INTO nine_box (
        ciclo_colaborador_id,
        posicao_x_potencial,
        posicao_y_desempenho,
        score_competencias,
        score_metas,
        score_final_merito,
        elegivel_carreira
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        cicloColaboradorId,
        posicaoXPotencial,
        posicaoYDesempenho,
        scoreCompetencias,
        scoreMetas,
        scoreFinalMerito,
        elegivelCarreira,
      ]
    );

    return rows[0];
  }

  /**
   * Suporte a filtros para dashboards e gráficos
   */
  async findAll(filters: NineBoxFilters = {}): Promise<NineBox[]> {
    let query = `
      SELECT nb.*
      FROM nine_box nb
      JOIN ciclo_colaborador cc ON nb.ciclo_colaborador_id = cc.id
      WHERE 1=1
    `;

    const values: unknown[] = [];
    let index = 1;

    if (filters.cicloId) {
      query += ` AND cc.ciclo_id = $${index}`;
      values.push(filters.cicloId);
      index++;
    }

    query += ' ORDER BY nb.score_final_merito DESC, nb.id ASC';

    const { rows } = await pool.query(query, values);
    return rows;
  }

  async findById(id: number): Promise<NineBox | null> {
    const { rows } = await pool.query(
      'SELECT * FROM nine_box WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async update(
    id: number,
    patch: Partial<Omit<NineBox, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<NineBox | null> {
    const fieldMap: Record<string, string> = {
      cicloColaboradorId: 'ciclo_colaborador_id',
      posicaoXPotencial: 'posicao_x_potencial',
      posicaoYDesempenho: 'posicao_y_desempenho',
      scoreCompetencias: 'score_competencias',
      scoreMetas: 'score_metas',
      scoreFinalMerito: 'score_final_merito',
      elegivelCarreira: 'elegivel_carreira',
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
      UPDATE nine_box
      SET ${fields.join(', ')},
          updated_at = now()
      WHERE id = $${index}
      RETURNING *
      `,
      values
    );

    return rows[0] || null;
  }

  /**
   * Retorna true se removeu, false se não encontrou
   */
  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM nine_box WHERE id = $1',
      [id]
    );
    return result.rowCount === 1;
  }
}

export default new NineBoxRepository();
