import { Request, Response } from 'express';
import { CicloDesempenhoService } from '../services/CicloDesempenhoService';

const service = new CicloDesempenhoService();

export class CicloDesempenhoController {
  async listar(req: Request, res: Response) {
    const ciclos = await service.listar();
    return res.json(ciclos);
  }

  async buscar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ciclo = await service.buscarPorId(id);

    if (!ciclo) {
      return res.status(404).json({ message: 'Ciclo não encontrado' });
    }

    return res.json(ciclo);
  }

  async criar(req: Request, res: Response) {
    const ciclo = await service.criar(req.body);
    return res.status(201).json(ciclo);
  }

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.atualizar(id, req.body);
    return res.status(204).send();
  }

  async remover(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.remover(id);
    return res.status(204).send();
  }
}
