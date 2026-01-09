(function () {
  // ----------------------------
  // Language toggle and translations
  // ----------------------------
  const I18N = {
    en: {
      top_brand: "ITFUNDAMENTALS.CH",
      top_title: "The climb",
      top_tagline: "Secure cloud foundations for micro and small business",
      nav_basecamp: "Base camp",
      nav_discover: "Discover",
      nav_transition: "Transition",
      nav_secure: "Secure",
      nav_above: "Above the clouds",
      nav_ready: "Ready",
      hint_title: "Scroll down to climb up",
      hint_sub: "Or click a stage",

      chip_basecamp: "BASE CAMP",
      h_basecamp: "Stabilise what you already use",
      b_basecamp_1: "Reduce scattered tools and ad hoc setups",
      b_basecamp_2: "Establish a clear security baseline",
      b_basecamp_3: "Set up backup and monitoring foundations",
      b_basecamp_4: "Remove avoidable risk and unplanned spend",

      chip_discover: "DISCOVER",
      h_discover: "Understand the current state",
      b_discover_1: "Short review of tools, risks, and priorities",
      b_discover_2: "Confirm users, devices, domain, and scope",
      b_discover_3: "Agree the simplest path forward",

      chip_transition: "TRANSITION",
      h_transition: "Move into Microsoft 365 cleanly",
      b_transition_1: "Migrate email, calendars, and files",
      b_transition_2: "Set up Teams, SharePoint, OneDrive",
      b_transition_3: "Minimal disruption, clean cutover",

      chip_secure: "SECURE",
      h_secure: "Security by default",
      b_secure_1: "MFA enforced for all users",
      b_secure_2: "Baseline policies applied",
      b_secure_3: "Safer sharing and permissions",

      chip_above: "ABOVE THE CLOUDS",
      h_above: "Managed, monitored, backed up",
      b_above_1: "Backup for Microsoft 365 data with tested recovery",
      b_above_2: "Monitoring and alerting for issues that matter",
      b_above_3: "Onboarding and offboarding done properly",
      b_above_4: "Predictable cost and calmer day to day operations",

      chip_ready: "READY",
      h_ready: "AI and automation, when you choose",
      b_ready_1: "Centralised data and clean permissions",
      b_ready_2: "Auditable access and safer sharing",
      b_ready_3: "AI as a value add, not a risk",

      menu_portal: "Client Portal",
      menu_about: "About us",
      menu_contact: "Contact us",

      page_portal_title: "Client Portal",
      page_portal_body:
        "This page is reserved for the client portal. It will host secure access to support requests, service updates, and shared documentation.",

      page_about_title: "About us",
      page_about_body:
        "We help micro and small businesses build a stable, secure Microsoft 365 foundation. The focus is practical delivery, predictable outcomes, and a clean path to modern security and automation.",

      page_contact_title: "Contact us",
      page_contact_body:
        "If you would like to talk through your current setup and what a safe baseline looks like, reach out and we will respond with next steps.",
    },

    de: {
      top_brand: "ITFUNDAMENTALS.CH",
      top_title: "Der Aufstieg",
      top_tagline: "Sichere Cloud Grundlagen für Klein und Kleinstunternehmen",
      nav_basecamp: "Basislager",
      nav_discover: "Entdecken",
      nav_transition: "Umstieg",
      nav_secure: "Absichern",
      nav_above: "Über den Wolken",
      nav_ready: "Bereit",
      hint_title: "Scrolle nach unten, um aufzusteigen",
      hint_sub: "Oder wähle eine Etappe",

      chip_basecamp: "BASISLAGER",
      h_basecamp: "Stabilisiere, was du bereits nutzt",
      b_basecamp_1: "Verstreute Tools und spontane Setups reduzieren",
      b_basecamp_2: "Eine klare Sicherheitsbasis definieren",
      b_basecamp_3: "Backup und Monitoring als Grundlage aufbauen",
      b_basecamp_4: "Vermeidbare Risiken und ungeplante Kosten reduzieren",

      chip_discover: "ENTDECKEN",
      h_discover: "Den Ist Zustand verstehen",
      b_discover_1: "Kurzer Review von Tools, Risiken und Prioritäten",
      b_discover_2: "Benutzer, Geräte, Domain und Umfang bestätigen",
      b_discover_3: "Den einfachsten Weg nach vorn festlegen",

      chip_transition: "UMSTIEG",
      h_transition: "Sauber in Microsoft 365 wechseln",
      b_transition_1: "E Mail, Kalender und Dateien migrieren",
      b_transition_2: "Teams, SharePoint und OneDrive einrichten",
      b_transition_3: "Minimale Unterbrechung, sauberer Cutover",

      chip_secure: "ABSICHERN",
      h_secure: "Sicherheit als Standard",
      b_secure_1: "MFA für alle Benutzer erzwingen",
      b_secure_2: "Baseline Richtlinien anwenden",
      b_secure_3: "Sicheres Teilen und Berechtigungen",

      chip_above: "ÜBER DEN WOLKEN",
      h_above: "Managed, überwacht, gesichert",
      b_above_1: "Backup für Microsoft 365 Daten mit getesteter Wiederherstellung",
      b_above_2: "Monitoring und Alarmierung für relevante Themen",
      b_above_3: "Onboarding und Offboarding sauber umsetzen",
      b_above_4: "Planbare Kosten und ruhigere Abläufe im Alltag",

      chip_ready: "BEREIT",
      h_ready: "KI und Automatisierung, wenn es passt",
      b_ready_1: "Zentralisierte Daten und saubere Berechtigungen",
      b_ready_2: "Nachvollziehbarer Zugriff und sichereres Teilen",
      b_ready_3: "KI als Mehrwert, nicht als Risiko",

      menu_portal: "Kundenportal",
      menu_about: "Über uns",
      menu_contact: "Kontakt",

      page_portal_title: "Kundenportal",
      page_portal_body:
        "Diese Seite ist für das Kundenportal reserviert. Sie wird sicheren Zugriff auf Support Anfragen, Service Updates und geteilte Dokumentation bieten.",

      page_about_title: "Über uns",
      page_about_body:
        "Wir helfen Klein und Kleinstunternehmen, eine stabile und sichere Microsoft 365 Grundlage aufzubauen. Der Fokus liegt auf pragmatischer Umsetzung, planbaren Ergebnissen und einem sauberen Weg zu moderner Sicherheit und Automatisierung.",

      page_contact_title: "Kontakt",
      page_contact_body:
        "Wenn du deine aktuelle Umgebung besprechen möchtest und wissen willst, wie eine sichere Basis aussieht, melde dich. Wir antworten mit konkreten nächsten Schritten.",
    },

    fr: {
      top_brand: "ITFUNDAMENTALS.CH",
      top_title: "L’ascension",
      top_tagline: "Fondations cloud sécurisées pour les micro et petites entreprises",
      nav_basecamp: "Camp de base",
      nav_discover: "Découvrir",
      nav_transition: "Transition",
      nav_secure: "Sécuriser",
      nav_above: "Au dessus des nuages",
      nav_ready: "Prêt",
      hint_title: "Faites défiler vers le bas pour monter",
      hint_sub: "Ou sélectionnez une étape",

      chip_basecamp: "CAMP DE BASE",
      h_basecamp: "Stabiliser ce que vous utilisez déjà",
      b_basecamp_1: "Réduire les outils dispersés et les configurations improvisées",
      b_basecamp_2: "Définir une base de sécurité claire",
      b_basecamp_3: "Mettre en place sauvegarde et supervision",
      b_basecamp_4: "Réduire les risques évitables et les coûts imprévus",

      chip_discover: "DÉCOUVRIR",
      h_discover: "Comprendre l’état actuel",
      b_discover_1: "Revue rapide des outils, risques et priorités",
      b_discover_2: "Confirmer utilisateurs, appareils, domaine et périmètre",
      b_discover_3: "Valider le chemin le plus simple",

      chip_transition: "TRANSITION",
      h_transition: "Passer à Microsoft 365 proprement",
      b_transition_1: "Migrer e mail, calendriers et fichiers",
      b_transition_2: "Configurer Teams, SharePoint, OneDrive",
      b_transition_3: "Peu d’impact, bascule propre",

      chip_secure: "SÉCURISER",
      h_secure: "La sécurité par défaut",
      b_secure_1: "MFA imposé pour tous les utilisateurs",
      b_secure_2: "Politiques de base appliquées",
      b_secure_3: "Partage et permissions plus sûrs",

      chip_above: "AU DESSUS DES NUAGES",
      h_above: "Géré, surveillé, sauvegardé",
      b_above_1: "Sauvegarde Microsoft 365 avec restauration testée",
      b_above_2: "Supervision et alertes sur l’essentiel",
      b_above_3: "Onboarding et offboarding réalisés correctement",
      b_above_4: "Coûts prévisibles et opérations plus calmes au quotidien",

      chip_ready: "PRÊT",
      h_ready: "IA et automatisation, quand vous le souhaitez",
      b_ready_1: "Données centralisées et permissions propres",
      b_ready_2: "Accès traçable et partage plus sûr",
      b_ready_3: "L’IA comme valeur ajoutée, pas comme risque",

      menu_portal: "Portail client",
      menu_about: "À propos",
      menu_contact: "Contact",

      page_portal_title: "Portail client",
      page_portal_body:
        "Cette page est réservée au portail client. Elle proposera un accès sécurisé aux demandes de support, aux mises à jour de service et à la documentation partagée.",

      page_about_title: "À propos",
      page_about_body:
        "Nous aidons les micro et petites entreprises à construire une base Microsoft 365 stable et sécurisée. L’objectif est une mise en place pragmatique, des résultats prévisibles et un chemin clair vers la sécurité moderne et l’automatisation.",

      page_contact_title: "Contact",
      page_contact_body:
        "Si vous souhaitez discuter de votre situation actuelle et définir une base sécurisée, contactez nous. Nous répondrons avec les prochaines étapes.",
    },
  };

  function getLang() {
    const saved = localStorage.getItem("itf_lang");
    if (saved && I18N[saved]) return saved;
    return "en";
  }

  function setLang(lang) {
    if (!I18N[lang]) return;
    localStorage.setItem("itf_lang", lang);
    applyLang(lang);
  }

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.en;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      if (dict[key] == null) return;
      el.textContent = String(dict[key]);
    });

    document.querySelectorAll(".langBtn").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
    });

    document.documentElement.setAttribute("lang", lang);
  }

  function initLanguageUI() {
    const buttons = Array.from(document.querySelectorAll(".langBtn"));
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        if (!lang) return;
        setLang(lang);
      });
    });

    applyLang(getLang());
  }

  initLanguageUI();

  // ----------------------------
  // The climb behaviour (index page only)
  // ----------------------------
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

  // If this is not the climb page, stop here (language still works above)
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

  function scrollToStage(id, behavior) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: behavior || "smooth", block: "center" });
  }

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-goto");
      if (!target) return;
      scrollToStage(target, "smooth");
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
    const len = total * progress01;
    const pt = climbPath.getPointAtLength(len);

    climber.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
  }

  // Gradual overlay fade while climbing (continuous)
  function updateOverlay(progress01) {
    if (!overlay) return;

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

  // Initial state, force Base camp selected on load
  setActive(0);
  cards.forEach((c, i) => {
    if (i === 0) c.classList.add("is-visible");
  });

  function initRoute() {
    buildMiles();
    onScroll();
    requestAnimationFrame(() => onScroll());
  }

  window.addEventListener("load", () => {
    // Force the page to land on Base camp every time
    setActive(0);
    scrollToStage("stage-basecamp", "auto");
    initRoute();
  });

  window.addEventListener("resize", () => {
    buildMiles();
    onScroll();
  });
})();
