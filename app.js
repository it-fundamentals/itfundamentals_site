(() => {
  const landing = document.getElementById("landing");
  const stages = Array.from(document.querySelectorAll(".stage"));
  const climb = document.querySelector(".climb");
  const climbItems = Array.from(document.querySelectorAll(".climb_item"));
  const climber = document.querySelector(".climb_climber");

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function scrollToLandingBottom() {
    if (!landing) return;

    // Let layout settle, then jump to landing section.
    // Use auto scroll so it feels instant and avoids odd animation on load.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        landing.scrollIntoView({ block: "start", behavior: "auto" });
      });
    });
  }

  function setActiveStageByIndex(activeIndex) {
    stages.forEach((s, idx) => {
      if (idx === activeIndex) s.classList.add("is_active");
      else s.classList.remove("is_active");
    });

    climbItems.forEach((a) => {
      const idx = Number(a.getAttribute("data-stage"));
      if (idx === activeIndex) a.classList.add("is_active");
      else a.classList.remove("is_active");
    });

    // Move climber along the left track.
    // We map stage index 0..5 into a Y range inside the sidebar.
    const trackTop = 56;
    const trackBottom = climb.clientHeight - 120;
    const t = activeIndex / Math.max(1, (stages.length - 1));
    const y = trackTop + (trackBottom - trackTop) * t;

    climb.style.setProperty("--climberY", `${y}px`);
  }

  function installIntersectionObserver() {
    // If reduced motion, we still highlight, but keep movement gentler.
    const rootMargin = prefersReducedMotion()
      ? "-40% 0px -40% 0px"
      : "-55% 0px -35% 0px";

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to centre that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));

        if (visible.length) {
          const idx = Number(visible[0].target.getAttribute("data-index"));
          if (!Number.isNaN(idx)) setActiveStageByIndex(idx);
        }
      },
      { threshold: 0.25, rootMargin }
    );

    stages.forEach((s) => io.observe(s));

    // Default active stage on load
    setActiveStageByIndex(5);
  }

  function wireNavClicks() {
    climbItems.forEach((a) => {
      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        const href = a.getAttribute("href");
        const target = href ? document.querySelector(href) : null;
        if (!target) return;

        target.scrollIntoView({
          block: "center",
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      });
    });
  }

  // Load behaviour
  window.addEventListener("load", () => {
    wireNavClicks();
    installIntersectionObserver();

    // Start the user at the bottom landing section.
    scrollToLandingBottom();
  });

  // If user refreshes mid-page or changes viewport size, keep mapping accurate.
  window.addEventListener("resize", () => {
    const active = document.querySelector(".stage.is_active");
    if (!active) return;
    const idx = Number(active.getAttribute("data-index"));
    if (!Number.isNaN(idx)) setActiveStageByIndex(idx);
  });
})();
