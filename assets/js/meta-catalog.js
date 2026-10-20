/* Tipuanas - eventos de catalogo para el pixel de Meta (705472349101201)
 * - ViewContent al entrar a la pagina de un producto
 * - Contact al tocar un boton de WhatsApp dentro de un producto
 * Los content_ids son los mismos "Identificador de contenido" del Catalogo Tipuanas.
 * Si agregan un producto nuevo al sitio y al catalogo, sumarlo a la lista CATALOGO.
 */
(function () {
  var CATALOGO = {
    '/productos/suelos-sustratos/corteza/':        { id: 'COR-001', nombre: 'Chips de Corteza' },
    '/productos/suelos-sustratos/tierra-negra/':   { id: 'TNE-001', nombre: 'Tierra Negra' },
    '/productos/suelos-sustratos/compost-organico/': { id: 'CMP-001', nombre: 'Compost Orgánico' },
    '/productos/suelos-sustratos/mezcla-tnco/':    { id: 'MTC-001', nombre: 'Mezcla 50% Tierra Negra + 50% Compost' },
    '/productos/suelos-sustratos/mezcla-tnar/':    { id: 'MTA-001', nombre: 'Mezcla 50% Tierra Negra + 50% Arena' },
    // El Sustrato Liviano HS vive bajo /servicios/, no bajo /productos/
    '/servicios/sustratos/sustrato-hs/':          { id: 'SHS-001', nombre: 'Sustrato Liviano HS' },
    '/productos/suelos-sustratos/arena-gruesa/':   { id: 'AGR-001',    nombre: 'Arena Gruesa' },
    '/productos/suelos-sustratos/arena/':          { id: 'AIN-001', nombre: 'Arena Intermedia' },
    '/productos/suelos-sustratos/tosca/':          { id: 'TSC-001', nombre: 'Tosca' },
    '/productos/piedras/piedra-pometina/':         { id: 'POM-001', nombre: 'Piedra Pometina' },
    '/productos/piedras/piedra-dolomita/':         { id: 'DOL-001', nombre: 'Piedra Dolomita' },
    '/productos/piedras/piedra-mar-del-plata/':    { id: 'MDP-001', nombre: 'Piedra Mar del Plata' },
    '/productos/madera/quebracho-colorado/':       { id: 'QBR-001', nombre: 'Quebracho Colorado' },
    // Todas las variedades de cesped van al unico producto "Césped" del catalogo
    '/productos/cesped/':                          { id: 'CSP-001', nombre: 'Césped' },
    '/productos/cesped/grama-bahiana/':            { id: 'CSP-001', nombre: 'Césped' },
    '/productos/cesped/lobo/':                     { id: 'CSP-001', nombre: 'Césped' },
    '/productos/cesped/celebration/':              { id: 'CSP-001', nombre: 'Césped' },
    '/productos/cesped/tifway/':                   { id: 'CSP-001', nombre: 'Césped' },
    '/productos/cesped/kikuyo/':                   { id: 'CSP-001', nombre: 'Césped' },
    '/productos/cesped/bermuda/':                  { id: 'CSP-001', nombre: 'Césped' }
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
