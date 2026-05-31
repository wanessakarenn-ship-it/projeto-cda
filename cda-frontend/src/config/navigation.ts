export type UserRole = 'ADMIN' | 'GESTOR' | 'COLABORADOR';

export type NavIcon =
  | 'home'
  | 'users'
  | 'chart'
  | 'settings'
  | 'target'
  | 'fileText'
  | 'alert'
  | 'ninebox'
  | 'reports';

export interface NavItem {
  label: string;
  path: string;
  icon: NavIcon;
  roles: UserRole[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Meu Painel',
    path: '/',
    icon: 'home',
    roles: ['COLABORADOR', 'GESTOR', 'ADMIN'],
  },
  {
    label: 'Avaliação',
    path: '/avaliacao',
    icon: 'fileText',
    roles: ['COLABORADOR'],
  },
  {
    label: 'Metas',
    path: '/metas',
    icon: 'target',
    roles: ['COLABORADOR'],
  },
  {
    label: 'Feedback',
    path: '/feedback',
    icon: 'reports',
    roles: ['COLABORADOR'],
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
    label: 'Administração',
    path: '/admin',
    icon: 'settings',
    roles: ['ADMIN'],
  },
];

export const getVisibleNavItems = (userRole?: UserRole): NavItem[] => {
  if (!userRole) return [];
  return NAV_ITEMS.filter((item) => item.roles.includes(userRole));
};
