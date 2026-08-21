/* TIPUANAS — main.js v3 */
document.addEventListener('DOMContentLoaded', function () {

  /* MOBILE MENU */
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.classList.toggle('is-active', isOpen);
    });
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', false);
        toggle.classList.remove('is-active');
      }
    });
  }

  /* ACTIVE NAV */
  const path = window.location.pathname;
  document.querySelectorAll('.nav__link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href !== '/' && path.startsWith(href)) link.classList.add('active');
    if (href === '/' && path === '/') link.classList.add('active');
  });

  /* REVIEWS SLIDER */
  const track = document.querySelector('.reviews__track');
  if (track) {
    const cards  = track.querySelectorAll('.review-card');
    const dots   = document.querySelectorAll('.reviews__dot');
    const btnPrev = document.querySelector('.reviews__btn--prev');
    const btnNext = document.querySelector('.reviews__btn--next');
    let current = 0;

    function getVisible() {
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function goTo(idx) {
      const vis   = getVisible();
      const max   = Math.max(0, cards.length - vis);
      current     = Math.max(0, Math.min(idx, max));
      const card  = cards[0];
      const gap   = 20;
      const w     = card.offsetWidth + gap;
      track.style.transform = `translateX(-${current * w}px)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    if (btnPrev) btnPrev.addEventListener('click', () => goTo(current - 1));
    if (btnNext) btnNext.addEventListener('click', () => goTo(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    window.addEventListener('resize', () => goTo(current));
    goTo(0);
  }

  /* GALLERY LIGHTBOX */
  const galleryItems = document.querySelectorAll('.gallery-masonry__item img, .gallery-lightbox-trigger');
  if (galleryItems.length) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:none;align-items:center;justify-content:center;';
    const img = document.createElement('img');
    img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:8px;object-fit:contain;';
    const close = document.createElement('button');
    close.innerHTML = '&times;';
    close.style.cssText = 'position:absolute;top:16px;right:24px;font-size:2.5rem;color:white;background:none;border:none;cursor:pointer;line-height:1;';
    overlay.appendChild(img);
    overlay.appendChild(close);
    document.body.appendChild(overlay);

    galleryItems.forEach(function(el) {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', function() {
        img.src = el.src || el.dataset.src;
        overlay.style.display = 'flex';
      });
    });
    close.addEventListener('click', () => { overlay.style.display = 'none'; });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.style.display = 'none'; });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.style.display = 'none'; });
  }

});
