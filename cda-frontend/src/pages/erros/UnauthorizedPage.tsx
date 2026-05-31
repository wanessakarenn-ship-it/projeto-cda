import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  /**
   * Redirecionamento baseado no estado de login
   */
  const handlePrimaryAction = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(user?.perfil === 'ADMIN' ? '/admin' : '/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Ícone 403 com Camadas Visuais */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-amber-100/40 blur-3xl rounded-full -z-10" />
        <ShieldAlert size={100} className="text-amber-100 absolute -top-12 -left-12 -z-10 -rotate-12" />
        <div className="relative">
          <span className="text-9xl font-black text-amber-500 tracking-tighter drop-shadow-sm">
            403
          </span>
          <Lock className="absolute -bottom-2 -right-2 text-slate-800 bg-white rounded-full p-1 shadow-sm" size={32} />
        </div>
      </div>

      {/* Título e Feedback */}
      <h1 className="text-2xl font-black text-slate-800 tracking-tight">
        Acesso restrito
      </h1>

      <p className="mt-4 text-sm text-slate-500 leading-relaxed font-medium">
        {user
          ? `Desculpe, ${user.nome.split(' ')[0]}. Seu perfil de ${user.perfil} não possui as permissões necessárias para visualizar este recurso.`
          : 'Sessão não identificada. Por favor, realize o login para acessar as ferramentas de performance CDA.'}
      </p>

      {/* Ações Dinâmicas */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-black border-2 border-slate-100 text-slate-500 hover:border-amber-100 hover:text-amber-600 hover:bg-amber-50/30 transition-all active:scale-95"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <button
          type="button"
          onClick={handlePrimaryAction}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-black bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95"
        >
          {isAuthenticated ? <Home size={18} /> : <Lock size={18} />}
          {isAuthenticated ? 'Início' : 'Fazer Login'}
        </button>
      </div>

      {/* Badge de Depuração do Perfil (Útil para o seu desenvolvimento do Backend) */}
      {user && (
        <div className="mt-12 flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Perfil Atual: {user.perfil}
          </span>
        </div>
      )}
    </div>
  );
};

export default UnauthorizedPage;