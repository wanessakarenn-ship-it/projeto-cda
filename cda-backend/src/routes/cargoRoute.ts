import { Router } from 'express';
import CargoController from '../controllers/CargoController';

const router = Router();

// Listar cargos
router.get('/', CargoController.list);

// Buscar cargo por ID
router.get('/:id', CargoController.get);

// Criar cargo
router.post('/', CargoController.create);

// Atualizar cargo
router.put('/:id', CargoController.update);

// Remover cargo
router.delete('/:id', CargoController.delete);

export default router;
