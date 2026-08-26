/* TIPUANAS — main.js v5 */
document.addEventListener('DOMContentLoaded', function () {

  /* PARALLAX — hero home + todos los page-hero con foto */
  const heroImg    = document.querySelector('.hero__bg img');
  const parallaxImgs = document.querySelectorAll('.parallax-img');

  window.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    // Parallax hero home
    if (heroImg) {
      heroImg.style.transform = `translateY(${scrolled * 0.35}px)`;
    }
    // Parallax page-hero en páginas interiores
    parallaxImgs.forEach(function(img) {
      const parent = img.closest('.parallax-hero');
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const offset = rect.top + scrolled;
      const relScroll = scrolled - offset;
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        img.style.transform = `translateY(${relScroll * 0.3}px)`;
      }
    });
  }, { passive: true });

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

  /* CAMBIO 4: FADE-IN AL SCROLL */
  const fadeEls = document.querySelectorAll('.step, .why__inner, .diff-item, .cat-card, .review-card, .fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(function(el) {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  /* REVIEWS SLIDER — muestra 2 en desktop, 1 en mobile */
  const track = document.querySelector('.reviews__track');
  if (track) {
    const cards   = Array.from(track.querySelectorAll('.review-card'));
    const dots    = Array.from(document.querySelectorAll('.reviews__dot'));
    const btnPrev = document.querySelector('.reviews__btn--prev');
    const btnNext = document.querySelector('.reviews__btn--next');
    let current = 0;
    const GAP = 20;

    function getVisible() { return window.innerWidth >= 768 ? 2 : 1; }

    function goTo(idx) {
      const vis     = getVisible();
      const max     = Math.max(0, cards.length - vis);
      current       = Math.max(0, Math.min(idx, max));
      const sliderW = track.parentElement.offsetWidth;
      const cardW   = (sliderW - GAP * (vis - 1)) / vis;
      cards.forEach(function(c) {
        c.style.minWidth = cardW + 'px';
        c.style.maxWidth = cardW + 'px';
      });
      track.style.transform = `translateX(-${current * (cardW + GAP)}px)`;
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    if (btnPrev) btnPrev.addEventListener('click', function() { goTo(current - 1); });
    if (btnNext) btnNext.addEventListener('click', function() { goTo(current + 1); });
    dots.forEach(function(d, i) { d.addEventListener('click', function() { goTo(i); }); });
    window.addEventListener('resize', function() { goTo(current); });
    setTimeout(function() { goTo(0); }, 60);
  }

  /* CAMBIO 7: MAPA IGUAL DE ALTO QUE EL TEXTO DE CONTACTO */
  function syncMapHeight() {
    const infoBlock = document.getElementById('contact-info-ref');
    const mapBlock  = document.getElementById('contact-map-ref');
    if (infoBlock && mapBlock) {
      const h = infoBlock.offsetHeight;
      if (h > 200) {
        mapBlock.style.height = h + 'px';
        const iframe = mapBlock.querySelector('iframe');
        if (iframe) iframe.style.height = h + 'px';
      }
    }
  }
  syncMapHeight();
  window.addEventListener('resize', syncMapHeight);

  /* GALLERY LIGHTBOX */
  const galleryImgs = document.querySelectorAll('.gallery-masonry__item img');
  if (galleryImgs.length) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:none;align-items:center;justify-content:center;';
    const img = document.createElement('img');
    img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:8px;object-fit:contain;';
    const close = document.createElement('button');
    close.innerHTML = '&times;';
    close.style.cssText = 'position:absolute;top:16px;right:24px;font-size:2.5rem;color:white;background:none;border:none;cursor:pointer;';
    overlay.appendChild(img);
    overlay.appendChild(close);
    document.body.appendChild(overlay);
    galleryImgs.forEach(function(el) {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', function() { img.src = el.src; overlay.style.display = 'flex'; });
    });
    close.addEventListener('click', function() { overlay.style.display = 'none'; });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.style.display = 'none'; });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') overlay.style.display = 'none'; });
  }

});
