import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

/**
 * Middleware para controle de acesso baseado em perfis (RBAC)
 * @param roles Lista de perfis permitidos: 'ADMIN', 'GESTOR', 'COLABORADOR'
 */
export const roleMiddleware = (roles: Array<'ADMIN' | 'GESTOR' | 'COLABORADOR'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // Verifica se o usuário foi injetado pelo authMiddleware
    if (!req.user) {
      return res.status(401).json({ message: 'NAO_AUTENTICADO' });
    }

    // Verifica se o perfil do usuário está na lista de permissões
    // Note: usamos req.user.perfil (ajuste para perfil_nome se necessário)
    const temPermissao = roles.includes(req.user.perfil as any);

    if (!temPermissao) {
      return res.status(403).json({ 
        message: 'ACESSO_NEGADO',
        perfil_atual: req.user.perfil,
        perfis_necessarios: roles
      });
    }

    next();
  };
};

// Também exportamos como default para facilitar importações variadas
export default roleMiddleware;