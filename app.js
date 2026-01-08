/* Reverse scrolling + stage activation + route climber positioning + gradual night sky */

(function () {
  const stageIds = [
    "stage-basecamp",
    "stage-discover",
    "stage-transition",
    "stage-secure",
    "stage-above",
    "stage-ready",
  ];

  const stages = stageIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navButtons = Array.from(document.querySelectorAll(".stage-pill"));
  const cards = Array.from(document.querySelectorAll(".card"));

  const routeSvg = document.querySelector(".route-svg");
  const climbPath = document.getElementById("climbPath");
  const climber = document.getElementById("climber");
  const mileNodes = Array.from(document.querySelectorAll(".mile"));

  if (!stages.length) return;

  let activeIndex = 0;

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function smoothstep(edge0, edge1, x) {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
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

  cards.forEach((c, idx) => c.classList.toggle("is-visible", idx === 0));

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const idx = parseInt(visible.target.getAttribute("data-index") || "0", 10);
      if (!Number.isNaN(idx) && idx !== activeIndex) setActive(idx);
    },
    {
      threshold: [0.45, 0.55, 0.65],
      rootMargin: "0px 0px 0px 0px",
    }
  );

  stages.forEach((s) => io.observe(s));

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

  function setActive(index) {
    activeIndex = clamp(index, 0, stages.length - 1);

    navButtons.forEach((btn) => {
      const target = btn.getAttribute("data-goto");
      const isActive = target === stageIds[activeIndex];
      btn.classList.toggle("is-active", isActive);
    });

    stages.forEach((s, i) => {
      const card = s.querySelector(".card");
      if (card) card.classList.toggle("is-visible", i === activeIndex);
    });

    mileNodes.forEach((m, i) => {
      m.classList.toggle("is-hit", i <= activeIndex);
    });
  }

  function updateClimberForStage(stageIndex) {
    if (!routeSvg || !climbPath || !climber) return;

    const total = climbPath.getTotalLength();
    const t = stages.length <= 1 ? 0 : stageIndex / (stages.length - 1);
    const len = total * (1 - t);

    const pt = climbPath.getPointAtLength(len);
    climber.setAttribute("transform", `translate(${pt.x},${pt.y})`);
  }

  function computeContinuousProgress() {
    const current = stages[activeIndex];
    const next = stages[clamp(activeIndex + 1, 0, stages.length - 1)];

    const rect = current.getBoundingClientRect();
    const nextRect = next.getBoundingClientRect();

    let prog = 0;
    if (next !== current) {
      const span = nextRect.top - rect.top;
      if (Math.abs(span) > 1) {
        prog = clamp((0 - rect.top) / span, 0, 1);
      }
    }

    const t0 = stages.length <= 1 ? 0 : activeIndex / (stages.length - 1);
    const t1 = stages.length <= 1 ? 0 : clamp(activeIndex + 1, 0, stages.length - 1) / (stages.length - 1);
    const t = t0 + (t1 - t0) * prog;

    return clamp(t, 0, 1);
  }

  function updateClimberFromScroll() {
    if (!routeSvg || !climbPath || !climber) return;

    const total = climbPath.getTotalLength();
    const t = computeContinuousProgress();
    const len = total * (1 - t);

    const pt = climbPath.getPointAtLength(len);
    climber.setAttribute("transform", `translate(${pt.x},${pt.y})`);
  }

  function updateNightFromScroll() {
    const t = computeContinuousProgress();

    /*
      Gradual night ramp:
      Start blending in just after Secure (index 3) and fully on by Ready (index 5).
      That is roughly t = 0.60 to 1.00 (for 6 stages).
    */
    const night = smoothstep(0.60, 1.00, t);

    document.documentElement.style.setProperty("--night-alpha", night.toFixed(3));
  }

  let raf = 0;
  function onScroll() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      updateClimberFromScroll();
      updateNightFromScroll();
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  setActive(0);
  updateClimberForStage(0);
  updateClimberFromScroll();
  updateNightFromScroll();
})();
