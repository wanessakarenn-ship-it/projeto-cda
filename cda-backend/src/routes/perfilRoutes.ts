import { Router } from 'express';
import perfilController from '../controllers/PerfilController'; // import da instância

const router = Router();

// Usando diretamente a instância do controller
router.get('/', perfilController.listarTodos.bind(perfilController));
router.get('/:id', perfilController.buscarPorId.bind(perfilController));
router.post('/', perfilController.criar.bind(perfilController));
router.put('/:id', perfilController.atualizar.bind(perfilController));
router.delete('/:id', perfilController.remover.bind(perfilController));

export default router;
