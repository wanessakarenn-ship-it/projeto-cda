import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Menu, 
  LogOut,
  Home,
  Users,
  BarChart3,
  Settings,
  ShieldCheck,
  AlertTriangle,
  Grid3X3,
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getVisibleNavItems } from '../config/navigation';

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onClose }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // 1. Estado para controle do menu no desktop (abrir/fechar)
  const [isOpen, setIsOpen] = useState(true);
  
  // 2. Filtra itens conforme o perfil do usuário (ADMIN, GESTOR, COLABORADOR)
  const menuItems = getVisibleNavItems(user?.perfil);

  // 3. Mapeamento de ícones para renderização dinâmica
  const iconMap: Record<string, React.ElementType> = {
    home: Home,
    users: Users,
    chart: BarChart3,
    settings: Settings,
    target: ShieldCheck,
    fileText: FileText,
    alert: AlertTriangle,
    ninebox: Grid3X3,
    reports: FileText,
  };

  const handleSignOut = () => {
    if (onClose) onClose();
    signOut();
    navigate('/login');
  };

  return (
    <>
      {/* Backdrop para mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        className={`fixed inset-y-0 left-0 z-50 md:relative bg-[#0B0F19]/95 text-white transition-all duration-300 ease-in-out flex flex-col border-r border-slate-800/80 backdrop-blur-md ${
          isOpen ? 'w-64' : 'w-20'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Botão de Toggle (Abrir/Fechar) - Apenas Desktop */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1 shadow-lg transition-transform z-50 hidden md:block"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
        </button>

        {/* Logo */}
        <div className={`p-8 mb-4 flex items-center ${!isOpen && 'justify-center'}`}>
          <h1 className={`font-black text-2xl tracking-tighter text-white transition-all duration-300 ${
            !isOpen ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
          }`}>
            CDA <span className="text-indigo-500">2026</span>
          </h1>
          {!isOpen && <span className="text-indigo-500 font-black text-xl">C</span>}
        </div>

        {/* Navegação Principal */}
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon] || Home;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (onClose) onClose();
                }}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group
                  ${isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                    : 'text-slate-400 hover:bg-[#131A2C] hover:text-slate-200'
                  }
                  ${!isOpen && 'justify-center px-0'}
                `}
                title={!isOpen ? item.label : ''}
              >
                <Icon size={20} strokeWidth={2.5} className="shrink-0" />
                <span className={`transition-opacity duration-200 whitespace-nowrap ${
                  !isOpen ? 'hidden' : 'block'
                }`}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Botão de Logout */}
        <div className="p-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={handleSignOut}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 transition-all ${
              !isOpen && 'justify-center px-0'
            }`}
            title={!isOpen ? 'Sair do Sistema' : ''}
          >
            <LogOut size={20} strokeWidth={2.5} className="shrink-0" />
            <span className={!isOpen ? 'hidden' : 'block'}>Sair do Sistema</span>
          </button>
        </div>
      </aside>
    </>
  );
};