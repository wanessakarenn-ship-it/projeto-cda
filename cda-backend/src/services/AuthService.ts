import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { LoginRequest, LoginResponse } from '../types/UsuarioLogin';

// Usamos a inicialização padrão. O Prisma lerá do seu .env automaticamente
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'cda-secret-key-2026';

export class AuthService {
  async login({ email, senha }: LoginRequest): Promise<LoginResponse> {
    // 1. Busca o usuário pelo e-mail
    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    // Se o usuário não existe ou a senha está errada
    // Usamos (user as any) apenas para garantir que o TS não reclame do campo senha
    if (!user || (user as any).senha !== senha) {
      throw new Error('E-mail ou senha incorretos.');
    }

    // 2. Geração do Token JWT
    const token = jwt.sign(
      { 
        id: user.id.toString(), // Convertemos BigInt para String para o JWT não dar erro
        email: user.email, 
        perfil: user.perfil,
        firebaseUid: (user as any).firebaseUid 
      },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    // 3. Retorno formatado conforme LoginResponse
    // Usamos (user as any) para acessar campos que o TS ainda está indexando
    return {
      user: {
        id: user.id, // O Prisma já lida com BigInt aqui se o tipo permitir
        nome: user.nome || '',
        email: user.email,
        perfil: (user as any).perfil,
        firebaseUid: (user as any).firebaseUid || null,
        gestorId: (user as any).gestorId || null // Adicionado (as any) para evitar erro TS2339
      },
      token,
    };
  }
}