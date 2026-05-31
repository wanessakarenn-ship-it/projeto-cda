// src/types/usuarioLogin.ts

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  user: {
    id: number | bigint;
    nome: string;
    email: string;
    perfil: any; // Ou o tipo correto do seu Prisma
    firebaseUid: string | null; // Mude de firebase_uid para firebaseUid
    gestorId?: number | null | bigint;
  };
  token: string;
}