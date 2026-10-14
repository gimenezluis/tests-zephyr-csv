# Gerador de cenários de teste para o Zephyr

Página web simples para criar cenários de teste (em Gherkin) e baixar um **CSV pronto para importar no Zephyr**, sem precisar de Excel.

- Uma página só (`index.html`), sem backend e sem banco.
- Os dados digitados **não saem do navegador**: o CSV é gerado localmente e baixado.

## Como usar

1. Abra a aplicação e preencha os cenários (um card por cenário).
2. Clique em **Baixar CSV**.
3. No Jira: **Zephyr › Test Cases › More › Import from File › Excel CSV**.
4. Envie o arquivo. Em **Configurações**: codificação **Unicode (UTF-8)** · separador do CSV **vírgula** · deixe marcado "Essa linha contém os nomes dos campos".
5. Em **Mapeamento de Campos** os campos já vêm ligados, porque os cabeçalhos do CSV têm o mesmo nome dos campos do Zephyr. Só confira e clique em **Próximo**. Escolha no gerador o idioma do seu Jira (Português ou English).
6. Clique em **Import** e confira a tela de resultados.

**Pasta:** em "Subpasta: ID da tarefa", informe o ID da tarefa do Jira (ex.: `Tarefa-ID`). Os cenários ficam numa subpasta com esse nome, dentro da pasta escolhida na importação (ex.: a pasta da sprint). Vazio = direto na pasta escolhida.

**Evidências:** não entram pela importação. Anexe os prints na execução do teste, dentro do Test Cycle. Padrão de nome: `{chave-do-teste}_{ambiente}_{AAAA-MM-DD}.png`.

> Nunca coloque senhas ou dados pessoais reais nos cenários.

## Rodar localmente

Abra o `index.html` direto no navegador, ou:

```bash
docker build -t qa-zephyr-csv-generator .
docker run --rm -p 8080:8080 qa-zephyr-csv-generator
# abra http://localhost:8080
```

## Publicar

**Opção A: GitHub Pages (mais simples).** Em *Settings › Pages*, escolha **Source: GitHub Actions**. Cada push na `main` publica pelo workflow `.github/workflows/pages.yml`. Para repositório privado, ajuste a visibilidade da página para **Private** (exige GitHub Enterprise).

**Opção B: container no cluster.** Use o `Dockerfile` (nginx sem root, porta `8080`, health check em `/health`) com o template de deploy de aplicação do time de plataforma.

## Campos do CSV

Os cabeçalhos ficam no topo do `index.html`, no objeto `HEAD`. Se algum campo não mapear sozinho no Zephyr, troque o texto pelo nome exato que aparece na tela de mapeamento.

| Português | English | Obrigatório | Observação |
|---|---|---|---|
| Nome | Name | Sim | Nome do cenário |
| Objetivo | Objective | Não | O que o teste garante |
| Prioridade | Priority | Não | High, Normal, Low (padrão: Normal) |
| Status | Status | Não | Draft, Approved |
| Rótulos | Labels | Não | smoke, regressao, automatizado, manual |
| Cobertura (Itens de trabalho) | Coverage | Não | Chave da história no Jira (ex.: PROJ-123) |
| Pasta | Folder | Não | ID da tarefa (ex.: Tarefa-ID). Vazio = pasta escolhida na importação |
| Precondição | Precondition | Não | Ambiente, usuário de teste, estado da massa |
| Script de Teste (Passo-a-Passo) - Passo | Test Script (Steps) - Step | Não | Passos "Dado / E / Quando", um por linha |
| Script de Teste (Passo-a-Passo) - Resultado Esperado | Test Script (Steps) - Expected Result | Não | Linhas "Então / E" |

Referência: [Zephyr – Import test cases](https://support.smartbear.com/zephyr/docs/en/test-cases/import-test-cases.html)

## Responsável

{time} · {contato} · {canal}
