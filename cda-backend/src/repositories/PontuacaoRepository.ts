import { pool } from '../config/db';
import { Pontuacao } from '../types/Pontuacao';

// Filtros em camelCase (TypeScript)
interface PontuacaoFilters {
  cicloId?: number;
  colaboradorId?: number;
  avaliacaoId?: number;
}

class PontuacaoRepository {
  async create(
    dados: Omit<Pontuacao, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Pontuacao> {
    const {
      avaliacaoId,
      competenciaId,
      metaId,
      nota,
      comentario,
      pesoAplicado,
    } = dados;

    const { rows } = await pool.query(
      `
      INSERT INTO pontuacao
        (avaliacao_id, competencia_id, meta_id, nota, comentario, peso_aplicado)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        avaliacaoId,
        competenciaId ?? null,
        metaId ?? null,
        nota,
        comentario ?? null,
        pesoAplicado ?? 1,
      ]
    );

    return rows[0];
  }

  /**
   * Busca pontuações com filtros dinâmicos
   */
  async findAll(filters: PontuacaoFilters = {}): Promise<Pontuacao[]> {
    let query = `
      SELECT p.*
      FROM pontuacao p
      JOIN avaliacao a ON p.avaliacao_id = a.id
      JOIN ciclo_colaborador cc ON a.ciclo_colaborador_id = cc.id
      WHERE 1=1
    `;

    const values: unknown[] = [];
    let index = 1;

    if (filters.cicloId) {
      query += ` AND cc.ciclo_id = $${index}`;
      values.push(filters.cicloId);
      index++;
    }

    if (filters.colaboradorId) {
      query += ` AND cc.colaborador_id = $${index}`;
      values.push(filters.colaboradorId);
      index++;
    }

    if (filters.avaliacaoId) {
      query += ` AND p.avaliacao_id = $${index}`;
      values.push(filters.avaliacaoId);
      index++;
    }

    query += ' ORDER BY p.id ASC';

    const { rows } = await pool.query(query, values);
    return rows;
  }

  async findById(id: number): Promise<Pontuacao | null> {
    const { rows } = await pool.query(
      'SELECT * FROM pontuacao WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async update(
    id: number,
    patch: Partial<Omit<Pontuacao, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<Pontuacao | null> {
    const fieldMap: Record<string, string> = {
      avaliacaoId: 'avaliacao_id',
      competenciaId: 'competencia_id',
      metaId: 'meta_id',
      nota: 'nota',
      comentario: 'comentario',
      pesoAplicado: 'peso_aplicado',
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
      UPDATE pontuacao
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
      'DELETE FROM pontuacao WHERE id = $1',
      [id]
    );
    return result.rowCount === 1;
  }
}

export default new PontuacaoRepository();
