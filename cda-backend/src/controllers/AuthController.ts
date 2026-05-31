import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';

interface JwtPayload {
  id: number;
  nome: string;
  perfil: 'ADMIN' | 'GESTOR' | 'COLABORADOR';
}

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'DADOS_INVALIDOS' });
    }

    try {
      const { rows } = await pool.query(
        `
        SELECT 
          u.id,
          u.nome,
          u.senha,
          p.nome AS perfil
        FROM usuario u
        JOIN perfil p ON p.id = u.perfil_id
        WHERE u.email = $1
        `,
        [email]
      );

      const usuario = rows[0];

      if (!usuario) {
        return res.status(401).json({ message: 'USUARIO_OU_SENHA_INVALIDOS' });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json({ message: 'USUARIO_OU_SENHA_INVALIDOS' });
      }

      const payload: JwtPayload = {
        id: usuario.id,
        nome: usuario.nome,
        perfil: usuario.perfil,
      };

      // CORREÇÃO DO ERRO DE TIPAGEM:
      // 1. Forçamos o JWT_SECRET como jwt.Secret (pois process.env pode ser undefined)
      // 2. Forçamos o expiresIn para o tipo específico esperado pelas opções
      const token = jwt.sign(
        payload, 
        (process.env.JWT_SECRET as jwt.Secret), 
        {
          expiresIn: (process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']) || '1d',
        }
      );

      return res.json({
        token,
        usuario: payload,
      });

    } catch (error: any) {
      console.error('Erro no processo de login:', error);
      return res.status(500).json({ erro: error.message || 'Erro interno no servidor' });
    }
  }
}