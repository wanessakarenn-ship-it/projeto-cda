QUERIES – ENDPOINTS DO GESTOR (CDA 2026)
1️⃣ Dashboard do Gestor – Visão Geral da Equipe

Endpoint: GET /api/gestor/dashboard/:gestorId/:cicloId

SELECT
    col.id                         AS colaborador_id,
    col.matricula,
    col.nome,
    cargo.titulo                   AS cargo,
    cc.status_experiencia,
    COUNT(DISTINCT a.id)           AS total_avaliacoes,
    COUNT(DISTINCT CASE WHEN a.status = 'FINALIZADO' THEN a.id END) AS avaliacoes_concluidas,
    nb.score_final_merito,
    nb.posicao_y_desempenho,
    nb.posicao_x_potencial,
    CASE
        WHEN nb.score_final_merito >= 4.5 THEN 'EXCELENTE'
        WHEN nb.score_final_merito >= 3.5 THEN 'BOM'
        WHEN nb.score_final_merito >= 2.5 THEN 'ADEQUADO'
        ELSE 'NECESSITA_MELHORIA'
    END AS status_desempenho
FROM colaborador col
JOIN cargo ON col.cargo_id = cargo.id
JOIN ciclo_colaborador cc ON col.id = cc.colaborador_id
LEFT JOIN avaliacao a ON cc.id = a.ciclo_colaborador_id
LEFT JOIN nine_box nb ON cc.id = nb.ciclo_colaborador_id
WHERE col.gestor_id = :gestorColaboradorId
  AND cc.ciclo_id = :cicloId
  AND col.ativo = TRUE
GROUP BY
    col.id, cargo.titulo, cc.status_experiencia,
    nb.score_final_merito, nb.posicao_y_desempenho, nb.posicao_x_potencial
ORDER BY nb.score_final_merito DESC NULLS LAST;

2️⃣ Detalhes de um Colaborador

Endpoint: GET /api/gestor/colaborador/:colaboradorId/:cicloId

SELECT
    col.id,
    col.nome,
    col.matricula,
    cargo.titulo               AS cargo,
    col.ativo,
    nb.score_competencias,
    nb.score_metas,
    nb.score_final_merito,
    nb.posicao_y_desempenho,
    nb.posicao_x_potencial,
    nb.elegivel_carreira,
    nb.data_calculo
FROM colaborador col
JOIN cargo ON col.cargo_id = cargo.id
JOIN ciclo_colaborador cc ON col.id = cc.colaborador_id
LEFT JOIN nine_box nb ON cc.id = nb.ciclo_colaborador_id
WHERE col.id = :colaboradorId
  AND cc.ciclo_id = :cicloId;

3️⃣ Competências Avaliadas do Colaborador

Endpoint: GET /api/gestor/colaborador/:colaboradorId/competencias/:cicloId

SELECT
    comp.nome                  AS competencia,
    comp.categoria,
    p.nota,
    p.peso_aplicado,
    p.comentario
FROM pontuacao p
JOIN avaliacao a ON p.avaliacao_id = a.id
JOIN ciclo_colaborador cc ON a.ciclo_colaborador_id = cc.id
JOIN competencia comp ON p.competencia_id = comp.id
WHERE cc.colaborador_id = :colaboradorId
  AND cc.ciclo_id = :cicloId
  AND a.tipo = 'GESTOR'
  AND a.status = 'FINALIZADO'
ORDER BY comp.categoria, comp.nome;

4️⃣ Metas do Colaborador

Endpoint: GET /api/gestor/colaborador/:colaboradorId/metas/:cicloId

SELECT
    m.titulo,
    m.descricao,
    p.nota,
    p.peso_aplicado,
    p.comentario
FROM pontuacao p
JOIN avaliacao a ON p.avaliacao_id = a.id
JOIN ciclo_colaborador cc ON a.ciclo_colaborador_id = cc.id
JOIN meta m ON p.meta_id = m.id
WHERE cc.colaborador_id = :colaboradorId
  AND cc.ciclo_id = :cicloId
  AND a.tipo = 'GESTOR'
  AND a.status = 'FINALIZADO'
ORDER BY m.peso DESC;

5️⃣ Matriz Nine Box da Equipe

Endpoint: GET /api/gestor/ninebox/:gestorId/:cicloId

