/* =========================================================
   AGATHA'S INTERIOR DESIGN — services.js (Services page only)
   Shared behaviour (header, reveals, booking modal…) lives in script.js
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const img = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const arrow = `<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

  /* ---------- Sticky package nav: highlight the section in view with a sliding pill ---------- */
  const track = $(".pkg-nav__track"), pill = $("#pkgPill");
  const navLinks = $$("a", track);
  const movePill = link => {
    navLinks.forEach(a => a.classList.toggle("active", a === link));
    if (!link) { pill.style.opacity = 0; return; }
    pill.style.opacity = 1;
    pill.style.width = link.offsetWidth + "px";
    pill.style.transform = `translateX(${link.offsetLeft}px)`;
    // keep the active pill visible when the bar scrolls sideways on phones
    const left = link.offsetLeft - (track.clientWidth - link.offsetWidth) / 2;
    track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  };
  let current = null;
  const sectionIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const link = navLinks.find(a => a.getAttribute("href") === "#" + e.target.id) || null;
      if (link !== current) { current = link; movePill(link); }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  [".page-hero", "#consultation", "#e-design", "#styling", "#full-service", "#compare", ".process", "#finder"]
    .forEach(sel => { const el = $(sel); if (el) sectionIO.observe(el); });
  window.addEventListener("resize", () => current && movePill(current));

  /* ---------- Compare table: highlight the hovered package column ---------- */
  const compare = $("#compareTable");
  compare.addEventListener("mouseover", e => {
    const cell = e.target.closest("td, th");
    const col = cell ? cell.cellIndex + 1 : 0;
    if (col > 1) compare.dataset.col = col; else delete compare.dataset.col;
  });
  compare.addEventListener("mouseleave", () => delete compare.dataset.col);

  /* ---------- Service finder quiz ---------- */
  const packages = {
    consult: { name: "Design Consultation", price: "₦150,000 / session", anchor: "#consultation", id: "1556228453-efd6c1ff04f6",
      why: "You're ready to do the work yourself — you just want expert eyes and a clear plan before you spend." },
    edesign: { name: "E-Design", price: "₦750,000 / room", anchor: "#e-design", id: "1502672260266-1c1ef2d93688",
      why: "You'd love a complete, shoppable design for your room that you can bring to life at your own pace." },
    styling: { name: "Room Styling", price: "₦1,500,000 / room", anchor: "#styling", id: "1616627561950-9f746e330187",
      why: "Your room has good bones — it needs the layers, textiles and styling that make it feel finished." },
    full: { name: "Full-Service Design", price: "from ₦7,500,000", anchor: "#full-service", id: "1600607687939-ce8a6c25118c",
      why: "You want a complete transformation without the stress — Agatha handles every detail for you." },
  };
  // Each answer adds points to the packages it suits
  const questions = [
    { q: "What are you hoping for?", opts: [
      ["Expert advice to guide my own project", { consult: 3, edesign: 1 }],
      ["A complete plan I can shop myself", { edesign: 3 }],
      ["My room is almost there — it needs finishing", { styling: 3 }],
      ["A full transformation, handled for me", { full: 3 }],
    ] },
    { q: "How much of your home are we talking about?", opts: [
      ["One room", { consult: 1, edesign: 1, styling: 1 }],
      ["A few rooms", { edesign: 1, styling: 1, full: 1 }],
      ["The whole home or a renovation", { full: 2 }],
    ] },
    { q: "How hands-on would you like to be?", opts: [
      ["I love doing it myself", { consult: 2, edesign: 1 }],
      ["Happy to shop, less keen to style", { edesign: 1, styling: 1 }],
      ["I'd rather it was simply done for me", { styling: 1, full: 2 }],
    ] },
  ];
  const stage = $("#finderStage"), bar = $("#finderBar"), card = $("#finderCard");
  const backIcon = `<svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>`;
  let answers = [];

  const swap = html => {
    const old = $(".finder__step", stage);
    const put = () => { stage.innerHTML = html; };
    if (!old || reduceMotion) return put();
    old.classList.add("out");
    setTimeout(put, 280);
  };

  const showQuestion = i => {
    bar.style.width = (i / questions.length) * 100 + "%";
    const { q, opts } = questions[i];
    swap(`
      <div class="finder__step">
        <p class="finder__count">Question ${i + 1} of ${questions.length}</p>
        <h3 class="finder__q">${q}</h3>
        <div class="finder__opts">
          ${opts.map(([label], k) => `<button class="finder__opt${answers[i] === k ? " picked" : ""}" data-q="${i}" data-k="${k}"><span class="dot"></span>${label}</button>`).join("")}
        </div>
        ${i > 0 ? `<button class="finder__back" data-back="${i - 1}">${backIcon}Back</button>` : ""}
      </div>`);
  };

  const burst = () => {
    if (reduceMotion) return;
    const r = card.getBoundingClientRect();
    for (let n = 0; n < 14; n++) {
      const s = document.createElement("span");
      s.className = "burst";
      s.style.left = r.width / 2 + "px";
      s.style.top = r.height / 2 + "px";
      s.style.setProperty("--a", (n / 14) * 360 + "deg");
      card.appendChild(s);
      setTimeout(() => s.remove(), 1000);
    }
  };

  const showResult = () => {
    bar.style.width = "100%";
    const score = { consult: 0, edesign: 0, styling: 0, full: 0 };
    answers.forEach((k, i) => Object.entries(questions[i].opts[k][1]).forEach(([p, v]) => { score[p] += v; }));
    const best = Object.keys(score).reduce((a, b) => (score[b] > score[a] ? b : a));
    const p = packages[best];
    swap(`
      <div class="finder__step finder__result">
        <img src="${img(p.id, 600)}" alt="${p.name}" />
        <div>
          <p class="eyebrow">Your perfect match</p>
          <h3>${p.name}</h3>
          <p class="price">${p.price}</p>
          <p class="why">${p.why}</p>
          <div class="finder__actions">
            <button class="btn btn--primary btn--sm" data-book data-service="${p.name}">Book this service ${arrow}</button>
            <a href="${p.anchor}" class="btn btn--link">See what's included</a>
          </div>
          <button class="finder__back" data-restart>${backIcon}Start again</button>
        </div>
      </div>`);
    setTimeout(burst, reduceMotion ? 0 : 320);
  };

  stage.addEventListener("click", e => {
    const opt = e.target.closest(".finder__opt");
    if (opt) {
      const i = +opt.dataset.q;
      answers[i] = +opt.dataset.k;
      answers.length = i + 1; // changing an answer clears the ones after it
      $$(".finder__opt", stage).forEach(o => o.classList.toggle("picked", o === opt));
      setTimeout(() => (i + 1 < questions.length ? showQuestion(i + 1) : showResult()), 350);
      return;
    }
    const back = e.target.closest("[data-back]");
    if (back) return showQuestion(+back.dataset.back);
    if (e.target.closest("[data-restart]")) { answers = []; showQuestion(0); }
  });
  showQuestion(0);
});
