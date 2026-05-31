-- ============================================
-- Script de Massa de Testes
-- Sistema de Ciclo de Desempenho
-- ============================================

-- ============================================
-- 1. INSERIR USUÁRIOS
-- ============================================

-- Gestores
INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES
('Carlos Silva', 'carlos.silva@empresa.com', '$2b$10$hash', 'GESTOR'),
('Mariana Costa', 'mariana.costa@empresa.com', '$2b$10$hash', 'GESTOR'),
('Roberto Santos', 'roberto.santos@empresa.com', '$2b$10$hash', 'GESTOR');

-- RH
INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES
('Ana Paula Oliveira', 'ana.oliveira@empresa.com', '$2b$10$hash', 'RH'),
('Fernando Lima', 'fernando.lima@empresa.com', '$2b$10$hash', 'RH');

-- Colaboradores
INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES
('João Pedro Alves', 'joao.alves@empresa.com', '$2b$10$hash', 'COLABORADOR'),
('Maria Fernanda Souza', 'maria.souza@empresa.com', '$2b$10$hash', 'COLABORADOR'),
('Lucas Martins', 'lucas.martins@empresa.com', '$2b$10$hash', 'COLABORADOR'),
('Juliana Rocha', 'juliana.rocha@empresa.com', '$2b$10$hash', 'COLABORADOR'),
('Paulo Henrique', 'paulo.henrique@empresa.com', '$2b$10$hash', 'COLABORADOR'),
('Camila Torres', 'camila.torres@empresa.com', '$2b$10$hash', 'COLABORADOR'),
('Rafael Cardoso', 'rafael.cardoso@empresa.com', '$2b$10$hash', 'COLABORADOR'),
('Beatriz Nunes', 'beatriz.nunes@empresa.com', '$2b$10$hash', 'COLABORADOR'),
('Diego Ferreira', 'diego.ferreira@empresa.com', '$2b$10$hash', 'COLABORADOR'),
('Patricia Gomes', 'patricia.gomes@empresa.com', '$2b$10$hash', 'COLABORADOR');

-- Admin
INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES
('Administrador Sistema', 'admin@empresa.com', '$2b$10$hash', 'ADMIN');

-- ============================================
-- 2. INSERIR COLABORADORES
-- ============================================

-- Gestores como colaboradores
INSERT INTO colaboradores (usuario_id, matricula, cargo, departamento, data_admissao, status) VALUES
(1, 'GEST001', 'Gerente de TI', 'Tecnologia', '2020-01-15', 'ATIVO'),
(2, 'GEST002', 'Gerente de Vendas', 'Comercial', '2019-06-20', 'ATIVO'),
(3, 'GEST003', 'Gerente de Operações', 'Operações', '2021-03-10', 'ATIVO');

-- Colaboradores regulares
INSERT INTO colaboradores (usuario_id, matricula, cargo, departamento, gestor_id, data_admissao, status) VALUES
(6, 'COL001', 'Desenvolvedor Pleno', 'Tecnologia', 1, '2022-04-01', 'ATIVO'),
(7, 'COL002', 'Analista de Vendas', 'Comercial', 2, '2023-02-15', 'ATIVO'),
(8, 'COL003', 'Desenvolvedor Junior', 'Tecnologia', 1, '2024-08-01', 'EXPERIENCIA'),
(9, 'COL004', 'Coordenadora de Projetos', 'Operações', 3, '2021-11-20', 'ATIVO'),
(10, 'COL005', 'Analista de Sistemas', 'Tecnologia', 1, '2023-05-10', 'ATIVO'),
(11, 'COL006', 'Executiva de Contas', 'Comercial', 2, '2022-09-05', 'ATIVO'),
(12, 'COL007', 'Desenvolvedor Senior', 'Tecnologia', 1, '2020-07-15', 'ATIVO'),
(13, 'COL008', 'Assistente de Vendas', 'Comercial', 2, '2024-09-15', 'EXPERIENCIA'),
(14, 'COL009', 'Analista de Operações', 'Operações', 3, '2023-01-20', 'ATIVO'),
(15, 'COL010', 'Coordenadora Administrativa', 'Operações', 3, '2021-04-10', 'ATIVO');

-- ============================================
-- 3. INSERIR CICLOS DE DESEMPENHO
-- ============================================

