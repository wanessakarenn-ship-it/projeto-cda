import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/Api';
import type { UserRole } from '../config/navigation';

export interface User {
  id: string | number;
  email: string;
  nome: string;
  perfil: UserRole;
  firebase_uid?: string | null;
  firebaseUid?: string | null;
  gestorId?: string | number | null;
}

interface SignInCredentials {
  email: string;
  senha: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

const TOKEN_KEY = '@CDA:token';
const USER_KEY = '@CDA:user';

const normalizeUser = (data: any): User => {
  const rawUser = data?.usuario ?? data?.user ?? data;

  return {
    id: rawUser?.id ?? '',
    email: rawUser?.email ?? '',
    nome: rawUser?.nome ?? rawUser?.name ?? 'Usuário',
    perfil: (rawUser?.perfil ?? 'COLABORADOR') as UserRole,
    firebase_uid: rawUser?.firebase_uid ?? rawUser?.firebaseUid ?? null,
    firebaseUid: rawUser?.firebaseUid ?? rawUser?.firebase_uid ?? null,
    gestorId: rawUser?.gestorId ?? rawUser?.gestor_id ?? null,
  };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken) {
      api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }

    setLoading(false);
  }, []);

  const signIn = async ({ email, senha }: SignInCredentials) => {
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', { email, senha });
      const token = data?.token;
      const normalizedUser = normalizeUser(data);

      if (!token) {
        throw new Error('Token não retornado pela API.');
      }

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(normalizedUser);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      signIn,
      signOut,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
