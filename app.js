/* IT Fundamentals site behaviour
   Reverse scroll to climb
   Stage highlighting
   Slide out cards
   Sky animation (day night, stars, shooting stars)
*/

(function () {
  const stages = [
    "basecamp",
    "discover",
    "transition",
    "secure",
    "clouds",
    "ready"
  ];

  const stageEls = stages
    .map((s) => document.querySelector(`[data-stage="${s}"]`))
    .filter(Boolean);

  const railItems = Array.from(document.querySelectorAll(".rail_item"));
  const basecampCard = document.querySelector(".basecamp_card");
  const climber = document.querySelector(".climber");
  const climberRail = document.querySelector(".rail_climber");

  // Start at the bottom so the mountain is the landing view
  function startAtBottom() {
    requestAnimationFrame(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  // Reverse scroll so wheel down moves up the page
  function enableReverseScroll() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    window.addEventListener(
      "wheel",
      (e) => {
        // allow pinch zoom and trackpad gestures
        if (e.ctrlKey) return;
        e.preventDefault();
        const delta = e.deltaY;
        window.scrollBy({ top: -delta, left: 0, behavior: "auto" });
      },
      { passive: false }
    );

    // Key controls, inverted
    window.addEventListener("keydown", (e) => {
      const key = e.key;
      const isInput =
        e.target &&
        (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable);
      if (isInput) return;

      const step = Math.max(260, Math.floor(window.innerHeight * 0.8));

      if (key === "ArrowDown" || key === "PageDown" || key === " ") {
        e.preventDefault();
        window.scrollBy({ top: -step, behavior: "smooth" });
      }
      if (key === "ArrowUp" || key === "PageUp") {
        e.preventDefault();
        window.scrollBy({ top: step, behavior: "smooth" });
      }
      if (key === "Home") {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
      if (key === "End") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  function setActiveStage(stageName) {
    railItems.forEach((a) => a.classList.toggle("is_active", a.dataset.stage === stageName));

    // Slide in card for current stage
    document.querySelectorAll(".stage").forEach((s) => s.classList.remove("is_active"));
    const stageSection = document.querySelector(`#stage-${stageName}`);
    if (stageSection) stageSection.classList.add("is_active");

    // Basecamp card visibility
    if (stageName === "basecamp") {
      basecampCard?.classList.add("is_visible");
    } else {
      basecampCard?.classList.remove("is_visible");
    }

    // Move climber along the rope, top is Ready, bottom is Base camp
    const idx = stages.indexOf(stageName);
    if (idx >= 0 && climber && climberRail) {
      const total = stages.length - 1;
      const t = idx / total; // basecamp 0, ready 1
      const railHeight = climberRail.clientHeight;
      const topPad = 6;
      const bottomPad = 34;
      const usable = Math.max(0, railHeight - topPad - bottomPad);
      const y = topPad + usable * (1 - t);
      climber.style.transform = `translateY(${y}px)`;
    }
  }

  function observeStages() {
    const options = {
      root: null,
      threshold: [0.35, 0.55, 0.7]
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const stageName = visible.target.getAttribute("data-stage");
      if (stageName) setActiveStage(stageName);
    }, options);

    document.querySelectorAll(".stage").forEach((s) => observer.observe(s));

    // Hero basecamp uses a nested structure, still treat it as active when in view
    const basecampStage = document.querySelector("#stage-basecamp");
    if (basecampStage) observer.observe(basecampStage);
  }

  function wireRailLinks() {
    railItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const stageName = item.dataset.stage;
        const el = document.querySelector(`#stage-${stageName}`);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  // Sky animation: blended day night gradient, stars, shooting stars
  function initSky() {
    const canvas = document.getElementById("skyCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = Math.floor(canvas.clientWidth * dpr);
      h = Math.floor(canvas.clientHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    // Stars
    const stars = [];
    const starCount = 140;

    function makeStars() {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random() * 0.6,
          r: 0.6 + Math.random() * 1.3,
          tw: Math.random() * 6,
          a: 0.2 + Math.random() * 0.7
        });
      }
    }

    // Shooting stars
    const shots = [];
    function spawnShot() {
      shots.push({
        x: Math.random() * 0.9 + 0.05,
        y: Math.random() * 0.35 + 0.05,
        vx: 0.012 + Math.random() * 0.01,
        vy: 0.006 + Math.random() * 0.008,
        life: 0,
        max: 60 + Math.floor(Math.random() * 40)
      });
      if (shots.length > 6) shots.shift();
    }

    let lastShot = 0;

    function drawGradient(t) {
      // t 0..1 day to night
      const dayTop = [90, 190, 255];
      const dayBottom = [210, 245, 255];
      const nightTop = [8, 10, 30];
      const nightBottom = [25, 40, 80];

      const lerp = (a, b, k) => a + (b - a) * k;
      const mix = (A, B, k) => [lerp(A[0], B[0], k), lerp(A[1], B[1], k), lerp(A[2], B[2], k)];

      const top = mix(dayTop, nightTop, t);
      const bot = mix(dayBottom, nightBottom, t);

      const g = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight);
      g.addColorStop(0, `rgb(${top[0] | 0},${top[1] | 0},${top[2] | 0})`);
      g.addColorStop(1, `rgb(${bot[0] | 0},${bot[1] | 0},${bot[2] | 0})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    }

    function drawStars(time, nightAmount) {
      if (nightAmount < 0.08) return;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (const s of stars) {
        const x = s.x * canvas.clientWidth;
        const y = s.y * canvas.clientHeight;
        const tw = 0.5 + 0.5 * Math.sin(time * 0.001 + s.tw);
        const alpha = s.a * (0.25 + 0.75 * tw) * nightAmount;

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawShootingStars(nightAmount) {
      if (nightAmount < 0.2) return;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (const sh of shots) {
        const x = sh.x * canvas.clientWidth;
        const y = sh.y * canvas.clientHeight;
        const tx = (sh.x - sh.vx * 22) * canvas.clientWidth;
        const ty = (sh.y - sh.vy * 22) * canvas.clientHeight;

        const a = Math.max(0, 1 - sh.life / sh.max) * nightAmount;
        ctx.strokeStyle = `rgba(255,255,255,${0.75 * a})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();

        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life += 1;
      }
      ctx.restore();

      for (let i = shots.length - 1; i >= 0; i--) {
        if (shots[i].life >= shots[i].max) shots.splice(i, 1);
      }
    }

    function tick(time) {
      // Cycle day night about every 18 seconds
      const cycle = (time % 18000) / 18000; // 0..1
      const wave = 0.5 + 0.5 * Math.sin(cycle * Math.PI * 2);
      const nightAmount = 1 - wave; // 0 day, 1 night

      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      drawGradient(nightAmount);

      drawStars(time, nightAmount);

      if (time - lastShot > 2200 + Math.random() * 1800) {
        lastShot = time;
        spawnShot();
      }
      drawShootingStars(nightAmount);

      requestAnimationFrame(tick);
    }

    resize();
    makeStars();

    window.addEventListener("resize", () => {
      resize();
      makeStars();
    });

    requestAnimationFrame(tick);
  }

  // Basecamp card should appear as soon as hero is mostly visible
  function observeBasecampCard() {
    const hero = document.querySelector("#stage-basecamp");
    if (!hero || !basecampCard) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) {
          basecampCard.classList.add("is_visible");
        } else {
          basecampCard.classList.remove("is_visible");
        }
      },
      { threshold: [0.55] }
    );

    obs.observe(hero);
  }

  function init() {
    startAtBottom();
    enableReverseScroll();
    wireRailLinks();
    observeStages();
    observeBasecampCard();
    initSky();

    // Default active state
    setActiveStage("basecamp");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
