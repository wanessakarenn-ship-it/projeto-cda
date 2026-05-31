import { Request, Response } from 'express';
import { colaboradorService } from '../services/ColaboradorService';

export const ColaboradorController = {
  async listarTodos(req: Request, res: Response) {
    try {
      const colaboradores = await colaboradorService.listarTodos();
      return res.json(colaboradores);
    } catch (error: any) {
      return res.status(500).json({ erro: error.message || 'Erro ao listar colaboradores' });
    }
  },

  async obterPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const colaborador = await colaboradorService.obterPorId(id);
      return res.json(colaborador);
    } catch (error: any) {
      if (error.message === 'COLABORADOR_NAO_ENCONTRADO') return res.status(404).json({ erro: error.message });
      return res.status(500).json({ erro: 'Erro ao obter colaborador' });
    }
  },

  async criar(req: Request, res: Response) {
    try {
      const dados = req.body;
      const criado = await colaboradorService.criar(dados);
      return res.status(201).json(criado);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message || 'Erro ao criar colaborador' });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const dados = req.body;
      const atualizado = await colaboradorService.atualizar(id, dados);
      return res.json(atualizado);
    } catch (error: any) {
      if (error.message === 'COLABORADOR_NAO_ENCONTRADO') return res.status(404).json({ erro: error.message });
      return res.status(500).json({ erro: 'Erro ao atualizar colaborador' });
    }
  },

  async remover(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await colaboradorService.remover(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ erro: 'Erro ao remover colaborador' });
    }
  },
};