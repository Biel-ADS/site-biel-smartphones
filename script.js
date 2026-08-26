// ===== Ícones (line-style, desenhados à mão para cada categoria) =====
const ICONS = {
  plug: '<path d="M9 2v6M15 2v6M6 8h12l-1 5a5 5 0 0 1-10 0L6 8Z"/><path d="M12 17v5"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/><circle cx="12" cy="12" r="2.5"/>',
  speaker: '<rect x="6" y="2" width="12" height="20" rx="3"/><circle cx="12" cy="8.5" r="2"/><circle cx="12" cy="16" r="3.2"/>',
  cable: '<path d="M8 2v5a3 3 0 0 0 3 3h2a3 3 0 0 1 3 3v5"/><circle cx="7" cy="19" r="2.3"/><circle cx="17" cy="5" r="2.3"/>',
  camera: '<path d="M4 8h3l1.6-2.4A2 2 0 0 1 10.3 4.6h3.4a2 2 0 0 1 1.7 1L17 8h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"/><circle cx="12" cy="14" r="3.6"/>',
  bolt: '<path d="M12 2 4 14h6l-1 8 9-13h-6l1-7Z"/>',
  battery: '<rect x="2" y="8" width="17" height="9" rx="2.4"/><path d="M22 11v3"/><path d="M6 12.5h6"/>',
  earbuds: '<path d="M7 8v6a3 3 0 0 0 6 0V8"/><circle cx="7" cy="6.5" r="3"/><circle cx="17" cy="10.5" r="3"/><path d="M17 13.5v3a2.5 2.5 0 0 1-5 0"/>',
  headphone: '<path d="M3 13v-1a9 9 0 0 1 18 0v1"/><rect x="2.4" y="13" width="5" height="7.5" rx="2"/><rect x="16.6" y="13" width="5" height="7.5" rx="2"/>',
  plugbolt: '<path d="M9 2v6M15 2v6M6 8h12l-1 5a5 5 0 0 1-10 0L6 8Z"/><path d="m12 17-1.5 4h3L12 17Z"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v1a7 7 0 0 0 14 0v-1"/><path d="M12 18v4M9 22h6"/>',
  watch: '<rect x="7" y="7" width="10" height="10" rx="2.6"/><path d="M9 7 8.4 3.4A1.6 1.6 0 0 1 10 2h4a1.6 1.6 0 0 1 1.6 1.4L15 7"/><path d="M9 17 8.4 20.6A1.6 1.6 0 0 0 10 22h4a1.6 1.6 0 0 0 1.6-1.4L15 17"/><path d="M12 10.3V12l1.4 1"/>',
  wifi: '<path d="M2 9a17 17 0 0 1 20 0"/><path d="M5.5 13a11.5 11.5 0 0 1 13 0"/><path d="M9 17a6 6 0 0 1 6 0"/><circle cx="12" cy="20.2" r="1"/>',
  router: '<rect x="2" y="10" width="20" height="8" rx="2.4"/><path d="M7 14h.01M11 14h.01"/><path d="M8 10 6 4M16 10l2-6"/>',
  tv: '<rect x="2.5" y="6" width="19" height="13" rx="2.2"/><path d="M8 21.5h8M12 19v2.5"/>',
  box: '<path d="M21 8 12 3 3 8l9 5 9-5Z"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13v9"/>',
};
function iconSvg(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.box}</svg>`;
}

const CATEGORIES = [
  'Adaptadores','Utilidades','Caixas de som','Cabos','Câmeras','Carregadores completos',
  'Carregadores portáteis','Fones sem fio','Fones com fio','Fontes','Headphones',
  'Microfones de lapela','Relógios smart','Repetidores Wi-Fi','Roteadores Wi-Fi','TV Box',
];
const CAT_ICON = {};
PRODUCTS.forEach(p => CAT_ICON[p.categoria] = p.icon);

const WHATSAPP_NUMBER = '5500000000000'; // TODO: trocar pelo número real da loja

function money(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });
}
function money2(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
}
function parseBRL(str) {
  const n = parseFloat(String(str).replace(/\./g, '').replace(',', '.'));
  return isNaN(n) ? 0 : n;
}
function priceLabel(p) {
  if (!p.precoMin) return 'Consultar no WhatsApp';
  if (p.precoMax && p.precoMax !== p.precoMin) return `${money(p.precoMin)} – ${money(p.precoMax)}`;
  return money(p.precoMin);
}
function waLink(p) {
  const txt = encodeURIComponent(`Oi! Tenho interesse no acessório "${p.nome}" que vi no site. Ainda tem disponível?`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${txt}`;
}

