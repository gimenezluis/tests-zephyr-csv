/* ==========================================================================
   Gerador de Cenários Zephyr · configuração
   --------------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa mexer para:
   - incluir, remover ou reordenar campos (lista `campos`)
   - mudar rótulos, dicas, opções de listas e valores padrão
   - corrigir o nome de uma coluna do CSV (objeto `cabecalho`)
   - mudar a estrutura inicial do BDD e as palavras-chave convertidas

   A ordem da lista `campos` é a ordem dos campos na tela E das colunas no CSV.
   ========================================================================== */
(function (root) {
  'use strict';

  const CONFIG = {
    /* Idiomas do Jira disponíveis no seletor. A chave precisa existir no
       `cabecalho` de todos os campos. */
    idiomas: { pt: 'Português', en: 'English' },

    /* Campos de cada cenário.
       chave         identificador interno (único)
       rotulo        texto acima do campo
       dica          texto pequeno ao lado do rótulo (opcional)
       tipo          'texto' (uma linha) · 'textoLongo' (várias linhas) · 'lista' (opções)
       opcoes        valores da lista (só para tipo 'lista')
       padrao        valor inicial de um cenário novo (opcional)
       exemplo       texto de exemplo dentro do campo (opcional)
       larguraTotal  true = ocupa a linha inteira
       obrigatorio   true = impede o download se estiver vazio
       papel         comportamento especial (no máximo um campo por papel):
                     'nome'   recebe o prefixo das tags e aparece no Acesso rápido
                     'status' define o ícone do Acesso rápido (Approved = aprovado)
                     'pasta'  pode ser preenchido para todos de uma vez, sem barras
                     'bdd'    ganha o botão de estrutura e converte palavras-chave
       cabecalho     nome EXATO do campo no Zephyr, por idioma (é o de-para do CSV) */
    campos: [
      {
        chave: 'Name', papel: 'nome', obrigatorio: true, larguraTotal: true,
        rotulo: 'Nome do cenário', dica: 'obrigatório · comece com um verbo', tipo: 'texto',
        cabecalho: { pt: 'Nome', en: 'Name' }
      },
      {
        chave: 'Objective', larguraTotal: true,
        rotulo: 'Objetivo', dica: 'o que este teste garante', tipo: 'texto',
        cabecalho: { pt: 'Objetivo', en: 'Objective' }
      },
      {
        chave: 'Priority',
        rotulo: 'Prioridade', tipo: 'lista', opcoes: ['High', 'Normal', 'Low'], padrao: 'Normal',
        cabecalho: { pt: 'Prioridade', en: 'Priority' }
      },
      {
        chave: 'Status', papel: 'status',
        rotulo: 'Status', dica: 'Draft = novo · Approved = revisado', tipo: 'lista', opcoes: ['Draft', 'Approved'], padrao: 'Draft',
        cabecalho: { pt: 'Status', en: 'Status' }
      },
      {
        chave: 'Labels',
        rotulo: 'Label', dica: 'texto livre, ex.: smoke, regressao, manual', tipo: 'texto',
        cabecalho: { pt: 'Rótulos', en: 'Labels' }
      },
      {
        chave: 'Coverage',
        rotulo: 'Coverage', dica: 'chave da história no Jira, ex.: PROJ-123', tipo: 'texto',
        cabecalho: { pt: 'Cobertura (Itens de trabalho)', en: 'Coverage' }
      },
      {
        chave: 'Folder', papel: 'pasta', larguraTotal: true,
        rotulo: '📁 Subpasta: ID da tarefa',
        dica: 'informe o ID da tarefa do Jira; os cenários ficam numa subpasta com esse nome dentro da pasta escolhida na importação',
        tipo: 'texto', exemplo: 'Tarefa-ID',
        cabecalho: { pt: 'Pasta', en: 'Folder' }
      },
      {
        chave: 'Precondition', larguraTotal: true,
        rotulo: 'Pré-condição', dica: 'ambiente, usuário de teste, estado da massa', tipo: 'textoLongo',
        cabecalho: { pt: 'Precondição', en: 'Precondition' }
      },
      {
        chave: 'BDD', papel: 'bdd', larguraTotal: true,
        rotulo: 'Cenário BDD', dica: 'um passo por linha, começando com Given · When · And · Then', tipo: 'textoLongo',
        exemplo: 'Given que estou logado com um usuário de teste\nWhen acesso a tela de relatórios\nAnd filtro pelo mês atual\nThen vejo a lista de relatórios do mês',
        cabecalho: { pt: 'Script de Teste (BDD)', en: 'Test Script (BDD)' }
      }
    ],

    /* BDD: o Zephyr só aceita as palavras-chave em inglês. */
    bdd: {
      estrutura: 'Given \nWhen \nThen ',
      /* Palavras em português no início da linha que viram a palavra-chave em inglês */
      palavrasChave: {
        dado: 'Given', dada: 'Given', dados: 'Given', dadas: 'Given',
        quando: 'When',
        'então': 'Then', entao: 'Then',
        e: 'And',
        mas: 'But'
      }
    },

    /* Nome do arquivo baixado: <prefixo><AAAA-MM-DD>.csv */
    arquivo: { prefixo: 'cenarios-zephyr-' }
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = CONFIG;
  else root.CONFIG = CONFIG;
})(this);
