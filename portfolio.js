/* =========================================================
   AGATHA'S INTERIOR DESIGN — portfolio.js (Portfolio page only)
   Loaded before script.js so the cards exist when the shared
   scroll-reveal and cursor code start up.
   ========================================================= */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const projects = window.PROJECTS, cats = window.PROJECT_CATS, img = window.unsplash;
  const arrow = `<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

  /* ---------- Cards ---------- */
  const grid = $("#projectGrid");
  grid.innerHTML = projects.map((p, i) => `
    <a class="project reveal${p.size ? " project--" + p.size : ""}" href="project.html?p=${p.slug}" data-cat="${p.cat}" data-cursor="View" style="--d:${(i % 3) * 0.1}s">
      <img src="${img(p.cover, p.size === "wide" || p.size === "full" ? 1600 : 900)}" alt="${p.title}" loading="lazy" />
      <div class="project__info">
        <p class="project__cat">${cats[p.cat]}</p>
        <h3>${p.title}</h3>
        <p class="project__meta">${p.service} · ${p.location}</p>
        <span class="project__more">View project ${arrow}</span>
      </div>
    </a>`).join("");
  const cards = $$(".project", grid);

  /* ---------- Filter buttons with counts ---------- */
  const track = $("#filterTrack"), pill = $("#filterPill");
  const count = c => projects.filter(p => c === "all" || p.cat === c).length;
  track.insertAdjacentHTML("beforeend", [["all", "All Projects"], ...Object.entries(cats)].map(([c, label]) =>
    `<button data-filter="${c}" aria-pressed="false">${label} <small>${count(c)}</small></button>`).join(""));
  const buttons = $$("button", track);

  const movePill = btn => {
    pill.style.opacity = 1;
    pill.style.width = btn.offsetWidth + "px";
    pill.style.transform = `translateX(${btn.offsetLeft}px)`;
    track.scrollTo({ left: btn.offsetLeft - (track.clientWidth - btn.offsetWidth) / 2, behavior: reduceMotion ? "auto" : "smooth" });
  };

  /* FLIP shuffle: fade out cards that leave, slide the rest to their new spots, fade new ones in */
  let current = null, busy = false;
  const setCount = c => { $("#pfCount").textContent = `Showing ${count(c)} ${count(c) === 1 ? "project" : "projects"}${c === "all" ? "" : " in " + cats[c]}`; };
  const applyFilter = (c, animate = true) => {
    if (c === current || busy) return;
    current = c;
    buttons.forEach(b => { const on = b.dataset.filter === c; b.classList.toggle("active", on); b.setAttribute("aria-pressed", on); });
    movePill(buttons.find(b => b.dataset.filter === c));
    setCount(c);
    const match = card => c === "all" || card.dataset.cat === c;
    if (!animate || reduceMotion) { cards.forEach(card => { card.hidden = !match(card); }); return; }

    busy = true;
    cards.forEach(card => card.classList.add("in")); // skip the scroll reveal once people start filtering
    const leaving = cards.filter(card => !card.hidden && !match(card));
    const staying = cards.filter(card => !card.hidden && match(card));
    const entering = cards.filter(card => card.hidden && match(card));
    leaving.forEach(card => card.classList.add("is-leaving"));

    setTimeout(() => {
      const first = new Map(staying.map(card => [card, card.getBoundingClientRect()]));
      leaving.forEach(card => { card.hidden = true; card.classList.remove("is-leaving"); });
      entering.forEach(card => { card.hidden = false; card.classList.add("is-entering"); });
      staying.forEach(card => {
        const a = first.get(card), b = card.getBoundingClientRect();
        card.style.transition = "none";
        card.style.transform = `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})`;
        card.style.transformOrigin = "top left";
      });
      void grid.offsetWidth;
      staying.forEach(card => {
        card.style.transition = "transform .7s cubic-bezier(.16, 1, .3, 1)";
        card.style.transform = "";
      });
      entering.forEach((card, i) => setTimeout(() => card.classList.remove("is-entering"), 60 + i * 70));
      setTimeout(() => {
        staying.forEach(card => { card.style.transition = ""; card.style.transformOrigin = ""; });
        busy = false;
      }, 750);
    }, leaving.length ? 280 : 0);
  };

  buttons.forEach(b => b.addEventListener("click", () => {
    applyFilter(b.dataset.filter);
    const url = new URL(location.href);
    if (b.dataset.filter === "all") url.searchParams.delete("cat"); else url.searchParams.set("cat", b.dataset.filter);
    history.replaceState(null, "", url);
  }));
  window.addEventListener("resize", () => { const b = buttons.find(x => x.dataset.filter === current); if (b) movePill(b); });

  // Start on the category from the link (e.g. portfolio.html?cat=bedroom)
  const start = new URLSearchParams(location.search).get("cat");
  applyFilter(cats[start] ? start : "all", false);
  // pill needs fonts/layout to settle before measuring
  window.addEventListener("load", () => movePill(buttons.find(b => b.dataset.filter === current)));

  /* ---------- Featured before / after (slider behaviour lives in script.js) ---------- */
  const feat = projects[0];
  const ba = $("#baFeature");
  $(".ba__after", ba).src = img(feat.after, 1600);
  $(".ba__after", ba).alt = `${feat.title} — after`;
  $(".ba__before img", ba).src = img(feat.before, 1600);
  $(".ba__before img", ba).alt = `${feat.title} — before`;
  $("#baFeatureTitle").textContent = feat.title.toLowerCase();
  $("#baFeatureLink").href = `project.html?p=${feat.slug}`;
})();
