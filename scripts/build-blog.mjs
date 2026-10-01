import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(ROOT, "content", "blog");
const SITE = "https://getplan4u.com";
const APP_ID = "6782844465";
const PT = "120975298";
const LOGO = `${SITE}/assets/blog/logo.png`;
const ICON = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Crect%20width%3D%2224%22%20height%3D%2224%22%20rx%3D%226%22%20fill%3D%22%237c5cfc%22%2F%3E%3Cpath%20d%3D%22M12%203C12.7%208%2013.6%209.3%2021%2012C13.6%2014.7%2012.7%2016%2012%2021C11.3%2016%2010.4%2014.7%203%2012C10.4%209.3%2011.3%208%2012%203Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E";

const LANDING = ["en", "es", "ru", "uk"];

const LANGS = {
  en: {
    name: "English", locale: "en-US", og: "en_US", home: "/", store: "us", image: "/og.png",
    blog: "Blog", homeLabel: "Home", features: "Features", download: "Download", dlSmall: "Download on the",
    language: "Language", breadcrumbs: "Breadcrumbs", toc: "Contents", related: "Read next", read: "Read",
    minRead: (n) => `${n} min read`,
    indexTitle: "Plan4U Blog — Planning and Time Management Tips",
    indexDescription: "Practical guides to planning your day, time blocking, habits and calendars that actually work. Simple methods you can try today in Plan4U.",
    indexH1: "Plan your days, not just your tasks",
    indexLead: "Practical guides to time management, planning and calm productivity — methods you can try tomorrow morning.",
    ctaTop: "Plan your day in Plan4U", ctaTopSub: "Type a sentence — the app builds the event. Free for iPhone.",
    ctaEyebrow: "Ready in a minute", ctaH2: "Start planning beautifully today.",
    ctaP: "Sign in with Apple or Google, and your first perfect day is set. Free, no ads."
  },
  ru: {
    name: "Русский", locale: "ru-RU", og: "ru_RU", home: "/ru/", store: "ua", image: "/og-ru.png",
    blog: "Блог", homeLabel: "Главная", features: "Возможности", download: "Скачать", dlSmall: "Загрузите в",
    language: "Язык", breadcrumbs: "Навигационная цепочка", toc: "Содержание", related: "Читайте также", read: "Читать",
    minRead: (n) => `${n} мин чтения`,
    indexTitle: "Блог Plan4U — планирование и тайм-менеджмент",
    indexDescription: "Практичные статьи о том, как планировать день, работать с таймблокингом, привычками и календарём. Простые методы, которые можно применить уже сегодня.",
    indexH1: "Планируйте дни, а не только задачи",
    indexLead: "Практичные статьи о тайм-менеджменте, планировании и спокойной продуктивности — методы, которые можно попробовать уже завтра утром.",
    ctaTop: "Планируйте день в Plan4U", ctaTopSub: "Напишите фразу — приложение само создаст событие. Бесплатно для iPhone.",
    ctaEyebrow: "Готово за минуту", ctaH2: "Начните планировать красиво уже сегодня.",
    ctaP: "Вход через Apple или Google — и ваш первый идеальный день собран. Бесплатно, без рекламы."
  },
  uk: {
    name: "Українська", locale: "uk-UA", og: "uk_UA", home: "/uk/", store: "ua", image: "/og-uk.png",
    blog: "Блог", homeLabel: "Головна", features: "Можливості", download: "Завантажити", dlSmall: "Завантажте з",
    language: "Мова", breadcrumbs: "Навігаційний ланцюжок", toc: "Зміст", related: "Читайте також", read: "Читати",
    minRead: (n) => `${n} хв читання`,
    indexTitle: "Блог Plan4U — планування і тайм-менеджмент",
    indexDescription: "Практичні статті про те, як планувати день, працювати з таймблокінгом, звичками й календарем. Прості методи, які можна застосувати вже сьогодні.",
    indexH1: "Плануйте дні, а не лише задачі",
    indexLead: "Практичні статті про тайм-менеджмент, планування і спокійну продуктивність — методи, які можна спробувати вже завтра зранку.",
    ctaTop: "Плануйте день у Plan4U", ctaTopSub: "Напишіть фразу — застосунок сам створить подію. Безкоштовно для iPhone.",
    ctaEyebrow: "Готово за хвилину", ctaH2: "Почніть планувати красиво вже сьогодні.",
    ctaP: "Вхід через Apple або Google — і ваш перший ідеальний день зібрано. Безкоштовно, без реклами."
  },
  pl: {
    name: "Polski", locale: "pl-PL", og: "pl_PL", home: "/", store: "pl", image: "/og.png",
    blog: "Blog", homeLabel: "Strona główna", features: "Funkcje", download: "Pobierz", dlSmall: "Pobierz z",
    language: "Język", breadcrumbs: "Ścieżka nawigacji", toc: "Spis treści", related: "Przeczytaj także", read: "Czytaj",
    minRead: (n) => `${n} min czytania`,
    indexTitle: "Blog Plan4U — planowanie i zarządzanie czasem",
    indexDescription: "Praktyczne poradniki o planowaniu dnia, time blockingu, nawykach i kalendarzu. Proste metody, które możesz wypróbować już dziś w Plan4U.",
    indexH1: "Planuj dni, a nie tylko zadania",
    indexLead: "Praktyczne poradniki o zarządzaniu czasem, planowaniu i spokojnej produktywności — metody na jutrzejszy poranek.",
    ctaTop: "Zaplanuj dzień w Plan4U", ctaTopSub: "Wpisz zdanie — aplikacja sama utworzy wydarzenie. Za darmo na iPhone.",
    ctaEyebrow: "Gotowe w minutę", ctaH2: "Zacznij pięknie planować już dziś.",
    ctaP: "Zaloguj się przez Apple lub Google i Twój pierwszy idealny dzień jest gotowy. Za darmo, bez reklam."
  },
  es: {
    name: "Español", locale: "es-ES", og: "es_ES", home: "/es/", store: "es", image: "/og-es.png",
    blog: "Blog", homeLabel: "Inicio", features: "Funciones", download: "Descargar", dlSmall: "Descárgalo en el",
    language: "Idioma", breadcrumbs: "Ruta de navegación", toc: "Contenido", related: "Lee también", read: "Leer",
    minRead: (n) => `${n} min de lectura`,
    indexTitle: "Blog de Plan4U — planificación y gestión del tiempo",
    indexDescription: "Guías prácticas para organizar tu día, aplicar el time blocking, crear hábitos y sacar partido al calendario. Métodos sencillos para empezar hoy.",
    indexH1: "Planifica tus días, no solo tus tareas",
    indexLead: "Guías prácticas de gestión del tiempo, planificación y productividad tranquila — métodos para probar mañana mismo.",
    ctaTop: "Planifica tu día en Plan4U", ctaTopSub: "Escribe una frase y la app crea el evento. Gratis para iPhone.",
    ctaEyebrow: "Listo en un minuto", ctaH2: "Empieza a planificar con estilo hoy.",
    ctaP: "Inicia sesión con Apple o Google y tu primer día perfecto estará listo. Gratis, sin anuncios."
  }
};
const ORDER = ["en", "es", "pl", "ru", "uk"];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const abs = (p) => (/^https?:/.test(p) ? p : SITE + p);
const blogPath = (lang) => `/${lang}/blog/`;
const postPath = (lang, slug) => `/${lang}/blog/${slug}/`;
const storeUrl = (lang) => `https://apps.apple.com/${LANGS[lang].store}/app/plan4u/id${APP_ID}?l=${lang}&pt=${PT}&ct=blog_${lang}&mt=8`;
const formatDate = (lang, d) => new Intl.DateTimeFormat(LANGS[lang].locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

function fail(file, msg) {
  throw new Error(`${path.relative(ROOT, file)}: ${msg}`);
}

function parseFrontmatter(src, file) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(src);
  if (!m) fail(file, "missing frontmatter");
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (!kv) fail(file, `bad frontmatter line: ${line}`);
    let v = kv[2].trim();
    if (/^\[.*\]$/.test(v)) v = v.slice(1, -1);
    else if (/^(["']).*\1$/.test(v)) v = v.slice(1, -1);
    data[kv[1]] = v;
  }
  data.keywords = (data.keywords || "").split(",").map((k) => k.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
  return { data, body: src.slice(m[0].length) };
}

function slugify(text) {
  return text.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
}

function imageSize(src) {
  const file = path.join(ROOT, src.replace(/^\//, ""));
  if (!src.startsWith("/") || !fs.existsSync(file)) return null;
  const buf = fs.readFileSync(file);
  if (file.endsWith(".svg")) {
    const vb = /viewBox="[\d.]+\s+[\d.]+\s+([\d.]+)\s+([\d.]+)"/.exec(buf.toString("utf8"));
    return vb ? { w: Math.round(+vb[1]), h: Math.round(+vb[2]) } : null;
  }
  if (buf.slice(1, 4).toString() === "PNG") return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xc3) return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
      i += 2 + len;
    }
  }
  return null;
}

function renderImage(alt, src, title, file) {
  if (!alt.trim()) fail(file, `image ${src} has no alt text`);
  const size = imageSize(src);
  const dims = size ? ` width="${size.w}" height="${size.h}"` : "";
  const img = `<img src="${esc(src)}" alt="${esc(alt)}"${dims} loading="lazy" decoding="async">`;
  return title ? `<figure>${img}<figcaption>${esc(title)}</figcaption></figure>` : `<figure>${img}</figure>`;
}

function inline(text, file) {
  const out = [];
  const re = /`([^`]+)`|!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0, m;
  const fmt = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, "$1<em>$2</em>");
  while ((m = re.exec(text))) {
    out.push(fmt(text.slice(last, m.index)));
    if (m[1] !== undefined) out.push(`<code>${esc(m[1])}</code>`);
    else if (m[3] !== undefined) {
      if (!m[2].trim()) fail(file, `image ${m[3]} has no alt text`);
      const size = imageSize(m[3]);
      out.push(`<img src="${esc(m[3])}" alt="${esc(m[2])}"${size ? ` width="${size.w}" height="${size.h}"` : ""} loading="lazy" decoding="async">`);
    } else {
      const external = /^https?:/.test(m[6]) && !m[6].startsWith(SITE);
      out.push(`<a href="${esc(m[6])}"${external ? ' rel="noopener" target="_blank"' : ""}>${fmt(m[5])}</a>`);
    }
    last = re.lastIndex;
  }
  out.push(fmt(text.slice(last)));
  return out.join("");
}

function markdown(src, file) {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  const headings = [];
  const ids = new Set();
  let i = 0;
  const isBlockStart = (l) => /^(#{1,6}\s|>\s?|[-*]\s|\d+\.\s|\|)/.test(l) || /^!\[[^\]]*\]\([^)]+\)\s*$/.test(l);
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const h = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (h) {
      const level = h[1].length;
      if (level === 1) fail(file, "use ## and ### in the body; the title becomes the only <h1>");
      if (level > 3) fail(file, "only ## and ### headings are supported");
      if (level === 3 && !headings.some((x) => x.level === 2)) fail(file, "### appears before any ##");
      const content = inline(h[2], file);
      let id = slugify(content) || `section-${headings.length + 1}`;
      while (ids.has(id)) id += "-2";
      ids.add(id);
      headings.push({ level, id, html: content });
      html.push(`<h${level} id="${id}">${content}</h${level}>`);
      i++;
      continue;
    }
    const img = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)\s*$/.exec(line);
    if (img) { html.push(renderImage(img[1], img[2], img[3], file)); i++; continue; }
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
      const paras = buf.join("\n").split(/\n\s*\n/).map((p) => `<p>${inline(p.replace(/\n/g, " "), file)}</p>`);
      html.push(`<blockquote>${paras.join("")}</blockquote>`);
      continue;
    }
    if (/^[-*]\s/.test(line) || /^\d+\.\s/.test(line)) {
      const ordered = /^\d+\.\s/.test(line);
      const marker = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;
      const items = [];
      while (i < lines.length && (marker.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length))) {
        if (marker.test(lines[i])) items.push(lines[i].replace(marker, ""));
        else items[items.length - 1] += " " + lines[i].trim();
        i++;
      }
      const tag = ordered ? "ol" : "ul";
      html.push(`<${tag}>${items.map((it) => `<li>${inline(it, file)}</li>`).join("")}</${tag}>`);
      continue;
    }
    if (/^\|/.test(line) && i + 1 < lines.length && /^\|?\s*:?-{3,}/.test(lines[i + 1])) {
      const cells = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const head = cells(line);
      i += 2;
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(cells(lines[i++]));
      html.push(`<div class="table-wrap"><table><thead><tr>${head.map((c) => `<th scope="col">${inline(c, file)}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c, file)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }
    const buf = [];
    while (i < lines.length && lines[i].trim() && !(buf.length && isBlockStart(lines[i]))) buf.push(lines[i++].trim());
    html.push(`<p>${inline(buf.join(" "), file)}</p>`);
  }
  return { html: html.join("\n"), headings };
}

function wordCount(md) {
  return md.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\]\([^)]*\)/g, "]").replace(/[#>*|`_\-[\]]/g, " ").split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

function loadPosts() {
  const posts = [];
  for (const lang of Object.keys(LANGS)) {
    const dir = path.join(CONTENT, lang);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
      const file = path.join(dir, name);
      const { data, body } = parseFrontmatter(fs.readFileSync(file, "utf8"), file);
      for (const key of ["title", "description", "slug", "date", "translationKey"]) if (!data[key]) fail(file, `frontmatter "${key}" is required`);
      if (data.draft === "true") continue;
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) fail(file, "slug must be lowercase latin letters, digits and hyphens");
      if (data.slug !== name.replace(/\.md$/, "")) fail(file, `slug "${data.slug}" must match the file name`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) fail(file, "date must be YYYY-MM-DD");
      if (data.updated && !/^\d{4}-\d{2}-\d{2}$/.test(data.updated)) fail(file, "updated must be YYYY-MM-DD");
      if ([...data.title].length > 60) fail(file, `title is ${[...data.title].length} characters, keep it within 60`);
      if ([...data.description].length > 160) fail(file, `description is ${[...data.description].length} characters, keep it within 160`);
      const withBrand = `${data.title} | Plan4U`;
      const words = wordCount(body);
      posts.push({
        ...data,
        lang,
        file,
        body,
        updated: data.updated || data.date,
        metaTitle: [...withBrand].length <= 60 ? withBrand : data.title,
        url: postPath(lang, data.slug),
        words,
        minutes: Math.max(1, Math.round(words / 200))
      });
    }
  }
  const seen = new Map();
  for (const p of posts) {
    const k = `${p.lang}:${p.translationKey}`;
    if (seen.has(k)) fail(p.file, `translationKey "${p.translationKey}" is already used by ${path.relative(ROOT, seen.get(k))}`);
    seen.set(k, p.file);
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

function alternatesFor(entries) {
  const list = ORDER.filter((l) => entries[l]).map((l) => ({ lang: l, href: abs(entries[l]) }));
  const def = entries.en || entries[ORDER.find((l) => entries[l])];
  return { list, xDefault: abs(def) };
}

function hreflangTags(alts) {
  return [...alts.list.map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${a.href}">`), `<link rel="alternate" hreflang="x-default" href="${alts.xDefault}">`].join("\n");
}

const appleIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.9c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.8-2-1.6-.2-3.1.9-3.9.9s-2.1-.9-3.4-.9C4 7 2.3 8.5 2.3 11.4c0 2.9 2.3 6 3.4 7.6.9 1.4 1.9 2.9 3.2 2.9 1.3-.1 1.8-.9 3.3-.9s2 .9 3.4.9c1.4 0 2.3-1.4 3.2-2.8.6-.9.9-1.4 1.4-2.4-3.6-1.4-3.2-6.2-3.2-6.3zM14 5.2c.7-.9 1.2-2.1 1-3.2-1 .1-2.3.7-3 1.6-.6.8-1.2 2-1 3.1 1.2.1 2.3-.6 3-1.5z"/></svg>';

function appButton(lang) {
  const t = LANGS[lang];
  return `<a href="${esc(storeUrl(lang))}" class="btn btn-app">${appleIcon}<span><small>${esc(t.dlSmall)}</small><b>App&nbsp;Store</b></span></a>`;
}

function head({ lang, title, description, canonical, alts, ogType, image, imageAlt, keywords, extraMeta = "", ld }) {
  const t = LANGS[lang];
  const ogAlternates = alts.list.filter((a) => a.lang !== lang).map((a) => `<meta property="og:locale:alternate" content="${LANGS[a.lang].og}">`).join("\n");
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${keywords && keywords.length ? `<meta name="keywords" content="${esc(keywords.join(", "))}">\n` : ""}<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#7c5cfc">
<link rel="icon" href="${ICON}">
<link rel="apple-touch-icon" href="${ICON}">
<link rel="canonical" href="${canonical}">
${hreflangTags(alts)}
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="Plan4U">
<meta property="og:locale" content="${t.og}">
${ogAlternates ? ogAlternates + "\n" : ""}<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${abs(image)}">
${ogSize(image)}<meta property="og:image:alt" content="${esc(imageAlt)}">
${extraMeta}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs(image)}">
<meta name="twitter:image:alt" content="${esc(imageAlt)}">
<link rel="stylesheet" href="/assets/blog/blog.css">
${ld.map(jsonLd).join("\n")}
</head>`;
}

function ogSize(image) {
  const size = /^https?:/.test(image) ? null : imageSize(image);
  return size ? `<meta property="og:image:width" content="${size.w}">\n<meta property="og:image:height" content="${size.h}">\n` : "";
}

function nav(lang, langLinks) {
  const t = LANGS[lang];
  const homeHref = t.home;
  const featuresHref = LANDING.includes(lang) ? `${t.home}#views` : "/#views";
  const items = ORDER.filter((l) => langLinks[l]).map((l) => `<li><a href="${langLinks[l]}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="true"' : ""}><span>${LANGS[l].name}</span><span class="code">${l.toUpperCase()}</span></a></li>`).join("");
  return `<nav class="nav">
<div class="wrap">
<a class="brand" href="${homeHref}"><span class="glyph" aria-hidden="true"></span> Plan4U</a>
<div class="nav-right">
<div class="nav-links">
<a href="${featuresHref}">${esc(t.features)}</a>
<a href="${blogPath(lang)}" aria-current="page">${esc(t.blog)}</a>
</div>
<details class="lang">
<summary class="lang-btn" aria-label="${esc(t.language)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg><span>${lang.toUpperCase()}</span><svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></summary>
<ul class="lang-menu">${items}</ul>
</details>
<a href="${esc(storeUrl(lang))}" class="nav-cta">${esc(t.download)}</a>
</div>
</div>
</nav>`;
}

function footer(lang) {
  const t = LANGS[lang];
  const featuresHref = LANDING.includes(lang) ? `${t.home}#views` : "/#views";
  return `<footer>
<div class="wrap">
<a class="brand" href="${t.home}" style="font-size:16px"><span class="glyph" style="width:24px;height:24px" aria-hidden="true"></span> Plan4U</a>
<div class="fl"><a href="${t.home}">${esc(t.homeLabel)}</a><a href="${featuresHref}">${esc(t.features)}</a><a href="${blogPath(lang)}">${esc(t.blog)}</a><a href="${esc(storeUrl(lang))}">App Store</a></div>
<div>© ${new Date().getUTCFullYear()} Plan4U</div>
</div>
</footer>`;
}

function card(post, headingTag) {
  const t = LANGS[post.lang];
  return `<a class="card" href="${post.url}"><${headingTag}>${esc(post.title)}</${headingTag}><p>${esc(post.description)}</p><span class="meta"><time datetime="${post.date}">${formatDate(post.lang, post.date)}</time> · ${esc(t.minRead(post.minutes))}</span></a>`;
}

function related(post, posts) {
  const kw = new Set(post.keywords.map((k) => k.toLowerCase()));
  const words = new Set(post.keywords.flatMap((k) => k.toLowerCase().split(/\s+/)).filter((w) => w.length > 3));
  return posts
    .filter((p) => p.lang === post.lang && p !== post)
    .map((p) => {
      const pk = p.keywords.map((k) => k.toLowerCase());
      const score = pk.filter((k) => kw.has(k)).length * 3 + pk.flatMap((k) => k.split(/\s+/)).filter((w) => words.has(w)).length;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, 3)
    .map((x) => x.p);
}

function renderPost(post, posts) {
  const t = LANGS[post.lang];
  const { html, headings } = markdown(post.body, post.file);
  const siblings = posts.filter((p) => p.translationKey === post.translationKey);
  const entries = Object.fromEntries(siblings.map((p) => [p.lang, p.url]));
  const alts = alternatesFor(entries);
  const langLinks = Object.fromEntries(ORDER.map((l) => [l, entries[l] || (posts.some((p) => p.lang === l) ? blogPath(l) : null)]));
  const canonical = abs(post.url);
  const image = post.image || t.image;
  const imageAlt = post.imageAlt || post.title;
  const crumbs = [
    { name: "Plan4U", url: t.home },
    { name: t.blog, url: blogPath(post.lang) },
    { name: post.title, url: post.url }
  ];
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: [abs(image)],
      datePublished: `${post.date}T00:00:00Z`,
      dateModified: `${post.updated}T00:00:00Z`,
      inLanguage: post.lang,
      keywords: post.keywords.join(", "),
      wordCount: post.words,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      url: canonical,
      author: { "@type": "Organization", name: "Plan4U", url: SITE + "/" },
      publisher: { "@type": "Organization", name: "Plan4U", url: SITE + "/", logo: { "@type": "ImageObject", url: LOGO, width: 512, height: 512 } },
      isPartOf: { "@type": "Blog", "@id": abs(blogPath(post.lang)), name: t.indexTitle }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, idx) => ({ "@type": "ListItem", position: idx + 1, name: c.name, item: abs(c.url) }))
    }
  ];
  const extraMeta = `<meta property="article:published_time" content="${post.date}T00:00:00Z">
<meta property="article:modified_time" content="${post.updated}T00:00:00Z">
${post.keywords.map((k) => `<meta property="article:tag" content="${esc(k)}">`).join("\n")}
`;
  const toc = headings.filter((h) => h.level === 2);
  const rel = related(post, posts);
  return `${head({ lang: post.lang, title: post.metaTitle, description: post.description, canonical, alts, ogType: "article", image, imageAlt, keywords: post.keywords, extraMeta, ld })}
<body>
<div class="page">
${nav(post.lang, langLinks)}
<main>
<article>
<header class="hero-blog">
<span class="bloom a" aria-hidden="true"></span><span class="bloom b" aria-hidden="true"></span>
<div class="read post-head">
<nav class="crumbs" aria-label="${esc(t.breadcrumbs)}"><ol>${crumbs.map((c, idx) => idx === crumbs.length - 1 ? `<li><span aria-current="page">${esc(c.name)}</span></li>` : `<li><a href="${c.url}">${esc(c.name)}</a></li>`).join("")}</ol></nav>
<span class="eyebrow">${esc(t.blog)}</span>
<h1>${esc(post.title)}</h1>
<p class="post-lead">${esc(post.description)}</p>
<div class="post-meta"><time datetime="${post.date}">${formatDate(post.lang, post.date)}</time><span class="dot" aria-hidden="true"></span><span>${esc(t.minRead(post.minutes))}</span></div>
</div>
</header>
<div class="read">
<aside class="cta-card" aria-label="Plan4U">
<div class="ct"><span class="glyph" aria-hidden="true"></span><div><strong>${esc(t.ctaTop)}</strong><span class="sub">${esc(t.ctaTopSub)}</span></div></div>
${appButton(post.lang)}
</aside>
${toc.length >= 3 ? `<nav class="toc" aria-labelledby="toc-title"><p id="toc-title">${esc(t.toc)}</p><ol>${toc.map((h) => `<li><a href="#${h.id}">${h.html}</a></li>`).join("")}</ol></nav>\n` : ""}<div class="prose">
${html}
</div>
<aside class="final-cta" aria-label="Plan4U">
<span class="eyebrow">${esc(t.ctaEyebrow)}</span>
<h2>${esc(t.ctaH2)}</h2>
<p>${esc(t.ctaP)}</p>
${appButton(post.lang)}
</aside>
</div>
</article>
${rel.length ? `<section class="related" aria-labelledby="related-title">
<div class="wrap">
<h2 id="related-title">${esc(t.related)}</h2>
<div class="cards">${rel.map((p) => card(p, "h3")).join("")}</div>
</div>
</section>
` : ""}</main>
${footer(post.lang)}
</div>
</body>
</html>
`;
}

