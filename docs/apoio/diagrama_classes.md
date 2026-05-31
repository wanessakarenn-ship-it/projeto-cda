# Diagrama de Classes
## Sistema de Ciclo de Desempenho

```mermaid
classDiagram
    class Usuario {
        +id: number
        +nome: string
        +email: string
        +senha: string
        +tipoUsuario: enum
        +ativo: boolean
        +dataCriacao: Date
        +dataAtualizacao: Date
        +login()
        +logout()
        +alterarSenha()
    }

    class Colaborador {
        +id: number
        +usuarioId: number
        +matricula: string
        +cargo: string
        +departamento: string
        +gestorId: number
        +dataAdmissao: Date
        +status: enum
        +obterEquipe()
        +vincularGestor()
    }

    class CicloDesempenho {
        +id: number
        +nome: string
        +ano: number
        +tipoCiclo: enum
        +dataInicio: Date
        +dataFim: Date
        +status: enum
        +descricao: string
        +iniciarCiclo()
        +finalizarCiclo()
        +validarPeriodo()
    }

    class Competencia {
        +id: number
        +nome: string
        +descricao: string
        +peso: number
        +ativo: boolean
        +calcularPontuacao()
    }

    class Meta {
        +id: number
        +colaboradorId: number
        +cicloId: number
        +titulo: string
        +descricao: string
        +peso: number
        +metaValor: number
        +valorAtingido: number
        +percentualAtingido: number
        +calcularPercentual()
        +atualizarProgresso()
    }

    class Avaliacao {
        +id: number
        +colaboradorId: number
        +avaliadorId: number
        +cicloId: number
        +tipoAvaliacao: enum
        +status: enum
        +dataInicio: Date
        +dataConclusao: Date
        +observacoes: string
        +iniciarAvaliacao()
        +concluirAvaliacao()
        +validarPreenchimento()
    }

    class AvaliacaoCompetencia {
        +id: number
        +avaliacaoId: number
        +competenciaId: number
        +nota: number
        +observacao: string
        +atribuirNota()
    }

    class ResultadoCiclo {
        +id: number
        +colaboradorId: number
        +cicloId: number
        +scoreCompetencias: number
        +scoreMetas: number
        +scoreMerito: number
        +scorePotencial: number
        +posicaoNinebox: string
        +recomendacao: string
        +dataCalculo: Date
        +calcularScores()
        +posicionarNineBox()
        +gerarRecomendacao()
    }

    class ConfiguracaoNineBox {
        +id: number
        +nomeQuadrante: string
        +posicaoX: number
        +posicaoY: number
        +descricao: string
        +cor: string
        +acoesRecomendadas: string
        +determinarQuadrante()
    }

    class HistoricoAvaliacoes {
        +id: number
        +colaboradorId: number
        +cicloId: number
        +dadosAvaliacao: JSON
        +dataRegistro: Date
        +registrarHistorico()
        +consultarHistorico()
    }

    Usuario "1" --> "0..1" Colaborador : possui
    Colaborador "1" --> "0..*" Colaborador : gerencia
    Colaborador "1" --> "0..*" Meta : tem
    Colaborador "1" --> "0..*" Avaliacao : recebe
    Colaborador "1" --> "0..*" ResultadoCiclo : possui

    CicloDesempenho "1" --> "0..*" Meta : contém
    CicloDesempenho "1" --> "0..*" Avaliacao : contém
    CicloDesempenho "1" --> "0..*" ResultadoCiclo : gera

    Avaliacao "1" --> "1..*" AvaliacaoCompetencia : possui
    AvaliacaoCompetencia "1" --> "1" Competencia : avalia

    ResultadoCiclo "1" --> "1" ConfiguracaoNineBox : usa

    Colaborador "1" --> "0..*" HistoricoAvaliacoes : registra
```

## Descrição das Classes Principais

### Usuario
Classe base para todos os usuários do sistema. Contém informações de autenticação e autorização.

**Tipos de Usuário:** GESTOR, RH, COLABORADOR, ADMIN

### Colaborador
Representa os colaboradores da empresa, com suas informações funcionais e hierárquicas.

**Status:** ATIVO, EXPERIENCIA, DESLIGADO

### CicloDesempenho
Define os períodos de avaliação de desempenho.

**Tipos de Ciclo:** ANUAL, SEMESTRAL, EXPERIENCIA

### Competencia
Competências avaliadas no sistema, com pesos configuráveis.

### Meta
Metas individuais dos colaboradores para cada ciclo.

### Avaliacao
Avaliações realizadas pelos gestores.

**Tipos:** AUTO_AVALIACAO, AVALIACAO_GESTOR, AVALIACAO_360

### AvaliacaoCompetencia
Notas atribuídas a cada competência em uma avaliação.

### ResultadoCiclo
Consolidação dos resultados de desempenho de um colaborador em um ciclo.

### ConfiguracaoNineBox
Define os quadrantes da matriz Nine Box e suas características.

### HistoricoAvaliacoes
Mantém o histórico completo de avaliações para auditoria.

## Relacionamentos

- **Usuario → Colaborador**: Um usuário pode ser associado a um colaborador (1:0..1)
- **Colaborador → Colaborador**: Um colaborador (gestor) pode gerenciar vários colaboradores (1:N)
- **Colaborador → Meta**: Um colaborador tem várias metas (1:N)
- **Colaborador → Avaliacao**: Um colaborador recebe várias avaliações (1:N)
- **CicloDesempenho → Avaliacao**: Um ciclo contém várias avaliações (1:N)
- **Avaliacao → AvaliacaoCompetencia**: Uma avaliação possui várias notas de competências (1:N)
- **ResultadoCiclo → ConfiguracaoNineBox**: Um resultado usa uma configuração Nine Box (N:1)

## Padrões de Design Utilizados

1. **Repository Pattern**: Separação da lógica de acesso a dados
2. **Service Layer**: Lógica de negócio centralizada
3. **DTO (Data Transfer Objects)**: Objetos para transferência de dados
4. **Strategy Pattern**: Para diferentes tipos de avaliação e cálculos
