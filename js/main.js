// Lesní kamarádi z Doupátkova

const T = window.I18N; // texty aktuálního jazyka (vkládá build.mjs)

const THEME_COLORS = {
  strach:  "#3f5a9a",
  sdileni: "#c0582f",
  pocity:  "#b5486b",
  priroda: "#6f7d2e",
  zvyky:   "#8a5a33",
  dobro:   "#c98a1c",
};

// [číslo, téma] – názvy dílů jsou v i18n/<jazyk>.json
const EPISODES = [
  [1, "strach"],
  [2, "dobro"],
  [3, "pocity"],
  [4, "sdileni"],
  [5, "strach"],
  [6, "pocity"],
  [7, "zvyky"],
  [8, "dobro"],
  [9, "priroda"],
  [10, "dobro"],
  [11, "zvyky"],
  [12, "sdileni"],
  [13, "strach"],
  [14, "priroda"],
  [15, "priroda"],
  [16, "pocity"],
  [17, "priroda"],
  [18, "zvyky"],
  [19, "priroda"],
  [20, "sdileni"],
  [21, "strach"],
  [22, "pocity"],
  [23, "priroda"],
  [24, "pocity"],
  [25, "dobro"],
  [26, "priroda"],
  [27, "zvyky"],
  [28, "pocity"],
  [29, "dobro"],
  [30, "priroda"],
  [31, "priroda"],
  [32, "strach"],
  [33, "sdileni"],
  [34, "dobro"],
  [35, "dobro"],
  [36, "priroda"],
  [37, "zvyky"],
  [38, "dobro"],
  [39, "strach"],
  [40, "sdileni"],
  [41, "priroda"],
  [42, "pocity"],
  [43, "priroda"],
  [44, "zvyky"],
  [45, "sdileni"],
  [46, "strach"],
  [47, "sdileni"],
  [48, "priroda"],
  [49, "dobro"],
  [50, "zvyky"],
  [51, "pocity"],
  [52, "dobro"],
  [53, "priroda"],
  [54, "dobro"],
  [55, "dobro"],
  [56, "sdileni"],
  [57, "pocity"],
  [58, "pocity"],
  [59, "pocity"],
  [60, "zvyky"],
  [61, "sdileni"],
  [62, "priroda"],
  [63, "sdileni"],
  [64, "zvyky"],
  [65, "sdileni"],
  [66, "priroda"],
  [67, "strach"],
  [68, "dobro"],
  [69, "pocity"],
  [70, "sdileni"],
  [71, "priroda"],
  [72, "pocity"],
  [73, "pocity"],
  [74, "dobro"],
  [75, "sdileni"],
  [76, "zvyky"],
  [77, "priroda"],
  [78, "sdileni"],
  [79, "pocity"],
  [80, "pocity"],
];

// Díly, které mají na webu vlastní představení
const FEATURED = { 1: "#dil-1" };

/* ---------- Navigace ---------- */
const nav = document.getElementById("nav");
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("menu");
const langBox = document.querySelector(".lang");

const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? T.nav.menuClose : T.nav.menuOpen);
  menu.classList.toggle("is-open", open);
  if (open && langBox) langBox.open = false;
}
toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
menu.addEventListener("click", (e) => { if (e.target.tagName === "A") setMenu(false); });

/* ---------- Přepínač jazyků ---------- */
if (langBox) {
  langBox.addEventListener("toggle", () => { if (langBox.open) setMenu(false); });
  document.addEventListener("click", (e) => { if (langBox.open && !langBox.contains(e.target)) langBox.open = false; });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && langBox.open) { langBox.open = false; langBox.querySelector("summary").focus(); }
  });
}

/* ---------- Seznam dílů ---------- */
const chipsEl = document.getElementById("chips");
const listEl = document.getElementById("episodes");
const countEl = document.getElementById("count");
const emptyEl = document.getElementById("empty");
const searchEl = document.getElementById("search");

let activeTheme = "vse";

const normalize = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const titleOf = (num) => T.episodes[num - 1];

function makeChip(key, label, color) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "chip";
  b.dataset.theme = key;
  b.textContent = label;
  if (color) b.style.setProperty("--c", color);
  b.setAttribute("aria-pressed", String(key === activeTheme));
  b.addEventListener("click", () => {
    activeTheme = key;
    chipsEl.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
    render();
  });
  return b;
}

chipsEl.append(makeChip("vse", T.list.all));
for (const [key, color] of Object.entries(THEME_COLORS)) chipsEl.append(makeChip(key, T.themes[key], color));

const pluralRules = new Intl.PluralRules(T.lang);
function countText(n) {
  const form = T.list.count[pluralRules.select(n)] || T.list.count.other;
  return form.replace("{n}", n);
}

function render() {
  const q = normalize(searchEl.value.trim());
  const items = EPISODES.filter(([num, theme]) =>
    (activeTheme === "vse" || theme === activeTheme) &&
    (!q || normalize(titleOf(num)).includes(q) || String(num) === q)
  );

  listEl.replaceChildren(...items.map(([num, theme], i) => {
    const li = document.createElement("li");
    const href = FEATURED[num];
    const card = document.createElement(href ? "a" : "div");
    card.className = "ep" + (href ? " ep--featured" : "");
    if (href) card.href = href;
    card.style.setProperty("--c", THEME_COLORS[theme]);
    card.style.animationDelay = Math.min(i * 12, 300) + "ms";

    const numEl = document.createElement("span");
    numEl.className = "ep__num";
    numEl.textContent = num;
    numEl.setAttribute("aria-label", T.list.epLabel.replace("{n}", num));

    const body = document.createElement("span");
    const title = document.createElement("span");
    title.className = "ep__title";
    title.textContent = titleOf(num);
    const themeEl = document.createElement("span");
    themeEl.className = "ep__theme";
    themeEl.textContent = T.themes[theme];
    if (href) {
      const badge = document.createElement("span");
      badge.className = "ep__badge";
      badge.textContent = " · " + T.list.featured;
      themeEl.append(badge);
    }
    body.append(title, themeEl);
    card.append(numEl, body);
    li.append(card);
    return li;
  }));

  countEl.textContent = countText(items.length);
  emptyEl.hidden = items.length > 0;
}

searchEl.addEventListener("input", render);
render();

/* ---------- Světlušky ---------- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ff = document.querySelector(".fireflies");
if (ff && !reduceMotion) {
  for (let i = 0; i < 22; i++) {
    const f = document.createElement("i");
    f.style.left = 35 + Math.random() * 62 + "%";
    f.style.top = 10 + Math.random() * 80 + "%";
    f.style.setProperty("--x", (Math.random() * 80 - 40).toFixed(0) + "px");
    f.style.setProperty("--y", (Math.random() * 80 - 40).toFixed(0) + "px");
    f.style.setProperty("--d", (6 + Math.random() * 8).toFixed(1) + "s");
    f.style.setProperty("--delay", (-Math.random() * 8).toFixed(1) + "s");
    ff.append(f);
  }
}

/* ---------- Odhalování při scrollu ---------- */
const revealEls = document.querySelectorAll(
  ".section h2, .section .sub, .intro__text, .facts, .value, .place, .night__card, .timeline li, .tips > div"
);
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  revealEls.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
}
