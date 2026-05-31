import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

    const [, token] = authHeader.split(' ');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
      req.user = decoded; // { id, perfil }

      if (roles.length && !roles.includes(decoded.perfil)) {
        return res.status(403).json({ error: 'Acesso negado: perfil insuficiente' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  };
};