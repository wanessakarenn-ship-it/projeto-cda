import { Router } from 'express';
import MetaController from '../controllers/MetaController';

const router = Router();

// Listar metas
router.get('/', MetaController.list);

// Buscar meta por ID
router.get('/:id', MetaController.get);

// Criar meta
router.post('/', MetaController.create);

// Atualizar meta
router.put('/:id', MetaController.update);

// Remover meta
router.delete('/:id', MetaController.delete);

export default router;
