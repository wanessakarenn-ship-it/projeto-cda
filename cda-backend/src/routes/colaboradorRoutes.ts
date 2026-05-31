import { Router } from 'express';
import { ColaboradorController } from '../controllers/ColaboradorController';

const router = Router();

// Listar todos os colaboradores
router.get('/', ColaboradorController.listarTodos);

// Buscar colaborador por ID
router.get('/:id', ColaboradorController.obterPorId);

// Criar colaborador
router.post('/', ColaboradorController.criar);

// Atualizar colaborador
router.put('/:id', ColaboradorController.atualizar);

// Remover colaborador
router.delete('/:id', ColaboradorController.remover);

export default router;
