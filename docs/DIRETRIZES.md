# Diretrizes de uso

Regras para criar casos de teste com o Gerador de Cenários Zephyr.

## Dados

- **Proibido:** senhas, tokens, chaves de acesso, CPF, nomes, e-mails ou qualquer dado pessoal real de clientes, alunos ou colaboradores.
- Use apenas **usuários de teste e massa fictícia**.
- Credenciais nunca vão no cenário. Na pré-condição, indique **onde obtê-las** (ex.: cofre de senhas do time).

## Escrita

- **Um comportamento por cenário.**
- **Nome:** verbo no infinitivo e objetivo claro (ex.: *Validar bloqueio após três tentativas de login*).
- **Gherkin em português:** `Dado` (contexto) · `Quando` (ação) · `Então` (resultado).
- **Resultado esperado** verificável na tela ou na resposta, sem termos vagos como "funciona corretamente".
- **Tags do nome:** use apenas as tags acordadas pelo time (ex.: tipo de teste e plataforma).

## Classificação

| Campo | Regra |
|---|---|
| Prioridade | **High:** fluxo crítico ou smoke · **Normal:** padrão · **Low:** baixo impacto |
| Label | **smoke:** validação mínima após deploy · **regressao:** suíte de regressão · **automatizado:** já coberto por automação · **manual:** execução manual |
| Coverage | Obrigatório: chave da história ou bug que o cenário cobre |

## Organização no Zephyr

- **Pasta destino:** a pasta da sprint.
- **Subpasta:** o ID da tarefa.
- Antes de importar, confira se os cenários já não existem para evitar duplicidade.

## Revisão e status

- Todo cenário é criado como **Draft**.
- Passa para **Approved** somente após revisão de outra pessoa (QA ou dev par).

## Execução e evidências

- Execute os casos dentro de um **Test Cycle** da sprint ou da tarefa.
- Registre o resultado (Pass / Fail / Blocked) e anexe as evidências na execução.
- Nome da evidência: `{chave-do-teste}_{ambiente}_{AAAA-MM-DD}.png`.
- Evidências não podem conter dados pessoais reais. Use usuários de teste ou oculte as informações.
- Falha encontrada: abra um bug no Jira e vincule à execução.

## Responsabilidades

| Papel | Responsabilidade |
|---|---|
| Quem cria (dev ou QA) | Escrever, importar e manter os cenários da sua tarefa |
| Revisor | Aprovar os cenários (Draft → Approved) |
| Responsável pela ferramenta | Manter a aplicação, revisar PRs e ajustar o mapeamento de campos |

## Alterações na ferramenta

- Toda alteração é feita por **Pull Request**, com revisão do responsável.
- Sugestões e problemas: {canal}.
