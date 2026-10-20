/* Tipuanas - eventos de catalogo para el pixel de Meta (705472349101201)
 * - ViewContent al entrar a la pagina de un producto
 * - Contact al tocar un boton de WhatsApp dentro de un producto
 * Los content_ids son los mismos "Identificador de contenido" del Catalogo Tipuanas.
 * Si agregan un producto nuevo al sitio y al catalogo, sumarlo a la lista CATALOGO.
 */
(function () {
  var CATALOGO = {
    '/productos/suelos-sustratos/corteza/':        { id: 'x2ex8ahi70', nombre: 'Chips de Corteza' },
    '/productos/suelos-sustratos/tierra-negra/':   { id: 'fm2wlrra69', nombre: 'Tierra Negra' },
    '/productos/suelos-sustratos/compost-organico/': { id: '43tioml1ue', nombre: 'Compost Orgánico' },
    '/productos/suelos-sustratos/mezcla-tnco/':    { id: 'tm9qtjz9zt', nombre: 'Mezcla 50% TN + 50% Compost' },
    '/productos/suelos-sustratos/mezcla-tnar/':    { id: 'pxezdog885', nombre: 'Mezcla 50% TN + 50% Arena' },
    // El Sustrato Liviano HS vive bajo /servicios/, no bajo /productos/
    '/servicios/sustratos/sustrato-hs/':          { id: '40kc263tme', nombre: 'Sustrato Liviano HS' },
    '/productos/suelos-sustratos/arena-gruesa/':   { id: 'ARE-GRU',    nombre: 'Arena Gruesa' },
    '/productos/suelos-sustratos/arena/':          { id: 'ofpi7aye5q', nombre: 'Arena Intermedia' },
    '/productos/suelos-sustratos/tosca/':          { id: 'vc0rtv2xwj', nombre: 'Tosca' },
    '/productos/piedras/piedra-pometina/':         { id: '23gvr63p3u', nombre: 'Piedra Pometina' },
    '/productos/piedras/piedra-dolomita/':         { id: 'jdnx5ltvc2', nombre: 'Piedra Dolomita' },
    '/productos/piedras/piedra-mar-del-plata/':    { id: 'cd0shk9rm7', nombre: 'Piedra Mar del Plata' },
    '/productos/madera/quebracho-colorado/':       { id: 'jsge7lyru1', nombre: 'Quebracho Colorado' },
    // Todas las variedades de cesped van al unico producto "Césped" del catalogo
    '/productos/cesped/grama-bahiana/':            { id: 'CESPED', nombre: 'Césped' },
    '/productos/cesped/lobo/':                     { id: 'CESPED', nombre: 'Césped' },
    '/productos/cesped/celebration/':              { id: 'CESPED', nombre: 'Césped' },
    '/productos/cesped/tifway/':                   { id: 'CESPED', nombre: 'Césped' },
    '/productos/cesped/kikuyo/':                   { id: 'CESPED', nombre: 'Césped' },
    '/productos/cesped/bermuda/':                  { id: 'CESPED', nombre: 'Césped' }
  };

  var path = window.location.pathname;
  if (path.slice(-1) !== '/') path += '/';
  var producto = CATALOGO[path];
  if (!producto) return; // no es pagina de producto

  function datos() {
    return {
      content_ids: [producto.id],
      content_type: 'product',
      content_name: producto.nombre,
      currency: 'ARS',
      value: 0
    };
  }

  function track(evento) {
    if (typeof window.fbq === 'function') window.fbq('track', evento, datos());
  }

  track('ViewContent');

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="wa.me"]');
    if (a) track('Contact');
  });
})();
