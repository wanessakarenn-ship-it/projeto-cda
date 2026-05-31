import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { SummaryCard } from '../../components/SummaryCard';
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Users, 
  Download, 
  Loader2,
  FileSpreadsheet
} from 'lucide-react';

export const RelatoriosPage: React.FC = () => {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState<number | null>(null);

  /**
   * 🔗 INTEGRAÇÃO BACKEND
   * Exemplo de função para disparar o download via API
   */
  const handleGenerateReport = async (reportId: number) => {
    setIsGenerating(reportId);
    
    // Simulação de chamada: await api.get(`/relatorios/gerar/${reportId}`, { responseType: 'blob' })
    setTimeout(() => {
      setIsGenerating(null);
      alert('Relatório gerado com sucesso! O download começará em breve.');
    }, 1500);
  };

  const relatorios = [
    {
      id: 1,
      titulo: 'Relatório Geral do Ciclo',
      descricao: 'Resumo completo de desempenho e potencial consolidado.',
      tipo: 'PDF',
    },
    {
      id: 2,
      titulo: 'Nine Box Consolidado',
      descricao: 'Distribuição detalhada dos colaboradores na matriz talento.',
      tipo: 'XLSX',
    },
    {
      id: 3,
      titulo: 'Desempenho por Área',
      descricao: 'Comparativo de médias e metas entre departamentos.',
      tipo: 'PDF',
    },
    {
      id: 4,
      titulo: 'Evolução Histórica',
      descricao: 'Análise de crescimento comparando os últimos 3 ciclos.',
      tipo: 'XLSX',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Cabeçalho */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Relatórios Estratégicos
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Visualização de <span className="font-bold text-slate-700">{user?.perfil}</span> • Indicadores do Ciclo 2026
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button className="px-4 py-1.5 text-[10px] font-black uppercase bg-white rounded-xl shadow-sm text-slate-700">Individual</button>
          <button className="px-4 py-1.5 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600">Equipe</button>
        </div>
      </header>

      {/* Cards de Métricas Reais */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          value="82%"
          label="Média de Mérito"
          isPositive
          icon={<TrendingUp size={20} className="text-emerald-500" />}
        />
        <SummaryCard
          value="18"
          label="Gerados (Mês)"
          icon={<FileText size={20} className="text-indigo-500" />}
        />
        <SummaryCard
          value="96"
          label="Avaliados"
          icon={<Users size={20} className="text-slate-400" />}
        />
        <SummaryCard
          value="+6%"
          label="Evolução"
          isPositive
          icon={<BarChart3 size={20} className="text-indigo-500" />}
        />
      </section>

      {/* Lista de Relatórios com Feedback de Loading */}
      <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden text-left">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
            Documentos Disponíveis
          </h2>
          <span className="text-[10px] font-bold text-slate-400">Total: {relatorios.length}</span>
        </div>

        <div className="divide-y divide-slate-100">
          {relatorios.map((relatorio) => (
            <div
              key={relatorio.id}
              className="flex items-center justify-between px-8 py-5 hover:bg-slate-50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${relatorio.tipo === 'PDF' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {relatorio.tipo === 'PDF' ? <FileText size={20} /> : <FileSpreadsheet size={20} />}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-700 group-hover:text-indigo-600 transition-colors">
                    {relatorio.titulo}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    {relatorio.descricao}
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={isGenerating !== null}
                onClick={() => handleGenerateReport(relatorio.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-slate-900 text-white hover:bg-indigo-600 disabled:bg-slate-200 transition-all active:scale-95"
              >
                {isGenerating === relatorio.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                {isGenerating === relatorio.id ? 'Gerando...' : 'Gerar'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Informativo */}
      <div className="bg-indigo-600 rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="relative z-10 text-left">
          <h3 className="text-lg font-black">Exportação em Massa</h3>
          <p className="text-sm opacity-80 max-w-md mt-1">
            Precisa de todos os dados brutos? Gere um arquivo CSV completo com todas as avaliações deste ciclo.
          </p>
        </div>
        <button className="relative z-10 px-8 py-3 bg-white text-indigo-600 font-black rounded-2xl shadow-xl hover:bg-indigo-50 transition-all active:scale-95">
          Baixar Dados Brutos (.CSV)
        </button>
        {/* Elemento Decorativo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
      </div>
    </div>
  );
};

export default RelatoriosPage;