function renderIndex(lang, posts, langsWithPosts) {
  const t = LANGS[lang];
  const list = posts.filter((p) => p.lang === lang);
  const entries = Object.fromEntries(langsWithPosts.map((l) => [l, blogPath(l)]));
  const alts = alternatesFor(entries);
  const canonical = abs(blogPath(lang));
  const crumbs = [{ name: "Plan4U", url: t.home }, { name: t.blog, url: blogPath(lang) }];
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": canonical,
      name: t.indexTitle,
      description: t.indexDescription,
      url: canonical,
      inLanguage: lang,
      publisher: { "@type": "Organization", name: "Plan4U", url: SITE + "/", logo: { "@type": "ImageObject", url: LOGO, width: 512, height: 512 } },
      blogPost: list.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: abs(p.url), datePublished: `${p.date}T00:00:00Z`, dateModified: `${p.updated}T00:00:00Z` }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, idx) => ({ "@type": "ListItem", position: idx + 1, name: c.name, item: abs(c.url) }))
    }
  ];
  return `${head({ lang, title: t.indexTitle, description: t.indexDescription, canonical, alts, ogType: "website", image: t.image, imageAlt: t.indexTitle, ld })}
<body>
<div class="page">
${nav(lang, entries)}
<main>
<header class="hero-blog">
<span class="bloom a" aria-hidden="true"></span><span class="bloom b" aria-hidden="true"></span>
<div class="wrap blog-head">
<nav class="crumbs" aria-label="${esc(t.breadcrumbs)}"><ol><li><a href="${t.home}">Plan4U</a></li><li><span aria-current="page">${esc(t.blog)}</span></li></ol></nav>
<span class="eyebrow">${esc(t.blog)}</span>
<h1>${esc(t.indexH1)}</h1>
<p class="post-lead">${esc(t.indexLead)}</p>
</div>
</header>
<section class="blog-list">
<div class="wrap">
<div class="cards">${list.map((p) => card(p, "h2")).join("")}</div>
<aside class="cta-card" aria-label="Plan4U">
<div class="ct"><span class="glyph" aria-hidden="true"></span><div><strong>${esc(t.ctaTop)}</strong><span class="sub">${esc(t.ctaTopSub)}</span></div></div>
${appButton(lang)}
</aside>
</div>
</section>
</main>
${footer(lang)}
</div>
</body>
</html>
`;
}

