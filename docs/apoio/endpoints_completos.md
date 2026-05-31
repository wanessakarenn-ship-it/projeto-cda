# 🌐 API — Plataforma de Ciclo de Desempenho (CDA 2026)

Documentação completa dos endpoints da API, incluindo **descrição**, **exemplos de requisição** e **respostas padronizadas**.

Padrões adotados:
- REST
- JSON
- HTTP Status Codes
- Rotas versionadas (`/api`)
- Respostas com `success`

---

## 🔐 Autenticação

### POST /api/auth/login
Autentica o usuário no sistema.

#### Request Body
```json
{
  "email": "ana@example.com",
  "senha": "123"
}
Resposta (200)
json
{
  "success": true,
  "data": {
    "id": 12,
    "nome": "Ana Souza",
    "perfil": "GESTOR"
  }
}
Erros
Código	Descrição
400	Campos obrigatórios ausentes
401	Credenciais inválidas
500	Erro interno

👨‍💼 Endpoints do Gestor
GET /api/gestor/dashboard/{gestorId}/{cicloId}
Visão consolidada do desempenho da equipe.

Resposta
json
{
  "success": true,
  "data": {
    "gestorId": 3,
    "cicloId": 2024,
    "equipe": [
      {
        "id": 10,
        "nome": "Carlos Mendes",
        "scoreMerito": 82.4,
        "scorePotencial": 77,
        "status": "OK"
      }
    ]
  }
}
GET /api/gestor/colaboradores/{colaboradorId}/{cicloId}
Detalhes completos do colaborador.

json
{
  "success": true,
  "data": {
    "id": 10,
    "nome": "Carlos Mendes",
    "cargo": "Analista",
    "scoreMerito": 82.4,
    "scorePotencial": 77,
    "competencias": [],
    "metas": [],
    "feedback": "Ótimo desempenho geral."
  }
}
GET /api/gestor/colaboradores/{colaboradorId}/competencias/{cicloId}
Notas por competência.

json
{
  "success": true,
  "data": {
    "competencias": [
      { "nome": "Comunicação", "nota": 4 },
      { "nome": "Entrega", "nota": 5 }
    ]
  }
}
GET /api/gestor/colaboradores/{colaboradorId}/metas/{cicloId}
Status das metas.

json
{
  "success": true,
  "data": {
    "metas": [
      { "descricao": "Finalizar projeto X", "status": "ATINGIDA" },
      { "descricao": "Melhorar comunicação", "status": "PENDENTE" }
    ]
  }
}
GET /api/gestor/ninebox/{gestorId}/{cicloId}
Posicionamento Nine Box da equipe.

json

  "success": true,
  "data": {
    "ninebox": [
      {
        "colaboradorId": 10,
        "quadrante": "ALTO_DESEMPENHO_ALTO_POTENCIAL"
      }
    ]
  }
}
GET /api/gestor/colaboradores/{colaboradorId}/historico
Evolução histórica do colaborador.

json
{
  "success": true,
  "data": {
    "historico": [
      { "ciclo": 2023, "scoreMerito": 75 },
      { "ciclo": 2024, "scoreMerito": 82 }
    ]
  }
}
GET /api/gestor/estatisticas/{gestorId}/{cicloId}
Resumo estatístico da equipe.

json
{
  "success": true,
  "data": {
    "mediaMerito": 78.5,
    "mediaPotencial": 72.1,
    "totalColaboradores": 8
  }
}
GET /api/gestor/alertas/{gestorId}/{cicloId}
Lista alertas de atenção.

json
{
  "success": true,
  "data": {
    "alertas": [
      { "id": 14, "nome": "Marcos Silva", "motivo": "Baixo desempenho" }
    ]
  }
}
GET /api/gestor/comparativo/{gestorId}
Comparativo entre ciclos.

json

{
  "success": true,
  "data": {
    "comparativo": [
      { "ano": 2023, "media": 74.2 },
      { "ano": 2024, "media": 78.9 }
    ]
  }
}
👤 Endpoints do Colaborador
GET /api/colaborador/perfil/{colaboradorId}
Perfil e visão geral.

json

{
  "success": true,
  "data": {
    "id": 6,
    "nome": "João Pedro",
    "scoreMerito": 79.3,
    "competencias": [],
    "metas": [],
    "feedback": "Continue evoluindo!"
  }
}
GET /api/colaborador/metas/{colaboradorId}/{cicloId}
Metas do colaborador.

json
{
  "success": true,
  "data": {
    "metas": [
      { "descricao": "Concluir treinamento Y", "status": "PENDENTE" }
    ]
  }
}
GET /api/colaborador/feedback/{colaboradorId}/{cicloId}
Feedback consolidado.

json
{
  "success": true,
  "data": {
    "feedback": "Bom desempenho geral."
  }
}
🛠 Endpoints Administrativos
POST /api/admin/ciclos
Criação de ciclo avaliativo.

json
{
  "ano": 2024,
  "descricao": "Ciclo anual 2024"
}
POST /api/admin/competencias
Cadastro de competência.

json
{
  "nome": "Comunicação",
  "descricao": "Clareza e objetividade"
}
POST /api/admin/ninebox/configuracoes
Cria configuração Nine Box.

json
{
  "quadrante": "ALTO_DESEMPENHO_ALTO_POTENCIAL",
  "cor": "#00FF00"
}
GET /api/admin/ninebox/configuracoes
Lista configurações Nine Box.

PUT /api/admin/ninebox/configuracoes/{id}
Atualiza configuração Nine Box.

yaml
