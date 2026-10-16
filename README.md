# Gerador de Cenários Zephyr

Página web interna para escrever casos de teste (com BDD) e gerar um **CSV pronto para importar no Zephyr**, com os campos já mapeados.

🔗 **Aplicação:** {link da aplicação}

- HTML, CSS e JavaScript puro: sem dependências, sem build, sem backend.
- Nada é enviado ou armazenado: o CSV é gerado no navegador.
- Publicado no GitHub Pages **privado**.

## Documentação

| Documento | Para quem |
|---|---|
| [Guia de uso](docs/guia_uso.md) | Quem cria cenários |
| [Documentação técnica](docs/doc_tech.md) | Quem vai ajustar ou evoluir o código |

## Estrutura

```
├── index.html                    # estrutura da página
├── css/style.css                 # visual
├── js/config.js                  # ← campos, cabeçalhos do CSV, opções e padrões
├── js/csv.js                     # regras do CSV (funções puras)
├── js/app.js                     # comportamento da tela
├── tests/csv.test.js             # testes: node --test
├── docs/                         # documentação
└── .github/workflows/pages.yml   # testa e publica no GitHub Pages
```

**Incluir ou ajustar um campo:** altere só o `js/config.js`. Detalhes na [documentação técnica](docs/doc_tech.md).

## Rodar localmente

Abra o `index.html` no navegador. Para os testes: `node --test` (Node 18+).