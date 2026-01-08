/* Reverse scrolling + stage activation + route climber positioning + gradual mountain shade */
(function () {
  const stageIds = ["stage-basecamp", "stage-discover", "stage-transition", "stage-secure", "stage-above", "stage-ready"];
  const stages = stageIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navButtons = Array.from(document.querySelectorAll(".stage-pill"));
  const cards = Array.from(document.querySelectorAll(".card"));
  const routeSvg = document.querySelector(".routeSvg");
  const climbPath = document.getElementById("climbPath");
  const climber = document.getElementById("climber");
  const mileNodes = Array.from(document.querySelectorAll(".mile"));
  const jumpTopBtn = document.querySelector(".routeTopBtn");

  if (!stages.length) return;

  let activeIndex = 0;

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function setActive(index) {
    activeIndex = clamp(index, 0, stageIds.length - 1);

    navButtons.forEach((btn) => {
      const target = btn.getAttribute("data-goto");
      const isActive = target === stageIds[activeIndex];
      btn.classList.toggle("is-active", isActive);
    });

    mileNodes.forEach((m) => {
      const idx = Number(m.getAttribute("data-idx") || "0");
      m.classList.toggle("is-hit", idx <= activeIndex);
    });

    updateClimberForStage(activeIndex);
    updateShadeForT(activeIndex / (stageIds.length - 1));
  }

  function scrollToStage(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-goto");
      if (!target) return;
      scrollToStage(target);
    });
  });

  if (jumpTopBtn) {
    jumpTopBtn.addEventListener("click", () => {
      scrollToStage("stage-ready");
    });
  }

  /* Card visibility */
  function markCardVisibility() {
    cards.forEach((card) => card.classList.add("is-visible"));
  }

  /* Observer to decide which stage is active.
     We use data-index so the stage can be in any DOM order. */
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      const stageEl = visible.target;
      const idx = parseInt(stageEl.getAttribute("data-index") || "0", 10);

      if (!Number.isNaN(idx)) {
        setActive(idx);
      }
    },
    {
      threshold: [0.45, 0.55, 0.65],
      rootMargin: "0px 0px 0px 0px",
    }
  );

  stages.forEach((s) => io.observe(s));

  /* Reverse scroll (wheel down moves up the document) */
  const reverseScrollEnabled = true;
  let reverseScrollLock = false;

  function onWheel(e) {
    if (!reverseScrollEnabled) return;
    if (reverseScrollLock) return;

    const el = document.activeElement;
    if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;

    e.preventDefault();

    const delta = e.deltaY;
    reverseScrollLock = true;

    window.scrollBy({ top: -delta, left: 0, behavior: "auto" });

    requestAnimationFrame(() => {
      reverseScrollLock = false;
    });
  }

  window.addEventListener("wheel", onWheel, { passive: false });

  /* Route climber positioning */
  function updateClimberForStage(stageIndex) {
    if (!routeSvg || !climbPath || !climber) return;

    const total = climbPath.getTotalLength();
    const t = stageIds.length <= 1 ? 0 : stageIndex / (stageIds.length - 1);

    const len = total * (1 - t);
    const pt = climbPath.getPointAtLength(len);

    climber.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
  }

  /* Smooth progress between stages while scrolling */
  function updateClimberFromScroll() {
    if (!routeSvg || !climbPath || !climber) return;

    const current = stages.find((s) => Number(s.getAttribute("data-index")) === activeIndex) || document.getElementById(stageIds[activeIndex]);
    const nextIndex = clamp(activeIndex + 1, 0, stageIds.length - 1);
    const next = stages.find((s) => Number(s.getAttribute("data-index")) === nextIndex) || document.getElementById(stageIds[nextIndex]);

    if (!current || !next) {
      updateClimberForStage(activeIndex);
      updateShadeForT(activeIndex / (stageIds.length - 1));
      return;
    }

    const rectA = current.getBoundingClientRect();
    const rectB = next.getBoundingClientRect();

    const span = rectB.top - rectA.top;
    let prog = 0;

    if (Math.abs(span) > 1) {
      prog = clamp((0 - rectA.top) / span, 0, 1);
    }

    const t0 = stageIds.length <= 1 ? 0 : activeIndex / (stageIds.length - 1);
    const t1 = stageIds.length <= 1 ? 0 : nextIndex / (stageIds.length - 1);
    const t = t0 + (t1 - t0) * prog;

    const total = climbPath.getTotalLength();
    const len = total * (1 - t);
    const pt = climbPath.getPointAtLength(len);

    climber.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);

    updateShadeForT(t);
  }

  /* Gradual shade: darker at base camp, lighter at the top */
  function updateShadeForT(t) {
    const tt = clamp(t, 0, 1);

    /* Base camp: ~0.62 darkness
       Top:      ~0.22 darkness
       Smooth curve so it feels natural */
    const eased = tt * tt * (3 - 2 * tt); // smoothstep
    const shade = 0.62 - 0.40 * eased;

    document.documentElement.style.setProperty("--shade", String(shade.toFixed(3)));
  }

  let raf = 0;
  function onScroll() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      updateClimberFromScroll();
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  /* Start at Base camp (bottom), because we are climbing upwards */
  function startAtBaseCampBottom() {
    markCardVisibility();

    const base = document.getElementById("stage-basecamp");
    if (!base) return;

    const bottom = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    window.scrollTo(0, bottom);

    setActive(0);
    updateClimberFromScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startAtBaseCampBottom);
  } else {
    startAtBaseCampBottom();
  }
})();
