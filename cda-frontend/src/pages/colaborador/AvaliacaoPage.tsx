import React from 'react';
import { ProfileCard } from '../../components/ProfileCard';
import { SummaryCard } from '../../components/SummaryCard';
import { CompetenciaRow } from '../../components/CompetenciaRow';

import { useAvaliacao } from '../../contexts/AvaliacaoContext';
import { usePerformance } from '../../hooks/usePerformance';
import { useCarreira } from '../../hooks/useCarreira';
import { useAuth } from '../../contexts/AuthContext'; // 1. Importado Auth

import { ShieldCheck, Trophy } from 'lucide-react';

export const AvaliacaoPage: React.FC = () => {
  const avaliacao = useAvaliacao();
  const { user } = useAuth(); // 2. Pega o usuário real do backend

  /**
   * TODO: No futuro, substituir este array por um fetch da API 
   * Ex: const { data: competencias } = await api.get(`/avaliacoes/${user?.id}`)
   */
  const competencias = [
    { id: 1, nome: 'Comunicação', categoria: 'Geral' as const, nota: 72, peso: 1.0, target: 80, level: 3 },
    { id: 2, nome: 'Entrega de Resultados', categoria: 'Geral' as const, nota: 65, peso: 1.2, target: 80, level: 2 },
    { id: 3, nome: 'Conhecimento Técnico', categoria: 'Específica' as const, nota: 70, peso: 1.5, target: 85, level: 3 },
  ];

  const performance = usePerformance(competencias);
  
  // 3. O score final agora é calculado dinamicamente pelo hook performance
  const carreira = useCarreira(performance.scoreFinal);

  return (
    <div className="grid grid-cols-12 gap-8 animate-in fade-in duration-500">
      
      {/* COLUNA ESQUERDA: Perfil e Resumo Lateral */}
      <aside className="col-span-12 lg:col-span-4 space-y-6">
        <ProfileCard
          name={user?.nome ?? 'Carregando...'} // 4. Nome dinâmico
          role={user?.perfil === 'ADMIN' ? 'Administrador' : 'Colaborador'} // 5. Cargo baseado no Perfil
          location="Unidade CDA"
          avatar={`https://ui-avatars.com/api/?name=${user?.nome}&background=6366F1&color=fff`}
          orgInfo={`UID: ${user?.firebase_uid?.substring(0, 8)}...`}
        />

        <div className="space-y-4">
          <SummaryCard
            value={performance.scoreFinal} // 6. Valor real calculado
            label="Score Final"
            subtitle={carreira.isElegivel ? 'Elegível para promoção' : 'Abaixo do score meta'}
            icon={<ShieldCheck size={22} />}
            isPositive={carreira.isElegivel}
          />

          <SummaryCard
            value={performance.aderencia} // 7. Aderência real calculada
            label="Aderência ao Cargo"
            icon={<Trophy size={22} />}
          />
        </div>
      </aside>

      {/* COLUNA DIREITA: Detalhamento por Competência */}
      <main className="col-span-12 lg:col-span-8 space-y-8">
        
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Avaliação de Competências
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Ciclo {avaliacao.ciclo} • Status: {avaliacao.status}
            </p>
          </div>

          <div
            className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm ${performance.statusBg} ${performance.statusCor}`}
          >
            Aderência: {performance.aderencia}%
          </div>
        </header>

        {/* Lista de Competências */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {competencias.map((comp) => (
              <CompetenciaRow
                key={comp.id}
                label={comp.nome}
                weight={comp.peso.toString()} // 8. Garante string para o componente
                score={comp.nota}
                target={comp.target}
                level={comp.level}
              />
            ))}
          </div>
        </section>

        {/* Mensagem de Feedback de Carreira */}
        <section
          className={`rounded-2xl p-6 border transition-all ${
            carreira.isElegivel
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm shadow-emerald-100'
              : 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm shadow-amber-100'
          }`}
        >
          <div className="flex items-center gap-3">
             {carreira.isElegivel ? <ShieldCheck size={20} /> : <Trophy size={20} className="opacity-50" />}
             <h3 className="text-sm font-black uppercase tracking-tight">Status de Carreira</h3>
          </div>
          <p className="text-sm mt-2 font-medium leading-relaxed">
            {carreira.mensagem}
          </p>
        </section>
      </main>
    </div>
  );
};

export default AvaliacaoPage;