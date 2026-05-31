import { Router } from 'express';
import PlanoCarreiraController from '../controllers/PlanoCarreiraController';

const router = Router();

// Listar planos de carreira
router.get('/', PlanoCarreiraController.list);

// Buscar plano por ID
router.get('/:id', PlanoCarreiraController.get);

// Criar plano de carreira
router.post('/', PlanoCarreiraController.create);

// Atualizar plano de carreira
router.put('/:id', PlanoCarreiraController.update);

// Remover plano de carreira
router.delete('/:id', PlanoCarreiraController.delete);

export default router;
