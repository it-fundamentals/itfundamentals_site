(function () {
  const overlay = document.getElementById("bgOverlay");
  const scrollFlip = document.getElementById("scrollFlip");

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

  const navButtons = Array.from(document.querySelectorAll(".stagePill"));
  const cards = Array.from(document.querySelectorAll(".card"));

  const climbPath = document.getElementById("climbPath");
  const climber = document.getElementById("climber");
  const milesGroup = document.getElementById("miles");

  if (!stages.length) return;

  let activeIndex = 0;

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function setActive(index) {
    activeIndex = clamp(index, 0, stages.length - 1);

    navButtons.forEach((btn) => {
      const target = btn.getAttribute("data-goto");
      const isActive = target === stageIds[activeIndex];
      btn.classList.toggle("is-active", isActive);
    });
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

  // Stage activation
  const stageObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (!visible.length) return;

      visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const top = visible[0];
      const idx = parseInt(top.target.getAttribute("data-index") || "0", 10);
      if (!Number.isNaN(idx)) setActive(idx);
    },
    {
      threshold: [0.45, 0.55, 0.65],
      rootMargin: "0px 0px 0px 0px",
    }
  );

  stages.forEach((s) => stageObserver.observe(s));

  // Card reveal
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
      });
    },
    { threshold: 0.25 }
  );

  cards.forEach((c) => cardObserver.observe(c));

  function scrollProgress() {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
    return clamp(doc.scrollTop / max, 0, 1);
  }

  function buildMiles() {
    if (!climbPath || !milesGroup) return;

    milesGroup.innerHTML = "";

    const total = climbPath.getTotalLength();
    const count = stages.length;

    for (let i = 0; i < count; i++) {
      const t = count === 1 ? 0 : i / (count - 1);
      const len = total * t;
      const pt = climbPath.getPointAtLength(len);

      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("class", "mileDot");
      dot.setAttribute("cx", String(pt.x));
      dot.setAttribute("cy", String(pt.y));
      dot.setAttribute("r", i === 0 || i === count - 1 ? "9" : "8");
      milesGroup.appendChild(dot);
    }
  }

  // Route positioning (smooth, continuous with scroll)
  function updateClimber(progress01) {
    if (!climbPath || !climber) return;

    const total = climbPath.getTotalLength();

    // Base camp is at the bottom of the page (progress01 close to 1)
    // Ready is near the top (progress01 close to 0)
    const len = total * progress01;
    const pt = climbPath.getPointAtLength(len);

    climber.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
  }

  // Gradual overlay fade while climbing (continuous)
  function updateOverlay(progress01) {
    if (!overlay) return;

    // We want darkest at base camp (bottom), lightest at the top
    // Because base camp corresponds to progress01 = 1, we invert for visuals
    const climb = 1 - progress01;

    const darkest = 0.72;
    const lightest = 0.18;

    const op = darkest + (lightest - darkest) * climb;
    overlay.style.opacity = String(op);

    const vignette = 0.78 + (0.62 - 0.78) * climb;
    overlay.style.background =
      `radial-gradient(1200px 700px at 55% 45%, rgba(0,0,0,${(vignette - 0.25).toFixed(3)}), rgba(0,0,0,${vignette.toFixed(3)}))`;
  }

  let raf = 0;
  function onScroll() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const p = scrollProgress();
      updateClimber(p);
      updateOverlay(p);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // Initial state
  setActive(0);
  cards.forEach((c, i) => {
    if (i === 0) c.classList.add("is-visible");
  });

  // Ensure route length exists before first positioning, then position again after paint
  function initRoute() {
    buildMiles();
    onScroll();
    requestAnimationFrame(() => onScroll());
  }

  window.addEventListener("load", () => {
    window.scrollTo(0, 0);
    initRoute();
  });

  window.addEventListener("resize", () => {
    buildMiles();
    onScroll();
  });
})();
