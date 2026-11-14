// Lesní kamarádi z Doupátkova

const THEMES = {
  strach:   { label: "Strach a odvaha",        color: "#3f5a9a" },
  sdileni:  { label: "Sdílení a spolupráce",   color: "#c0582f" },
  pocity:   { label: "Přátelství a pocity",    color: "#b5486b" },
  priroda:  { label: "Příroda a roční období", color: "#6f7d2e" },
  zvyky:    { label: "Domov a zvyky",          color: "#8a5a33" },
  dobro:    { label: "Malá dobrodružství",     color: "#c98a1c" },
};

// [číslo, název, téma]
const EPISODES = [
  [1, "Ouško se bojí tmy", "strach"],
  [2, "Ztracený míček", "dobro"],
  [3, "Nová kamarádka Liška", "pocity"],
  [4, "Dělení jahod", "sdileni"],
  [5, "Brumla se bojí bouřky", "strach"],
  [6, "Ukolébavka pro Brumlu", "pocity"],
  [7, "Velký úklid doupěte", "zvyky"],
  [8, "Ouško se ztratí v lese", "dobro"],
  [9, "První sníh", "priroda"],
  [10, "Ztracená píšťalka", "dobro"],
  [11, "Umývání tlapek před jídlem", "zvyky"],
  [12, "Závod na louce a fair play", "sdileni"],
  [13, "Brumla se učí plavat", "strach"],
  [14, "Sklizeň hub na podzim", "priroda"],
  [15, "Duha po dešti", "priroda"],
  [16, "Ouško žárlí na nového kamaráda", "pocity"],
  [17, "Péče o ptačí vajíčko", "priroda"],
  [18, "Večerní čištění zoubků", "zvyky"],
  [19, "Úkryt před deštěm", "priroda"],
  [20, "Sdílení posledního kousku dortu", "sdileni"],
  [21, "Strach z bubáka pod postelí", "strach"],
  [22, "Nová písnička pro Cvrčka", "pocity"],
  [23, "Med a včely – sdílení s přírodou", "priroda"],
  [24, "Jak se omluvit kamarádovi", "pocity"],
  [25, "Ztracený deštník", "dobro"],
  [26, "Hraní na sněhu", "priroda"],
  [27, "Babiččin lék na rýmu", "zvyky"],
  [28, "Trpělivost při rybaření", "pocity"],
  [29, "Vítr odfoukl klobouk", "dobro"],
  [30, "Skákání do podzimního listí", "priroda"],
  [31, "Pomoc zraněnému ptáčkovi", "priroda"],
  [32, "Tréma před vystoupením", "strach"],
  [33, "Sdílení deštníku", "sdileni"],
  [34, "Noční dobrodružství představivosti", "dobro"],
  [35, "Babiččiny staré povídky", "dobro"],
  [36, "Jarní probouzení lesa", "priroda"],
  [37, "Pečení koláče s Brumlou", "zvyky"],
  [38, "Hledání ztracené kamarádky", "dobro"],
  [39, "Hrom a blesk – jak se nebát", "strach"],
  [40, "Sdílení hraček na hřišti", "sdileni"],
  [41, "Počítání hvězd", "priroda"],
  [42, "Cvrček ztratil hlas", "pocity"],
  [43, "Babiččina zahrádka", "priroda"],
  [44, "Společný úklid doupěte", "zvyky"],
  [45, "Stavba nového domečku po bouři", "sdileni"],
  [46, "Strach z doktora", "strach"],
  [47, "Půjčování hudebního nástroje", "sdileni"],
  [48, "Příprava na zimu", "priroda"],
  [49, "Ztracený knoflík", "dobro"],
  [50, "Čekání ve frontě", "zvyky"],
  [51, "Cvrčkovy narozeniny", "pocity"],
  [52, "Jízda na vozítku z větviček", "dobro"],
  [53, "Předpovídání počasí podle přírody", "priroda"],
  [54, "Ztraceni v husté mlze", "dobro"],
  [55, "Ztracený oblíbený šátek", "dobro"],
  [56, "Sdílení deky v zimní noci", "sdileni"],
  [57, "Přiznání chyby po rozbitém hrníčku", "pocity"],
  [58, "Žárlivost na Brumlovu sílu", "pocity"],
  [59, "Učení se hrát na nový nástroj", "pocity"],
  [60, "Jarní úklid doupěte", "zvyky"],
  [61, "Pomoc mravenečkům s nákladem", "sdileni"],
  [62, "Duha a mlha – přírodní úkazy", "priroda"],
  [63, "Stavba můstku přes potok", "sdileni"],
  [64, "Bylinkový čaj podle babičky", "zvyky"],
  [65, "Sdílení houpačky", "sdileni"],
  [66, "Drakiáda na podzim", "priroda"],
  [67, "Strach z pavouků", "strach"],
  [68, "Ztracená nota pro písničku", "dobro"],
  [69, "Čekání na opožděného kamaráda", "pocity"],
  [70, "Sdílení domečku s někým jiným", "sdileni"],
  [71, "Proč Brumla musí spát celou zimu", "priroda"],
  [72, "Smutek z deštivého dne", "pocity"],
  [73, "Babiččina rada o přátelství", "pocity"],
  [74, "Divadlo stínů za deštivého večera", "dobro"],
  [75, "Stěhování žaludů společně", "sdileni"],
  [76, "Ouško se učí neházet klacky", "zvyky"],
  [77, "Jarní písnička pro celý les", "priroda"],
  [78, "Podělení se o poslední jahodu", "sdileni"],
  [79, "Babiččino loučení před zimním spánkem", "pocity"],
  [80, "Velká lesní slavnost", "pocity"],
];