function productMedia(p, size = 'normal') {
  if (p.imagem) return `<img src="${p.imagem}" alt="${p.nome}" loading="lazy">`;
  return `<div class="cat-icon">${iconSvg(p.icon)}</div>`;
}

// ===== Render: category grid =====
const catCounts = {};
PRODUCTS.forEach(p => catCounts[p.categoria] = (catCounts[p.categoria] || 0) + 1);

const catGrid = document.getElementById('catGrid');
catGrid.innerHTML = CATEGORIES.map(cat => `
  <div class="cat-card" data-cat="${cat}">
    <div class="cat-icon">${iconSvg(CAT_ICON[cat])}</div>
    <h3>${cat}</h3>
    <span class="cat-count">${catCounts[cat] || 0} itens</span>
  </div>
`).join('');
catGrid.addEventListener('click', e => {
  const card = e.target.closest('.cat-card');
  if (!card) return;
  selectCategory(card.dataset.cat);
  document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ===== Render: offers track =====
const offers = PRODUCTS.filter(p => p.precoMin).sort((a, b) => a.precoMin - b.precoMin);
document.getElementById('offersTrack').innerHTML = offers.map(p => `
  <div class="offer-card" data-id="${p.id}">
    <div class="offer-media">
      <span class="offer-badge">Em estoque</span>
      ${productMedia(p)}
    </div>
    <p class="offer-cat">${p.categoria}</p>
    <p class="offer-name">${p.nome}</p>
    <p class="offer-price">${priceLabel(p)}</p>
  </div>
`).join('');

// ===== Render: filter chips =====
const filterChips = document.getElementById('filterChips');
filterChips.innerHTML += CATEGORIES.map(cat => `
  <button class="chip" data-cat="${cat}">${cat} <span>${catCounts[cat] || 0}</span></button>
`).join('');

let activeCat = 'Todos';
let searchTerm = '';

function selectCategory(cat) {
  activeCat = cat;
  [...filterChips.children].forEach(c => c.classList.toggle('is-active', c.dataset.cat === cat));
  renderGrid();
}
filterChips.addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  selectCategory(chip.dataset.cat);
});

document.getElementById('searchInput').addEventListener('input', e => {
  searchTerm = e.target.value.trim().toLowerCase();
  renderGrid();
});

// ===== Render: product grid =====
const productGrid = document.getElementById('productGrid');
const emptyState = document.getElementById('emptyState');

