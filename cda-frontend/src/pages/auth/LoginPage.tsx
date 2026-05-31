import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LogoIcon from '../../assets/branding/LogoIcon';
import { LogIn, Loader2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { signIn, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState<string | null>(null);

  /**
   * 🔐 Se o usuário já estiver autenticado,
   * redireciona imediatamente para a home
   */
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !senha) {
      setError('Por favor, preencha todos os campos para continuar.');
      return;
    }

    try {
      await signIn({ email, senha });
      // Redirecionamento ocorre automaticamente via useEffect
    } catch (err) {
      console.error('Erro de login:', err);
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 selection:bg-indigo-100">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Branding */}
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-indigo-50 rounded-2xl">
            <LogoIcon className="w-10 h-10 text-indigo-600" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              CDA <span className="text-indigo-600">2026</span>
            </h1>
            <p className="text-sm font-medium text-slate-400">
              Sistema de Ciclo de Desempenho
            </p>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 ml-1">
              E-mail corporativo
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              placeholder="nome@empresa.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 ml-1">
              Senha
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-3">
              <p className="text-xs text-rose-600 font-bold text-center">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-70 shadow-lg shadow-slate-200"
          >
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                <Loader2 size={18} className="animate-spin text-indigo-400" />
              ) : (
                <>
                  <span>Acessar Plataforma</span>
                  <LogIn size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </button>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] font-medium text-slate-400">
            © 2026 • Gestão de Talentos & Performance
          </p>
        </div>
      </div>
    </div>
  );
};