INSERT INTO ciclos_desempenho (nome, ano, tipo_ciclo, data_inicio, data_fim, status, descricao) VALUES
('Ciclo Anual 2023', 2023, 'ANUAL', '2023-01-01', '2023-12-31', 'FINALIZADO', 'Avaliação de desempenho anual de 2023'),
('Ciclo Anual 2024', 2024, 'ANUAL', '2024-01-01', '2024-12-31', 'FINALIZADO', 'Avaliação de desempenho anual de 2024'),
('Ciclo Anual 2025', 2025, 'ANUAL', '2025-01-01', '2025-12-31', 'ATIVO', 'Avaliação de desempenho anual de 2025'),
('Experiência Lucas - Ago/2024', 2024, 'EXPERIENCIA', '2024-08-01', '2024-10-31', 'FINALIZADO', 'Período de experiência - Lucas Martins'),
('Experiência Beatriz - Set/2024', 2024, 'EXPERIENCIA', '2024-09-15', '2024-12-15', 'FINALIZADO', 'Período de experiência - Beatriz Nunes');

-- ============================================
-- 4. INSERIR COMPETÊNCIAS
-- ============================================

INSERT INTO competencias (nome, descricao, peso, ativo) VALUES
('Trabalho em Equipe', 'Capacidade de colaborar e trabalhar em grupo', 1.00, TRUE),
('Comunicação', 'Habilidade de comunicação clara e efetiva', 1.00, TRUE),
('Liderança', 'Capacidade de liderar e inspirar equipes', 1.50, TRUE),
('Inovação', 'Busca por soluções criativas e inovadoras', 1.20, TRUE),
('Produtividade', 'Entrega de resultados com eficiência', 1.30, TRUE),
('Conhecimento Técnico', 'Domínio das ferramentas e tecnologias', 1.40, TRUE),
('Resolução de Problemas', 'Capacidade analítica e solução de desafios', 1.20, TRUE),
('Gestão do Tempo', 'Organização e cumprimento de prazos', 1.10, TRUE);

-- ============================================
-- 5. INSERIR METAS (Colaboradores Ativos - Ciclo 2025)
-- ============================================

-- Metas do João (COL001)
INSERT INTO metas (colaborador_id, ciclo_id, titulo, descricao, peso, meta_valor, valor_atingido, percentual_atingido) VALUES
(4, 3, 'Desenvolver 3 módulos do sistema', 'Concluir desenvolvimento de 3 módulos críticos', 1.50, 3.00, 3.00, 100.00),
(4, 3, 'Reduzir bugs em 20%', 'Diminuir quantidade de bugs reportados', 1.20, 20.00, 18.00, 90.00);

-- Metas da Maria (COL002)
INSERT INTO metas (colaborador_id, ciclo_id, titulo, descricao, peso, meta_valor, valor_atingido, percentual_atingido) VALUES
(5, 3, 'Atingir R$ 500k em vendas', 'Meta de vendas trimestrais', 2.00, 500000.00, 520000.00, 104.00),
(5, 3, 'Captar 10 novos clientes', 'Prospecção e fechamento de novos clientes', 1.50, 10.00, 12.00, 120.00);

-- Metas do Paulo (COL005)
INSERT INTO metas (colaborador_id, ciclo_id, titulo, descricao, peso, meta_valor, valor_atingido, percentual_atingido) VALUES
(8, 3, 'Implementar sistema de monitoramento', 'Configurar e implementar alertas', 1.50, 1.00, 0.80, 80.00),
(8, 3, 'Documentar processos técnicos', 'Criar documentação de 5 processos', 1.00, 5.00, 5.00, 100.00);

-- ============================================
-- 6. INSERIR AVALIAÇÕES (Exemplos)
-- ============================================

-- Avaliação João - Ciclo 2025
INSERT INTO avaliacoes (colaborador_id, avaliador_id, ciclo_id, tipo_avaliacao, status, data_conclusao) VALUES
(4, 1, 3, 'AVALIACAO_GESTOR', 'CONCLUIDA', '2025-11-01');

-- Avaliação Maria - Ciclo 2025
INSERT INTO avaliacoes (colaborador_id, avaliador_id, ciclo_id, tipo_avaliacao, status, data_conclusao) VALUES
(5, 2, 3, 'AVALIACAO_GESTOR', 'CONCLUIDA', '2025-11-02');

