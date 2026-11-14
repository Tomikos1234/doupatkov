# Lesní kamarádi z Doupátkova – web

Statická jednostránková prezentace seriálu. Žádný build, stačí nahrát obsah složky na libovolný hosting.

## Struktura

- `index.html` – celá stránka
- `css/style.css` – vzhled (barvy jsou nahoře v `:root`)
- `js/main.js` – seznam 80 dílů a jejich témat (`EPISODES`), filtry, menu, světlušky
- `img/` – obrázky (postavy, lokace, sdílecí obrázek `og.jpg`, ikona)
- `404.html` – stránka pro neexistující adresu

## Úpravy

- **Nový díl s vlastním představením:** v `js/main.js` přidej číslo dílu do `FEATURED`, aby karta vedla na jeho sekci.
- **Téma dílu:** změň třetí položku v řádku `EPISODES` (`strach`, `sdileni`, `pocity`, `priroda`, `zvyky`, `dobro`).
- **Výměna obrázku:** nahraď soubor v `img/` stejným názvem.

## Náhled lokálně

```bash
python3 -m http.server 8737
```

Pak otevři http://localhost:8737.
