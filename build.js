#!/usr/bin/env node
/*
 * Arma el sitio en dist/.
 *
 * Que hace: copia todo el repo a dist/ y, en cada .html, reemplaza los
 * marcadores <!--@topbar-->, <!--@header--> y <!--@footer--> por el contenido
 * de partials/. Asi el menu vive en un solo archivo en vez de estar repetido
 * en las 33 paginas.
 *
 * Ademas:
 *   - marca como "active" el item del menu que corresponde a cada pagina
 *   - reemplaza {{ANIO}} por el ano actual (el (c) del pie se actualiza solo)
 *
 * El HTML que se publica queda completo, igual que antes. No hay JavaScript
 * armando el header en el navegador.
 *
 * Si algo falla, el script corta con error y Netlify deja online la version
 * anterior en vez de publicar algo roto.
 */

const fs = require('fs');
const path = require('path');

const RAIZ = __dirname;
const SALIDA = path.join(RAIZ, 'dist');
const EXCLUIR = new Set(['.git', 'node_modules', 'dist', 'partials', 'build.js', 'netlify.toml', '.netlify', '.DS_Store']);

function leerPartial(nombre) {
  const p = path.join(RAIZ, 'partials', nombre + '.html');
  if (!fs.existsSync(p)) throw new Error(`Falta el partial partials/${nombre}.html`);
  return fs.readFileSync(p, 'utf8').trimEnd();
}

const PARTIALS = {
  topbar: leerPartial('topbar'),
  header: leerPartial('header'),
  footer: leerPartial('footer'),
};

// Que item del menu se resalta, segun en que carpeta esta la pagina.
const SECCIONES = [
  ['productos/', '/productos/'],
  ['servicios/', '/servicios/'],
  ['galeria/',   '/galeria/'],
  ['contacto/',  '/contacto/'],
];

function seccionDe(rutaRelativa) {
  const r = rutaRelativa.split(path.sep).join('/');
  for (const [prefijo, href] of SECCIONES) if (r.startsWith(prefijo)) return href;
  return r === 'index.html' ? '/' : null;
}

function marcarActivo(header, href) {
  if (!href) return header;
  const busca = `<a href="${href}" class="nav__link">`;
  if (!header.includes(busca)) return header;
  return header.replace(busca, `<a href="${href}" class="nav__link active">`);
}

function copiarTodo(desde, hasta) {
  fs.mkdirSync(hasta, { recursive: true });
  for (const entrada of fs.readdirSync(desde, { withFileTypes: true })) {
    if (EXCLUIR.has(entrada.name)) continue;
    const origen = path.join(desde, entrada.name);
    const destino = path.join(hasta, entrada.name);
    if (entrada.isDirectory()) copiarTodo(origen, destino);
    else fs.copyFileSync(origen, destino);
  }
}

function htmlsDe(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) htmlsDe(p, acc);
    else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const anio = String(new Date().getFullYear());

fs.rmSync(SALIDA, { recursive: true, force: true });
copiarTodo(RAIZ, SALIDA);

let conMarcadores = 0;
const problemas = [];

for (const archivo of htmlsDe(SALIDA)) {
  const rel = path.relative(SALIDA, archivo);
  let html = fs.readFileSync(archivo, 'utf8');
  const tenia = html.includes('<!--@header-->');

  html = html
    .replace('<!--@topbar-->', PARTIALS.topbar)
    .replace('<!--@header-->', marcarActivo(PARTIALS.header, seccionDe(rel)))
    .replace('<!--@footer-->', PARTIALS.footer)
    .split('{{ANIO}}').join(anio);

  if (/<!--@(topbar|header|footer)-->/.test(html)) problemas.push(`${rel}: quedo un marcador sin reemplazar`);
  if (html.includes('{{ANIO}}')) problemas.push(`${rel}: quedo {{ANIO}} sin reemplazar`);

  fs.writeFileSync(archivo, html);
  if (tenia) conMarcadores++;
}

if (problemas.length) {
  console.error('BUILD FALLIDO:');
  for (const p of problemas) console.error('  - ' + p);
  process.exit(1);
}

console.log(`Build ok: ${conMarcadores} paginas armadas con los partials, ano ${anio}.`);