-- Avaliação Paulo - Ciclo 2025
INSERT INTO avaliacoes (colaborador_id, avaliador_id, ciclo_id, tipo_avaliacao, status, data_conclusao) VALUES
(8, 1, 3, 'AVALIACAO_GESTOR', 'CONCLUIDA', '2025-11-03');

-- ============================================
-- 7. INSERIR NOTAS DAS COMPETÊNCIAS
-- ============================================

-- Notas João (Avaliação ID 1)
INSERT INTO avaliacoes_competencias (avaliacao_id, competencia_id, nota, observacao) VALUES
(1, 1, 9.0, 'Excelente colaboração em projetos'),
(1, 2, 8.5, 'Comunicação clara e objetiva'),
(1, 4, 8.0, 'Propõe soluções criativas'),
(1, 5, 9.5, 'Alta produtividade'),
(1, 6, 9.0, 'Domínio técnico avançado'),
(1, 7, 8.5, 'Resolve problemas complexos');

-- Notas Maria (Avaliação ID 2)
INSERT INTO avaliacoes_competencias (avaliacao_id, competencia_id, nota, observacao) VALUES
(2, 1, 9.5, 'Integração perfeita com a equipe'),
(2, 2, 10.0, 'Comunicação excepcional com clientes'),
(2, 3, 8.0, 'Demonstra potencial de liderança'),
(2, 5, 9.5, 'Supera metas consistentemente'),
(2, 7, 8.5, 'Resolve objeções com eficiência');

-- Notas Paulo (Avaliação ID 3)
INSERT INTO avaliacoes_competencias (avaliacao_id, competencia_id, nota, observacao) VALUES
(3, 1, 8.0, 'Colabora bem com a equipe'),
(3, 2, 7.5, 'Boa comunicação técnica'),
(3, 5, 7.5, 'Produtividade adequada'),
(3, 6, 8.5, 'Bom conhecimento técnico'),
(3, 8, 7.0, 'Pode melhorar gestão de prazos');

-- ============================================
-- 8. INSERIR RESULTADOS DO CICLO
-- ============================================

INSERT INTO resultados_ciclo (colaborador_id, ciclo_id, score_competencias, score_metas, score_merito, score_potencial, posicao_ninebox, recomendacao) VALUES
(4, 3, 8.75, 95.00, 91.88, 8.50, 'ALTO_DESEMPENHO_ALTO_POTENCIAL', 'Colaborador destaque. Considerar para posições de liderança.'),
(5, 3, 9.08, 112.00, 110.54, 9.00, 'ALTO_DESEMPENHO_ALTO_POTENCIAL', 'Performance excepcional. Preparar para expansão de responsabilidades.'),
(8, 3, 7.75, 90.00, 88.88, 7.50, 'DESEMPENHO_MEDIO_POTENCIAL_MEDIO', 'Performance adequada. Acompanhar desenvolvimento.');

-- ============================================
-- 9. CONFIGURAR NINE BOX
-- ============================================

INSERT INTO configuracoes_ninebox (nome_quadrante, posicao_x, posicao_y, descricao, cor, acoes_recomendadas) VALUES
('Baixo Desempenho / Baixo Potencial', 1, 1, 'Requer atenção imediata', '#FF4444', 'Plano de melhoria ou desligamento'),
('Desempenho Médio / Baixo Potencial', 2, 1, 'Necessita desenvolvimento', '#FFA500', 'Treinamento intensivo'),
('Alto Desempenho / Baixo Potencial', 3, 1, 'Especialista técnico', '#FFFF00', 'Reconhecimento como especialista'),
('Baixo Desempenho / Potencial Médio', 1, 2, 'Requer suporte', '#FF8C00', 'Mentoria e acompanhamento'),
('Desempenho Médio / Potencial Médio', 2, 2, 'Core do time', '#90EE90', 'Desenvolvimento contínuo'),
('Alto Desempenho / Potencial Médio', 3, 2, 'Profissional sólido', '#32CD32', 'Manter engajamento'),
('Baixo Desempenho / Alto Potencial', 1, 3, 'Diamante bruto', '#87CEEB', 'Coaching e desafios'),
('Desempenho Médio / Alto Potencial', 2, 3, 'Talento em desenvolvimento', '#4169E1', 'Aceleração de carreira'),
('Alto Desempenho / Alto Potencial', 3, 3, 'Estrela da organização', '#00FF00', 'Sucessão e liderança');

-- ============================================
-- FIM DO SCRIPT DE MASSA DE TESTES
-- ============================================
