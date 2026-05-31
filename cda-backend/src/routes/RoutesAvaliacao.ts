import { Router } from 'express';
import AvaliacaoController from '../controllers/AvaliacaoController'; // Importando a instância exportada (Singleton)
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const router = Router();

/**
 * Todas as rotas de avaliação exigem autenticação prévia
 */
router.use(authMiddleware);

// ==========================================
// 1. ADMIN: Gerenciamento CRUD
// ==========================================
// Busca todas as avaliações com filtros de busca/status
router.get('/', roleMiddleware(['ADMIN', 'GESTOR']), AvaliacaoController.findAll);

// Busca uma avaliação específica por ID
router.get('/:id', AvaliacaoController.findById);

// Criação manual (se necessário fora do fluxo de ciclo)
router.post('/', roleMiddleware(['ADMIN']), AvaliacaoController.create);

// Atualização e Exclusão
router.put('/:id', roleMiddleware(['ADMIN']), AvaliacaoController.update);
router.delete('/:id', roleMiddleware(['ADMIN']), AvaliacaoController.delete);

// ==========================================
// 2. GESTOR: Avaliar Colaborador (Fluxo CDA 2026)
// ==========================================
// Rota para o gestor atribuir notas ao liderado
router.post(
  '/gestor/:id', 
  roleMiddleware(['GESTOR', 'ADMIN']), 
  AvaliacaoController.avaliarColaborador
);

// ==========================================
// 3. COLABORADOR: Avaliar Liderança (Feedback Ascendente)
// ==========================================
// Rota para o colaborador avaliar seu gestor
router.post(
  '/lideranca', 
  roleMiddleware(['COLABORADOR', 'GESTOR']), 
  AvaliacaoController.avaliarLideranca
);

export default router;