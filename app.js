(function () {
  const stageIds = ["stage-basecamp", "stage-discover", "stage-transition", "stage-secure", "stage-above", "stage-ready"];
  const stages = stageIds.map((id) => document.getElementById(id)).filter(Boolean);

  const navButtons = Array.from(document.querySelectorAll(".stage-pill"));
  const cards = Array.from(document.querySelectorAll(".card"));
  const climbPath = document.getElementById("climbPath");
  const climber = document.getElementById("climber");
  const mileNodes = Array.from(document.querySelectorAll(".mile"));
  const jumpTopBtn = document.querySelector(".routeTopBtn");

  if (!stages.length) return;

  let activeIndex = 0;

  try {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  } catch (e) {}

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function updateShadeForT(t) {
    const tt = clamp(t, 0, 1);
    const eased = tt * tt * (3 - 2 * tt);
    const shade = 0.62 - 0.40 * eased;
    document.documentElement.style.setProperty("--shade", String(shade.toFixed(3)));
  }

  function updateClimberForStage(stageIndex) {
    if (!climbPath || !climber) return;

    const total = climbPath.getTotalLength();
    const t = stageIds.length <= 1 ? 0 : stageIndex / (stageIds.length - 1);

    const len = total * (1 - t);
    const pt = climbPath.getPointAtLength(len);

    climber.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
    updateShadeForT(t);
  }

  function setActive(index) {
    activeIndex = clamp(index, 0, stageIds.length - 1);

    navButtons.forEach((btn) => {
      const target = btn.getAttribute("data-goto");
      btn.classList.toggle("is-active", target === stageIds[activeIndex]);
    });

    mileNodes.forEach((m) => {
      const idx = Number(m.getAttribute("data-idx") || "0");
      m.classList.toggle("is-hit", idx <= activeIndex);
    });

    updateClimberForStage(activeIndex);
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
    jumpTopBtn.addEventListener("click", () => scrollToStage("stage-ready"));
  }

  cards.forEach((card) => card.classList.add("is-visible"));

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const idx = parseInt(visible.target.getAttribute("data-index") || "0", 10);
      if (!Number.isNaN(idx)) setActive(idx);
    },
    { threshold: [0.45, 0.55, 0.65] }
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

    reverseScrollLock = true;
    window.scrollBy({ top: -e.deltaY, left: 0, behavior: "auto" });

    requestAnimationFrame(() => {
      reverseScrollLock = false;
    });
  }

  window.addEventListener("wheel", onWheel, { passive: false });

  /* Smooth climber and shade between stages */
  let raf = 0;

  function updateFromScroll() {
    if (!climbPath || !climber) return;

    const current = document.querySelector(`.stage[data-index="${activeIndex}"]`);
    const nextIndex = clamp(activeIndex + 1, 0, stageIds.length - 1);
    const next = document.querySelector(`.stage[data-index="${nextIndex}"]`);

    if (!current || !next) {
      updateClimberForStage(activeIndex);
      return;
    }

    const rectA = current.getBoundingClientRect();
    const rectB = next.getBoundingClientRect();
    const span = rectB.top - rectA.top;

    let prog = 0;
    if (Math.abs(span) > 1) prog = clamp((0 - rectA.top) / span, 0, 1);

    const t0 = activeIndex / (stageIds.length - 1);
    const t1 = nextIndex / (stageIds.length - 1);
    const t = t0 + (t1 - t0) * prog;

    const total = climbPath.getTotalLength();
    const len = total * (1 - t);
    const pt = climbPath.getPointAtLength(len);

    climber.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
    updateShadeForT(t);
  }

  function onScroll() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateFromScroll);
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  /* FORCE landing at Base camp (bottom) */
  function startAtBaseCampBottom() {
    const base = document.getElementById("stage-basecamp");
    if (!base) return;

    setActive(0);

    const jump = () => {
      base.scrollIntoView({ behavior: "auto", block: "end" });
      updateFromScroll();
    };

    jump();
    setTimeout(jump, 120);
    setTimeout(jump, 360);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startAtBaseCampBottom);
  } else {
    startAtBaseCampBottom();
  }

  window.addEventListener("load", startAtBaseCampBottom);
})();
