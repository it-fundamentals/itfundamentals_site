(function () {
  const scroller = document.querySelector(".scroll_inner");
  const climber = document.getElementById("climber");

  if (!scroller || !climber) return;

  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  function updateClimber() {
    const maxScroll = scroller.scrollHeight - scroller.clientHeight;
    const p = maxScroll > 0 ? scroller.scrollTop / maxScroll : 0;

    // Rope travel range, from lower anchor zone to upper anchor zone
    const topPct = 6;
    const bottomPct = 86;

    const pct = bottomPct - (bottomPct - topPct) * clamp(p, 0, 1);
    climber.style.top = pct + "%";
  }

  scroller.addEventListener("scroll", updateClimber, { passive: true });
  window.addEventListener("resize", updateClimber);

  updateClimber();
})();
