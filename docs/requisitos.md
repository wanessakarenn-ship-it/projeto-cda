# 📘 Plataforma Automatizada de Gestão do Ciclo de Desempenho – CDA 2026

---

## 1. Introdução

### 1.1 Objetivo

Este documento define os **requisitos técnicos e de negócio** para o desenvolvimento e implementação de uma plataforma automatizada de **Gestão do Ciclo de Desempenho (CDA)**.

O objetivo principal é transformar um processo **manual, fragmentado e pouco rastreável** em um **fluxo integrado, eficiente, transparente e orientado por dados**, contemplando avaliação, mérito, progressão e matriz Nine Box.

---

### 1.2 Problema de Negócio Atual

O processo atual de gestão de desempenho apresenta as seguintes limitações:

- Uso extensivo de **planilhas e formulários manuais**
- Falta de integração entre **avaliação, mérito, progressão e Nine Box**
- Baixa rastreabilidade histórica
- Alto risco de inconsistências e vieses

#### Consequências

- Processo fragmentado e pouco escalável  
- Aproximadamente **30% de divergências nas avaliações**  
- **Sobrecarga dos gestores**  
- Falta de histórico consolidado  
- **Atrasos em promoções e decisões de carreira**  
- Baixa visibilidade do colaborador sobre sua evolução  

---

### 1.3 Metas de Sucesso (KPIs)

O projeto será considerado bem-sucedido se atender aos seguintes critérios:

- [ ] Banco de dados criado e funcional com todas as tabelas previstas  
- [ ] Pelo menos **7 dos 9 endpoints de gestão** implementados  
- [ ] Tela do colaborador exibindo **dados reais**  
- [ ] Importação de CSV funcional para ao menos uma entidade  
- [ ] Cálculo automático de mérito funcionando corretamente  
- [ ] Sistema rodando **sem erros críticos**

---

## 2. Requisitos de Usuários (Personas)

| Persona | Uso Principal | Plataforma | Foco |
|------|--------------|------------|------|
| Gestor de Equipe | Avaliações e acompanhamento | Web (Desktop) | Decisões justas e ágeis |
| Analista de RH | Consolidação e análise | Web (Desktop) | Precisão e rastreabilidade |
| Colaborador | Feedback e carreira | Web Responsivo | Transparência e evolução |
| Administrador de Sistemas | Gestão de usuários | Web (Admin) | Segurança e controle |

---

## 3. Requisitos Funcionais (RF)

### RF 1 – Gestão de Ciclo e Onboarding

| Código | Requisito | Descrição | Prioridade |
|------|----------|----------|-----------|
| RF 1.1 | Manutenção de Ciclo | CRUD de ciclos de desempenho | Alta |
| RF 1.2 | Cadastro de Colaboradores | Gestão completa de colaboradores | Alta |
| RF 1.3 | Validação de Preenchimento | Bloquear avaliações incompletas | Alta |
| RF 1.4 | Recomendação de Experiência | Recomendação automática ao final do ciclo | Alta |

#### Critérios de Aceitação (RF 1)

- Validação de campos obrigatórios  
- Prevenção de duplicidade  
- Regras configuráveis pelo RH  
- Feedback claro ao usuário  

---

### RF 2 – Cálculo e Progressão Automatizados

| Código | Requisito | Descrição | Prioridade |
|------|----------|----------|-----------|
| RF 2.1 | Cálculo de Mérito | Algoritmo configurável | Média |
| RF 2.2 | Nine Box Dinâmico | Posicionamento automático | Média |
| RF 2.3 | Elegibilidade de Carreira | Liberação automática de trilhas | Média |
| RF 2.4 | Histórico Consolidado | Histórico completo do colaborador | Média |

---

### RF 3 – Painéis e Relatórios

| Código | Requisito | Público | Prioridade |
|------|----------|--------|-----------|
| RF 3.1 | Painel do Gestor | Gestor | Alta |
| RF 3.2 | Painel de Sucessão | RH | Média |

> Observação: relatórios inicialmente baseados em **consultas SQL consolidadas**.

---

### RF 4 – Experiência do Colaborador

| Código | Requisito | Descrição | Prioridade |
|------|----------|----------|-----------|
| RF 4.1 | Feedback e Visualização | Acesso a notas, feedbacks e carreira | Alta |

**Critérios:**
- Interface responsiva  
- Carregamento inferior a **3 segundos**  

---

### RF 5 – Administração de Sistemas

| Código | Requisito | Descrição | Prioridade |
|------|----------|----------|-----------|
| RF 5.1 | Gestão de Perfis | CRUD de perfis e permissões | Alta |

**Regras:**
- Validação obrigatória  
- Impedir exclusão de perfis em uso  
- Soft delete com histórico  

---

## 4. Requisitos Não Funcionais (RNF)

### RNF 1 – Desempenho e Escalabilidade

- **RNF 1.1:** Telas críticas devem carregar em até **3s (95%)**
- **RNF 1.2:** Processamentos de mérito em até **3 minutos**
- **RNF 1.3:** Arquitetura escalável sem degradação

---

### RNF 2 – Usabilidade (UX/UI)

- **RNF 2.1:** UI moderna, limpa e consistente  
- **RNF 2.2:** Acessibilidade básica (WCAG)

---

### RNF 3 – Integração e Segurança

- **RNF 3.1:** Conformidade total com a **LGPD**
- **RNF 3.2:** Criptografia:
  - Em repouso: **AES-256**
  - Em trânsito: **TLS 1.2+**

---

## 5. Referências Legais

- **Lei Geral de Proteção de Dados (LGPD)**  
  https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm

---

## 6. Histórico de Versões

| Versão | Data | Alterações |
|------|------|-----------|
| 01 | Out/2025 | Versão inicial |
| 02 | Nov/2025 | Correções e padronização |
| 03 | Nov/2025 | Inclusão do Admin e RF 5 |
| 04 | Nov/2025 | Simplificação do projeto |
