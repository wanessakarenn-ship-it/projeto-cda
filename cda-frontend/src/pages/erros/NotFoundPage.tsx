import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // 1. Importado para redirecionamento inteligente
import { SearchX, ArrowLeft, Home, LayoutDashboard } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth(); // 2. Verifica se o usuário está logado

  // 3. Determina a rota de "Início" redirecionando para a raiz "/"
  const handleHomeRedirect = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Redireciona para o fluxo central "/" que decide a rota inicial ideal
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500 text-left">
      {/* Ícone e Código do erro */}
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full -z-10" />
        <SearchX size={100} className="text-indigo-950/40 absolute -top-12 -left-12 -z-10 rotate-12" />
        <span className="text-9xl font-black text-indigo-500 tracking-tighter drop-shadow-sm">
          404
        </span>
      </div>

      {/* Mensagem */}
      <h1 className="mt-8 text-2xl font-black text-white tracking-tight text-center w-full">
        Página não encontrada
      </h1>

      <p className="mt-3 text-sm text-slate-400 leading-relaxed font-medium text-center">
        O endereço solicitado não existe ou o acesso não foi autorizado para o seu perfil 
        <span className="text-indigo-400 font-bold ml-1">{user?.perfil ?? ''}</span>.
      </p>

      {/* Ações */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-slate-900/60 border border-slate-800 text-slate-400 hover:border-indigo-500/30 hover:text-indigo-400 hover:bg-[#131A2C]/65 transition-all active:scale-95"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <button
          type="button"
          onClick={handleHomeRedirect}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/10 transition-all active:scale-95"
        >
          {isAuthenticated ? <LayoutDashboard size={18} /> : <Home size={18} />}
          {isAuthenticated ? 'Meu Painel' : 'Ir para Login'}
        </button>
      </div>
      
      <p className="mt-12 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] text-center w-full">
        CDA Performance System &bull; 2026
      </p>
    </div>
  );
};

export default NotFoundPage;