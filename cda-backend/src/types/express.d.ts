// src/types/express.d.ts
import { UsuarioToken } from './UsuarioToken';

declare global {
  namespace Express {
    interface Request {
      user?: UsuarioToken;
    }
  }
}

export {};
