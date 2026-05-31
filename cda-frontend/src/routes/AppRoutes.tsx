import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../config/navigation';

// Auth & Erros
import { LoginPage } from '../pages/auth/LoginPage';
import { NotFoundPage } from '../pages/erros/NotFoundPage';
import { UnauthorizedPage } from '../pages/erros/UnauthorizedPage';

// Colaborador
import ColaboradorDashboardPage from '../pages/colaborador/ColaboradorDashboardPage';
import { AvaliacaoPage } from '../pages/colaborador/AvaliacaoPage';
import FeedbackPage from '../pages/colaborador/FeedbackPage';
import MetasPage from '../pages/colaborador/MetasPage';

// Gestor / Admin
import { GestorDashboardPage } from '../pages/gestor/GestorDashboardPage';
import { RelatoriosPage } from '../pages/gestor/RelatoriosPage';
import { AlertasPage } from '../pages/gestor/AlertasPage';
import { NineBoxPage } from '../pages/gestor/NineBoxPage';
import { ColaboradorDetalhePage } from '../pages/gestor/ColaboradorDetalhePage';

// Admin
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { CiclosPage } from '../pages/admin/CiclosPage';
import { MetasGlobaisPage } from '../pages/admin/MetasGlobaisPage';
import { ImportacaoColaboradoresPage } from '../pages/admin/ImportacaoColaboradoresPage';
import { NineBoxConfigPage } from '../pages/admin/NineBoxConfigPage';
import { UsuariosPage } from '../pages/admin/UsuariosPage';
import { CompetenciasPage } from '../pages/admin/CompetenciasPage';

// --- COMPONENTES AUXILIARES ---

interface PrivateRouteProps {
  allowedRoles?: UserRole[];
}

/**
 * 🛡️ PrivateRoute Refatorado
 * Agora usamos o padrão 'Wrapper' com Outlet para evitar erros de Router aninhado.
 */
const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="text-xs text-slate-500 font-medium">Carregando permissões...</span>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.perfil as UserRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; // Renderiza os filhos definidos nas rotas aninhadas
};

const HomeRedirect = () => {
  const { user } = useAuth();
  if (user?.perfil === 'ADMIN') return <Navigate to="/admin" replace />;
  if (user?.perfil === 'GESTOR') return <Navigate to="/gestao" replace />;
  return <ColaboradorDashboardPage />;
};

// --- CONFIGURAÇÃO DE ROTAS ---

export const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔓 Rota Pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* 🔐 Rotas Protegidas (Geral) */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomeRedirect />} />
          
          {/* Módulo Colaborador */}
          <Route path="/avaliacao" element={<AvaliacaoPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/metas" element={<MetasPage />} />

          {/* Módulo Gestão - Proteção Adicional por Role */}
          <Route path="/gestao" element={<PrivateRoute allowedRoles={['GESTOR', 'ADMIN']} />}>
            <Route index element={<GestorDashboardPage />} />
            <Route path="alertas" element={<AlertasPage />} />
            <Route path="nine-box" element={<NineBoxPage />} />
            <Route path="relatorios" element={<RelatoriosPage />} />
            <Route path="colaborador/:id" element={<ColaboradorDetalhePage />} />
          </Route>

          {/* Módulo Admin - Proteção Adicional por Role */}
          <Route path="/admin" element={<PrivateRoute allowedRoles={['ADMIN']} />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="ciclos" element={<CiclosPage />} />
            <Route path="metas" element={<MetasGlobaisPage />} />
            <Route path="importar" element={<ImportacaoColaboradoresPage />} />
            <Route path="competencias" element={<CompetenciasPage />} />
            <Route path="usuarios" element={<UsuariosPage />} />
            <Route path="nine-box-config" element={<NineBoxConfigPage />} />
          </Route>
        </Route>
      </Route>

      {/* Rotas de Erro */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};