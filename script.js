/* =========================================================
   AGATHA'S INTERIOR DESIGN — script.js
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const img = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const arrow = `<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
  const heartSVG = `<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>`;

  /* ---------- Content (edit freely) ---------- */
  const spaces = [
    { name: "Living Room",     id: "1616486338812-3dadae4b4ace" },
    { name: "Bedroom",         id: "1617098900591-3f90928e8c54" },
    { name: "Dining Room",     id: "1617806118233-18e1de247200" },
    { name: "Kitchen",         id: "1600489000022-c2086d79f9d4" },
    { name: "Home Office",     id: "1600494603989-9650cf6ddd3d" },
    { name: "Bathroom",        id: "1620626011761-996317b8d101" },
    { name: "Entryway",        id: "1618219908412-a29a1bb7b86e" },
    { name: "Styling & Decor", id: "1532372320572-cda25653a26d" },
  ];

  const services = [
    { key: "Design Consultation", price: "$199", unit: "/ session", reviews: 128, id: "1556228453-efd6c1ff04f6",
      desc: "A 90-minute in-home or virtual session with a personal action plan." },
    { key: "E-Design", price: "$899", unit: "/ room", reviews: 96, id: "1502672260266-1c1ef2d93688", tag: "New",
      desc: "Mood board, floor plan and shoppable list — delivered online." },
    { key: "Room Styling", price: "$1,200", unit: "/ room", reviews: 210, id: "1616627561950-9f746e330187",
      desc: "Fresh layouts, textiles, art and accessories to finish a room." },
    { key: "Full-Service Design", price: "$4,500", unit: "from", reviews: 142, id: "1598928506311-c55ded91a20c", tag: "Most loved",
      desc: "Concept to installation, managed beautifully from start to finish." },
  ];

  const testimonials = [
    { name: "Priya S.",  role: "Living room redesign", id: "1438761681033-6461ffad8d80",
      text: "Agatha completely transformed our living room. It finally feels calm, warm and so us. I still smile every time I walk in." },
    { name: "Rahul K.",  role: "Full-service client", id: "1500648767791-00dcc994a43e",
      text: "The perfect blend of style and practicality. Clear communication, on budget, and the install day felt like magic." },
    { name: "Neha M.",   role: "E-Design client", id: "1494790108377-be9c29b29330",
      text: "Minimal, elegant and exactly what I was looking for. The shoppable list made everything so easy to order." },
    { name: "Sophie L.", role: "Bedroom retreat", id: "1544005313-94ddf0286df2",
      text: "Our bedroom is now the most peaceful place in the house. Agatha has an incredible eye for texture and light." },
    { name: "Grace A.",  role: "Room styling", id: "1580489944761-15a19d654956",
      text: "Just a few hours of styling and the whole home feels new. Worth every penny — I've already booked the next room!" },
  ];

  const gallery = [
    { id: "1522708323590-d24dbb6b0267", alt: "Bright open-plan apartment" },
    { id: "1567016432779-094069958ea5", alt: "Terracotta sofa with cushions" },
    { id: "1594026112284-02bb6f3352fe", alt: "Floating shelves with styled decor" },
    { id: "1616594039964-ae9021a400a0", alt: "Moody bedroom with sculptural lighting" },
    { id: "1540518614846-7eded433c457", alt: "Bedroom with warm accents" },
    { id: "1600607687920-4e2a09cf159d", alt: "Modern dining space" },
  ];

  /* ---------- Render ---------- */
  $("#spacesList").innerHTML = spaces.map((s, i) => `
    <a href="#gallery" class="space reveal" style="--d:${i * 0.06}s">
      <div class="space__img"><img src="${img(s.id, 400)}" alt="${s.name} interior" loading="lazy" /></div>
      <span>${s.name}</span>
    </a>`).join("");

  $("#servicesList").innerHTML = services.map((s, i) => `
    <article class="service reveal" style="--d:${i * 0.1}s">
      <div class="service__img">
        <img src="${img(s.id, 800)}" alt="${s.key}" loading="lazy" />
        ${s.tag ? `<span class="service__tag">${s.tag}</span>` : ""}
        <button class="wish" data-id="${s.key}" aria-label="Save ${s.key}" aria-pressed="false">${heartSVG}</button>
      </div>
      <div class="service__body">
        <h3 class="service__name">${s.key}</h3>
        <p class="service__desc">${s.desc}</p>
        <div class="service__meta">
          <p class="service__price">${s.unit === "from" ? "<small>from</small> " : ""}${s.price}${s.unit !== "from" ? ` <small>${s.unit}</small>` : ""}</p>
          <p class="service__rating"><span class="stars">★★★★★</span>(${s.reviews})</p>
        </div>
        <button class="book-btn" data-book data-service="${s.key}">Book now</button>
      </div>
    </article>`).join("");

  $("#tTrack").innerHTML = testimonials.map(t => `
    <figure class="testimonial">
      <img src="${img(t.id, 160)}" alt="${t.name}" loading="lazy" />
      <div>
        <blockquote>“${t.text}”</blockquote>
        <span class="stars">★★★★★</span>
        <figcaption><cite>${t.name}<small>${t.role}</small></cite></figcaption>
      </div>
    </figure>`).join("");

  $("#galleryList").innerHTML = gallery.map((g, i) => `
    <button class="gallery__item reveal-zoom" style="--d:${i * 0.08}s" data-index="${i}" aria-label="Open image: ${g.alt}">
      <img src="${img(g.id, 500)}" alt="${g.alt}" loading="lazy" />
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5M11 8v6M8 11h6"/></svg>
    </button>`).join("");

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Image fallback ---------- */
  $$("img").forEach(el => el.addEventListener("error", () => { el.style.visibility = "hidden"; }, { once: true }));

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  let toastTimer;
  const showToast = msg => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
  };

  /* ---------- Counters ---------- */
  const runCounter = el => {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || "0", 10);
    if (reduceMotion) { el.textContent = target.toFixed(dec); return; }
    const dur = 1800, start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = (target * eased).toFixed(dec);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------- Preloader -> intro ---------- */
  const preloader = $("#preloader");
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    preloader.classList.add("done");
    document.body.classList.remove("is-loading");
    setTimeout(() => {
      document.body.classList.add("loaded");
      $$(".hero [data-count]").forEach(runCounter);
      startHero();
    }, reduceMotion ? 0 : 450);
    setTimeout(() => preloader.remove(), 1600);
  };
  const minShow = reduceMotion ? 0 : 1300;
  const t0 = performance.now();
  const onReady = () => setTimeout(start, Math.max(0, minShow - (performance.now() - t0)));
  const heroFirst = $(".hero__slide img");
  if (heroFirst.complete) onReady(); else heroFirst.addEventListener("load", onReady, { once: true });
  setTimeout(start, 3500); // never block the page on a slow image

  /* ---------- Scroll reveal ----------
     Elements hidden with clip-path report zero intersection, so for those we
     watch the (unclipped) parent and reveal the child when the parent shows. */
  const clipped = ".reveal-img, .inspire__script, .newsletter__script, .signature";
  const revealTargets = new Map(); // observed element -> elements to reveal
  const reveal = el => {
    el.classList.add("in");
    if (el.classList.contains("service")) setTimeout(() => el.classList.add("settled"), 1500);
    $$("[data-count]", el).forEach(runCounter);
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      (revealTargets.get(e.target) || []).forEach(reveal);
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal, .reveal-zoom, .steps, " + clipped).forEach(el => {
    // .spaces scrolls sideways on phones, so off-screen circles follow their row
    const watch = el.matches(clipped) ? el.parentElement : el.closest(".spaces") || el;
    if (!revealTargets.has(watch)) revealTargets.set(watch, []);
    revealTargets.get(watch).push(el);
    io.observe(watch);
  });

  /* ---------- Header, progress bar, back-to-top, parallax ---------- */
  const header = $("#header"), progress = $("#scrollProgress"), toTop = $("#toTop");
  const parallaxEls = $$(".parallax");
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("scrolled", y > 40);
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    toTop.classList.toggle("show", y > 700);
    if (!reduceMotion) {
      parallaxEls.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const offset = (r.top + r.height / 2 - window.innerHeight / 2) * parseFloat(el.dataset.speed || 0.1);
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  /* ---------- Hero slider ---------- */
  const hero = $(".hero");
  const slides = $$(".hero__slide");
  const heroProgress = $("#heroProgress");
  const HERO_MS = 6500;
  let heroIdx = 0, heroTimer = null, heroStart = 0, heroLeft = HERO_MS, autoplay = false;
  $("#heroTotal").textContent = String(slides.length).padStart(2, "0");
  heroProgress.style.setProperty("--dur", HERO_MS + "ms");
  const goHero = i => {
    closeSpots();
    slides[heroIdx].classList.remove("active");
    heroIdx = (i + slides.length) % slides.length;
    slides[heroIdx].classList.add("active");
    $("#heroCurrent").textContent = String(heroIdx + 1).padStart(2, "0");
    restartHero();
  };
  const scheduleHero = () => {
    heroStart = performance.now();
    heroProgress.style.animationPlayState = "running";
    heroTimer = setTimeout(() => goHero(heroIdx + 1), heroLeft);
  };
  const restartHero = () => {
    if (!autoplay) return;
    clearTimeout(heroTimer);
    heroLeft = HERO_MS;
    heroProgress.classList.remove("run");
    void heroProgress.offsetWidth; // restart CSS animation
    heroProgress.classList.add("run");
    scheduleHero();
  };
  // Pause keeps the remaining time, so reading a note doesn't reset the slide
  const pauseHero = () => {
    if (heroTimer === null) return;
    clearTimeout(heroTimer);
    heroTimer = null;
    heroLeft -= performance.now() - heroStart;
    heroProgress.style.animationPlayState = "paused";
  };
  const resumeHero = () => { if (autoplay && heroTimer === null && !$(".hotspot.open")) scheduleHero(); };
  function startHero() { autoplay = !reduceMotion; restartHero(); }
  $("#heroNext").addEventListener("click", () => goHero(heroIdx + 1));
  $("#heroPrev").addEventListener("click", () => goHero(heroIdx - 1));

  /* ---------- Hero hotspots ----------
     x / y are percentages of the original photo; ar is its width / height.
     Positions are mapped through object-fit: cover so dots stay on the object. */
  const heroSpots = [
    { ar: 1000 / 527, spots: [
      { x: 62, y: 43, title: "Brass arc floor lamp", text: "Sculptural light that frames the seating area — no ceiling fixture needed." },
      { x: 60, y: 63, title: "Modular grey sofa", text: "Deep, low seats in a performance weave that stands up to family life." },
      { x: 86, y: 70, title: "Cognac leather lounge chairs", text: "Warm leather balances the cool grey and picks up the timber tones." },
      { x: 56, y: 84, title: "Leather poufs", text: "Flexible extra seating that tucks neatly under the coffee table." },
    ] },
    { ar: 1000 / 732, spots: [
      { x: 62, y: 32, title: "Rattan sun mirrors", text: "Handwoven mirrors bounce daylight deeper into the room." },
      { x: 86, y: 44, title: "Linen floor lamp", text: "A soft, diffused glow for evenings — layered light, not one harsh bulb." },
      { x: 64, y: 62, title: "Boucle & linen layers", text: "Mixed textures in one calm palette keep neutrals from feeling flat." },
      { x: 84, y: 74, title: "Seagrass basket", text: "Beautiful storage that hides throws and toys in plain sight." },
    ] },
    { ar: 1, spots: [
      { x: 58, y: 34, title: "Woven rattan pendants", text: "Hung at staggered heights for a relaxed, collected look." },
      { x: 83, y: 52, title: "Fan palm", text: "Living greenery softens corners and brings the garden indoors." },
      { x: 63, y: 46, title: "Textured paper art", text: "Tone-on-tone framed pieces add depth without competing for attention." },
      { x: 58, y: 61, title: "Striped linen cushions", text: "A hint of indigo pattern ties the soft grey sofa to the vintage rug." },
    ] },
  ];
  slides.forEach((slide, s) => {
    $(".hero__media", slide).insertAdjacentHTML("beforeend", heroSpots[s].spots.map((p, i) => `
      <div class="hotspot" style="--i:${i}">
        <button class="hotspot__dot" aria-expanded="false" aria-controls="spot-${s}-${i}" aria-label="Design detail: ${p.title}"></button>
        <div class="hotspot__card" id="spot-${s}-${i}" role="tooltip">
          <p class="eyebrow">Designer's note</p>
          <h3>${p.title}</h3>
          <p>${p.text}</p>
          <button data-book>Get this look ${arrow}</button>
        </div>
      </div>`).join(""));
  });

  const heroSlides = $("#heroSlides");
  const placeSpots = () => {
    const W = heroSlides.offsetWidth, H = heroSlides.offsetHeight;
    // Desktop/tablet: keep dots clear of the headline on the left.
    // Phone: the photo sits in its own panel, so only the top fade and controls matter.
    const phone = window.innerWidth <= 640;
    const minX = phone ? 0.08 : window.innerWidth > 980 ? 0.47 : 0.6;
    const [minY, maxY] = phone ? [0.2, 0.76] : [0.08, 0.84];
    slides.forEach((slide, s) => {
      const { ar, spots } = heroSpots[s];
      const scale = Math.max(W / ar, H); // object-fit: cover, image height = 1 unit
      const rw = ar * scale, rh = scale;
      $$(".hotspot", slide).forEach((el, i) => {
        const fx = (spots[i].x / 100 * rw - (rw - W) / 2) / W;
        const fy = (spots[i].y / 100 * rh - (rh - H) / 2) / H;
        el.hidden = fx < minX || fx > (phone ? 0.92 : 0.94) || fy < minY || fy > maxY;
        el.style.left = fx * 100 + "%";
        el.style.top = fy * 100 + "%";
        // open the note on whichever side has room (card is ~250 x 180px)
        el.classList.toggle("below", fy * H < 210);
        el.classList.toggle("edge", (1 - fx) * W < 140);
        el.classList.toggle("start", fx * W < 140);
      });
    });
  };
  placeSpots();
  window.addEventListener("resize", placeSpots);

  const hint = $("#heroHint");
  if (!finePointer) hint.lastChild.textContent = "Tap the dots to explore the design";
  const setSpot = (spot, open) => {
    if (open) closeSpots(spot);
    spot.classList.toggle("open", open);
    $(".hotspot__dot", spot).setAttribute("aria-expanded", open);
    if (open) { hint.classList.add("gone"); pauseHero(); } else resumeHero();
  };
  function closeSpots(except) {
    $$(".hotspot.open").forEach(s => { if (s !== except) { s.classList.remove("open"); $(".hotspot__dot", s).setAttribute("aria-expanded", "false"); } });
  }
  $$(".hotspot").forEach(spot => {
    if (finePointer) {
      spot.addEventListener("mouseenter", () => setSpot(spot, true));
      spot.addEventListener("mouseleave", () => setSpot(spot, false));
    }
    $(".hotspot__dot", spot).addEventListener("click", () => setSpot(spot, !spot.classList.contains("open")));
  });
  document.addEventListener("click", e => {
    if (!e.target.closest(".hotspot") && $(".hotspot.open")) { closeSpots(); resumeHero(); }
  });

  /* ---------- Touch "spotlight": the card crossing the middle of the screen gets the hover look ---------- */
  if (!finePointer) {
    const spotIO = new IntersectionObserver(entries => {
      entries.forEach(e => e.target.classList.toggle("spot", e.isIntersecting));
    }, { rootMargin: "-38% 0px -38% 0px" });
    $$(".service, .step, .value, .feature, .testimonial").forEach(el => spotIO.observe(el));
  }

  /* ---------- Hero mouse-depth parallax (desktop) ---------- */
  if (finePointer && !reduceMotion) {
    hero.classList.add("has-parallax");
    let mx = 0, my = 0, tmx = 0, tmy = 0, raf = null;
    const step = () => {
      mx += (tmx - mx) * 0.08; my += (tmy - my) * 0.08;
      hero.style.setProperty("--mx", mx.toFixed(4));
      hero.style.setProperty("--my", my.toFixed(4));
      raf = Math.abs(tmx - mx) + Math.abs(tmy - my) > 0.001 ? requestAnimationFrame(step) : null;
    };
    const aim = (x, y) => { tmx = x; tmy = y; if (!raf) raf = requestAnimationFrame(step); };
    hero.addEventListener("mousemove", e => {
      const r = hero.getBoundingClientRect();
      aim(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2);
    });
    hero.addEventListener("mouseleave", () => aim(0, 0));
  }

  /* ---------- Testimonials carousel ---------- */
  const track = $("#tTrack"), cards = $$(".testimonial", track), dotsWrap = $("#tDots");
  let tIdx = 0, tTimer;
  const perView = () => (window.innerWidth <= 640 ? 1 : window.innerWidth <= 1100 ? 2 : 3);
  const maxIdx = () => Math.max(0, cards.length - perView());
  const renderDots = () => {
    dotsWrap.innerHTML = Array.from({ length: maxIdx() + 1 }, (_, i) =>
      `<button aria-label="Go to testimonial ${i + 1}" class="${i === tIdx ? "active" : ""}"></button>`).join("");
    $$("button", dotsWrap).forEach((b, i) => b.addEventListener("click", () => goT(i)));
  };
  const goT = i => {
    const m = maxIdx();
    tIdx = i > m ? 0 : i < 0 ? m : i;
    const step = cards[0].getBoundingClientRect().width + 24;
    track.style.transform = `translateX(${-tIdx * step}px)`;
    $$("button", dotsWrap).forEach((b, j) => b.classList.toggle("active", j === tIdx));
    clearInterval(tTimer);
    if (!reduceMotion) tTimer = setInterval(() => goT(tIdx + 1), 5500);
  };
  $("#tNext").addEventListener("click", () => goT(tIdx + 1));
  $("#tPrev").addEventListener("click", () => goT(tIdx - 1));
  let touchX = null;
  track.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) goT(tIdx + (dx < 0 ? 1 : -1));
    touchX = null;
  });
  let resizeT;
  window.addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => { if (tIdx > maxIdx()) tIdx = maxIdx(); renderDots(); goT(tIdx); }, 150);
  });
  renderDots(); goT(0);

  /* ---------- Saved ideas (wishlist) ---------- */
  const savedCount = $("#savedCount");
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem("agatha-saved") || "[]"); } catch { saved = []; }
  const syncSaved = bump => {
    savedCount.textContent = saved.length;
    $$(".wish").forEach(b => b.setAttribute("aria-pressed", saved.includes(b.dataset.id)));
    if (bump) { savedCount.classList.remove("bump"); void savedCount.offsetWidth; savedCount.classList.add("bump"); }
    try { localStorage.setItem("agatha-saved", JSON.stringify(saved)); } catch { /* storage unavailable */ }
  };
  document.addEventListener("click", e => {
    const w = e.target.closest(".wish");
    if (!w) return;
    const id = w.dataset.id;
    const on = !saved.includes(id);
    saved = on ? [...saved, id] : saved.filter(x => x !== id);
    syncSaved(true);
    showToast(on ? `${id} saved to your ideas ♡` : `${id} removed from your ideas`);
  });
  syncSaved(false);

  /* ---------- Booking modal ---------- */
  const modal = $("#bookModal"), bookForm = $("#bookForm");
  let lastFocus;
  const openLayer = el => {
    lastFocus = document.activeElement;
    el.hidden = false;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => el.classList.add("open"));
  };
  const closeLayer = el => {
    el.classList.remove("open");
    document.body.classList.remove("no-scroll");
    setTimeout(() => { el.hidden = true; }, 350);
    lastFocus?.focus?.();
  };
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-book]");
    if (!b) return;
    e.preventDefault();
    if (b.dataset.service) $("#serviceSelect").value = b.dataset.service;
    closeMenu();
    openLayer(modal);
    setTimeout(() => $("input", bookForm).focus(), 60);
  });
  [modal, $("#lightbox")].forEach(layer => layer.addEventListener("click", e => {
    if (e.target === layer || e.target.closest("[data-close]")) closeLayer(layer);
  }));
  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  bookForm.addEventListener("submit", e => {
    e.preventDefault();
    const { name, email } = bookForm.elements;
    [name, email].forEach(f => f.classList.remove("invalid"));
    let ok = true;
    if (!name.value.trim()) { name.classList.add("invalid"); ok = false; }
    if (!isEmail(email.value.trim())) { email.classList.add("invalid"); ok = false; }
    if (!ok) { showToast("Please add your name and a valid email"); return; }
    closeLayer(modal);
    showToast(`Thank you, ${name.value.trim().split(" ")[0]}! Agatha will be in touch within 24 hours.`);
    bookForm.reset();
  });

  /* ---------- Gallery lightbox ---------- */
  const lb = $("#lightbox"), lbImg = $("#lbImg");
  let lbIdx = 0;
  const showLb = i => {
    lbIdx = (i + gallery.length) % gallery.length;
    lbImg.style.opacity = 0;
    lbImg.onload = () => { lbImg.style.opacity = 1; };
    lbImg.src = img(gallery[lbIdx].id, 1600);
    lbImg.alt = gallery[lbIdx].alt;
  };
  $("#galleryList").addEventListener("click", e => {
    const item = e.target.closest(".gallery__item");
    if (!item) return;
    showLb(+item.dataset.index);
    openLayer(lb);
  });
  $("#lbNext").addEventListener("click", () => showLb(lbIdx + 1));
  $("#lbPrev").addEventListener("click", () => showLb(lbIdx - 1));

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeSpots();
      resumeHero();
      if (!modal.hidden) closeLayer(modal);
      if (!lb.hidden) closeLayer(lb);
      closeMenu();
    }
    if (!lb.hidden && e.key === "ArrowRight") showLb(lbIdx + 1);
    if (!lb.hidden && e.key === "ArrowLeft") showLb(lbIdx - 1);
  });

  /* ---------- Newsletter ---------- */
  $("#newsletterForm").addEventListener("submit", e => {
    e.preventDefault();
    const input = $("input", e.target);
    input.classList.remove("invalid");
    if (!isEmail(input.value.trim())) {
      void input.offsetWidth;
      input.classList.add("invalid");
      showToast("Please enter a valid email address");
      return;
    }
    input.value = "";
    showToast("Welcome to the community! Check your inbox ♡");
  });

  /* ---------- Mobile menu, dropdowns, search ---------- */
  const nav = $("#nav"), overlay = $("#overlay"), toggle = $("#menuToggle");
  const openMenu = () => { nav.classList.add("open"); overlay.classList.add("show"); toggle.setAttribute("aria-expanded", "true"); };
  function closeMenu() { nav.classList.remove("open"); overlay.classList.remove("show"); toggle.setAttribute("aria-expanded", "false"); }
  toggle.addEventListener("click", openMenu);
  $("#menuClose").addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
  $$(".nav a").forEach(a => a.addEventListener("click", closeMenu));
  $$(".dropdown-toggle").forEach(btn => btn.addEventListener("click", () => btn.parentElement.classList.toggle("open")));
  $("#searchBtn").addEventListener("click", () => {
    const bar = $("#searchBar");
    bar.classList.toggle("open");
    if (bar.classList.contains("open")) setTimeout(() => $("input", bar).focus(), 200);
  });

  /* ---------- Active nav link on scroll ---------- */
  const navLinks = $$(".nav__link[href^='#']");
  const sectionIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["top", "story", "inspire", "footer"].forEach(id => { const s = document.getElementById(id); if (s) sectionIO.observe(s); });

  /* ---------- Desktop-only flourishes: cursor, tilt, magnetic ---------- */
  if (finePointer && !reduceMotion) {
    const cursor = $("#cursor");
    let cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; cursor.classList.add("visible"); });
    document.addEventListener("mouseleave", () => cursor.classList.remove("visible"));
    const follow = () => {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(follow);
    };
    follow();
    document.addEventListener("mouseover", e => {
      cursor.classList.toggle("hover", !!e.target.closest("a, button, .gallery__item, .space, input, select, textarea"));
    });

    $$(".service").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });

    $$(".magnetic").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }
});
