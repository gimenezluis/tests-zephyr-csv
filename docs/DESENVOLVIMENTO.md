# Desenvolvimento

## Tecnologia

| Item | Escolha |
|---|---|
| Código | HTML + CSS + JavaScript puro, em `index.html` |
| Dependências | Nenhuma |
| Build | Nenhum: o arquivo editado é o arquivo publicado |
| Publicação | GitHub Pages via GitHub Actions |

## Estrutura do `index.html`

| Bloco | Conteúdo |
|---|---|
| `<style>` | Visual. Cores em variáveis no `:root` (`--acc` verde principal, `--warn` laranja de erro, etc.) |
| `<body>` | Estrutura da página: padrões, acesso rápido, lista de cenários e botões |
| `<script>` | Configuração (`HEAD`, `F`, `DEF`) e funções |

### Configuração

A maioria dos ajustes é feita nas três constantes do início do `<script>`:

| Constante | Função |
|---|---|
| `HEAD` | Cabeçalho de cada coluna do CSV, por idioma (`pt` e `en`). Deve ser **idêntico** ao nome do campo no Zephyr |
| `F` | Campos do cenário, na ordem da tela e do CSV: `['Chave', 'Rótulo', 'Dica', 'tipo', larguraTotal]` |
| `DEF` | Valores padrão de um cenário novo |

Tipos em `F`: `'input'` (uma linha), `'text'` (várias linhas), `'sel:A,B,C'` (lista; opção vazia aparece como "(nenhuma)"). `larguraTotal = 1` ocupa a linha inteira.

### Funções principais

| Função | Responsabilidade |
|---|---|
| `add()` | Cria um card de cenário a partir de `F` |
| `nav()` / `icone()` | Monta o Acesso rápido e o ícone de status |
| `addTag()` / `prefixo()` / `aplicarPrefixo()` | Tags do nome |
| `aplicarPasta()` | Subpasta única para todos os cenários |
| `q()` | Protege valores do CSV (aspas, vírgulas, quebras de linha) |
| `btnBDD()` / `bddEN()` | Botão que insere a estrutura Given / When / Then e conversão das palavras-chave para o inglês |
| `download()` | Valida, monta o CSV (UTF-8, vírgula) e baixa o arquivo |

## Ajustes comuns

| Ajuste | Onde |
|---|---|
| Campo não mapeia no Zephyr | Corrigir o texto em `HEAD` com o nome exato do campo no Zephyr |
| Nova opção numa lista | Acrescentar na linha correspondente de `F` (ex.: `sel:High,Normal,Low`) |
| Estrutura inicial do BDD | Constante `ESTRUTURA` |
| Palavras-chave convertidas no BDD | Objeto `KW` (português → Given / When / And / Then / But) |
| Mudar valor padrão | `DEF` |
| Nova coluna | Adicionar linha em `F` **e** a chave em `HEAD.pt` e `HEAD.en` |
| Remover coluna | Remover a linha em `F` |
| Novo campo obrigatório | Condição `if(!r.Name)` em `download()` |
| Cores | Variáveis em `:root` |

## Testar

1. Abra o `index.html` no navegador (ou sirva a pasta com `python -m http.server 8080`).
2. Verifique o console (**F12**): sem erros.
3. Roteiro: criar cenários, adicionar tags, usar a subpasta única, navegar pelo Acesso rápido, trocar status, baixar o CSV e validar a importação no Zephyr.

## Fluxo de alteração

1. Crie uma branch a partir da `main`.
2. Faça a alteração e teste.
3. Abra um **Pull Request** com a descrição da mudança.
4. Após aprovação e merge, a publicação é automática.

Commits: `feat:` novidade · `fix:` correção · `docs:` documentação · `chore:` manutenção.
Para desfazer uma alteração publicada, use `git revert <commit>` em um novo PR.
