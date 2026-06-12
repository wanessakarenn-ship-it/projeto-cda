import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/Api'; // Importação corrigida com chaves {}
import { ArrowLeft, Loader2 } from 'lucide-react';

export function CriarUsuario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    nome: '', 
    email: '', 
    senha: '', 
    perfil: 'COLABORADOR' 
  });
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      /**
       * Rota atualizada para /usuarios conforme definido no app.ts e usuarioRoutes.ts.
       * O backend receberá os dados e salvará no Supabase via Prisma.
       */
      await api.post('/usuarios', formData);
      
      alert("Usuário criado com sucesso no CDA!");
      
      // Voltar para a listagem
      navigate('/admin/usuarios');

    } catch (err: any) {
      console.error("Erro ao criar usuário:", err);
      const mensagem = err.response?.data?.erro || "Erro ao criar usuário.";
      alert(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 mt-10 text-left">
      <button
        type="button"
        onClick={() => navigate('/admin/usuarios')}
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar para Usuários
      </button>

      <div className="glass-card p-8 border border-slate-800/80">
        <h2 className="text-2xl font-black text-white tracking-tight mb-6">Novo Acesso CDA</h2>
        
        <form onSubmit={handleCreate} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Nome Completo</label>
            <input 
              type="text" 
              required
              placeholder="Ex: João Silva" 
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all" 
              onChange={e => setFormData({...formData, nome: e.target.value})} 
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Email Corporativo</label>
            <input 
              type="email" 
              required
              placeholder="email@empresa.com" 
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all"
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Senha Inicial</label>
            <input 
              type="password" 
              required
              placeholder="No mínimo 6 caracteres" 
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all"
              onChange={e => setFormData({...formData, senha: e.target.value})} 
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Perfil de Acesso</label>
            <select 
              className="w-full rounded-xl border border-slate-800 bg-[#0F1424] px-4 py-2.5 text-xs font-bold text-slate-200 focus:border-indigo-500 outline-none transition-all" 
              value={formData.perfil}
              onChange={e => setFormData({...formData, perfil: e.target.value})}
            >
              <option value="COLABORADOR">Colaborador</option>
              <option value="GESTOR">Gestor</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-xs text-white transition-all shadow-xl flex items-center justify-center gap-2 ${
              loading ? 'bg-slate-800 text-slate-500' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/10 active:scale-95'
            }`}
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {loading ? 'Processando...' : 'Criar Acesso'}
          </button>
        </form>
      </div>
    </div>
  );
}