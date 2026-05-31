import { Request, Response } from 'express';
import CargoService from '../services/CargoService';

const service = new CargoService();

export default class CargoController {
  static async list(req: Request, res: Response) {
    const cargos = await service.list();
    res.json(cargos);
  }

  static async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const cargo = await service.getById(id);
    if (!cargo) return res.status(404).json({ message: 'Cargo não encontrado' });
    res.json(cargo);
  }

  static async create(req: Request, res: Response) {
    const data = req.body;
    const cargo = await service.create(data);
    res.status(201).json(cargo);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body;
    const cargo = await service.update(id, data);
    if (!cargo) return res.status(404).json({ message: 'Cargo não encontrado' });
    res.json(cargo);
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.delete(id);
    res.status(204).send();
  }
}
