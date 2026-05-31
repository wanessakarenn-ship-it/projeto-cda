export interface CicloDesempenho {
  id: number;
  nome: string;
  dataInicio: Date;
  dataFim: Date;
  status: 'PLANEJADO' | 'EM_ANDAMENTO' | 'ENCERRADO';
  criadoEm?: Date;
}
