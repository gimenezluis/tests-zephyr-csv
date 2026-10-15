# Gerador de Cenários Zephyr · Guia de uso

## O que é

Uma página web interna para escrever casos de teste e gerar um **arquivo CSV pronto para importar no Zephyr**. Em vez de criar os casos um por um no Jira, você escreve todos de uma vez e importa em lote, com os campos já mapeados.

- **Acesso:** {link da aplicação} (login com a conta da empresa no GitHub)
- **Privacidade:** nada é enviado nem armazenado. O CSV é gerado no seu navegador.
- **Atenção:** a página não salva o que você digita. Baixe o CSV antes de fechar ou recarregar a aba.

## Passo a passo

### 1. Padrões para todos os cenários (opcional)

No primeiro card da página:

- **Tags do nome:** clique em **+ Adicionar tag de nome** e digite a tag (ex.: `Manual`, `Mobile`). Todos os nomes passam a começar com `[Manual][Mobile]`, inclusive dos cenários já criados. O **×** remove a tag.
- **Subpasta:** marque **Usar a mesma subpasta (ID da tarefa) em todos os cenários** e digite o ID da tarefa (ex.: `Tarefa-ID`). Todos os cenários vão para essa subpasta no Zephyr.

### 2. Preencher os cenários

Cada card é um caso de teste. Use **+ Adicionar mais um cenário** (embaixo) ou **+ Novo cenário** (na lateral).

| Campo | Como preencher |
|---|---|
| **Nome do cenário** | Obrigatório. Comece com um verbo: *Validar bloqueio após três tentativas de login* |
| Objetivo | O que o teste garante, em uma frase |
| Prioridade | High (fluxo crítico) · **Normal** (padrão) · Low |
| Status | **Draft** (novo, padrão) · Approved (já revisado por outra pessoa) |
| Label | Texto livre. Sugestão: `smoke`, `regressao`, `automatizado`, `manual` |
| Coverage | Chave da história ou bug no Jira (ex.: `PROJ-123`) |
| 📁 Subpasta: ID da tarefa | ID da tarefa, se não foi definido para todos |
| Pré-condição | Ambiente, usuário de teste e estado dos dados |
| Cenário BDD | Clique em **+ Inserir estrutura Given / When / Then** e complete |

**Como escrever o BDD.** O Zephyr só aceita as palavras-chave em inglês; o resto pode ser em português. Um passo por linha:

```gherkin
Given que estou logado com um usuário de teste
When acesso a tela de relatórios
And filtro pelo mês atual
Then vejo a lista de relatórios do mês
```

Se escrever `Dado`, `Quando`, `E` ou `Então` no começo da linha, o CSV converte sozinho.

**Acesso rápido (lateral):** lista todos os cenários. Clique para ir direto a um deles. O ícone mostra o status: ✏️ Rascunho · ✅ Aprovado.

### 3. Baixar o CSV

1. Em **Idioma do seu Jira**, escolha Português ou English.
2. Clique em **Baixar CSV**. Cenários sem nome ficam destacados em vermelho e impedem o download.

### 4. Importar no Zephyr

1. **Test Cases › More › Import from File › Excel CSV** e envie o arquivo.
2. **Configurações:** pasta destino (ex.: a pasta da sprint) · codificação **Unicode (UTF-8)** · separador **vírgula** · manter marcado *Essa linha contém os nomes dos campos*.
3. **Mapeamento de Campos:** os campos já vêm ligados. Confira e avance.
4. **Mapeamento de Dados:** confira prioridade, status e rótulos.
5. **Importar** e confira a tela de resultados.

### 5. Executar e anexar evidências

Evidências não entram pela importação. Elas vão na execução:

1. Crie um **Test Cycle** e adicione os casos importados.
2. Execute, marque **Pass / Fail / Blocked** e anexe os prints.
3. Nome do print: `{chave-do-teste}_{ambiente}_{AAAA-MM-DD}.png`.
4. Falhou? Abra um bug no Jira e vincule à execução.

## Regras

- **Nunca** coloque senhas, tokens, CPF ou dados pessoais reais nos cenários ou nos prints. Use usuários de teste.
- Um comportamento por cenário, com resultado verificável (nada de "funciona corretamente").
- Todo cenário nasce como **Draft** e só vira **Approved** depois de revisado por outra pessoa.
- Antes de importar, confira se o cenário já não existe no Zephyr.

## Problemas comuns

| Problema | Solução |
|---|---|
| "Formato de arquivo não suportado" | Envie o `.csv` baixado, não um `.xlsx` |
| Campo vem como "Nenhum" no mapeamento | Selecione o campo de mesmo nome e avise o responsável pela ferramenta |
| BDD não aparece no Zephyr | As linhas precisam começar com `Given`, `When`, `And` ou `Then` |
| Acentuação incorreta | Use a codificação **Unicode (UTF-8)** |
| Página dá 404 | Você não tem acesso ao repositório ou não está logado no GitHub da empresa |

**Dúvidas e sugestões:** {time} · {canal}
