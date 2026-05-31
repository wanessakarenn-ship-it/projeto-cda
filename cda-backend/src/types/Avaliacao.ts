export interface Avaliacao {
    id?: number;
    ciclo_colaborador_id: number;
    avaliador_id: number;
    tipo: string;
    status: 'PENDENTE' | 'EM_ANDAMENTO' | 'FINALIZADO'; // Tipagem mais segura
    pontuacao_merito?: number;
    data_envio?: Date;
    comentario?: string;
    created_at?: Date;
    updated_at?: Date;
}