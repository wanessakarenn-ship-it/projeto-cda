import React, { useState } from 'react';
import { api } from '../../services/Api'; // Importação corrigida com chaves {}

export function CriarUsuario() {
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
      
      // Limpar formulário após sucesso
      setFormData({ nome: '', email: '', senha: '', perfil: 'COLABORADOR' });
      (e.target as HTMLFormElement).reset();

    } catch (err: any) {
      console.error("Erro ao criar usuário:", err);
      const mensagem = err.response?.data?.erro || "Erro ao criar usuário.";
      alert(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Novo Acesso CDA</h2>
      
      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
          <input 
            type="text" 
            required
            placeholder="Ex: João Silva" 
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none" 
            onChange={e => setFormData({...formData, nome: e.target.value})} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Corporativo</label>
          <input 
            type="email" 
            required
            placeholder="email@empresa.com" 
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
            onChange={e => setFormData({...formData, email: e.target.value})} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Senha Inicial</label>
          <input 
            type="password" 
            required
            placeholder="No mínimo 6 caracteres" 
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
            onChange={e => setFormData({...formData, senha: e.target.value})} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Perfil de Acesso</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none bg-white" 
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
          className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-md ${
            loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Processando...' : 'Criar Acesso'}
        </button>
      </form>
    </div>
  );
}