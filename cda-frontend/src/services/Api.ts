import axios from 'axios';

export const api = axios.create({
  // Alterado para PUBLIC_ para o Rsbuild conseguir ler do seu .env
  baseURL: import.meta.env.PUBLIC_API_URL ?? 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 🔐 INTERCEPTOR DE REQUISIÇÃO
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@CDA:token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * 🛡️ INTERCEPTOR DE RESPOSTA
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('@CDA:token');
      localStorage.removeItem('@CDA:user');
      
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);