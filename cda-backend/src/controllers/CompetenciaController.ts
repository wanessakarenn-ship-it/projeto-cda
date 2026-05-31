import { Request, Response } from 'express';
import CompetenciaService from '../services/CompetenciaService';

// Mantemos a instância do service
const service = new CompetenciaService();

export default class CompetenciaController {
  /**
   * Lista competências com suporte a busca
   * Útil para carregar os critérios dentro de uma avaliação
   */
  static async list(req: Request, res: Response) {
    try {
      const { search } = req.query;
      // Passamos o filtro para o service
      const competencias = await service.list(search as string);
      return res.json(competencias);
    } catch (error) {
      console.error('Erro ao listar competências:', error);
      return res.status(500).json({ message: 'Erro ao carregar competências' });
    }
  }

  /**
   * Busca uma competência específica
   */
  static async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

      const competencia = await service.getById(id);
      if (!competencia) {
        return res.status(404).json({ message: 'Competência não encontrada' });
      }
      return res.json(competencia);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar competência' });
    }
  }

  /**
   * Cria uma nova competência (ex: "Trabalho em Equipe")
   */
  static async create(req: Request, res: Response) {
    try {
      const data = req.body;
      // Validação básica de entrada
      if (!data.nome) return res.status(400).json({ message: 'Nome é obrigatório' });

      const competencia = await service.create(data);
      return res.status(201).json(competencia);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao criar competência' });
    }
  }

  /**
   * Atualiza uma competência existente
   */
  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const competencia = await service.update(id, data);
      
      if (!competencia) {
        return res.status(404).json({ message: 'Competência não encontrada' });
      }
      return res.json(competencia);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao atualizar competência' });
    }
  }

  /**
   * Remove uma competência do sistema
   */
  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await service.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao deletar competência' });
    }
  }
}