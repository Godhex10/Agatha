/* =========================================================
   AGATHA'S INTERIOR DESIGN — project.js (case-study template)
   Fills project.html from projects.js using ?p=<slug>.
   Loaded before script.js so reveals, parallax and the
   before/after slider pick up the filled-in content.
   ========================================================= */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const projects = window.PROJECTS, cats = window.PROJECT_CATS, img = window.unsplash;
  const slug = new URLSearchParams(location.search).get("p");
  const index = Math.max(0, projects.findIndex(p => p.slug === slug));
  const p = projects[index];
  const text = (sel, value) => { $(sel).textContent = value; };

  document.title = `${p.title} — Agatha's Interior Design`;

  /* ---------- Hero ---------- */
  $("#pjCover").src = img(p.cover, 2200);
  $("#pjCover").alt = p.title;
  text("#pjCrumb", p.title);
  text("#pjTitle", p.title);
  text("#pjSummary", p.summary);
  text("#pjCat", cats[p.cat]);
  $("#pjCat").href = `portfolio.html?cat=${p.cat}`;
  text("#pjService", p.service);

  /* ---------- Facts ---------- */
  const facts = [["Location", p.location], ["Service", p.service], ["Spaces", p.rooms], ["Timeline", p.duration], ["Completed", p.year]];
  $("#pjFacts").innerHTML = facts.map(([k, v], i) => `<div class="reveal" style="--d:${i * 0.07}s"><dt>${k}</dt><dd>${v}</dd></div>`).join("");

  /* ---------- Story ---------- */
  text("#pjBrief", p.brief);
  text("#pjApproach", p.approach);

  /* ---------- Before / after ---------- */
  const ba = $("#baProject");
  $(".ba__after", ba).src = img(p.after, 1800);
  $(".ba__after", ba).alt = `${p.title} — after`;
  $(".ba__before img", ba).src = img(p.before, 1800);
  $(".ba__before img", ba).alt = `${p.title} — before`;

  /* ---------- Gallery + lightbox ---------- */
  const photos = [p.cover, ...p.gallery];
  $("#pjGallery").innerHTML = p.gallery.map((id, i) => `
    <button class="pj-gallery__item reveal-zoom" style="--d:${i * 0.1}s" data-index="${i + 1}" data-cursor="Zoom" aria-label="Enlarge photo ${i + 1}">
      <img src="${img(id, i === 0 || i === 3 ? 1400 : 900)}" alt="${p.title} — detail ${i + 1}" loading="lazy" />
    </button>`).join("");

  const lb = $("#pjLightbox"), lbImg = $("#pjLbImg");
  let lbIdx = 0, lastFocus = null;
  const show = i => {
    lbIdx = (i + photos.length) % photos.length;
    lbImg.style.opacity = 0;
    lbImg.onload = () => { lbImg.style.opacity = 1; };
    lbImg.src = img(photos[lbIdx], 1800);
    lbImg.alt = `${p.title} — photo ${lbIdx + 1} of ${photos.length}`;
  };
  const open = i => {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => lb.classList.add("open"));
    $(".lightbox__close", lb).focus();
  };
  const close = () => {
    lb.classList.remove("open");
    document.body.classList.remove("no-scroll");
    setTimeout(() => { lb.hidden = true; }, 350);
    lastFocus?.focus?.();
  };
  $("#pjGallery").addEventListener("click", e => {
    const item = e.target.closest(".pj-gallery__item");
    if (item) open(+item.dataset.index);
  });
  $("#pjPrev").addEventListener("click", () => show(lbIdx - 1));
  $("#pjNextImgBtn").addEventListener("click", () => show(lbIdx + 1));
  lb.addEventListener("click", e => { if (e.target === lb || e.target.closest("[data-close]")) close(); });
  document.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(lbIdx + 1);
    if (e.key === "ArrowLeft") show(lbIdx - 1);
  });
  let touchX = null;
  lb.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(lbIdx + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- Palette & materials ---------- */
  $("#pjSwatches").innerHTML = p.palette.map(([name, hex], i) => `
    <div class="swatch reveal-zoom" style="--d:${i * 0.1}s; --c:${hex}">
      <span class="swatch__chip"></span>
      <strong>${name}</strong><small>${hex}</small>
    </div>`).join("");
  $("#pjMaterials").innerHTML = p.materials.map(m => `<li>${m}</li>`).join("");

  /* ---------- Quote ---------- */
  text("#pjQuote", `“${p.quote.text}”`);
  text("#pjQuoteName", p.quote.name);
  $("#pjQuoteImg").src = img(p.quote.id, 160);
  $("#pjQuoteImg").alt = p.quote.name;

  /* ---------- Next project ---------- */
  const next = projects[(index + 1) % projects.length];
  $("#pjNext").href = `project.html?p=${next.slug}`;
  $("#pjNextImg").src = img(next.cover, 1600);
  $("#pjNextImg").alt = next.title;
  text("#pjNextTitle", next.title);
})();
