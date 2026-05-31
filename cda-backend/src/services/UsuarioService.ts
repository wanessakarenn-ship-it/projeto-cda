// src/services/UsuarioService.ts
import { pool } from '../config/db';
import { Usuario } from '../types/Usuario';

type UsuarioCreateDTO = Omit<
  Usuario,
  'id' | 'created_at' | 'updated_at'
>;

// Alterado para exportar uma classe para bater com o "new UsuarioService()" 
// OU exportar nominalmente para o seu Controller atual.
export class UsuarioService {
  async listarTodos(): Promise<Usuario[]> {
    const { rows } = await pool.query(`
      SELECT 
        id,
        email,
        nome,
        perfil_id AS "perfilId",
        firebase_uid,
        created_at,
        updated_at
      FROM usuario
      ORDER BY created_at DESC
    `);
    return rows;
  }

  async obterPorId(id: number): Promise<Usuario> {
    const { rows } = await pool.query(
      `
      SELECT 
        id,
        email,
        nome,
        perfil_id AS "perfilId",
        firebase_uid,
        created_at,
        updated_at
      FROM usuario
      WHERE id = $1
      `,
      [id]
    );

    if (!rows[0]) {
      throw new Error('USUARIO_NAO_ENCONTRADO');
    }

    return rows[0];
  }

  async obterPorFirebaseUid(uid: string): Promise<any | null> {
    const { rows } = await pool.query(
      `
      SELECT 
        u.id,
        u.email,
        u.nome,
        u.perfil_id AS "perfilId",
        u.firebase_uid,
        u.created_at,
        u.updated_at,
        p.nome AS perfil_nome
      FROM usuario u
      LEFT JOIN perfil p ON p.id = u.perfil_id
      WHERE u.firebase_uid = $1
      `,
      [uid]
    );

    return rows[0] ?? null;
  }

  async criar(dados: any): Promise<Usuario> {
    const { rows } = await pool.query(
      `
      INSERT INTO usuario (
        email,
        nome,
        perfil_id,
        firebase_uid
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        email,
        nome,
        perfil_id AS "perfilId",
        firebase_uid,
        created_at,
        updated_at
      `,
      [
        dados.email,
        dados.nome,
        dados.perfilId || dados.perfil, // Aceita perfilId ou perfil vindo do body
        dados.firebase_uid || `manual-${Date.now()}`,
      ]
    );

    return rows[0];
  }

  // Alias para o método 'criar' para bater com a chamada do seu UsuarioController
  async cadastrar(dados: any) {
    return this.criar(dados);
  }

  async atualizar(
    id: number,
    dados: Partial<Usuario>
  ): Promise<Usuario> {
    const { nome, perfilId } = dados;

    const { rows } = await pool.query(
      `
      UPDATE usuario
      SET 
        nome = COALESCE($1, nome),
        perfil_id = COALESCE($2, perfil_id)
      WHERE id = $3
      RETURNING
        id,
        email,
        nome,
        perfil_id AS "perfilId",
        firebase_uid,
        created_at,
        updated_at
      `,
      [nome, perfilId, id]
    );

    if (!rows[0]) {
      throw new Error('USUARIO_NAO_ENCONTRADO');
    }

    return rows[0];
  }

  async remover(id: number): Promise<void> {
    const result = await pool.query(
      'DELETE FROM usuario WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      throw new Error('USUARIO_NAO_ENCONTRADO');
    }
  }
}

// Exportação padrão de uma instância (opcional, dependendo de como você importa)
export default new UsuarioService();