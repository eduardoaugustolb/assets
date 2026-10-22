const icons = JSON.parse(document.querySelector('#icon-data').textContent);
const examples = JSON.parse(document.querySelector('#example-data').textContent);
const root = document.documentElement;
const $ = selector => document.querySelector(selector);
const search = $('#search'), category = $('#category'), size = $('#size'), color = $('#color');
let selected = icons[0];
let toastTimer;

function toast(message) {
  const target = $('#toast');
  clearTimeout(toastTimer);
  target.textContent = message;
  target.classList.add('visible');
  toastTimer = setTimeout(() => target.classList.remove('visible'), 2800);
}

async function copy(text) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    toast('Código copiado.');
  } catch {
    const dialog = $('#copy-fallback');
    $('#fallback-code').value = text;
    dialog.showModal();
    $('#fallback-code').focus();
    $('#fallback-code').select();
  }
}

function filter() {
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const query = normalize(search.value.trim());
  let count = 0;
  document.querySelectorAll('.icon-card').forEach(card => {
    const icon = icons.find(icon => icon.name === card.dataset.name);
    const match = (category.value === 'all' || card.dataset.category === category.value)
      && [...document.querySelectorAll('input[name="tag"]:checked')].every(input => icon.tags.includes(input.value))
      && normalize(`${icon.name} ${icon.label} ${icon.usage} ${icon.tags.join(' ')} ${icon.tagLabels.join(' ')} ${icon.aliases.join(' ')}`).includes(query);
    card.hidden = !match;
    if (match) count++;
  });
  $('#count').textContent = `${count} ${count === 1 ? 'ícone' : 'ícones'}`;
  $('#empty').hidden = count !== 0;
}

function select(name) {
  selected = icons.find(icon => icon.name === name);
  $('#selected-title').textContent = selected.name;
  $('#selected-usage').textContent = selected.usage;
  $('#selected-tags').textContent = selected.tagLabels.join(' · ');
  $('#selected-origin').textContent = selected.provenance.kind === 'third-party' ? 'Terceiros · Simple Icons ' + selected.provenance.version + ' · fontes e condições no manifesto.' : 'Pictograma autoral · Eduardo Augusto';
  updateBadge();
  $('#selected-code').textContent = selected.svg;
  for (const [id, folder] of [['current', ''], ['ink', 'ink/'], ['paper', 'paper/']]) {
    $(`#download-${id}`).href = `icons/svg/${folder}${selected.name}.svg`;
  }
  document.querySelectorAll('[data-select]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.select === name)));
}

function previewColor() {
  root.style.setProperty('--preview-color', color.value);
  const luminance = hex => {
    const values = hex.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return values[0] * .2126 + values[1] * .7152 + values[2] * .0722;
  };
  const background = luminance(root.dataset.theme === 'dark' ? '#0b0b0b' : '#eae6dd');
  const foreground = luminance(color.value);
  const contrast = (Math.max(background, foreground) + .05) / (Math.min(background, foreground) + .05);
  $('#contrast-note').textContent = contrast < 3 ? 'Contraste baixo: o ícone pode desaparecer neste fundo.' : 'A cor ajusta o preview; o SVG mantém currentColor.';
}

function theme(dark) {
  root.dataset.theme = dark ? 'dark' : 'light';
  const button = $('#theme-toggle');
  button.setAttribute('aria-pressed', String(dark));
  button.textContent = dark ? 'Tema claro' : 'Tema escuro';
  color.value = dark ? '#f7f3ea' : '#0b0b0b';
  $('meta[name="theme-color"]').content = dark ? '#0b0b0b' : '#f7f3ea';
  updateBadge();
  previewColor();
}

$('.toolbar').addEventListener('submit', event => event.preventDefault());
search.addEventListener('input', filter);
category.addEventListener('change', filter);
size.addEventListener('input', () => {
  root.style.setProperty('--preview-size', `${size.value}px`);
  $('#size-value').textContent = `${size.value} px`;
});
color.addEventListener('input', previewColor);
$('#theme-toggle').addEventListener('click', () => theme(root.dataset.theme !== 'dark'));
$('#reset').addEventListener('click', () => {
  clearFilters(); size.value = '40';
  size.dispatchEvent(new Event('input'));
  theme(root.dataset.theme === 'dark');
  select(icons[0].name);
  filter();
});
document.querySelectorAll('[data-select]').forEach(button => button.addEventListener('click', () => select(button.dataset.select)));
document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', () => copy(icons.find(icon => icon.name === button.dataset.copy).svg)));
document.querySelectorAll('[data-copy-example]').forEach(button => button.addEventListener('click', () => copy(examples.find(example => example.id === button.dataset.copyExample).code)));
$('#copy-selected').addEventListener('click', () => copy(selected.svg));
document.querySelectorAll('button[disabled], input[disabled], select[disabled]').forEach(element => element.disabled = false);
$('#theme-toggle').hidden = false;
theme(window.matchMedia('(prefers-color-scheme: dark)').matches);

function clearFilters() {
  search.value = ''; category.value = 'all';
  document.querySelectorAll('input[name="tag"]').forEach(input => input.checked = false);
  filter();
}
function updateBadge() {
  const dark = $('#asset-theme').value === 'dark';
  $('#badge-preview').src = 'icons/badges/' + (dark ? 'dark' : 'light') + '/' + selected.name + '.svg';
  $('#badge-preview').alt = selected.label;
}
function assetSnippet(format) {
  const badge = $('#asset-kind').value === 'badge', dark = $('#asset-theme').value === 'dark';
  const path = badge ? 'badges/' + (dark ? 'dark/' : 'light/') : 'svg/' + (dark ? 'paper/' : 'ink/');
  const url = 'https://raw.githubusercontent.com/eduardoaugustolb/assets/main/icons/' + path + selected.name + '.svg';
  if (format === 'url') return url;
  if (format === 'markdown') return '![' + selected.label + '](' + url + ')';
  const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
  return '<img src="' + url + '" height="' + (badge ? 32 : 24) + '" alt="' + escape(selected.label) + '">';
}
document.querySelectorAll('input[name="tag"]').forEach(input => input.addEventListener('change',filter));
$('#clear-filters').addEventListener('click',clearFilters);
$('#asset-theme').addEventListener('change',updateBadge);
document.querySelectorAll('[data-copy-format]').forEach(button => button.addEventListener('click', () => copy(assetSnippet(button.dataset.copyFormat))));
select(icons[0].name);
