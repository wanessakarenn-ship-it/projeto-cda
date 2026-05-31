import { pool } from '../config/db';
import { Usuario } from '../types/Usuario';

export const usuarioRepository = {
  async buscarPorFirebaseUid(firebaseUid: string): Promise<Usuario | null> {
    const { rows } = await pool.query(
      `
      SELECT u.*, p.nome AS perfil_nome
      FROM usuario u
      LEFT JOIN perfil p ON p.id = u.perfil_id
      WHERE u.firebase_uid = $1
      `,
      [firebaseUid]
    );

    return rows[0] || null;
  },

  async listarTodos(): Promise<Usuario[]> {
    const { rows } = await pool.query('SELECT * FROM usuario');
    return rows;
  },

  async buscarPorId(id: number): Promise<Usuario | null> {
    const { rows } = await pool.query(
      'SELECT * FROM usuario WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  },

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const { rows } = await pool.query(
      'SELECT * FROM usuario WHERE email = $1',
      [email]
    );
    return rows[0] || null;
  },

  async criar(dados: Partial<Usuario>): Promise<Usuario> {
    const { rows } = await pool.query(
      `
      INSERT INTO usuario (email, nome, perfil_id, firebase_uid)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [dados.email, dados.nome, dados.perfil_id, dados.firebase_uid]
    );

    return rows[0];
  },

  async atualizar(
    id: number,
    dados: Partial<Usuario>
  ): Promise<Usuario | null> {
    const { rows } = await pool.query(
      `
      UPDATE usuario
      SET nome = COALESCE($2, nome),
          perfil_id = COALESCE($3, perfil_id)
      WHERE id = $1
      RETURNING *
      `,
      [id, dados.nome, dados.perfil_id]
    );

    return rows[0] || null;
  },

  async remover(id: number): Promise<boolean> {
    const res = await pool.query(
      'DELETE FROM usuario WHERE id = $1',
      [id]
    );
    return res.rowCount === 1;
  },
};
