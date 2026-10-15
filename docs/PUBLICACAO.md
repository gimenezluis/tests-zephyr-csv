# Publicação

A aplicação é publicada no **GitHub Pages privado**: só abre para quem está logado no GitHub com acesso ao repositório da organização. Se a organização usa SSO, esse login é a conta corporativa (Microsoft).

## Configuração (uma vez)

| Item | Valor |
|---|---|
| Repositório | {org}/qa-zephyr-test-case-generator |
| Aplicação | {link da aplicação} |
| Source | *Settings › Pages › Source: GitHub Actions* |
| Visibilidade | *Settings › Pages › Visibility › **Private*** |
| Workflow | `.github/workflows/pages.yml`: publica o `index.html` a cada merge na `main` |

Execução manual: *Actions › Publicar no GitHub Pages › Run workflow*.

## Quem acessa

- Qualquer pessoa com **acesso de leitura** ao repositório.
- Para liberar um time: *Settings › Collaborators and teams* → adicionar o time da organização com permissão **Read**.
- Escrita (alterar o código) só para o responsável e revisores.

## Custos e limites

Sem custo adicional ao plano GitHub Enterprise Cloud da organização. Site até 1 GB e tráfego de 100 GB/mês; a aplicação tem cerca de 20 KB. Não há limite prático de uso simultâneo: cada pessoa usa a página no próprio navegador.

> O workflow publica apenas o `index.html`. Novos arquivos (imagens, CSS, JS) precisam ser incluídos no passo "Separar arquivos do site" do `pages.yml`.

## Governança

- A `main` deve ser protegida, com alterações apenas por Pull Request.
- A página não coleta nem envia dados: o CSV é gerado no navegador de quem usa.
- A página tem `noindex` para não aparecer em buscadores.

## Solução de problemas

| Sintoma | Ação |
|---|---|
| Nenhum workflow em Actions | Verificar se `.github/workflows/pages.yml` está no repositório |
| Deploy falha com "Not Found" | Ativar *Source: GitHub Actions* e executar novamente |
| Usuário recebe 404 ao abrir o link | Ele não tem acesso de leitura ao repositório ou não está logado no GitHub da organização |
| Opção *Private* não aparece | A organização não está no GitHub Enterprise Cloud: falar com o admin do GitHub |
| Alteração não aparece | Recarregar com **Ctrl+F5** |
