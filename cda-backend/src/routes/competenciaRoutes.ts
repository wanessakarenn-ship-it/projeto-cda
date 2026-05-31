import { Router } from 'express';
import CompetenciaController from '../controllers/CompetenciaController';

/**
 * Arquivo de Definição de Rotas para Competências
 * Este arquivo é consumido pelo app.use() no server.ts
 */
const router = Router();

// Listar todas as competências (Suporta query params para busca)
router.get('/', CompetenciaController.list);

// Buscar uma competência específica por ID
router.get('/:id', CompetenciaController.get);

// Criar uma nova competência (Dicionário de Competências)
router.post('/', CompetenciaController.create);

// Atualizar dados de uma competência existente
router.put('/:id', CompetenciaController.update);

// Remover uma competência do sistema
router.delete('/:id', CompetenciaController.delete);

export default router;