function renderGrid() {
  let list = PRODUCTS;
  if (activeCat !== 'Todos') list = list.filter(p => p.categoria === activeCat);
  if (searchTerm) {
    list = list.filter(p =>
      p.nome.toLowerCase().includes(searchTerm) ||
      (p.marca && p.marca.toLowerCase().includes(searchTerm)) ||
      p.categoria.toLowerCase().includes(searchTerm)
    );
  }
  emptyState.hidden = list.length > 0;
  productGrid.innerHTML = list.map(p => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-media">${productMedia(p)}</div>
      <p class="product-brand">${p.marca || p.categoria}</p>
      <p class="product-name">${p.nome}</p>
      <p class="product-cat">${p.categoria}</p>
      <div class="product-foot">
        <span class="product-price ${p.precoMin ? '' : 'is-unset'}">${priceLabel(p)}</span>
        <span class="product-ask">${iconSvg('bolt')}</span>
      </div>
    </article>
  `).join('');
}
renderGrid();

// ===== Simulador de entrada + parcelamento =====
const JUROS_AO_MES = 0.0299; // 2,99% a.m. — simulação, sem valor contratual
const MAX_PARCELAS = 12;

function installmentPlan(saldo) {
  const list = [];
  for (let n = 1; n <= MAX_PARCELAS; n++) {
    let parcela, total;
    if (n === 1) {
      parcela = saldo;
      total = saldo;
    } else {
      const i = JUROS_AO_MES;
      parcela = (saldo * i) / (1 - Math.pow(1 + i, -n));
      total = parcela * n;
    }
    list.push({ n, parcela, total });
  }
  return list;
}

function renderParcelas(saldo) {
  const parcelasEl = document.getElementById('simParcelas');
  if (!parcelasEl) return;
  if (saldo <= 0) {
    parcelasEl.innerHTML = `<p class="sim-paid">A entrada já cobre o valor total. Nada a parcelar!</p>`;
    return;
  }
  const plan = installmentPlan(saldo);
  parcelasEl.innerHTML = plan.map(x => `
    <div class="sim-parcela-card">
      <strong>${x.n}x de ${money2(x.parcela)}</strong>
      <span>Total ${money2(x.total)}</span>
    </div>
  `).join('');
}

function updateSimulator(precoBase) {
  const entradaInput = document.getElementById('simEntrada');
  const saldoEl = document.getElementById('simSaldo');
  if (!entradaInput || !saldoEl) return;
  const entrada = Math.min(parseBRL(entradaInput.value), precoBase);
  const saldo = Math.max(0, precoBase - entrada);
  saldoEl.textContent = money2(saldo);
  renderParcelas(saldo);
}

// ===== Modal =====
const modal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
function openModal(p) {
  const precoBase = p.precoMax || p.precoMin || 0;
  const simuladorHtml = p.precoMin ? `
    <div class="sim-box">
      <p class="sim-label">Simular entrada + parcelamento</p>
      <div class="sim-entrada-row">
        <div class="sim-input-wrap">
          <span>R$</span>
          <input type="text" inputmode="decimal" id="simEntrada" placeholder="0,00">
        </div>
        <button type="button" class="btn btn-cta btn-small sim-calc-btn" id="simCalcBtn">Calcular</button>
      </div>
      <div class="sim-saldo-row">
        <span>Saldo a parcelar</span>
        <strong id="simSaldo">${money2(precoBase)}</strong>
      </div>
      <p class="sim-parcelas-label">Parcelas</p>
      <div class="sim-parcelas" id="simParcelas"></div>
      <p class="sim-disclaimer">Simulação estimada, sem valor contratual. Condições reais confirmadas com o consultor.</p>
    </div>
  ` : '';

  modalBody.innerHTML = `
    <div class="modal-media">${productMedia(p)}</div>
    <p class="modal-brand">${p.marca || p.categoria}</p>
    <h3 class="modal-name">${p.nome}</h3>
    <div class="modal-meta">
      <span>${p.categoria}</span>
      ${p.cor ? `<span>Cor: ${p.cor}</span>` : ''}
    </div>
    <p class="modal-price ${p.precoMin ? '' : 'is-unset'}">${priceLabel(p)}</p>
    ${simuladorHtml}
    <a href="${waLink(p)}" target="_blank" rel="noopener" class="btn btn-cta modal-cta">
      ${iconSvg('bolt')} Perguntar no WhatsApp
    </a>
  `;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  if (p.precoMin) {
    renderParcelas(precoBase);
    document.getElementById('simCalcBtn').addEventListener('click', () => updateSimulator(precoBase));
    document.getElementById('simEntrada').addEventListener('keydown', e => {
      if (e.key === 'Enter') updateSimulator(precoBase);
    });
  }
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}
document.addEventListener('click', e => {
  const card = e.target.closest('.product-card, .offer-card');
  if (card) {
    const p = PRODUCTS.find(x => x.id === card.dataset.id);
    if (p) openModal(p);
  }
});
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalBackdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== Header scroll state + mobile nav =====
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
}, { passive: true });

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => mainNav.classList.toggle('is-open'));
mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mainNav.classList.remove('is-open')));

document.getElementById('year').textContent = new Date().getFullYear();

// ===== Cursor glow (desktop only) =====
const glow = document.querySelector('.cursor-glow');
if (window.matchMedia('(min-width: 861px)').matches) {
  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

// ===== GSAP animations =====
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.gsap && !prefersReduced) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to('.hero [data-reveal]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 })
    .fromTo('.hero [data-reveal]', { y: 26 }, { y: 0, duration: 0.9, stagger: 0.12 }, '<');

  gsap.utils.toArray('.section [data-reveal], .cta-card[data-reveal]').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 34 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(obj, {
        v: target, duration: 1.6, ease: 'power2.out',
        onUpdate: () => el.textContent = Math.round(obj.v) + suffix,
      }),
    });
  });

  gsap.to('.orb-1', { y: 40, x: -20, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.orb-2', { y: -30, x: 20, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
} else {
  document.querySelectorAll('[data-reveal]').forEach(el => el.style.opacity = 1);
  document.querySelectorAll('[data-count]').forEach(el => el.textContent = el.dataset.count + (el.dataset.suffix || ''));
}
