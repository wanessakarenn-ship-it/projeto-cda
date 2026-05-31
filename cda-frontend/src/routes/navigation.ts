import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  AlertTriangle, 
  Grid3X3,
  FileText
} from 'lucide-react';

export type UserRole = 'ADMIN' | 'GESTOR' | 'COLABORADOR';

export type NavIcon =
  | 'home'
  | 'users'
  | 'chart'
  | 'settings'
  | 'alert'
  | 'ninebox'
  | 'reports';

export interface NavItem {
  label: string;
  path: string;
  icon: NavIcon;
  roles: UserRole[];
}

/**
 * Mapeamento centralizado de ícones para o componente Sidebar
 */
export const iconMap = {
  home: Home,
  users: Users,
  chart: BarChart3,
  settings: Settings,
  alert: AlertTriangle,
  ninebox: Grid3X3,
  reports: FileText,
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Meu Painel',
    path: '/',
    icon: 'home',
    roles: ['COLABORADOR', 'GESTOR', 'ADMIN'],
  },
  {
    label: 'Visão Geral Equipe',
    path: '/gestao',
    icon: 'users',
    roles: ['GESTOR', 'ADMIN'],
  },
  {
    label: 'Alertas Críticos',
    path: '/gestao/alertas',
    icon: 'alert',
    roles: ['GESTOR', 'ADMIN'],
  },
  {
    label: 'Matriz Nine Box',
    path: '/gestao/nine-box',
    icon: 'ninebox',
    roles: ['GESTOR', 'ADMIN'],
  },
  {
    label: 'Relatórios',
    path: '/gestao/relatorios',
    icon: 'reports',
    roles: ['GESTOR', 'ADMIN'],
  },
  {
    label: 'Painel Admin',
    path: '/admin',
    icon: 'settings',
    roles: ['ADMIN'],
  },
];

export const getVisibleNavItems = (userRole?: UserRole): NavItem[] => {
  if (!userRole) return [];
  return NAV_ITEMS.filter((item) => item.roles.includes(userRole));
};