import { pool } from '../config/db';
import { CicloDesempenho } from '../types/CicloDesempenho';

export class CicloDesempenhoRepository {
  async findAll(): Promise<CicloDesempenho[]> {
    const { rows } = await pool.query(
      `SELECT id, nome, data_inicio AS "dataInicio",
              data_fim AS "dataFim", status, criado_em AS "criadoEm"
       FROM ciclo_desempenho
       ORDER BY data_inicio DESC`
    );
    return rows;
  }

  async findById(id: number): Promise<CicloDesempenho | null> {
    const { rows } = await pool.query(
      `SELECT id, nome, data_inicio AS "dataInicio",
              data_fim AS "dataFim", status
       FROM ciclo_desempenho
       WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async create(data: Omit<CicloDesempenho, 'id'>): Promise<CicloDesempenho> {
    const { rows } = await pool.query(
      `INSERT INTO ciclo_desempenho (nome, data_inicio, data_fim, status)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nome,
         data_inicio AS "dataInicio",
         data_fim AS "dataFim",
         status`,
      [data.nome, data.dataInicio, data.dataFim, data.status]
    );
    return rows[0];
  }

  async update(id: number, data: Partial<CicloDesempenho>): Promise<void> {
    await pool.query(
      `UPDATE ciclo_desempenho
       SET nome = $1,
           data_inicio = $2,
           data_fim = $3,
           status = $4
       WHERE id = $5`,
      [data.nome, data.dataInicio, data.dataFim, data.status, id]
    );
  }

  async delete(id: number): Promise<void> {
    await pool.query(
      `DELETE FROM ciclo_desempenho WHERE id = $1`,
      [id]
    );
  }
}
