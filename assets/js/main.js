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
      // Circular: vuelve al principio/final
      if (idx < 0) idx = max;
      if (idx > max) idx = 0;
      current       = idx;
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

  /* GALLERY LIGHTBOX con flechas */
  const gridItems = document.querySelectorAll('.gallery-grid__item');
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lb-img');
  const lbClose   = document.getElementById('lb-close');
  const lbPrev    = document.getElementById('lb-prev');
  const lbNext    = document.getElementById('lb-next');
  const lbCounter = document.getElementById('lb-counter');

  if (gridItems.length && lightbox) {
    const srcs = Array.from(gridItems).map(function(el) { return el.querySelector('img').src; });
    let current = 0;

    function openLb(idx) {
      current = idx;
      lbImg.src = srcs[current];
      lbCounter.textContent = (current + 1) + ' / ' + srcs.length;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeLb() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    function prevImg() { openLb((current - 1 + srcs.length) % srcs.length); }
    function nextImg() { openLb((current + 1) % srcs.length); }

    gridItems.forEach(function(item, i) {
      item.addEventListener('click', function() { openLb(i); });
    });
    lbClose.addEventListener('click', closeLb);
    lbPrev.addEventListener('click', prevImg);
    lbNext.addEventListener('click', nextImg);
    lightbox.addEventListener('click', function(e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') prevImg();
      if (e.key === 'ArrowRight') nextImg();
    });
  }

  /* SCROLL TO TOP */
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top';
  scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
  scrollTopBtn.innerHTML = '&#8593;';
  document.body.appendChild(scrollTopBtn);
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* CARRUSEL DE PRODUCTO */
  document.querySelectorAll('.product-carousel').forEach(function(carousel) {
    const track = carousel.querySelector('.product-carousel__track');
    const slides = carousel.querySelectorAll('.product-carousel__slide');
    const dots = carousel.querySelectorAll('.product-carousel__dot');
    const btnPrev = carousel.querySelector('.product-carousel__btn--prev');
    const btnNext = carousel.querySelector('.product-carousel__btn--next');
    if (!track || slides.length < 2) return;
    let current = 0;
    let animating = false;
    // Transicion por fundido en lugar de deslizamiento: al cambiar de foto
    // nunca se llega a ver la foto vecina entrando por el costado.
    function goTo(idx) {
      const next = (idx + slides.length) % slides.length;
      if (next === current || animating) return;
      current = next;
      animating = true;
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
      track.style.opacity = '0';
      window.setTimeout(function() {
        track.style.transition = 'none';
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        void track.offsetWidth;
        track.style.transition = '';
        track.style.opacity = '1';
        window.setTimeout(function() { animating = false; }, 170);
      }, 160);
    }
    if (btnPrev) btnPrev.addEventListener('click', function() { goTo(current - 1); });
    if (btnNext) btnNext.addEventListener('click', function() { goTo(current + 1); });
    dots.forEach(function(d, i) { d.addEventListener('click', function() { goTo(i); }); });
    goTo(0);
  });

});