function sitemap(posts, langsWithPosts) {
  const urls = [];
  const landing = Object.fromEntries(LANDING.map((l) => [l, LANGS[l].home]));
  for (const l of LANDING) urls.push({ loc: abs(landing[l]), alts: alternatesFor(landing), priority: "1.0" });
  const indexes = Object.fromEntries(langsWithPosts.map((l) => [l, blogPath(l)]));
  for (const l of langsWithPosts) {
    const lastmod = posts.filter((p) => p.lang === l).map((p) => p.updated).sort().pop();
    urls.push({ loc: abs(indexes[l]), alts: alternatesFor(indexes), lastmod, priority: "0.8" });
  }
  for (const p of posts) {
    const entries = Object.fromEntries(posts.filter((x) => x.translationKey === p.translationKey).map((x) => [x.lang, x.url]));
    urls.push({ loc: abs(p.url), alts: alternatesFor(entries), lastmod: p.updated, priority: "0.7" });
  }
  const body = urls.map((u) => [
    "  <url>",
    `    <loc>${u.loc}</loc>`,
    ...(u.lastmod ? [`    <lastmod>${u.lastmod}</lastmod>`] : []),
    ...u.alts.list.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${u.alts.xDefault}"/>`,
    `    <priority>${u.priority}</priority>`,
    "  </url>"
  ].join("\n")).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;
}

