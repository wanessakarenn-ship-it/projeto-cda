import { useEffect } from 'react';

export type LembreteStatus = 'Finalizado' | 'Em andamento' | 'Pendente';

interface UseLembretesParams {
  prazoFinal?: string | null; // ISO, YYYY-MM-DD ou null enquanto carrega
  status: LembreteStatus;
  diasAlerta?: number; // quantos dias antes do prazo emitir alerta
}

/**
 * ============================
 * useLembretes
 * ============================
 * Hook responsável por disparar lembretes de prazo
 *
 * Exemplo de uso:
 * - Avaliações próximas do vencimento
 * - Metas com data limite
 *
 * Regras:
 * - Não alerta se estiver FINALIZADO
 * - Só alerta dentro da janela definida por diasAlerta
 */
export const useLembretes = ({
  prazoFinal,
  status,
  diasAlerta = 5,
}: UseLembretesParams): void => {
  useEffect(() => {
    // 1. Ignora se estiver finalizado
    if (status === 'Finalizado') return;

    // 2. Ignora se ainda não houver prazo (dados async)
    if (!prazoFinal) return;

    const hoje = new Date();
    const prazo = new Date(prazoFinal);

    // Proteção contra data inválida
    if (isNaN(prazo.getTime())) {
      console.warn('⚠️ Prazo inválido informado:', prazoFinal);
      return;
    }

    // Diferença em dias (arredondando para cima)
    const diffEmDias = Math.ceil(
      (prazo.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
    );

    // 3. Dispara lembrete apenas dentro da janela configurada
    if (diffEmDias <= diasAlerta && diffEmDias >= 0) {
      console.warn(
        `⏰ Lembrete: prazo vence em ${diffEmDias} dia(s).`
      );
    }
  }, [prazoFinal, status, diasAlerta]);
};
