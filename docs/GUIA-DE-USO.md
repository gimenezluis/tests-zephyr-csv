# Guia de uso

## 1. Configurar os padrões (opcional)

No card **Padrões para todos os cenários**:

- **Tags do nome:** clique em **+ Adicionar tag de nome** e digite a tag (ex.: `Manual`, `Mobile`). Todos os cenários passam a começar com `[Manual][Mobile]`, inclusive os já criados.
- **Subpasta:** marque **Usar a mesma subpasta (ID da tarefa) em todos os cenários** e informe o ID da tarefa (ex.: `Tarefa-ID`). É um único texto, sem barras.

## 2. Preencher os cenários

Cada card é um caso de teste. Use **+ Adicionar mais um cenário** para criar outro e o **Acesso rápido** (lateral) para navegar. O ícone ao lado de cada item indica o status: ✏️ Rascunho, ✅ Aprovado.

| Campo | Preenchimento |
|---|---|
| Nome do cenário | Obrigatório. Comece com um verbo |
| Objetivo | O que o teste garante |
| Prioridade | High, Normal (padrão) ou Low |
| Status | Draft (padrão) ou Approved |
| Label | Texto livre (ex.: `smoke`, `regressao`, `manual`) |
| Coverage | Chave da história no Jira (ex.: `PROJ-123`) |
| Subpasta: ID da tarefa | ID da tarefa, se não foi definido para todos |
| Pré-condição | Ambiente, usuário de teste e estado dos dados |
| Cenário BDD | Clique em **+ Inserir estrutura Given / When / Then** e complete. Um passo por linha, começando com `Given`, `When`, `And` ou `Then`. Vai para o campo **Script de Teste (BDD)** do Zephyr |

> ⚠️ A página não salva o conteúdo. Baixe o CSV antes de fechar ou recarregar a aba.

## 3. Baixar o CSV

Selecione o **idioma do seu Jira** (Português ou English) e clique em **Baixar CSV**. Cenários sem nome são destacados e impedem o download.

## 4. Importar no Zephyr

1. **Test Cases › More › Import from File › Excel CSV** e envie o arquivo.
2. **Configurações:** pasta destino da sprint · codificação **Unicode (UTF-8)** · separador **vírgula** · manter marcado *Essa linha contém os nomes dos campos*.
3. **Mapeamento de Campos:** os campos já vêm mapeados. Confira e avance.
4. **Mapeamento de Dados:** confira prioridade, status e rótulos.
5. **Importar** e verifique a tela de resultados.

## Problemas comuns

| Problema | Solução |
|---|---|
| "Formato de arquivo não suportado" | Envie o `.csv`, não um `.xlsx` |
| Campo vem como "Nenhum" no mapeamento | Selecione o campo de mesmo nome e avise o responsável pela ferramenta |
| Acentuação incorreta | Use a codificação **Unicode (UTF-8)** |
| BDD não aparece no Zephyr | As linhas precisam começar com `Given`, `When`, `And` ou `Then` (Dado, Quando, E e Então são convertidos automaticamente) |
