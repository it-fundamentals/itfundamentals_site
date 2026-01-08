/* IT Fundamentals site behaviour
   Reverse scroll
   Stage highlighting
   Slide out cards
   Sky animation
   Mountain climb animation: climber moves along path based on scroll progress
*/

(function () {
  const stages = ["basecamp", "discover", "transition", "secure", "clouds", "ready"];

  const railItems = Array.from(document.querySelectorAll(".rail_item"));
  const basecampCard = document.querySelector(".basecamp_card");

  const path = document.getElementById("climbPath");
  const climberGroup = document.getElementById("climberOnPath");
  const pinsGroup = document.getElementById("pins");
  const pinEls = pinsGroup ? Array.from(pinsGroup.querySelectorAll(".pin")) : [];

  const stageSections = stages
    .map((s) => document.querySelector(`#stage-${s}`))
    .filter(Boolean);

  function startAtBottom() {
    requestAnimationFrame(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  function enableReverseScroll() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    window.addEventListener(
      "wheel",
      (e) => {
        if (e.ctrlKey) return;
        e.preventDefault();
        const delta = e.deltaY;
        window.scrollBy({ top: -delta, left: 0, behavior: "auto" });
      },
      { passive: false }
    );

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

    document.querySelectorAll(".stage").forEach((s) => s.classList.remove("is_active"));
    const stageSection = document.querySelector(`#stage-${stageName}`);
    if (stageSection) stageSection.classList.add("is_active");

    if (stageName === "basecamp") {
      basecampCard?.classList.add("is_visible");
    } else {
      basecampCard?.classList.remove("is_visible");
    }

    // Highlight pin
    if (pinEls.length) {
      pinEls.forEach((p) => p.classList.toggle("is_active", p.dataset.pin === stageName));
    }
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

  function observeStages() {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;

        const stageName = visible.target.getAttribute("data-stage");
        if (stageName) setActiveStage(stageName);
      },
      { threshold: [0.35, 0.55, 0.7] }
    );

    document.querySelectorAll(".stage").forEach((s) => observer.observe(s));
  }

  // Mountain climb mapping
  // We map overall progress from basecamp to ready based on scroll position.
  // Then move the climber along the SVG path using getPointAtLength.
  function initMountainPins() {
    if (!path || !pinEls.length) return;

    const total = path.getTotalLength();

    // fixed stage positions along the path, bottom to top
    const stageT = {
      basecamp: 0.05,
      discover: 0.25,
      transition: 0.45,
      secure: 0.63,
      clouds: 0.80,
      ready: 0.93
    };

    pinEls.forEach((pin) => {
      const name = pin.dataset.pin;
      const t = stageT[name] ?? 0.1;
      const pt = path.getPointAtLength(total * t);
      pin.setAttribute("cx", String(pt.x));
      pin.setAttribute("cy", String(pt.y));
    });
  }

  function clamp01(v) {
    return Math.max(0, Math.min(1, v));
  }

  function getOverallProgress() {
    // Progress based on the viewport centre moving through the stage sections
    const viewportMid = window.scrollY + window.innerHeight * 0.5;

    const points = stageSections.map((el) => {
      const top = el.offsetTop;
      const mid = top + el.offsetHeight * 0.5;
      return { el, mid };
    });

    // basecamp is last in DOM visually, but we started at bottom.
    // We want progress 0 at basecamp and 1 at ready.
    const byStage = stages.map((s) => points.find((p) => p.el.id === `stage-${s}`)).filter(Boolean);

    if (!byStage.length) return 0;

    const baseMid = byStage[0].mid;
    const readyMid = byStage[byStage.length - 1].mid;

    // As you climb, you go up the page, so scrollY decreases, viewportMid decreases.
    // We invert mapping so progress increases as you move upwards.
    const raw = (baseMid - viewportMid) / (baseMid - readyMid);
    return clamp01(raw);
  }

  function updateClimber() {
    if (!path || !climberGroup) return;

    const total = path.getTotalLength();
    const progress = getOverallProgress();

    const pt = path.getPointAtLength(total * (0.06 + 0.88 * progress));
    climberGroup.setAttribute("transform", `translate(${pt.x} ${pt.y})`);

    // Optional: subtle scale as you climb, gives sense of height
    const scale = 1 + progress * 0.14;
    climberGroup.setAttribute("transform", `translate(${pt.x} ${pt.y}) scale(${scale})`);

    // Make cards feel closer as you climb by toggling is_active based on proximity
    // IntersectionObserver already handles stage activation, so just keep climber updated.
  }

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
      const cycle = (time % 18000) / 18000;
      const wave = 0.5 + 0.5 * Math.sin(cycle * Math.PI * 2);
      const nightAmount = 1 - wave;

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

  function rafLoop() {
    updateClimber();
    requestAnimationFrame(rafLoop);
  }

  function init() {
    startAtBottom();
    enableReverseScroll();
    wireRailLinks();
    observeStages();
    observeBasecampCard();
    initSky();
    initMountainPins();

    setActiveStage("basecamp");
    requestAnimationFrame(rafLoop);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
