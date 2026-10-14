# Gerador de Cenários Zephyr

Aplicação web para escrever casos de teste em Gherkin e gerar um **CSV pronto para importar no Zephyr**.

🔗 **Aplicação:** {link da aplicação}

- Uma página estática (`index.html`), sem backend e sem banco de dados.
- O conteúdo digitado **não sai do navegador**: o CSV é gerado na máquina de quem usa.

## Documentação

| Documento | Conteúdo |
|---|---|
| [Guia de uso](docs/GUIA-DE-USO.md) | Como criar os cenários e importar no Zephyr |
| [Diretrizes de uso](docs/DIRETRIZES.md) | Regras da empresa: dados permitidos, padrões, revisão e evidências |
| [Desenvolvimento](docs/DESENVOLVIMENTO.md) | Tecnologia, estrutura do código e como fazer ajustes |
| [Publicação](docs/PUBLICACAO.md) | Como a aplicação é publicada e mantida |

## Tecnologia

HTML, CSS e JavaScript puro em um único arquivo. Sem dependências e sem build. Publicação pelo GitHub Pages via GitHub Actions; `Dockerfile` (nginx) disponível como alternativa.

## Estrutura

```
├── index.html                    # aplicação
├── docs/                         # documentação
├── .github/workflows/pages.yml   # publicação no GitHub Pages
├── Dockerfile                    # opcional: execução em container
└── nginx.conf                    # opcional: configuração do container
```

## Responsável

{time} · {contato} · {canal}
