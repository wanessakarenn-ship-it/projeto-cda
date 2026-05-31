import { Request, Response } from 'express';
import PlanoCarreiraService from '../services/PlanoCarreiraService';

const service = new PlanoCarreiraService();

export default class PlanoCarreiraController {
  static async list(req: Request, res: Response) {
    const planos = await service.list();
    res.json(planos);
  }

  static async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const plano = await service.getById(id);
    if (!plano) return res.status(404).json({ message: 'Plano de Carreira não encontrado' });
    res.json(plano);
  }

  static async create(req: Request, res: Response) {
    const data = req.body;
    const plano = await service.create(data);
    res.status(201).json(plano);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body;
    const plano = await service.update(id, data);
    if (!plano) return res.status(404).json({ message: 'Plano de Carreira não encontrado' });
    res.json(plano);
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.delete(id);
    res.status(204).send();
  }
}
