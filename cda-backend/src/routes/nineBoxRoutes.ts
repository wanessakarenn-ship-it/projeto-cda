import { Router } from 'express';
import NineBoxController from '../controllers/NineBoxController';

/**
 * Rotas para a Matriz Nine Box
 * Responsável por alimentar os gráficos de Potencial vs Desempenho
 */
const router = Router();

// Lista todos os registros (Suporta filtros por ciclo_id e setor via Query Params)
router.get('/', NineBoxController.findAll);

// Busca o posicionamento específico de um colaborador por ID
router.get('/:id', NineBoxController.findById);

// Registra um novo posicionamento na matriz
router.post('/', NineBoxController.create);

// Atualiza quadrante, score ou elegibilidade
router.put('/:id', NineBoxController.update);

// Remove um registro da matriz
router.delete('/:id', NineBoxController.delete);

export default router; // ✅ Exportação obrigatória para o app.use()