/* ==========================================================================
   Gerador de Cenários Zephyr · tela
   --------------------------------------------------------------------------
   Monta a tela a partir de CONFIG (js/config.js) e usa as regras de CSV
   (js/csv.js). Comportamentos especiais são ligados pelo `papel` do campo,
   nunca pela chave, então renomear um campo não quebra nada aqui.
   ========================================================================== */
(function () {
  'use strict';

  const { campos, idiomas, bdd, arquivo } = window.CONFIG;
  const CSV = window.CSV;

  /* --- Atalhos --------------------------------------------------------------- */
  const $ = (seletor, base = document) => base.querySelector(seletor);
  const $$ = (seletor, base = document) => [...base.querySelectorAll(seletor)];
  const campoPorPapel = papel => campos.find(campo => campo.papel === papel);
  const PAPEL = {
    nome: campoPorPapel('nome'),
    status: campoPorPapel('status'),
    pasta: campoPorPapel('pasta'),
    bdd: campoPorPapel('bdd')
  };

  const el = {
    lista: $('#list'),
    nav: $('#nav'),
    contador: $('#count'),
    tags: $('#tags'),
    previa: $('#prev'),
    previaTexto: $('#prevTxt'),
    usarPasta: $('#usarPasta'),
    pastaTodos: $('#pastaTodos'),
    idioma: $('#lang')
  };

  let sequencia = 0;
  let cenarioAtivo = null;

  /* --- Utilidades ---------------------------------------------------------------- */
  function escapeHtml(texto) {
    return String(texto).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }
  function cartoes() { return $$('#list .card'); }
  function entrada(cartao, campo) { return campo && $('[data-k="' + campo.chave + '"]', cartao); }
  function prefixoAtual() { return CSV.montarPrefixo($$('input', el.tags).map(i => i.value)); }

  /* --- Criação dos campos -------------------------------------------------------- */
  function criarEntrada(campo) {
    let entradaCampo;
    if (campo.tipo === 'lista') {
      entradaCampo = document.createElement('select');
      campo.opcoes.forEach(opcao => entradaCampo.add(new Option(opcao || '(nenhuma)', opcao)));
    } else {
      entradaCampo = document.createElement(campo.tipo === 'textoLongo' ? 'textarea' : 'input');
    }
    entradaCampo.dataset.k = campo.chave;
    if (campo.exemplo) entradaCampo.placeholder = campo.exemplo;
    if (campo.padrao !== undefined) entradaCampo.value = campo.padrao;
    return entradaCampo;
  }

  function criarBlocoCampo(campo) {
    const bloco = document.createElement('div');
    if (campo.larguraTotal || campo.tipo === 'textoLongo') bloco.classList.add('full');
    if (campo.papel === 'pasta') bloco.classList.add('highlight');

    const rotulo = document.createElement('label');
    rotulo.innerHTML = escapeHtml(campo.rotulo) + (campo.dica ? ' <small>· ' + escapeHtml(campo.dica) + '</small>' : '');
    bloco.appendChild(rotulo);

    const entradaCampo = criarEntrada(campo);

    switch (campo.papel) {
      case 'nome': {
        const caixa = document.createElement('div');
        caixa.className = 'namebox';
        const prefixo = document.createElement('span');
        prefixo.className = 'prefix';
        caixa.append(prefixo, entradaCampo);
        bloco.appendChild(caixa);
        entradaCampo.addEventListener('input', atualizarAcessoRapido);
        return bloco;
      }
      case 'status':
        entradaCampo.addEventListener('change', atualizarAcessoRapido);
        break;
      case 'pasta': {
        entradaCampo.addEventListener('input', () => { entradaCampo.value = CSV.limparPasta(entradaCampo.value); });
        const aviso = document.createElement('div');
        aviso.className = 'lock';
        aviso.hidden = true;
        aviso.textContent = '🔒 Definida no topo para todos os cenários';
        bloco.append(entradaCampo, aviso);
        return bloco;
      }
      case 'bdd':
        entradaCampo.style.minHeight = '170px';
        bloco.appendChild(criarBotaoEstruturaBDD(entradaCampo));
        break;
    }
    bloco.appendChild(entradaCampo);
    return bloco;
  }

  function criarBotaoEstruturaBDD(texto) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'btn btn-secondary btn-small';
    botao.textContent = '+ Inserir estrutura Given / When / Then';
    botao.addEventListener('click', () => {
      if (texto.value.trim() && !confirm('Substituir o texto atual pela estrutura Given / When / Then?')) return;
      texto.value = bdd.estrutura;
      texto.focus();
      const fimPrimeiraLinha = bdd.estrutura.indexOf('\n');
      texto.setSelectionRange(fimPrimeiraLinha, fimPrimeiraLinha);
    });
    return botao;
  }

  /* --- Cenários -------------------------------------------------------------------- */
  function adicionarCenario(focar = false) {
    sequencia += 1;
    const cartao = document.createElement('section');
    cartao.className = 'card';
    cartao.id = 'cen-' + sequencia;
    cartao.innerHTML = '<div class="card-head"><h2>Cenário</h2><button type="button" class="btn-link-danger" data-acao="remover">Remover</button></div><div class="grid"></div>';
    const grade = $('.grid', cartao);
    campos.forEach(campo => grade.appendChild(criarBlocoCampo(campo)));
    $('[data-acao="remover"]', cartao).addEventListener('click', () => removerCenario(cartao));

    el.lista.appendChild(cartao);
    observador.observe(cartao);
    aplicarPastaParaTodos();
    aplicarPrefixo();
    if (focar) irPara(cartao.id, true);
  }

  function removerCenario(cartao) {
    observador.unobserve(cartao);
    cartao.remove();
    renumerar();
  }

  function renumerar() {
    cartoes().forEach((cartao, i) => { $('.card-head h2', cartao).textContent = 'Cenário ' + (i + 1); });
    atualizarAcessoRapido();
  }

  /* --- Acesso rápido (lateral) ----------------------------------------------------- */
  function iconeStatus(valor) {
    return valor === 'Approved'
      ? '<svg class="st ok" viewBox="0 0 16 16" role="img" aria-label="Aprovado"><title>Aprovado</title><circle cx="8" cy="8" r="7.5" fill="currentColor"/><path d="M4.5 8.2l2.3 2.3 4.7-4.8" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      : '<svg class="st dr" viewBox="0 0 16 16" role="img" aria-label="Rascunho"><title>Rascunho</title><path d="M10.8 2.2l3 3-8.3 8.3-3.7.7.7-3.7z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.3 3.7l3 3" stroke="currentColor" stroke-width="1.5"/></svg>';
  }

  function atualizarAcessoRapido() {
    const lista = cartoes();
    el.contador.textContent = lista.length;
    const prefixo = prefixoAtual();
    el.nav.innerHTML = lista.map((cartao, i) => {
      const nome = CSV.nomeComPrefixo(entrada(cartao, PAPEL.nome).value.trim(), prefixo);
      const titulo = escapeHtml(nome || 'Sem nome');
      const status = PAPEL.status ? iconeStatus(entrada(cartao, PAPEL.status).value) : '';
      return '<li><button type="button" data-id="' + cartao.id + '" title="' + titulo + '"><b>' + (i + 1) + '</b>'
        + '<span class="t' + (nome ? '' : ' empty') + '">' + titulo + '</span>' + status + '</button></li>';
    }).join('');
    destacarNoAcessoRapido(cenarioAtivo);
  }

  function irPara(id, focarNome) {
    const cartao = document.getElementById(id);
    if (!cartao) return;
    cartao.scrollIntoView({ behavior: 'smooth', block: 'start' });
    cartao.classList.add('flash');
    setTimeout(() => cartao.classList.remove('flash'), 900);
    const nome = entrada(cartao, PAPEL.nome);
    if (focarNome || !nome.value) setTimeout(() => nome.focus({ preventScroll: true }), 350);
  }

  function destacarNoAcessoRapido(id) {
    cenarioAtivo = id;
    $$('button', el.nav).forEach(botao => botao.classList.toggle('on', botao.dataset.id === id));
    const ativo = $('button.on', el.nav);
    if (ativo) ativo.scrollIntoView({ block: 'nearest' });
  }

  /* Destaca na lateral o cenário mais visível na tela */
  const visibilidade = new Map();
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(e => visibilidade.set(e.target.id, e.intersectionRatio));
    let maisVisivel = null;
    let maior = 0;
    cartoes().forEach(cartao => {
      const razao = visibilidade.get(cartao.id) || 0;
      if (razao > maior) { maior = razao; maisVisivel = cartao.id; }
    });
    if (maisVisivel) destacarNoAcessoRapido(maisVisivel);
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

  /* --- Padrões: tags do nome ------------------------------------------------------- */
  function adicionarTag() {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = '<span>[</span><input placeholder="ex.: Manual" maxlength="30"><span>]</span><button type="button" title="Remover tag">×</button>';
    const campoTag = $('input', tag);
    campoTag.addEventListener('input', () => { campoTag.value = campoTag.value.replace(/[[\]]/g, ''); aplicarPrefixo(); });
    $('button', tag).addEventListener('click', () => { tag.remove(); aplicarPrefixo(); });
    el.tags.appendChild(tag);
    campoTag.focus();
    aplicarPrefixo();
  }

  function aplicarPrefixo() {
    const prefixo = prefixoAtual();
    $$('.prefix').forEach(span => { span.textContent = prefixo; span.hidden = !prefixo; });
    el.previa.hidden = !prefixo;
    el.previaTexto.textContent = prefixo + ' Nome do cenário';
    renumerar();
  }

  /* --- Padrões: subpasta única ------------------------------------------------------ */
  function aplicarPastaParaTodos() {
    if (!PAPEL.pasta) return;
    const ligado = el.usarPasta.checked;
    el.pastaTodos.disabled = !ligado;
    const valor = el.pastaTodos.value.trim();
    cartoes().forEach(cartao => {
      const campoPasta = entrada(cartao, PAPEL.pasta);
      const aviso = $('.lock', cartao);
      if (ligado) {
        if (campoPasta.dataset.locked !== '1') { campoPasta.dataset.own = campoPasta.value; campoPasta.dataset.locked = '1'; }
        campoPasta.value = valor;
        campoPasta.readOnly = true;
        aviso.hidden = false;
      } else {
        if (campoPasta.dataset.locked === '1') { campoPasta.value = campoPasta.dataset.own || ''; campoPasta.dataset.locked = ''; }
        campoPasta.readOnly = false;
        aviso.hidden = true;
      }
    });
  }

  /* --- Download ------------------------------------------------------------------------ */
  function lerCenarios() {
    const prefixo = prefixoAtual();
    let primeiroErro = null;
    const linhas = cartoes().map(cartao => {
      const linha = {};
      campos.forEach(campo => {
        const campoTela = entrada(cartao, campo);
        const alvoErro = campo.papel === 'nome' ? campoTela.closest('.namebox') : campoTela;
        alvoErro.classList.remove('err');
        linha[campo.chave] = campoTela.value.trim();
        if (campo.obrigatorio && !linha[campo.chave]) {
          alvoErro.classList.add('err');
          primeiroErro = primeiroErro || cartao;
        }
      });
      if (PAPEL.nome) linha[PAPEL.nome.chave] = CSV.nomeComPrefixo(linha[PAPEL.nome.chave], prefixo);
      if (PAPEL.bdd) linha[PAPEL.bdd.chave] = CSV.bddParaIngles(linha[PAPEL.bdd.chave], bdd.palavrasChave);
      return linha;
    });
    return { linhas, primeiroErro };
  }

  function baixarCSV() {
    const { linhas, primeiroErro } = lerCenarios();
    if (!linhas.length) { alert('Adicione pelo menos um cenário.'); return; }
    if (primeiroErro) {
      irPara(primeiroErro.id, true);
      alert('Preencha os campos obrigatórios (destacados em vermelho).');
      return;
    }
    const conteudo = CSV.gerarCSV(campos, linhas, el.idioma.value);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([conteudo], { type: 'text/csv;charset=utf-8' }));
    link.download = arquivo.prefixo + new Date().toISOString().slice(0, 10) + '.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  /* --- Início ----------------------------------------------------------------------------- */
  function iniciar() {
    el.idioma.innerHTML = Object.entries(idiomas).map(([valor, nome]) => '<option value="' + valor + '">' + escapeHtml(nome) + '</option>').join('');
    if (PAPEL.pasta) {
      el.pastaTodos.placeholder = PAPEL.pasta.exemplo || '';
      el.usarPasta.addEventListener('change', () => { aplicarPastaParaTodos(); if (el.usarPasta.checked) el.pastaTodos.focus(); });
      el.pastaTodos.addEventListener('input', () => { el.pastaTodos.value = CSV.limparPasta(el.pastaTodos.value); aplicarPastaParaTodos(); });
    } else {
      $('#globalFolder').hidden = true;
    }
    $$('[data-acao="adicionar"]').forEach(botao => botao.addEventListener('click', () => adicionarCenario(true)));
    $('[data-acao="tag"]').addEventListener('click', adicionarTag);
    $('[data-acao="baixar"]').addEventListener('click', baixarCSV);
    el.nav.addEventListener('click', evento => {
      const botao = evento.target.closest('button[data-id]');
      if (botao) irPara(botao.dataset.id);
    });
    $('#ano').textContent = new Date().getFullYear();
    adicionarCenario();
  }

  iniciar();
})();
