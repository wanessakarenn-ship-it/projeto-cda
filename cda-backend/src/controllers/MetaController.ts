import { Request, Response } from 'express';
import MetaService from '../services/MetaService';

const service = new MetaService();

export default class MetaController {
  static async list(req: Request, res: Response) {
    const metas = await service.list();
    res.json(metas);
  }

  static async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const meta = await service.getById(id);
    if (!meta) return res.status(404).json({ message: 'Meta não encontrada' });
    res.json(meta);
  }

  static async create(req: Request, res: Response) {
    const data = req.body;
    const meta = await service.create(data);
    res.status(201).json(meta);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body;
    const meta = await service.update(id, data);
    if (!meta) return res.status(404).json({ message: 'Meta não encontrada' });
    res.json(meta);
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.delete(id);
    res.status(204).send();
  }
}
