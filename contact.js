/* =========================================================
   AGATHA'S INTERIOR DESIGN — contact.js (Contact page only)
   Three-step booking form, budget slider, copy-email card and
   the studio's open/closed status.
   NOTE: the form does not send anywhere yet — connect it to an
   email / form service before going live.
   ========================================================= */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toastEl = $("#toast");
  let toastTimer;
  const toast = msg => {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2800);
  };

  /* ---------- Copy email ---------- */
  $$("[data-copy]").forEach(btn => btn.addEventListener("click", async () => {
    const value = btn.dataset.copy;
    try { await navigator.clipboard.writeText(value); }
    catch {
      const t = document.createElement("textarea");
      t.value = value; document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); } catch { /* nothing else to try */ }
      t.remove();
    }
    btn.classList.add("copied");
    $("small", btn).textContent = "Copied ✓";
    toast("Email address copied");
    setTimeout(() => { btn.classList.remove("copied"); $("small", btn).textContent = "Tap to copy"; }, 2200);
  }));

  /* ---------- Open / closed (Mon–Fri 9–6, Lagos time) ---------- */
  const lagos = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" })
    .formatToParts(new Date()).map(p => [p.type, p.value]));
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(lagos.weekday), hour = +lagos.hour + +lagos.minute / 60;
  const open = day >= 1 && day <= 5 && hour >= 9 && hour < 18;
  const live = $("#ctLive");
  live.textContent = open ? "Open now" : "Closed · we'll reply next working day";
  live.classList.toggle("is-open", open);

  /* ---------- Multi-step form ---------- */
  const form = $("#bookingForm"), steps = $$(".ct-step", form), stepLis = $$("#ctSteps li");
  const next = $("#ctNext"), back = $("#ctBack"), send = $("#ctSend"), fillBar = $("#ctStepsFill");
  let current = 0;

  const show = (i, direction = 1) => {
    current = i;
    steps.forEach((s, k) => {
      s.classList.toggle("active", k === i);
      s.classList.toggle("back", k === i && direction < 0);
    });
    stepLis.forEach((li, k) => { li.classList.toggle("active", k === i); li.classList.toggle("done", k < i); });
    fillBar.style.width = (i / (steps.length - 1)) * 100 + "%";
    back.hidden = i === 0;
    next.hidden = i === steps.length - 1;
    send.hidden = i !== steps.length - 1;
  };

  const shake = el => { el.classList.remove("invalid"); void el.offsetWidth; el.classList.add("invalid"); };
  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const valid = i => {
    if (i === 1 && !$$("input[name=rooms]:checked", form).length) {
      shake($("#roomChips"));
      toast("Choose at least one room");
      return false;
    }
    if (i === 2) {
      const { name, email } = form.elements;
      let ok = true;
      [name, email].forEach(f => f.classList.remove("invalid"));
      if (!name.value.trim()) { shake(name); ok = false; }
      if (!isEmail(email.value.trim())) { shake(email); ok = false; }
      if (!ok) toast("Please add your name and a valid email");
      return ok;
    }
    return true;
  };

  next.addEventListener("click", () => { if (valid(current)) show(current + 1); });
  back.addEventListener("click", () => show(current - 1, -1));
  $("#roomChips").addEventListener("change", () => $("#roomChips").classList.remove("invalid"));
  form.addEventListener("input", e => e.target.classList.remove("invalid"));

  /* Budget slider: live label + filled track */
  const budget = $("#budget"), out = $("#budgetOut");
  // ₦10M, ₦12.5M … ₦50M+
  const naira = n => "₦" + (n / 1e6).toLocaleString("en-NG", { maximumFractionDigits: 1 }) + "M";
  const syncBudget = () => {
    const pct = ((budget.value - budget.min) / (budget.max - budget.min)) * 100;
    budget.style.setProperty("--fill", pct + "%");
    out.textContent = +budget.value >= +budget.max ? naira(budget.max) + "+" : naira(budget.value);
  };
  budget.addEventListener("input", syncBudget);
  syncBudget();

  /* Message character count */
  const msg = form.elements.message, count = $("#msgCount");
  msg.addEventListener("input", () => { count.textContent = `${msg.value.length} / ${msg.maxLength}`; });

  /* Submit → success card with a summary */
  const success = $("#ctSuccess"), wrap = $(".ct-form-wrap");
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (current < steps.length - 1) { if (valid(current)) show(current + 1); return; } // Enter on early steps
    if (!valid(current)) return;
    const f = form.elements;
    const rooms = $$("input[name=rooms]:checked", form).map(r => r.value).join(", ");
    const rows = [
      ["Service", f.service.value], ["Rooms", rooms], ["Budget", out.textContent],
      ["Timeline", f.timeline.value], ["We'll reach you by", `${f.pref.value} · ${f.pref.value === "Email" ? f.email.value.trim() : f.phone.value.trim() || f.email.value.trim()}`],
    ];
    $("#ctSummary").innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
    $("#ctThanks").textContent = `Thank you, ${f.name.value.trim().split(" ")[0]}!`;
    form.hidden = true;
    $("#ctSteps").hidden = true;
    $(".ct-form-head").hidden = true;
    success.hidden = false;
    success.focus({ preventScroll: true });
    wrap.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    if (!reduceMotion) {
      for (let n = 0; n < 16; n++) {
        const s = document.createElement("span");
        s.className = "burst";
        s.style.left = "50%"; s.style.top = "70px";
        s.style.setProperty("--a", (n / 16) * 360 + "deg");
        success.appendChild(s);
        setTimeout(() => s.remove(), 1000);
      }
    }
  });

  $("#ctAgain").addEventListener("click", () => {
    form.reset();
    syncBudget();
    count.textContent = `0 / ${msg.maxLength}`;
    success.hidden = true;
    form.hidden = false;
    $("#ctSteps").hidden = false;
    $(".ct-form-head").hidden = false;
    show(0, -1);
  });

  show(0);
})();
