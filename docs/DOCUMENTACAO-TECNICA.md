# Gerador de Cenários Zephyr · Documentação técnica

## Como funciona

Página estática: HTML, CSS e JavaScript puro, **sem dependências, sem build e sem backend**. Tudo roda no navegador: a página monta os campos a partir de uma configuração, lê o que foi digitado e gera um CSV (UTF-8, vírgula) que o Zephyr importa.

```
config.js  ──►  app.js (tela)  ──►  csv.js (regras)  ──►  arquivo .csv
 campos          monta os cards      escapa valores
 cabeçalhos      tags, subpasta      prefixo das tags
 BDD             acesso rápido       BDD → inglês
```

## Estrutura do repositório

| Arquivo | Responsabilidade | Quando mexer |
|---|---|---|
| `js/config.js` | **Campos, cabeçalhos do CSV, opções, padrões, BDD** | Quase sempre: é aqui que se incluem e ajustam campos |
| `js/csv.js` | Regras puras: escapar CSV, prefixo, BDD, montar o arquivo | Mudar regra de geração do CSV |
| `js/app.js` | Tela: cards, acesso rápido, tags, subpasta, download | Mudar comportamento da tela |
| `css/style.css` | Visual. Cores em variáveis no `:root` | Mudar cores e layout |
| `index.html` | Estrutura fixa da página (topo, padrões, rodapé) | Textos fixos da página |
| `tests/csv.test.js` | Testes da configuração e das regras | Ao mudar `config.js` ou `csv.js` |
| `.github/workflows/pages.yml` | Roda os testes e publica no GitHub Pages | Raramente |

## Configuração de um campo (`js/config.js`)

```js
{
  chave: 'Coverage',                       // identificador interno, único
  rotulo: 'Coverage',                      // texto acima do campo
  dica: 'chave da história no Jira',       // texto pequeno ao lado (opcional)
  tipo: 'texto',                           // 'texto' | 'textoLongo' | 'lista'
  opcoes: ['A', 'B'],                      // só para 'lista'
  padrao: 'A',                             // valor inicial (opcional)
  exemplo: 'PROJ-123',                     // texto de exemplo no campo (opcional)
  larguraTotal: true,                      // ocupa a linha inteira (opcional)
  obrigatorio: true,                       // bloqueia o download se vazio (opcional)
  papel: 'nome',                           // comportamento especial (opcional, ver abaixo)
  cabecalho: { pt: 'Cobertura (Itens de trabalho)', en: 'Coverage' }  // nome EXATO no Zephyr
}
```

A **ordem da lista `campos`** é a ordem na tela e no CSV.

**Papéis especiais** (cada um em no máximo um campo):

| Papel | Efeito |
|---|---|
| `nome` | Recebe o prefixo das tags e aparece no Acesso rápido. Obrigatório |
| `status` | Define o ícone do Acesso rápido (`Approved` = aprovado) |
| `pasta` | Pode ser preenchido para todos de uma vez; barras são removidas |
| `bdd` | Ganha o botão de estrutura e converte Dado/Quando/E/Então para inglês |

O código da tela usa o **papel**, nunca a chave. Renomear a chave de um campo não quebra nada.

## Ajustes comuns

| Quero… | Faça |
|---|---|
| **Incluir um campo** | Adicione um objeto em `campos`, na posição desejada, com `cabecalho` em `pt` e `en` |
| **Remover um campo** | Apague o objeto em `campos` |
| **Reordenar** | Mude a posição do objeto em `campos` |
| Campo não mapeia no Zephyr | Corrija o texto em `cabecalho` com o nome exato que o Zephyr mostra |
| Mudar opções de uma lista | Edite `opcoes` (e `padrao`, se ele mudar) |
| Mudar valor inicial | Edite `padrao` |
| Tornar obrigatório | `obrigatorio: true` |
| Novo idioma do Jira | Adicione em `idiomas` e o mesmo idioma em `cabecalho` de todos os campos |
| Estrutura inicial do BDD | `bdd.estrutura` |
| Palavras convertidas no BDD | `bdd.palavrasChave` |
| Nome do arquivo | `arquivo.prefixo` |
| Cores | Variáveis do `:root` em `css/style.css` |

**Exemplo: incluir o campo Componente** (lista), antes da pré-condição:

```js
{
  chave: 'Component',
  rotulo: 'Componente', tipo: 'lista', opcoes: ['', 'Web', 'App'],
  cabecalho: { pt: 'Componente', en: 'Component' }
},
```

Pronto: o campo aparece em todos os cenários e vira uma coluna do CSV. Nenhum outro arquivo precisa mudar.

## Testar

1. **Testes automáticos** (Node 18+, nada para instalar), na raiz do repositório:
   ```bash
   node --test
   ```
   Validam a configuração (chaves únicas, cabeçalhos em todos os idiomas, listas com opções, papéis) e as regras do CSV.
2. **Teste manual:** abra o `index.html` no navegador (dois cliques), crie cenários, baixe o CSV e importe no Zephyr. Confira o console (F12) sem erros.

## Publicar

- O workflow `.github/workflows/pages.yml` roda a cada merge na `main`: **executa os testes** e, se passarem, publica `index.html`, `css/` e `js/` no GitHub Pages.
- Pages configurado como *Source: GitHub Actions* e *Visibility: Private* (só quem tem acesso ao repositório).
- Arquivo novo fora de `css/` e `js/`: inclua no passo "Separar arquivos do site".

## Boas práticas para alterar

- Alterações por **Pull Request**, com revisão. A `main` é protegida.
- Mudou `config.js` ou `csv.js`? Rode `node --test` antes do PR. Regra nova em `csv.js` → teste novo em `tests/csv.test.js`.
- Mantenha regras puras em `csv.js` (sem acessar a tela) e a tela em `app.js`.
- Sem bibliotecas externas: a ferramenta não tem nada para atualizar e funciona offline (só a fonte Poppins vem do Google Fonts; sem ela, usa a fonte do sistema).
- Commits: `feat:` novidade · `fix:` correção · `docs:` documentação · `chore:` manutenção. Para desfazer algo publicado: `git revert <commit>` em um novo PR.