SELECT
    col.id,
    col.nome,
    cargo.titulo              AS cargo,
    nb.posicao_y_desempenho,
    nb.posicao_x_potencial,
    nb.score_final_merito,
    nb.elegivel_carreira
FROM colaborador col
JOIN cargo ON col.cargo_id = cargo.id
JOIN ciclo_colaborador cc ON col.id = cc.colaborador_id
JOIN nine_box nb ON cc.id = nb.ciclo_colaborador_id
WHERE col.gestor_id = :gestorColaboradorId
  AND cc.ciclo_id = :cicloId
ORDER BY
    nb.posicao_y_desempenho DESC,
    nb.posicao_x_potencial DESC;

6️⃣ Histórico de Desempenho do Colaborador

Endpoint: GET /api/gestor/colaborador/:colaboradorId/historico

SELECT
    c.nome                     AS ciclo,
    nb.score_final_merito,
    nb.posicao_y_desempenho,
    nb.posicao_x_potencial,
    nb.elegivel_carreira,
    nb.data_calculo
FROM ciclo_colaborador cc
JOIN ciclo_desempenho c ON cc.ciclo_id = c.id
LEFT JOIN nine_box nb ON cc.id = nb.ciclo_colaborador_id
WHERE cc.colaborador_id = :colaboradorId
ORDER BY c.data_inicio DESC;

7️⃣ Estatísticas Gerais da Equipe

Endpoint: GET /api/gestor/estatisticas/:gestorId/:cicloId

SELECT
    COUNT(col.id)                                 AS total_colaboradores,
    AVG(nb.score_final_merito)                    AS media_merito,
    COUNT(CASE WHEN nb.score_final_merito >= 4.5 THEN 1 END) AS alto_desempenho,
    COUNT(CASE WHEN nb.score_final_merito < 2.5 THEN 1 END)  AS baixo_desempenho
FROM colaborador col
JOIN ciclo_colaborador cc ON col.id = cc.colaborador_id
LEFT JOIN nine_box nb ON cc.id = nb.ciclo_colaborador_id
WHERE col.gestor_id = :gestorColaboradorId
  AND cc.ciclo_id = :cicloId;

8️⃣ Colaboradores que Precisam de Atenção

Endpoint: GET /api/gestor/alerta/:gestorId/:cicloId

SELECT
    col.id,
    col.nome,
    cargo.titulo AS cargo,
    cc.status_experiencia,
    nb.score_final_merito,
    CASE
        WHEN nb.score_final_merito < 2.5 THEN 'BAIXO_DESEMPENHO'
        WHEN cc.status_experiencia = 'EM ANDAMENTO' THEN 'CICLO_NAO_CONCLUIDO'
        ELSE 'OK'
    END AS alerta
FROM colaborador col
JOIN cargo ON col.cargo_id = cargo.id
JOIN ciclo_colaborador cc ON col.id = cc.colaborador_id
LEFT JOIN nine_box nb ON cc.id = nb.ciclo_colaborador_id
WHERE col.gestor_id = :gestorColaboradorId
  AND cc.ciclo_id = :cicloId
  AND (
      nb.score_final_merito < 3
      OR cc.status_experiencia <> 'FINALIZADO'
  )
ORDER BY nb.score_final_merito ASC NULLS FIRST;

9️⃣ Comparativo de Desempenho entre Ciclos

Endpoint: GET /api/gestor/comparativo/:gestorId

SELECT
    col.nome,
    c1.nome AS ciclo_anterior,
    nb1.score_final_merito AS score_anterior,
    c2.nome AS ciclo_atual,
    nb2.score_final_merito AS score_atual,
    (nb2.score_final_merito - nb1.score_final_merito) AS variacao
FROM colaborador col
JOIN ciclo_colaborador cc1 ON col.id = cc1.colaborador_id
JOIN nine_box nb1 ON cc1.id = nb1.ciclo_colaborador_id
JOIN ciclo_desempenho c1 ON cc1.ciclo_id = c1.id
JOIN ciclo_colaborador cc2 ON col.id = cc2.colaborador_id
JOIN nine_box nb2 ON cc2.id = nb2.ciclo_colaborador_id
JOIN ciclo_desempenho c2 ON cc2.ciclo_id = c2.id
WHERE col.gestor_id = :gestorColaboradorId
  AND c2.data_inicio > c1.data_inicio
ORDER BY col.nome, c2.data_inicio DESC;