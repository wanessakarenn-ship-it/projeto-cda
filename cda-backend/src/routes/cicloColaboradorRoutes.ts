import { Router } from 'express';
import cicloColaboradorController from '../controllers/CicloColaboradorController';

const router = Router();
const controller = cicloColaboradorController;

// ⚠️ Rotas ESPECÍFICAS primeiro (evita conflito com :id)
router.get('/ciclo/:cicloId', controller.obterPorCicloId.bind(controller));
router.get('/colaborador/:colaboradorId', controller.obterPorColaboradorId.bind(controller));

// Rotas gerais
router.get('/', controller.obterTodos.bind(controller));
router.get('/:id', controller.obterPorId.bind(controller));

router.post('/', controller.criar.bind(controller));
router.put('/:id', controller.atualizar.bind(controller));
router.delete('/:id', controller.remover.bind(controller));

export default router;