function ensureRobots() {
  const file = path.join(ROOT, "robots.txt");
  const line = `Sitemap: ${SITE}/sitemap.xml`;
  let text = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "User-agent: *\nAllow: /\n";
  if (!/^Sitemap:/im.test(text)) text = text.replace(/\s*$/, "\n\n") + line + "\n";
  else text = text.replace(/^Sitemap:.*$/im, line);
  fs.writeFileSync(file, text);
}

function write(rel, content) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

const posts = loadPosts();
const langsWithPosts = ORDER.filter((l) => posts.some((p) => p.lang === l));
for (const lang of Object.keys(LANGS)) fs.rmSync(path.join(ROOT, lang, "blog"), { recursive: true, force: true });
for (const lang of langsWithPosts) write(`${lang}/blog/index.html`, renderIndex(lang, posts, langsWithPosts));
for (const post of posts) write(`${post.lang}/blog/${post.slug}/index.html`, renderPost(post, posts));
write("sitemap.xml", sitemap(posts, langsWithPosts));
ensureRobots();

for (const p of posts) {
  const note = p.words < 300 ? "  (short)" : "";
  console.log(`${p.url}  ${p.words} words, title ${[...p.metaTitle].length}, description ${[...p.description].length}${note}`);
}
console.log(`${posts.length} articles, ${langsWithPosts.length} blog indexes, sitemap.xml and robots.txt updated`);
