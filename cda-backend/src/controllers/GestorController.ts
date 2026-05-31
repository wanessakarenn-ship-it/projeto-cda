import { Request, Response } from 'express';
import GestorService from '../services/GestorService';

class GestorController {
    async create(req: Request, res: Response) {
        const gestor = await GestorService.create(req.body);
        res.status(201).json(gestor);
    }

    async findAll(req: Request, res: Response) {
        const gestores = await GestorService.findAll();
        res.json(gestores);
    }

    async findById(req: Request, res: Response) {
        const gestor = await GestorService.findById(Number(req.params.id));
        if (!gestor) return res.status(404).json({ message: 'Gestor não encontrado' });
        res.json(gestor);
    }

    async update(req: Request, res: Response) {
        const gestor = await GestorService.update(Number(req.params.id), req.body);
        res.json(gestor);
    }

    async delete(req: Request, res: Response) {
        await GestorService.delete(Number(req.params.id));
        res.status(204).send();
    }
}

export default new GestorController();
