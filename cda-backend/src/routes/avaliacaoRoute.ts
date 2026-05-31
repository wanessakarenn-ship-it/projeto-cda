import { Router } from 'express';
import AvaliacaoController from '../controllers/AvaliacaoController';

/**
 * Rotas de Avaliação
 * Responsável por gerenciar avaliações de colaboradores
 */
const router = Router();

// Listar avaliações (com filtros opcionais)
router.get('/', AvaliacaoController.findAll);

// Buscar avaliação por ID
router.get('/:id', AvaliacaoController.findById);

// Criar nova avaliação
router.post('/', AvaliacaoController.create);

// Atualizar avaliação
router.put('/:id', AvaliacaoController.update);

// Remover avaliação - Corrigido: alterado de .remove para .delete
router.delete('/:id', AvaliacaoController.delete);

export default router;