const postos = window.POSTOS || [];
const estadoEl = document.querySelector('#estado');
const municipioEl = document.querySelector('#municipio');
const bairroEl = document.querySelector('#bairro');
const buscaEl = document.querySelector('#busca');
const resultsEl = document.querySelector('#results');
const totalCountEl = document.querySelector('#totalCount');
const resultCountEl = document.querySelector('#resultCount');
const activeFiltersEl = document.querySelector('#activeFilters');
const limparEl = document.querySelector('#limpar');
const template = document.querySelector('#cardTemplate');

totalCountEl.textContent = postos.length.toLocaleString('pt-BR');

const normalize = (value) => String(value || '')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().trim();

function uniqueOptions(field, source = postos) {
  return [...new Set(source.map(item => item[field]).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

function fillSelect(select, values, label = 'Todos') {
  const current = select.value;
  select.innerHTML = `<option value="">${label}</option>`;
  values.forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
  select.value = values.includes(current) ? current : '';
}

function filteredByLocation(ignoreField = '') {
  return postos.filter(p => {
    if (ignoreField !== 'estado' && estadoEl.value && p.estado !== estadoEl.value) return false;
    if (ignoreField !== 'municipio' && municipioEl.value && p.municipio !== municipioEl.value) return false;
    if (ignoreField !== 'bairro' && bairroEl.value && p.bairro !== bairroEl.value) return false;
    return true;
  });
}

function updateDependentOptions() {
  fillSelect(estadoEl, uniqueOptions('estado'), 'Todos');
  fillSelect(municipioEl, uniqueOptions('municipio', filteredByLocation('municipio')), 'Todos');
  fillSelect(bairroEl, uniqueOptions('bairro', filteredByLocation('bairro')), 'Todos');
}

function getFilteredPostos() {
  const q = normalize(buscaEl.value);
  return postos.filter(p => {
    if (estadoEl.value && p.estado !== estadoEl.value) return false;
    if (municipioEl.value && p.municipio !== municipioEl.value) return false;
    if (bairroEl.value && p.bairro !== bairroEl.value) return false;
    if (!q) return true;
    const haystack = [p.nome, p.razaoSocial, p.cnpj, p.terminal, p.endereco, p.bairro, p.municipio, p.estado, p.tipo, p.bandeira].map(normalize).join(' ');
    return haystack.includes(q);
  });
}

function render() {
  updateDependentOptions();
  const filtered = getFilteredPostos();
  resultsEl.innerHTML = '';
  resultCountEl.textContent = `${filtered.length.toLocaleString('pt-BR')} resultado${filtered.length === 1 ? '' : 's'}`;
  const filters = [estadoEl.value, municipioEl.value, bairroEl.value, buscaEl.value && `Busca: ${buscaEl.value}`].filter(Boolean);
  activeFiltersEl.textContent = filters.length ? filters.join(' • ') : 'Sem filtros aplicados';

  if (!filtered.length) {
    resultsEl.innerHTML = '<div class="empty"><strong>Nenhum posto encontrado.</strong><br>Altere ou limpe os filtros para tentar novamente.</div>';
    return;
  }

  filtered.forEach(p => {
    const node = template.content.cloneNode(true);
    node.querySelector('h2').textContent = p.nome || 'Sem nome fantasia';
    node.querySelector('.tipo').textContent = p.tipo || 'Tipo não informado';
    node.querySelector('.badge').textContent = p.bandeira || 'Sem bandeira';
    ['estado','municipio','bairro','endereco','cep','terminal','cnpj','horario'].forEach(field => {
      node.querySelector(`.${field}`).textContent = p[field] || 'Não informado';
    });
    resultsEl.appendChild(node);
  });
}

[estadoEl, municipioEl, bairroEl, buscaEl].forEach(el => el.addEventListener('input', render));
limparEl.addEventListener('click', () => {
  estadoEl.value = '';
  municipioEl.value = '';
  bairroEl.value = '';
  buscaEl.value = '';
  render();
});

updateDependentOptions();
render();
