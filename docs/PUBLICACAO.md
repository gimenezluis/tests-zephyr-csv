# Publicação

## GitHub Pages

| Item | Valor |
|---|---|
| Repositório | {org}/qa-zephyr-test-case-generator |
| Aplicação | {link da aplicação} |
| Source | *Settings › Pages › Source: GitHub Actions* |
| Visibilidade | *Settings › Pages › Visibility › Private* (acesso restrito à empresa; requer GitHub Enterprise Cloud) |
| Workflow | `.github/workflows/pages.yml`: publica o `index.html` a cada merge na `main` |

Execução manual: *Actions › Publicar no GitHub Pages › Run workflow*.

**Custos e limites:** sem custo adicional ao plano do GitHub. Site até 1 GB e tráfego de 100 GB/mês; a aplicação tem cerca de 16 KB. O uso simultâneo não tem limite prático, pois cada pessoa usa a página no próprio navegador.

> O workflow publica apenas o `index.html`. Novos arquivos (imagens, CSS, JS) precisam ser incluídos no passo "Separar arquivos do site" do `pages.yml`.

## Execução em container (opcional)

Para servidor próprio ou cluster:

```bash
docker build -t qa-zephyr-test-case-generator .
docker run --rm -p 8080:8080 qa-zephyr-test-case-generator
```

nginx sem root, porta `8080`, health check em `/health`.

## Acessos

- Permissão de escrita no repositório: *Settings › Collaborators and teams*.
- A `main` deve ser protegida, com alterações apenas por Pull Request.

## Solução de problemas

| Sintoma | Ação |
|---|---|
| Nenhum workflow em Actions | Verificar se `.github/workflows/pages.yml` está no repositório |
| Deploy falha com "Not Found" | Ativar *Source: GitHub Actions* e executar novamente |
| Site retorna 404 | Aguardar 1–2 minutos após a primeira publicação |
| Alteração não aparece | Recarregar com **Ctrl+F5** |
