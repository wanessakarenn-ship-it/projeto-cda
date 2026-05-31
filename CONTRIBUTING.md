***

# Contribuindo para o Projeto — Ciclo de Desempenho Automatizado

Bem-vindo e obrigado por colaborar!

Este documento resume as boas práticas para trabalho em equipe no projeto, organização de código e documentação, usando ferramentas como **GitHub**, **VSCode** e **Google Docs**.

***

## 1. Organização Geral

- Todas as tarefas, bugs e melhorias devem estar **registradas em Issues** no GitHub.
- Use **Google Docs/Drive** para documentos e atas de reuniões colaborativas.
- O desenvolvimento de código deve ser realizado via **VSCode** com extensão do Prettier e ESLint instaladas.

***

## 2. Processo de Versionamento de Código (GitHub)

### 2.1 Clonando o Repositório

```bash
git clone https://github.com/at-adorno/ciclo-de-desenpenho-automatizado.git
cd ciclo-de-desenpenho-automatizado
```

### 2.2 Fluxo de Branches

- Nunca commit diretamente na `master`.
- Para cada tarefa, crie uma branch:
  - `feature/nome-da-funcionalidade`
  - `fix/nome-do-bug`
  - `docs/nome-da-documentacao`
- Exemplo: `feature/importacao-csv`

### 2.3 Commits

- Mensagens claras e concisas.
  - `feat(api): adiciona importação de colaboradores via csv`
  - `fix(auth): corrige bug no refresh do token`
  - `docs(readme): atualiza instruções de instalação`

- Use português nos commits, padrão lower-case, prefixos: `feat`, `fix`, `docs`, `test`, `chore`

### 2.4 Pull Requests (PR)

- Sempre que terminar uma tarefa, **abra um PR** da branch para a `master`:
  - Descreva claramente o que foi feito.
  - Marque revisores conforme área (ex: Andre para services, Alessandra para rotas).
- SÓ faça merge após a aprovação de pelo menos 1 colega.

### 2.5 Resolução de conflitos

- Antes de abrir PR, **puxe (pull) a master** e resolva conflitos localmente:
  ```bash
  git pull origin master
  ```

***

## 3. Code Style & Boas Práticas

- Sempre **rodar o Prettier** antes de commitar:  
  `npm run format`

- Checar lint e testes locais:
  ```bash
  npm run lint
  npm run test
  ```

- Usar **tipagem forte**. Prefira `interface`/`type` em TypeScript.

- Funções/documentação em português para facilitar entendimento da equipe.

***

## 4. Estrutura de Pastas

- Mantenha arquivos novos nas pastas corretas:
  - Rotas: `src/routes`
  - Controllers: `src/controllers`
  - Services: `src/services`
  - Entities: `src/entities`
  - Migrations: `src/database/migrations`
  - Testes: `tests/unit` ou `tests/integration`
  - Documentos: Google Docs/Drive (utilize o link no README)

***

## 5. Integração com Google Docs/Drive

- Use Google Docs para atas de reunião, brainstorms e versionamento de requisitos.
- Salve os links importantes de documentos compartilhados no README ou doc `links.md`.

***

## 6. Revisão e Feedback

- Feedback construtivo nos PRs.
- Dúvidas rápidas: grupo no WhatsApp ou canal Discord.
- Pendências/documentos formais: usar Issues no GitHub.
- Feedback em reuniões: registre no Google Docs da ATA.

***

## 7. Checklist Antes de Submeter

- [ ] Código funcional e testado localmente
- [ ] Nenhum erro no lint
- [ ] Branch sempre atualizada com a master
- [ ] PR criado com descrição clara
- [ ] Documentação atualizada (Swagger/README se necessário)

***

## 8. Convenção de Nomes

- Arquivos e pastas: kebab-case (`minha-funcionalidade.ts`)
- Variáveis/campos: camelCase (`minhaVariavel`)
- Classes/Interfaces: PascalCase (`MinhaClasse`)

***

## 9. Segurança & Dados

- Nunca faça commit de `.env` ou senhas.
- Use `.env.example` para ilustrar estrutura de variáveis.

***

## 10. Dúvidas ou problemas?

Abra uma **Issue** ou converse no grupo. Prefira comunicação clara, cordial e objetiva.

***

**Bom trabalho e boas contribuições! 🚀**