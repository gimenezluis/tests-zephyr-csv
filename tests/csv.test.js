// Testes das regras do CSV e da configuração.
// Rodar: node --test      (Node 18 ou superior, sem instalar nada)
const test = require('node:test');
const assert = require('node:assert/strict');
const CSV = require('../js/csv.js');
const CONFIG = require('../js/config.js');

/* --- Configuração ------------------------------------------------------------- */
test('cada campo tem chave única', () => {
  const chaves = CONFIG.campos.map(c => c.chave);
  assert.equal(new Set(chaves).size, chaves.length);
});

test('cada campo tem cabeçalho em todos os idiomas', () => {
  for (const campo of CONFIG.campos) {
    for (const idioma of Object.keys(CONFIG.idiomas)) {
      assert.ok(campo.cabecalho && campo.cabecalho[idioma], `campo ${campo.chave} sem cabeçalho "${idioma}"`);
    }
  }
});

test('tipos válidos e listas com opções', () => {
  for (const campo of CONFIG.campos) {
    assert.ok(['texto', 'textoLongo', 'lista'].includes(campo.tipo), `tipo inválido em ${campo.chave}`);
    if (campo.tipo === 'lista') {
      assert.ok(Array.isArray(campo.opcoes) && campo.opcoes.length, `lista sem opções em ${campo.chave}`);
      if (campo.padrao !== undefined) assert.ok(campo.opcoes.includes(campo.padrao), `padrão fora das opções em ${campo.chave}`);
    }
  }
});

test('existe exatamente um campo com papel "nome" e ele é obrigatório', () => {
  const nomes = CONFIG.campos.filter(c => c.papel === 'nome');
  assert.equal(nomes.length, 1);
  assert.equal(nomes[0].obrigatorio, true);
});

test('cada papel especial aparece no máximo uma vez', () => {
  for (const papel of ['nome', 'status', 'pasta', 'bdd']) {
    assert.ok(CONFIG.campos.filter(c => c.papel === papel).length <= 1, `papel "${papel}" repetido`);
  }
});

/* --- Regras do CSV --------------------------------------------------------------- */
test('escaparValor protege vírgula, aspas e quebra de linha', () => {
  assert.equal(CSV.escaparValor('simples'), 'simples');
  assert.equal(CSV.escaparValor('a,b'), '"a,b"');
  assert.equal(CSV.escaparValor('diz "oi"'), '"diz ""oi"""');
  assert.equal(CSV.escaparValor('linha1\nlinha2'), '"linha1\nlinha2"');
  assert.equal(CSV.escaparValor(undefined), '');
});

test('escaparValor neutraliza fórmulas (CSV injection)', () => {
  assert.equal(CSV.escaparValor('=1+1'), "'=1+1");
  assert.equal(CSV.escaparValor('+55 11'), "'+55 11");
  assert.equal(CSV.escaparValor('@SUM(A1)'), "'@SUM(A1)");
  assert.equal(CSV.escaparValor('-A1'), "'-A1");
  assert.equal(CSV.escaparValor('\t=1'), "'\t=1");
  assert.equal(CSV.escaparValor('=HYPERLINK("http://x","clique")'), '"\'=HYPERLINK(""http://x"",""clique"")"');
});

test('escaparValor não altera texto comum nem marcador de lista', () => {
  assert.equal(CSV.escaparValor('- usuário logado'), '- usuário logado');
  assert.equal(CSV.escaparValor('Validar login'), 'Validar login');
  assert.equal(CSV.escaparValor('a = b'), 'a = b');
  assert.equal(CSV.escaparValor(''), '');
});

test('montarPrefixo junta tags e ignora vazias e colchetes', () => {
  assert.equal(CSV.montarPrefixo(['Manual', ' Mobile ', '']), '[Manual][Mobile]');
  assert.equal(CSV.montarPrefixo(['[Web]']), '[Web]');
  assert.equal(CSV.montarPrefixo([]), '');
});

test('nomeComPrefixo só aplica quando há nome', () => {
  assert.equal(CSV.nomeComPrefixo('Validar login', '[Manual]'), '[Manual] Validar login');
  assert.equal(CSV.nomeComPrefixo('', '[Manual]'), '');
  assert.equal(CSV.nomeComPrefixo('Validar login', ''), 'Validar login');
});

test('limparPasta remove barras', () => {
  assert.equal(CSV.limparPasta('PROJ/123\\A'), 'PROJ123A');
});

test('bddParaIngles converte só a palavra-chave no início da linha', () => {
  const entrada = 'Dado que estou logado\nQuando abro notas\nE filtro\nEntão vejo a nota\nEm seguida algo\nGiven já em inglês';
  const esperado = 'Given que estou logado\nWhen abro notas\nAnd filtro\nThen vejo a nota\nEm seguida algo\nGiven já em inglês';
  assert.equal(CSV.bddParaIngles(entrada, CONFIG.bdd.palavrasChave), esperado);
});

test('gerarCSV usa os cabeçalhos do idioma e a ordem dos campos', () => {
  const campos = [
    { chave: 'Name', cabecalho: { pt: 'Nome', en: 'Name' } },
    { chave: 'BDD', cabecalho: { pt: 'Script de Teste (BDD)', en: 'Test Script (BDD)' } }
  ];
  const linhas = [{ Name: 'Login', BDD: 'Given a\nThen b' }];
  assert.equal(CSV.gerarCSV(campos, linhas, 'pt'), 'Nome,Script de Teste (BDD)\r\nLogin,"Given a\nThen b"');
  assert.equal(CSV.gerarCSV(campos, linhas, 'en').split('\r\n')[0], 'Name,Test Script (BDD)');
});
