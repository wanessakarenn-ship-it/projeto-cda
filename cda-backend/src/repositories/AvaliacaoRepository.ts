import { pool } from '../config/db.js';
import { Avaliacao } from '../types/Avaliacao.js';

// Interface para definir os filtros possíveis
interface AvaliacaoFilters {
  status?: string;
  search?: string;
}

class AvaliacaoRepository {
  async create(avaliacao: Avaliacao): Promise<Avaliacao> {
    const query = `
      INSERT INTO avaliacao
        (ciclo_colaborador_id, avaliador_id, tipo, status, pontuacao_merito, data_envio, comentario)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      avaliacao.ciclo_colaborador_id,
      avaliacao.avaliador_id,
      avaliacao.tipo,
      avaliacao.status,
      avaliacao.pontuacao_merito ?? null,
      avaliacao.data_envio ?? null,
      avaliacao.comentario ?? null,
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  /**
   * Busca avaliações com filtros opcionais
   */
  async findAll(filters: AvaliacaoFilters = {}): Promise<Avaliacao[]> {
    let query = 'SELECT * FROM avaliacao WHERE 1=1';
    const values: unknown[] = [];
    let index = 1;

    if (filters.status) {
      query += ` AND status = $${index}`;
      values.push(filters.status);
      index++;
    }

    if (filters.search) {
      query += ` AND (comentario ILIKE $${index} OR tipo ILIKE $${index})`;
      values.push(`%${filters.search}%`);
      index++;
    }

    query += ' ORDER BY data_envio DESC NULLS LAST';

    const { rows } = await pool.query(query, values);
    return rows;
  }

  async findById(id: number): Promise<Avaliacao | null> {
    const { rows } = await pool.query(
      'SELECT * FROM avaliacao WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async update(id: number, patch: Partial<Avaliacao>): Promise<Avaliacao> {
    const fields: string[] = [];
    const values: unknown[] = [];
    let index = 1;

    for (const [key, value] of Object.entries(patch)) {
      if (value !== undefined) {
        fields.push(`${key} = $${index}`);
        values.push(value);
        index++;
      }
    }

    if (fields.length === 0) {
      throw new Error('Nenhum campo fornecido para atualização');
    }

    values.push(id);

    const query = `
      UPDATE avaliacao
      SET ${fields.join(', ')},
          updated_at = now()
      WHERE id = $${index}
      RETURNING *;
    `;

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async delete(id: number): Promise<void> {
    await pool.query(
      'DELETE FROM avaliacao WHERE id = $1',
      [id]
    );
  }
}

export default new AvaliacaoRepository();
