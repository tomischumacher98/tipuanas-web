/* ============================================
   TIPUANAS — main.js
   Comportamiento del sitio
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- MOBILE MENU ---
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.classList.toggle('is-active', isOpen);
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', false);
        toggle.classList.remove('is-active');
      }
    });
  }

  // --- ACTIVE NAV LINK ---
  const path = window.location.pathname;
  document.querySelectorAll('.nav__link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && path.startsWith(href) && href !== '/') {
      link.classList.add('active');
    }
    if (href === '/' && path === '/') {
      link.classList.add('active');
    }
  });

  // --- LAZY LOAD IMAGES ---
  if ('IntersectionObserver' in window) {
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    // El atributo nativo loading="lazy" es suficiente en browsers modernos
    // Este bloque es por compatibilidad adicional
  }

  // --- REDUCED MOTION ---
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.documentElement.classList.add('reduced-motion');
  }

});
