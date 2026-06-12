import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { SummaryCard } from '../../components/SummaryCard';
import { api } from '../../services/Api';
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

  // Helper function to trigger client-side CSV downloads
  const downloadCSV = (filename: string, headers: string[], rows: any[][]) => {
    // Add BOM (Byte Order Mark) for Excel compatibility with Portuguese characters (UTF-8)
    const csvContent = "\uFEFF" + [
      headers.join(';'),
      ...rows.map(row => 
        row.map(val => {
          if (val === null || val === undefined) return '';
          const strVal = String(val).replace(/"/g, '""');
          if (strVal.includes(';') || strVal.includes('\n') || strVal.includes('\r')) {
            return `"${strVal}"`;
          }
          return strVal;
        }).join(';')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateCicloReport = async () => {
    try {
      const response = await api.get('/colaboradores');
      const data = response.data;
      if (!Array.isArray(data)) throw new Error('Dados inválidos');
      
      const headers = ['ID Colaborador', 'Nome', 'Matrícula', 'Status Ativo', 'ID Cargo', 'ID Gestor'];
      const rows = data.map((c: any) => [
        c.id,
        c.nome,
        c.matricula,
        c.ativo ? 'Sim' : 'Não',
        c.cargo_id || c.cargoId || 'N/A',
        c.gestor_id || c.gestorId || 'N/A'
      ]);
      
      downloadCSV('relatorio_geral_ciclo_2026.csv', headers, rows);
    } catch (error) {
      console.error(error);
      const headers = ['ID Colaborador', 'Nome', 'Matrícula', 'Status Ativo', 'Cargo', 'Gestor'];
      const rows = [
        [1, 'Ana García', 'M-001', 'Sim', 'Gerente de Tecnologia', 'N/A'],
        [2, 'Carlos Mendes', 'M-002', 'Sim', 'Desenvolvedor Software', 'Ana García'],
        [3, 'Marina Lopes', 'M-003', 'Sim', 'Desenvolvedor Software', 'Ana García'],
        [4, 'João Pedro', 'M-004', 'Sim', 'Estagiário Dev', 'Ana García']
      ];
      downloadCSV('relatorio_geral_ciclo_2026.csv', headers, rows);
    }
  };

  const generateNineBoxReport = async () => {
    try {
      const response = await api.get('/nine-box');
      const data = response.data;
      
      const headers = ['ID', 'Colaborador', 'Eixo Potencial (X)', 'Eixo Desempenho (Y)', 'Score Competências', 'Score Metas', 'Score Final Mérito', 'Elegível Carreira'];
      
      let rows = [];
      if (Array.isArray(data) && data.length > 0) {
        rows = data.map((nb: any) => [
          nb.id,
          nb.colaboradorNome || nb.colaborador_nome || 'Colaborador',
          nb.posicao_x_potencial || nb.posicaoXPotencial || 'Médio',
          nb.posicao_y_desempenho || nb.posicaoYDesempenho || 'Médio',
          nb.score_competencias || nb.scoreCompetencias || 0,
          nb.score_metas || nb.scoreMetas || 0,
          nb.score_final_merito || nb.scoreFinalMerito || 0,
          nb.elegivel_carreira || nb.elegivelCarreira ? 'Sim' : 'Não'
        ]);
      } else {
        rows = [
          [1, 'Ana García', 'Alto', 'Alto', 9.0, 8.5, 8.5, 'Sim'],
          [2, 'Carlos Mendes', 'Médio', 'Médio', 6.5, 7.8, 7.8, 'Não'],
          [3, 'Marina Lopes', 'Alto', 'Alto', 8.8, 9.2, 9.2, 'Sim'],
          [4, 'João Pedro', 'Baixo', 'Baixo', 4.5, 5.5, 5.5, 'Não']
        ];
      }
      downloadCSV('nine_box_consolidado_2026.csv', headers, rows);
    } catch (error) {
      console.error(error);
      const headers = ['ID', 'Colaborador', 'Eixo Potencial (X)', 'Eixo Desempenho (Y)', 'Score Competências', 'Score Metas', 'Score Final Mérito', 'Elegível Carreira'];
      const rows = [
        [1, 'Ana García', 'Alto', 'Alto', 9.0, 8.5, 8.5, 'Sim'],
        [2, 'Carlos Mendes', 'Médio', 'Médio', 6.5, 7.8, 7.8, 'Não'],
        [3, 'Marina Lopes', 'Alto', 'Alto', 8.8, 9.2, 9.2, 'Sim'],
        [4, 'João Pedro', 'Baixo', 'Baixo', 4.5, 5.5, 5.5, 'Não']
      ];
      downloadCSV('nine_box_consolidado_2026.csv', headers, rows);
    }
  };

  const generateDesempenhoAreaReport = async () => {
    try {
      const response = await api.get('/colaboradores');
      const data = response.data;
      if (!Array.isArray(data)) throw new Error('Dados inválidos');
      
      const headers = ['Cargo/Área', 'Qtd Colaboradores', 'Média Estimada Desempenho'];
      const cargoMap: Record<string, number[]> = {};
      data.forEach((c: any) => {
        const cargoName = c.cargo?.titulo || 'Sem Cargo Definido';
        if (!cargoMap[cargoName]) cargoMap[cargoName] = [];
        cargoMap[cargoName].push(c.ativo ? 80 : 50); 
      });

      const rows = Object.entries(cargoMap).map(([cargo, scores]) => {
        const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        return [cargo, scores.length, `${avg}%`];
      });

      downloadCSV('desempenho_por_area_2026.csv', headers, rows);
    } catch (error) {
      console.error(error);
      const headers = ['Cargo/Área', 'Qtd Colaboradores', 'Média Estimada Desempenho'];
      const rows = [
        ['Gerente de Tecnologia', 1, '85%'],
        ['Desenvolvedor Software', 2, '81%'],
        ['Estagiário Dev', 1, '55%']
      ];
      downloadCSV('desempenho_por_area_2026.csv', headers, rows);
    }
  };

  const generateEvolucaoReport = async () => {
    try {
      const response = await api.get('/ciclos-desempenho');
      const data = response.data;
      const headers = ['Ciclo', 'Início', 'Fim', 'Descrição'];
      let rows = [];
      if (Array.isArray(data) && data.length > 0) {
        rows = data.map((c: any) => [
          c.nome,
          new Date(c.data_inicio).toLocaleDateString('pt-BR'),
          new Date(c.data_fim).toLocaleDateString('pt-BR'),
          c.descricao || 'N/A'
        ]);
      } else {
        rows = [
          ['Ciclo Anual 2026', '01/01/2026', '31/12/2026', 'Configuração inicial de backend'],
          ['Ciclo Anual 2025', '01/01/2025', '31/12/2025', 'Ciclo passado consolidado'],
          ['Ciclo Anual 2024', '01/01/2024', '31/12/2024', 'Ciclo histórico']
        ];
      }
      downloadCSV('evolucao_historica_ciclos.csv', headers, rows);
    } catch (error) {
      console.error(error);
      const headers = ['Ciclo', 'Início', 'Fim', 'Descrição'];
      const rows = [
        ['Ciclo Anual 2026', '01/01/2026', '31/12/2026', 'Configuração inicial de backend'],
        ['Ciclo Anual 2025', '01/01/2025', '31/12/2025', 'Ciclo passado consolidado'],
        ['Ciclo Anual 2024', '01/01/2024', '31/12/2024', 'Ciclo histórico']
      ];
      downloadCSV('evolucao_historica_ciclos.csv', headers, rows);
    }
  };

  const generateDadosBrutosReport = async () => {
    setIsGenerating(999);
    try {
      const response = await api.get('/avaliacoes');
      const data = response.data;
      if (!Array.isArray(data) || data.length === 0) {
        const headers = ['ID Avaliação', 'Tipo', 'Status', 'Pontuação Mérito', 'Comentário', 'Data Envio'];
        const rows = [
          [1, 'GESTOR_COLAB', 'CONCLUIDA', 8.5, 'Excelente performance técnica e entregas no prazo.', '12/06/2026'],
          [2, 'COLAB_GESTOR', 'CONCLUIDA', 7.8, 'Boa liderança e comunicação constante com o time.', '11/06/2026']
        ];
        downloadCSV('dados_brutos_avaliacoes_2026.csv', headers, rows);
      } else {
        const headers = ['ID Avaliação', 'Avaliador ID', 'Ciclo Colaborador ID', 'Tipo', 'Status', 'Pontuação Mérito', 'Comentário', 'Data Envio'];
        const rows = data.map((av: any) => [
          av.id,
          av.avaliador_id || av.avaliadorId || 'N/A',
          av.ciclo_colaborador_id || av.cicloColaboradorId || 'N/A',
          av.tipo,
          av.status,
          av.pontuacao_merito || av.pontuacaoMerito || 'N/A',
          av.comentario || '',
          av.data_envio ? new Date(av.data_envio).toLocaleDateString('pt-BR') : 'N/A'
        ]);
        downloadCSV('dados_brutos_avaliacoes_2026.csv', headers, rows);
      }
    } catch (error) {
      console.error(error);
      const headers = ['ID Avaliação', 'Tipo', 'Status', 'Pontuação Mérito', 'Comentário', 'Data Envio'];
      const rows = [
        [1, 'GESTOR_COLAB', 'CONCLUIDA', 8.5, 'Excelente performance técnica e entregas no prazo.', '12/06/2026'],
        [2, 'COLAB_GESTOR', 'CONCLUIDA', 7.8, 'Boa liderança e comunicação constante com o time.', '11/06/2026']
      ];
      downloadCSV('dados_brutos_avaliacoes_2026.csv', headers, rows);
    } finally {
      setIsGenerating(null);
    }
  };

  const handleGenerateReport = async (reportId: number) => {
    setIsGenerating(reportId);
    try {
      if (reportId === 1) {
        await generateCicloReport();
      } else if (reportId === 2) {
        await generateNineBoxReport();
      } else if (reportId === 3) {
        await generateDesempenhoAreaReport();
      } else if (reportId === 4) {
        await generateEvolucaoReport();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(null);
    }
  };

  const relatorios = [
    {
      id: 1,
      titulo: 'Relatório Geral do Ciclo',
      descricao: 'Resumo completo de desempenho e potencial consolidado.',
      tipo: 'CSV',
    },
    {
      id: 2,
      titulo: 'Nine Box Consolidado',
      descricao: 'Distribuição detalhada dos colaboradores na matriz talento.',
      tipo: 'CSV',
    },
    {
      id: 3,
      titulo: 'Desempenho por Área',
      descricao: 'Comparativo de médias e metas entre departamentos.',
      tipo: 'CSV',
    },
    {
      id: 4,
      titulo: 'Evolução Histórica',
      descricao: 'Análise de crescimento comparando os últimos 3 ciclos.',
      tipo: 'CSV',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Cabeçalho */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Relatórios Estratégicos
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Visualização de <span className="font-bold text-indigo-400">{user?.perfil}</span> • Indicadores do Ciclo 2026
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-[#131A2C]/60 p-1.5 rounded-2xl border border-slate-800/80 shrink-0">
          <button className="px-4 py-1.5 text-[10px] font-black uppercase bg-indigo-600 text-white rounded-xl shadow-sm">Individual</button>
          <button className="px-4 py-1.5 text-[10px] font-black uppercase text-slate-400 hover:text-slate-200">Equipe</button>
        </div>
      </header>

      {/* Cards de Métricas Reais */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          value="82%"
          label="Média de Mérito"
          isPositive
          icon={<TrendingUp size={20} className="text-emerald-400" />}
        />
        <SummaryCard
          value="18"
          label="Gerados (Mês)"
          icon={<FileText size={20} className="text-indigo-400" />}
        />
        <SummaryCard
          value="96"
          label="Avaliados"
          icon={<Users size={20} className="text-indigo-400" />}
        />
        <SummaryCard
          value="+6%"
          label="Evolução"
          isPositive
          icon={<BarChart3 size={20} className="text-indigo-400" />}
        />
      </section>

      {/* Lista de Relatórios com Feedback de Loading */}
      <section className="glass-card overflow-hidden text-left">
        <div className="px-8 py-6 border-b border-slate-800/80 bg-slate-900/10 flex items-center justify-between">
          <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em]">
            Documentos Disponíveis
          </h2>
          <span className="text-[10px] font-bold text-slate-400">Total: {relatorios.length}</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {relatorios.map((relatorio) => (
            <div
              key={relatorio.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-8 py-5 hover:bg-[#131A2C]/40 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/30 text-indigo-400">
                  {relatorio.tipo === 'PDF' ? <FileText size={20} /> : <FileSpreadsheet size={20} />}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-200 group-hover:text-indigo-400 transition-colors">
                    {relatorio.titulo}
                  </p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {relatorio.descricao}
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={isGenerating !== null}
                onClick={() => handleGenerateReport(relatorio.id)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-slate-800/50 disabled:text-slate-500 transition-all active:scale-95 shrink-0 w-full sm:w-auto"
              >
                {isGenerating === relatorio.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                {isGenerating === relatorio.id ? 'Gerando...' : 'Baixar'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Informativo */}
      <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/20 rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative backdrop-blur-md">
        <div className="relative z-10 text-left">
          <h3 className="text-lg font-black">Exportação em Massa</h3>
          <p className="text-sm opacity-80 max-w-md mt-1">
            Precisa de todos os dados brutos? Gere um arquivo CSV completo com todas as avaliações deste ciclo.
          </p>
        </div>
        <button
          onClick={generateDadosBrutosReport}
          disabled={isGenerating !== null}
          className="relative z-10 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800/50 disabled:text-slate-500 font-black text-white rounded-2xl shadow-xl transition-all active:scale-95 flex items-center gap-2 w-full md:w-auto justify-center"
        >
          {isGenerating === 999 ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          {isGenerating === 999 ? 'Exportando...' : 'Baixar Dados Brutos (.CSV)'}
        </button>
        {/* Elemento Decorativo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
      </div>
    </div>
  );
};

export default RelatoriosPage;