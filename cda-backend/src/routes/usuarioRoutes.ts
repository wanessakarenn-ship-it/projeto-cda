import { Router } from 'express';
import usuarioController from '../controllers/UsuarioController'; // Importando a instância (Singleton)
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const router = Router();

/**
 * ROTA DE PERFIL (AuthContext)
 * Retorna os dados do usuário logado através do token Firebase/JWT
 */
router.get('/me', authMiddleware, usuarioController.me);

/**
 * ROTA ADMINISTRATIVA
 * Permite que apenas administradores criem novos colaboradores no sistema
 */
router.post(
  '/', 
  authMiddleware, 
  roleMiddleware(['ADMIN']), 
  usuarioController.criar
);

/**
 * Você também pode adicionar rotas adicionais de gestão aqui futuramente:
 * router.get('/', authMiddleware, roleMiddleware(['ADMIN']), usuarioController.listarTodos);
 * router.delete('/:id', authMiddleware, roleMiddleware(['ADMIN']), usuarioController.remover);
 */

export default router;