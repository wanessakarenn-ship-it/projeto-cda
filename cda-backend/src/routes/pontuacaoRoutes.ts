import { Router } from 'express';
import PontuacaoController from '../controllers/PontuacaoController';

/**
 * Rotas para Pontuações e Notas
 * Lida com o registro de notas por competência e meta para cada avaliação
 */
const router = Router();

// Lista as pontuações (Suporta filtros por avaliacao_id, ciclo_id ou colaborador_id)
router.get('/', PontuacaoController.findAll);

// Busca os detalhes de uma nota específica
router.get('/:id', PontuacaoController.findById);

// Registra uma nova nota (Geralmente disparado ao salvar um formulário de avaliação)
router.post('/', PontuacaoController.create);

// Atualiza uma nota ou comentário existente
router.put('/:id', PontuacaoController.update);

// Remove um registro de pontuação
router.delete('/:id', PontuacaoController.delete);

export default router; // 