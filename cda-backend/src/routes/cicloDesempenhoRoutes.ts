import { Router } from 'express';
import { CicloDesempenhoController } from '../controllers/CicloDesempenhoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const controller = new CicloDesempenhoController();

router.use((req, res, next) => authMiddleware(req as any, res, next));

router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.remover);

export default router;
