import { Request, Response } from 'express';
import NineBoxService from '../services/NineBoxService';

class NineBoxController {
  async findAll(req: Request, res: Response) {
    try {
      const { ciclo_id, setor } = req.query;

      const nineBoxes = await NineBoxService.findAll({
        cicloId: ciclo_id ? Number(ciclo_id) : undefined,
        setor: setor as string | undefined,
      });

      return res.json(nineBoxes);
    } catch (error) {
      console.error('Erro ao buscar dados do NineBox:', error);
      return res.status(500).json({
        message: 'Erro interno ao carregar matriz NineBox',
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const nineBox = await NineBoxService.create(req.body);
      return res.status(201).json(nineBox);
    } catch {
      return res.status(400).json({
        message: 'Erro ao criar registro NineBox',
      });
    }
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const nineBox = await NineBoxService.findById(id);
    if (!nineBox) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }

    return res.json(nineBox);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const nineBox = await NineBoxService.update(id, req.body);
    return res.json(nineBox);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await NineBoxService.delete(id);
    return res.status(204).send();
  }
}

export default new NineBoxController();
