import { Request, Response } from 'express';
import cicloColaboradorService from '../services/CicloColaboradorService';

class CicloColaboradorController {
  obterTodos(req: Request, res: Response): void {
    const ciclosColaboradores = cicloColaboradorService.obterTodos();
    res.status(200).json(ciclosColaboradores);
  }

  obterPorId(req: Request, res: Response): void {
    const id = Number(req.params.id);
    const cicloColaborador = cicloColaboradorService.obterPorId(id);
    if (!cicloColaborador) {
      res.status(404).json({ mensagem: 'CicloColaborador não encontrado' });
      return;
    }
    res.status(200).json(cicloColaborador);
  }

  obterPorCicloId(req: Request, res: Response): void {
    const cicloId = Number(req.params.cicloId);
    const ciclosColaboradores = cicloColaboradorService.obterPorCicloId(cicloId);
    res.status(200).json(ciclosColaboradores);
  }

  obterPorColaboradorId(req: Request, res: Response): void {
    const colaboradorId = Number(req.params.colaboradorId);
    const ciclosColaboradores = cicloColaboradorService.obterPorColaboradorId(colaboradorId);
    res.status(200).json(ciclosColaboradores);
  }

  criar(req: Request, res: Response): void {
    const { cicloId, colaboradorId, recomendacaoExperiencia, statusExperiencia } = req.body;
    const cicloColaborador = cicloColaboradorService.criar({
      cicloId,
      colaboradorId,
      recomendacaoExperiencia,
      statusExperiencia,
    });
    res.status(201).json(cicloColaborador);
  }

  atualizar(req: Request, res: Response): void {
    const id = Number(req.params.id);
    const { recomendacaoExperiencia, statusExperiencia } = req.body;
    const cicloColaborador = cicloColaboradorService.atualizar(id, {
      recomendacaoExperiencia,
      statusExperiencia,
    });
    if (!cicloColaborador) {
      res.status(404).json({ mensagem: 'CicloColaborador não encontrado' });
      return;
    }
    res.status(200).json(cicloColaborador);
  }

  remover(req: Request, res: Response): void {
    const id = Number(req.params.id);
    const removido = cicloColaboradorService.remover(id);
    if (!removido) {
      res.status(404).json({ mensagem: 'CicloColaborador não encontrado' });
      return;
    }
    res.status(204).send();
  }
}

export default new CicloColaboradorController();