// Díly, které mají na webu vlastní představení
const FEATURED = { 1: "#dil-1" };

/* ---------- Navigace ---------- */
const nav = document.getElementById("nav");
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("menu");

const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  toggle.setAttribute("aria-label", open ? "Otevřít menu" : "Zavřít menu");
  menu.classList.toggle("is-open", !open);
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Otevřít menu");
    menu.classList.remove("is-open");
  }
});

/* ---------- Seznam dílů ---------- */
const chipsEl = document.getElementById("chips");
const listEl = document.getElementById("episodes");
const countEl = document.getElementById("count");
const emptyEl = document.getElementById("empty");
const searchEl = document.getElementById("search");

let activeTheme = "vse";

const normalize = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

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

chipsEl.append(makeChip("vse", "Všechny"));
for (const [key, t] of Object.entries(THEMES)) chipsEl.append(makeChip(key, t.label, t.color));

function plural(n) {
  if (n === 1) return "díl";
  if (n >= 2 && n <= 4) return "díly";
  return "dílů";
}

function render() {
  const q = normalize(searchEl.value.trim());
  const items = EPISODES.filter(([num, title, theme]) =>
    (activeTheme === "vse" || theme === activeTheme) &&
    (!q || normalize(title).includes(q) || String(num) === q)
  );

  listEl.replaceChildren(...items.map(([num, title, theme], i) => {
    const t = THEMES[theme];
    const li = document.createElement("li");
    const href = FEATURED[num];
    const card = document.createElement(href ? "a" : "div");
    card.className = "ep" + (href ? " ep--featured" : "");
    if (href) card.href = href;
    card.style.setProperty("--c", t.color);
    card.style.animationDelay = Math.min(i * 12, 300) + "ms";
    card.innerHTML = `<span class="ep__num" aria-label="Díl ${num}">${num}</span>
      <span><span class="ep__title"></span><span class="ep__theme">${t.label}</span></span>`;
    card.querySelector(".ep__title").textContent = title;
    li.append(card);
    return li;
  }));

  countEl.textContent = `${items.length} ${plural(items.length)}`;
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
