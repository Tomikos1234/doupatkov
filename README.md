# Lesní kamarádi z Doupátkova – web

Statická prezentace seriálu v pěti jazycích. Běží na GitHub Pages:
https://tomikos1234.github.io/doupatkov/

| Jazyk | Adresa |
| --- | --- |
| čeština (výchozí) | `/` |
| English | `/en/` |
| Deutsch | `/de/` |
| Español | `/es/` |
| Polski | `/pl/` |

## Jak to funguje

Stránky se negenerují ručně. Jedna šablona + překlady → build skript poskládá všech pět verzí.

- `src/index.template.html` – šablona stránky s klíči `{{…}}`
- `i18n/cs.json`, `en.json`, `de.json`, `es.json`, `pl.json` – všechny texty včetně názvů 80 dílů
- `build.mjs` – sestaví `index.html`, `en/index.html` … `pl/index.html`, `404.html`, `sitemap.xml` a `robots.txt`
- `css/style.css` – vzhled (barvy nahoře v `:root`)
- `js/main.js` – témata dílů (`EPISODES`), filtry, přepínač jazyků, menu, světlušky
- `img/` – obrázky

**Vygenerované soubory (`index.html`, `*/index.html`, `404.html`, `sitemap.xml`, `robots.txt`) needituj ručně** – přepíšou se při dalším buildu.

## Úpravy

1. Uprav text v `i18n/<jazyk>.json` (nebo šablonu v `src/`).
2. Spusť build:

   ```bash
   node build.mjs
   ```

   Skript zkontroluje, že všechny jazyky mají stejné klíče a 80 dílů, jinak vypíše, co chybí.
3. Commitni a pushni, GitHub Pages web do minuty aktualizují.

Další tipy:

- **Téma dílu:** v `js/main.js` změň téma v `EPISODES` (`strach`, `sdileni`, `pocity`, `priroda`, `zvyky`, `dobro`).
- **Nový díl s vlastním představením:** přidej jeho číslo do `FEATURED` v `js/main.js`.
- **Jména postav v jiných jazycích:** `chars.<postava>.name` v příslušném `i18n/*.json` (a případně názvy dílů).
- **Vlastní doména:** změň `SITE` nahoře v `build.mjs` a spusť build.
- V textech používej typografické uvozovky („…“, “…”, «…»), ne rovné `"` – build je odmítne.

## Náhled lokálně

```bash
python3 -m http.server 8737
```

Pak otevři http://localhost:8737.
