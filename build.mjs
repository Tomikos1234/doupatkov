// Sestaví jazykové verze webu ze šablony a překladů.
// Spuštění:  node build.mjs
//
//   src/index.template.html  +  i18n/<jazyk>.json  →  index.html (cs), en/index.html, de/index.html, …
//   Navíc vygeneruje 404.html, sitemap.xml a robots.txt.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const SITE = "https://tomikos1234.github.io/doupatkov/"; // při vlastní doméně změnit tady
const LANGS = ["cs", "en", "de", "es", "pl"];
const DEFAULT = "cs";
const EPISODE_COUNT = 80;

const read = (p) => readFileSync(join(ROOT, p), "utf8");
const write = (p, s) => {
  mkdirSync(dirname(join(ROOT, p)), { recursive: true });
  writeFileSync(join(ROOT, p), s);
  console.log("  ✓", p);
};

const tr = Object.fromEntries(LANGS.map((l) => [l, JSON.parse(read(`i18n/${l}.json`))]));
const dirOf = (l) => (l === DEFAULT ? "" : `${l}/`);
const urlOf = (l) => SITE + dirOf(l);

/* ---------- Kontrola překladů ---------- */
function shape(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v) ? shape(v, `${prefix}${k}.`) : [`${prefix}${k}`]
  );
}
const PLURAL_KEYS = /^list\.count\./; // počet tvarů se liší podle jazyka
const base = new Set(shape(tr[DEFAULT]).filter((k) => !PLURAL_KEYS.test(k)));
const errors = [];
for (const l of LANGS) {
  const keys = new Set(shape(tr[l]).filter((k) => !PLURAL_KEYS.test(k)));
  for (const k of base) if (!keys.has(k)) errors.push(`${l}: chybí ${k}`);
  for (const k of keys) if (!base.has(k)) errors.push(`${l}: navíc ${k}`);
  if (tr[l].episodes.length !== EPISODE_COUNT) errors.push(`${l}: ${tr[l].episodes.length} dílů místo ${EPISODE_COUNT}`);
  if (!tr[l].list.count.other) errors.push(`${l}: chybí list.count.other`);
  const json = JSON.stringify(tr[l]);
  if (/\\"/.test(json)) errors.push(`${l}: obsahuje rovné uvozovky ("), použij typografické`);
}
if (errors.length) {
  console.error("Chyby v překladech:\n  " + errors.join("\n  "));
  process.exit(1);
}

/* ---------- Šablona ---------- */
const get = (obj, key) => key.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
function render(tpl, data, where) {
  return tpl.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
    const v = get(data, key);
    if (v === undefined || (typeof v === "object" && v !== null)) throw new Error(`${where}: chybí klíč {{${key}}}`);
    return String(v);
  });
}

const template = read("src/index.template.html");
const hreflangs = [
  ...LANGS.map((l) => `  <link rel="alternate" hreflang="${l}" href="${urlOf(l)}">`),
  `  <link rel="alternate" hreflang="x-default" href="${urlOf(DEFAULT)}">`,
].join("\n");

console.log("Generuji stránky:");
for (const l of LANGS) {
  const t = tr[l];
  const pageBase = l === DEFAULT ? "" : "../";
  const hrefTo = (x) => pageBase + dirOf(x) || "./";
  const current = (x) => (x === l ? ' aria-current="page"' : "");

  const langMenu = LANGS.map(
    (x) => `          <li><a href="${hrefTo(x)}" hreflang="${x}" lang="${x}"${current(x)}><b>${tr[x].code}</b>${tr[x].name}</a></li>`
  ).join("\n");
  const langList = LANGS.map(
    (x) => `            <li><a href="${hrefTo(x)}" hreflang="${x}" lang="${x}"${current(x)}>${tr[x].name}</a></li>`
  ).join("\n");

  const i18nJson = JSON.stringify({
    lang: l,
    nav: { menuOpen: t.nav.menuOpen, menuClose: t.nav.menuClose },
    list: t.list,
    themes: t.themes,
    episodes: t.episodes,
  }).replace(/</g, "\\u003c");

  const html = render(
    template,
    { ...t, base: pageBase, url: urlOf(l), siteUrl: SITE, hreflangs, langMenu, langList, i18nJson },
    `i18n/${l}.json`
  );
  write(`${dirOf(l)}index.html`, html);
}

/* ---------- 404 ---------- */
const sitePath = new URL(SITE).pathname; // např. /doupatkov/
const blocks = LANGS.map((l) => {
  const n = tr[l].notFound;
  return `      <div class="lost__msg" lang="${l}"${l === DEFAULT ? "" : " hidden"}>
        <h1>${n.heading}</h1>
        <p>${n.text}</p>
        <a class="btn btn--primary" href="${dirOf(l) || "./"}">${n.back}</a>
      </div>`;
}).join("\n");
const others = LANGS.map((l) => `<a href="${dirOf(l) || "./"}" lang="${l}">${tr[l].name}</a>`).join(" · ");

write(
  "404.html",
  `<!doctype html>
<html lang="${DEFAULT}">
<head>
  <meta charset="utf-8">
  <!-- Vygenerováno skriptem build.mjs. Needitovat ručně. -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <base href="${sitePath}">
  <title>${tr[DEFAULT].notFound.title}</title>
  <meta name="robots" content="noindex">
  <link rel="icon" type="image/png" href="img/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,500..800,100&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <style>
    .lost { min-height: 100vh; display: grid; place-items: center; text-align: center; padding: 40px 16px; }
    .lost img { width: 180px; margin: 0 auto 24px; border-radius: 50%; box-shadow: var(--shadow); }
    .lost p { color: var(--ink-soft); font-size: 18px; max-width: 440px; margin: 0 auto 28px; }
    .lost .lost__langs { margin: 36px auto 0; font-weight: 700; }
    .lost__langs a { color: var(--ink-soft); }
  </style>
</head>
<body>
  <main class="lost">
    <div>
      <img src="img/apple-touch-icon.png" alt="Ouško" width="180" height="180">
${blocks}
      <p class="lost__langs">${others}</p>
    </div>
  </main>
  <script>
    (function () {
      var langs = ${JSON.stringify(LANGS)};
      var rest = location.pathname.slice(${JSON.stringify(sitePath)}.length).split("/")[0];
      var nav = (navigator.language || "").slice(0, 2).toLowerCase();
      var pick = langs.indexOf(rest) > -1 ? rest : langs.indexOf(nav) > -1 ? nav : ${JSON.stringify(DEFAULT)};
      var titles = ${JSON.stringify(Object.fromEntries(LANGS.map((l) => [l, tr[l].notFound.title])))};
      document.querySelectorAll(".lost__msg").forEach(function (el) { el.hidden = el.lang !== pick; });
      document.documentElement.lang = pick;
      document.title = titles[pick];
    })();
  </script>
</body>
</html>
`
);

/* ---------- Sitemap a robots ---------- */
const alternates = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlOf(l)}"/>`).join("\n");
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map((l) => `  <url>\n    <loc>${urlOf(l)}</loc>\n${alternates}\n  </url>`).join("\n")}
</urlset>
`
);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);

console.log("Hotovo.");
