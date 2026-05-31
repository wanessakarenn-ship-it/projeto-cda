# 🌐 Endpoints da API — Sistema de Ciclo de Desempenho

Documentação resumida dos endpoints disponíveis, organizada por perfil de acesso.

---

## 👨‍💼 Gestor

### GET /api/gestor/dashboard/{gestorId}/{cicloId}
Retorna a visão consolidada do desempenho da equipe do gestor.

**Parâmetros:**
- `gestorId` (number) — ID do gestor
- `cicloId` (number) — ID do ciclo de desempenho

---

### GET /api/gestor/colaboradores/{colaboradorId}/{cicloId}
Retorna os detalhes completos de desempenho de um colaborador no ciclo.

**Parâmetros:**
- `colaboradorId` (number)
- `cicloId` (number)

---

### GET /api/gestor/colaboradores/{colaboradorId}/competencias/{cicloId}
Retorna as notas de competências do colaborador no ciclo.

---

### GET /api/gestor/colaboradores/{colaboradorId}/metas/{cicloId}
Retorna o status das metas do colaborador no ciclo.

---

### GET /api/gestor/ninebox/{gestorId}/{cicloId}
Retorna a matriz Nine Box consolidada da equipe.

---

### GET /api/gestor/colaboradores/{colaboradorId}/historico
Retorna o histórico de desempenho do colaborador em ciclos anteriores.

---

### GET /api/gestor/estatisticas/{gestorId}/{cicloId}
Retorna médias, totais e indicadores estatísticos do time.

---

### GET /api/gestor/alertas/{gestorId}/{cicloId}
Lista colaboradores que exigem atenção (baixo desempenho ou risco).

---

### GET /api/gestor/comparativo/{gestorId}
Retorna comparação de desempenho entre ciclos avaliativos.

---

## 👤 Colaborador

### GET /api/colaborador/perfil/{colaboradorId}
Retorna os dados do perfil e visão geral do desempenho do colaborador.

---

### GET /api/colaborador/metas/{colaboradorId}/{cicloId}
Retorna as metas do colaborador no ciclo informado.

---

### GET /api/colaborador/feedback/{colaboradorId}/{cicloId}
Retorna o feedback consolidado do gestor para o colaborador.

---

## 🛠 Admin

### POST /api/admin/usuarios/importar
Importa usuários via arquivo CSV.

---

### POST /api/admin/colaboradores/importar
Importa colaboradores via arquivo CSV.

---

### POST /api/admin/ciclos
Cria um novo ciclo de desempenho.

---

### POST /api/admin/competencias
Cria uma nova competência avaliativa.

---

### POST /api/admin/ninebox/configuracoes
Cadastra uma configuração de quadrante da matriz Nine Box.

---

### GET /api/admin/ninebox/configuracoes
Consulta as configurações cadastradas da matriz Nine Box.

---

### PUT /api/admin/ninebox/configuracoes/{id}
Atualiza uma configuração específica da matriz Nine Box.

---
