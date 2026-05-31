import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { UsuarioService } from '../services/UsuarioService';

// Instanciamos o service uma única vez para ser usado em todos os métodos
const usuarioService = new UsuarioService();

export class UsuarioController {
  
  /**
   * Obtém os dados do usuário logado (usado pelo AuthContext no Frontend)
   */
  me = async (req: AuthRequest, res: Response) => {
    try {
      // O middleware já validou o token e injetou o user no req
      const uid = req.user?.firebase_uid;

      if (!uid) {
        return res.status(401).json({ erro: 'UID_NAO_ENCONTRADO_NO_TOKEN' });
      }

      const usuario = await usuarioService.obterPorFirebaseUid(uid);

      if (!usuario) {
        return res.status(404).json({ erro: 'USUARIO_NAO_ENCONTRADO_NO_BANCO' });
      }

      /**
       * Mapeamento para o objeto esperado pelo Frontend.
       * Garantimos que o perfil venha formatado corretamente.
       */
      return res.json({
        id: usuario.id,
        firebase_uid: usuario.firebase_uid,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil_nome || usuario.perfil // Fallback caso o join varie
      });
      
    } catch (error) {
      console.error('Erro no endpoint /me:', error);
      return res.status(500).json({ erro: 'ERRO_INTERNO_AO_BUSCAR_PERFIL' });
    }
  }

  /**
   * Cria um novo usuário (Apenas Admin)
   */
  criar = async (req: Request, res: Response) => {
    try {
      const { nome, email, senha, perfil, cargoId, gestorId } = req.body;
      
      // O Service cuidará de salvar no Supabase via Prisma e gerar o Firebase UID se necessário
      const novoUsuario = await usuarioService.cadastrar({
        nome, 
        email, 
        senha, 
        perfil, 
        cargoId: cargoId ? Number(cargoId) : undefined, 
        gestorId: gestorId ? Number(gestorId) : undefined
      });

      return res.status(201).json(novoUsuario);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(400).json({ erro: 'ERRO_AO_CADASTRAR_USUARIO' });
    }
  }
}

// Exportação padrão de uma instância do Controller
export default new UsuarioController();