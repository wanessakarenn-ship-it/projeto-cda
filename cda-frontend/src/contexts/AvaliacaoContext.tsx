import {
  createContext,
  useContext,
  ReactNode,
  useMemo
} from 'react';

// Tipagem dos dados da avaliação
export interface AvaliacaoContextData {
  ciclo: string;
  status: string;
  resultadoFinal: number;         // Ex: 68.9
  resultadoCompetencias: number;  // Ex: 22.9
  aderenciaCargo: number;        // Ex: 78
  diferenca: number;             // Ex: -25
  formatted: {
    final: string;
    competencias: string;
    aderencia: string;
    diferenca: string;
  }
}

// Criamos o contexto com um valor indefinido inicialmente
const AvaliacaoContext = createContext<AvaliacaoContextData | undefined>(
  undefined
);

interface AvaliacaoProviderProps {
  children: ReactNode;
}

export const AvaliacaoProvider = ({ children }: AvaliacaoProviderProps) => {
  // Dados simulados (Mock)
  // useMemo evita renderizações desnecessárias dos componentes que consomem este contexto
  const dados: AvaliacaoContextData = useMemo(() => {
    const rawValues = {
      ciclo: '1T 2024',
      status: 'Finalizado',
      resultadoFinal: 68.9,
      resultadoCompetencias: 22.9,
      aderenciaCargo: 78,
      diferenca: -25, // Diferença em relação ao ciclo anterior ou meta
    };

    return {
      ...rawValues,
      formatted: {
        // Converte ponto em vírgula para o padrão brasileiro de exibição
        final: `${rawValues.resultadoFinal.toString().replace('.', ',')}%`,
        competencias: `${rawValues.resultadoCompetencias.toString().replace('.', ',')}%`,
        aderencia: `${rawValues.aderenciaCargo}%`,
        diferenca: rawValues.diferenca > 0 
          ? `+${rawValues.diferenca}%` 
          : `${rawValues.diferenca}%`,
      }
    };
  }, []);

  return (
    <AvaliacaoContext.Provider value={dados}>
      {children}
    </AvaliacaoContext.Provider>
  );
};

/**
 * Hook customizado useAvaliacao
 * Permite acessar os dados de performance em qualquer lugar do app (Dashboard, Sidebar, Header)
 */
export const useAvaliacao = () => {
  const context = useContext(AvaliacaoContext);

  if (!context) {
    throw new Error(
      'useAvaliacao deve ser usado obrigatoriamente dentro de um AvaliacaoProvider'
    );
  }

  return context;
};