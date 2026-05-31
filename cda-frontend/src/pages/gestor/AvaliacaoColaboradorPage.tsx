import React, { useState, useEffect } from 'react';
// CORREÇÃO ts(2613): Importando com chaves {} para bater com a exportação nomeada
import { api } from '../../services/Api';

interface Colaborador {
  id: number;
  nome: string;
}

export function AvaliacaoGestor() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [selectedColab, setSelectedColab] = useState('');
  const [notas, setNotas] = useState({ entrega: 0, comportamento: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca liderados do gestor logado
    // Ajustado para o prefixo /api que definimos no backend
    api.get('/usuarios/liderados')
      .then(res => {
        setColaboradores(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar liderados:", err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    if (!selectedColab) return alert("Selecione um colaborador");

    try {
      // Ajustado para a rota correta do AvaliacaoController
      await api.post(`/avaliacoes/gestor/${selectedColab}`, {
        notas,
        cicloId: 1 // No futuro, buscar o ciclo ativo dinamicamente
      });
      alert("Avaliação do colaborador enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      alert("Erro ao enviar avaliação. Verifique o console.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Avaliar Desempenho do Time</h2>
      
      {loading ? (
        <p>Carregando liderados...</p>
      ) : (
        <>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Colaborador
          </label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setSelectedColab(e.target.value)}
            value={selectedColab}
          >
            <option value="">Selecione um liderado</option>
            {colaboradores.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nota de Entrega (0-10)</label>
              <input 
                type="number" 
                min="0" max="10"
                className="w-full p-2 border rounded mt-1"
                onChange={(e) => setNotas({ ...notas, entrega: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nota de Comportamento (0-10)</label>
              <input 
                type="number" 
                min="0" max="10"
                className="w-full p-2 border rounded mt-1"
                onChange={(e) => setNotas({ ...notas, comportamento: Number(e.target.value) })}
              />
            </div>
          </div>

          <button 
            onClick={handleSubmit} 
            disabled={!selectedColab}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400"
          >
            Salvar Avaliação
          </button>
        </>
      )}
    </div>
  );
}