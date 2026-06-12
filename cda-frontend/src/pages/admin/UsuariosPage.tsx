import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/Api'; // Sua instância do Axios
import { 
  UserPlus, Search, MoreHorizontal, Mail, 
  Shield, Loader2, UserX, UserCheck 
} from 'lucide-react';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: 'ADMIN' | 'GESTOR' | 'COLABORADOR';
  ativo: boolean;
}

export const UsuariosPage: React.FC = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Carregar usuários do PostgreSQL
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        // Rota no Node.js: router.get('/usuarios', ...)
        const { data } = await api.get<Usuario[]>('/usuarios');
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  // 2. Filtro em memória (eficiente para listas de até ~1000 usuários)
  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      u.email.toLowerCase().includes(filtro.toLowerCase())
  );

  // 3. Alternar status Ativo/Inativo (Integração PATCH)
  const toggleStatus = async (id: number, statusAtual: boolean) => {
    try {
      await api.patch(`/usuarios/${id}`, { ativo: !statusAtual });
      setUsuarios(prev => prev.map(u => u.id === id ? { ...u, ativo: !statusAtual } : u));
    } catch (error) {
      alert("Erro ao atualizar status do usuário.");
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
        <p className="text-xs font-black uppercase tracking-widest">Sincronizando Base de Acessos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Usuários do Sistema
          </h1>
          <p className="text-sm text-slate-400 font-medium mt-1">
            Controle quem pode administrar o ciclo de mérito e gerir equipes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/admin/usuarios/novo')}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-[1.25rem] bg-indigo-600 text-white text-sm font-black uppercase tracking-widest hover:bg-indigo-500 active:scale-95 transition-all shadow-xl shadow-indigo-500/10 shrink-0"
        >
          <UserPlus size={18} />
          Novo Usuário
        </button>
      </header>

      {/* Barra de Busca Premium */}
      <div className="flex items-center gap-3 w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-2xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500 transition-all">
        <Search size={18} className="text-slate-500" />
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="flex-1 outline-none text-sm text-slate-200 placeholder-slate-500 bg-transparent"
        />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/40 border-b border-slate-800/60">
                <th className="py-6 px-10 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">Colaborador</th>
                <th className="py-6 px-6 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">Perfil de Acesso</th>
                <th className="py-6 px-6 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">Status</th>
                <th className="py-6 px-10 text-right text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id} className="group hover:bg-[#131A2C]/40 transition-colors">
                  <td className="py-6 px-10">
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        {usuario.nome}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Mail size={12} className="text-slate-600" />
                        {usuario.email}
                      </span>
                    </div>
                  </td>
                  
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg border ${
                        usuario.perfil === 'ADMIN' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 
                        usuario.perfil === 'GESTOR' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 
                        'bg-slate-800/40 border-slate-700/30 text-slate-400'
                      }`}>
                        <Shield size={14} />
                      </div>
                      <span className="text-[11px] font-black text-slate-300 uppercase tracking-wider">
                        {usuario.perfil}
                      </span>
                    </div>
                  </td>

                  <td className="py-6 px-6">
                    <button 
                      onClick={() => toggleStatus(usuario.id, usuario.ativo)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                        usuario.ativo 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20' 
                          : 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20'
                      }`}
                    >
                      {usuario.ativo ? <UserCheck size={12} /> : <UserX size={12} />}
                      {usuario.ativo ? 'Ativo' : 'Bloqueado'}
                    </button>
                  </td>

                  <td className="py-6 px-10 text-right">
                    <button className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 rounded-xl transition-all">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {usuariosFiltrados.length === 0 && !loading && (
          <div className="py-20 text-center flex flex-col items-center">
            <Search size={40} className="text-slate-700 mb-2" />
            <p className="text-sm text-slate-500 font-medium">Nenhum usuário corresponde à sua busca.</p>
          </div>
        )}
      </div>
    </div>
  );
};