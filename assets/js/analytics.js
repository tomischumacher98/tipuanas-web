/* ============================================
   TIPUANAS — analytics.js
   Placeholders para GTM, GA4 y Meta Pixel
   IMPORTANTE: Reemplazar los IDs antes de publicar
   ============================================ */

// ---- GOOGLE TAG MANAGER ----
// Reemplazar GTM_CONTAINER_ID_A_COMPLETAR con el ID real (ej: GTM-XXXXXX)
(function(w,d,s,l,i){
  w[l]=w[l]||[];
  w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM_CONTAINER_ID_A_COMPLETAR');

// ---- META PIXEL ----
// Reemplazar META_PIXEL_ID_A_COMPLETAR con el ID real
!function(f,b,e,v,n,t,s){
  if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)
}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'META_PIXEL_ID_A_COMPLETAR');
fbq('track', 'PageView');

// ---- GA4 via GTM ----
// GA4_MEASUREMENT_ID_A_COMPLETAR se configura desde GTM (recomendado)
// O se puede añadir directamente aquí: G-XXXXXXXXXX

// ---- EVENTOS DE CONVERSIÓN ----
document.addEventListener('DOMContentLoaded', function() {

  // Tracking de clicks en WhatsApp
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(el) {
    el.addEventListener('click', function() {
      // GA4 event
      if (typeof gtag === 'function') {
        gtag('event', 'click_whatsapp', {
          event_category: 'contacto',
          event_label: el.dataset.producto || document.title,
        });
      }
      // Meta Pixel event
      if (typeof fbq === 'function') {
        fbq('track', 'Contact', { content_name: 'WhatsApp' });
      }
      // GTM dataLayer
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'click_whatsapp',
          producto: el.dataset.producto || '',
          pagina: window.location.pathname,
        });
      }
    });
  });

  // Tracking de clicks en email
  document.querySelectorAll('a[href^="mailto:"]').forEach(function(el) {
    el.addEventListener('click', function() {
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'click_email', pagina: window.location.pathname });
      }
    });
  });

  // Tracking de clicks en teléfono
  document.querySelectorAll('a[href^="tel:"]').forEach(function(el) {
    el.addEventListener('click', function() {
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'click_telefono', pagina: window.location.pathname });
      }
    });
  });

});
