/* ==========================================================================
   Gerador de Cenários Zephyr · regras do CSV
   --------------------------------------------------------------------------
   Funções puras (sem tela): fáceis de testar e de reaproveitar.
   Testes em tests/csv.test.js  →  node --test
   ========================================================================== */
(function (root) {
  'use strict';

  /** Protege um valor para o CSV: aspas em volta quando tem vírgula, aspas ou quebra de linha. */
  function escaparValor(valor) {
    const texto = String(valor ?? '');
    return /[",\n\r]/.test(texto) ? '"' + texto.replace(/"/g, '""') + '"' : texto;
  }

  /** Junta as tags no formato [Tag1][Tag2], ignorando vazias e colchetes digitados. */
  function montarPrefixo(tags) {
    return tags
      .map(tag => String(tag).replace(/[[\]]/g, '').trim())
      .filter(Boolean)
      .map(tag => '[' + tag + ']')
      .join('');
  }

  /** Nome final do cenário: "<prefixo> <nome>". Sem nome, devolve vazio. */
  function nomeComPrefixo(nome, prefixo) {
    return prefixo && nome ? prefixo + ' ' + nome : nome;
  }

  /** Remove barras: a subpasta é um único nível no Zephyr. */
  function limparPasta(texto) {
    return String(texto ?? '').replace(/[\\/]/g, '');
  }

  /** Troca palavras-chave em português no início de cada linha pela palavra-chave em inglês. */
  function bddParaIngles(texto, palavrasChave) {
    const termos = Object.keys(palavrasChave).sort((a, b) => b.length - a.length).join('|');
    const regra = new RegExp('^(\\s*)(' + termos + ')(?=\\s)', 'i');
    return String(texto ?? '')
      .split('\n')
      .map(linha => linha.replace(regra, (_, espaco, termo) => espaco + palavrasChave[termo.toLowerCase()]))
      .join('\n');
  }

  /**
   * Gera o conteúdo do CSV.
   * @param {Array} campos  lista de campos da configuração (define colunas e ordem)
   * @param {Array} linhas  um objeto por cenário: { chaveDoCampo: valor }
   * @param {string} idioma chave do idioma do Jira (ex.: 'pt')
   */
  function gerarCSV(campos, linhas, idioma) {
    const cabecalho = campos.map(campo => escaparValor(campo.cabecalho[idioma]));
    const corpo = linhas.map(linha => campos.map(campo => escaparValor(linha[campo.chave])).join(','));
    return [cabecalho.join(',')].concat(corpo).join('\r\n');
  }

  const CSV = { escaparValor, montarPrefixo, nomeComPrefixo, limparPasta, bddParaIngles, gerarCSV };

  if (typeof module !== 'undefined' && module.exports) module.exports = CSV;
  else root.CSV = CSV;
})(this);
