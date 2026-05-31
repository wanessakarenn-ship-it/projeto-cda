import React, { useState, useEffect } from 'react';
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
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-xs font-black uppercase tracking-widest">Sincronizando Base de Acessos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Usuários do Sistema
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Controle quem pode administrar o ciclo de mérito e gerir equipes.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 active:scale-95 transition-all shadow-lg shadow-indigo-100"
        >
          <UserPlus size={18} />
          Novo Usuário
        </button>
      </header>

      {/* Barra de Busca Premium */}
      <div className="flex items-center gap-3 w-full max-w-md bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="flex-1 outline-none text-sm text-slate-900 placeholder-slate-400 bg-transparent"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="py-5 px-8 text-[11px] font-black uppercase tracking-wider text-slate-400">Colaborador</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-wider text-slate-400">Perfil de Acesso</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-wider text-slate-400">Status</th>
                <th className="py-5 px-8 text-right text-[11px] font-black uppercase tracking-wider text-slate-400">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="py-5 px-8">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {usuario.nome}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Mail size={12} />
                        {usuario.email}
                      </span>
                    </div>
                  </td>
                  
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${
                        usuario.perfil === 'ADMIN' ? 'bg-indigo-50 text-indigo-600' : 
                        usuario.perfil === 'GESTOR' ? 'bg-amber-50 text-amber-600' : 
                        'bg-slate-100 text-slate-500'
                      }`}>
                        <Shield size={14} />
                      </div>
                      <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">
                        {usuario.perfil}
                      </span>
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <button 
                      onClick={() => toggleStatus(usuario.id, usuario.ativo)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide transition-all ${
                        usuario.ativo 
                          ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                          : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                      }`}
                    >
                      {usuario.ativo ? <UserCheck size={12} /> : <UserX size={12} />}
                      {usuario.ativo ? 'Ativo' : 'Bloqueado'}
                    </button>
                  </td>

                  <td className="py-5 px-8 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-200/50 rounded-xl transition-all">
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
            <Search size={40} className="text-slate-200 mb-2" />
            <p className="text-sm text-slate-400 font-medium">Nenhum usuário corresponde à sua busca.</p>
          </div>
        )}
      </div>
    </div>
  );
};