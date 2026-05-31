import { Router } from 'express';
import GestorController from '../controllers/GestorController';

const router = Router();

// Criar gestor
router.post('/', GestorController.create);

// Listar gestores
router.get('/', GestorController.findAll);

// Buscar gestor por ID
router.get('/:id', GestorController.findById);

// Atualizar gestor
router.put('/:id', GestorController.update);

// Remover gestor
router.delete('/:id', GestorController.delete);

export default router;
