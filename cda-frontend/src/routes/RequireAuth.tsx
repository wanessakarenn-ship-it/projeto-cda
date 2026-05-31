import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../config/navigation';

interface RequireAuthProps {
  allowedRoles?: UserRole[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  // Padronizei para 'user' conforme as refatorações anteriores
  const { user, loading } = useAuth(); 
  const location = useLocation();

  // 1️⃣ Feedback visual enquanto o backend/contexto responde
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Autenticando...</p>
        </div>
      </div>
    );
  }

  // 2️⃣ Redirecionamento para Login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3️⃣ RBAC (Role-Based Access Control)
  // Nota: user.perfil deve vir exatamente como 'ADMIN', 'GESTOR' ou 'COLABORADOR' da sua API
  const temPermissao = !allowedRoles || allowedRoles.includes(user.perfil as UserRole);

  if (!temPermissao) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 4️⃣ Autorizado! O Outlet renderiza o componente da rota filha
  return <Outlet />;
};

export default RequireAuth;