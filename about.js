/* =========================================================
   AGATHA'S INTERIOR DESIGN — about.js (About page only)
   Scroll-linked effects: the belief statement lights up word by
   word, and the journey line draws down as you read.
   ========================================================= */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = v => Math.min(Math.max(v, 0), 1);

  const statement = document.getElementById("fillText");
  statement.innerHTML = statement.textContent.trim().split(/\s+/).map(w => `<span>${w}</span>`).join(" ");
  const words = [...statement.children];

  const journey = document.getElementById("journey");
  const fill = document.getElementById("journeyFill");
  const items = [...journey.querySelectorAll(".journey__item")];

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;

    // Words: start lighting when the paragraph enters the lower part of the screen,
    // finish by the time its bottom reaches the middle
    const s = statement.getBoundingClientRect();
    const p = reduceMotion ? 1 : clamp((vh * 0.85 - s.top) / (vh * 0.4 + s.height));
    const lit = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle("lit", i < lit));

    // Journey: the line fills to the reading point (60% down the screen)
    const j = journey.getBoundingClientRect();
    const jp = reduceMotion ? 1 : clamp((vh * 0.6 - j.top) / j.height);
    fill.style.transform = `scaleY(${jp})`;
    items.forEach(item => {
      const dot = item.querySelector(".journey__dot").getBoundingClientRect();
      item.classList.toggle("passed", reduceMotion || dot.top < vh * 0.6);
    });
  };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
