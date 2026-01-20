import { Language, Dictionary } from './types';

export const LANGUAGES: { code: Language; flag: string; name: string }[] = [
  { code: 'en', flag: '🇬🇧', name: 'EN' },
  { code: 'de', flag: '🇨🇭', name: 'DE' },
  { code: 'fr', flag: '🇫🇷', name: 'FR' }
];

export const I18N: Record<Language, Dictionary> = {
  en: {
    top_brand: 'ITFUNDAMENTALS.CH',
    top_title: 'The climb',
    top_tagline: 'Secure cloud foundations for micro and small business',

    menu_home: 'Home',
    menu_portal: 'Client Portal',
    menu_about: 'About us',
    menu_contact: 'Contact us',
    menu_climb: 'The climb',

    landing_hero_title: 'Secure Microsoft 365, delivered properly',
    landing_hero_body:
      'We help micro and small business move into a stable, secure Microsoft 365 baseline. Clear scope, tidy delivery, and ongoing care that keeps things calm.',
    landing_hero_points: [
      'Security baseline and identity controls',
      'Email and file migration with minimal disruption',
      'Backup, monitoring, and sensible support'
    ],
    landing_primary_cta: 'Book a call',
    landing_secondary_cta: 'View services',

    landing_services_title: 'A practical approach that works',
    landing_services_body:
      'No drama, no random tooling, no messy handover. We focus on the foundations that reduce risk and support day to day operations.',
    landing_steps: [
      { title: 'Discover', body: 'Quick review of users, devices, licensing, risks, and what needs to change.' },
      { title: 'Stabilise', body: 'A clean baseline for identity, device standards, and core security settings.' },
      { title: 'Transition', body: 'Mail, files, Teams, and collaboration moved cleanly with minimal disruption.' },
      { title: 'Operate', body: 'Monitoring, backup, onboarding, and support that stays consistent.' }
    ],

    landing_included_title: 'Included in your baseline',
    landing_included_items: [
      'MFA and conditional access baseline',
      'Device standards and enrolment pathway',
      'SharePoint and OneDrive structure and permissions',
      'Backup with tested restore process',
      'Monitoring and alerting for the things that matter',
      'Simple documentation that your business can keep'
    ],

    landing_pricing_title: 'Simple packages',
    landing_plans: [
      {
        name: 'Baseline',
        price: 'Fixed scope',
        blurb: 'Set the foundation properly. Ideal if your environment is small but messy.',
        items: ['Security baseline', 'Identity controls', 'Backup and monitoring setup', 'Runbook and handover']
      },
      {
        name: 'Transition',
        price: 'Project based',
        blurb: 'Move into Microsoft 365 cleanly with a plan, a cutover, and support.',
        items: ['Email migration', 'File migration', 'Teams and SharePoint setup', 'User comms and cutover support']
      },
      {
        name: 'Managed',
        price: 'Monthly',
        blurb: 'Ongoing care, fixes, and improvements without chasing random contractors.',
        items: ['Monitoring and response', 'User changes', 'Security maintenance', 'Backup oversight and recovery']
      }
    ],

    landing_comparison_title: 'What changes after the reset',
    landing_comparison_rows: [
      { label: 'Security', typical: 'MFA optional, settings vary by user', with_itf: 'Baseline enforced, policies consistent' },
      { label: 'Files', typical: 'Messy shares, unclear ownership', with_itf: 'Structured sites, controlled sharing' },
      { label: 'Support', typical: 'Ad hoc fixes and slow follow up', with_itf: 'Clear scope, predictable response' },
      { label: 'Recovery', typical: 'Hope and guesswork', with_itf: 'Backups with tested restore' }
    ],

    landing_climb_title: 'The climb preview',
    landing_climb_body:
      'This is the same interactive concept you already built, now placed inside its own section. Scroll inside the panel to move up the climb.',
    landing_climb_cta: 'Open the full climb',

    page_portal_title: 'Client Portal',
    page_portal_body:
      'This page is reserved for the client portal. It will host secure access to support requests, service updates, and shared documentation.',
    page_about_title: 'About us',
    page_about_body:
      'We help micro and small businesses build a stable, secure Microsoft 365 foundation. The focus is practical delivery, predictable outcomes, and a clean path to modern security and automation.',
    page_contact_title: 'Contact us',
    page_contact_body:
      'If you would like to talk through your current setup and what a safe baseline looks like, reach out and we will respond with next steps.',

    stages: {
      'stage-basecamp': {
        id: 'stage-basecamp',
        chip: 'BASE CAMP',
        title: 'Stabilise what you already use',
        items: [
          'Reduce scattered tools and ad hoc setups',
          'Establish a clear security baseline',
          'Set up backup and monitoring foundations',
          'Remove avoidable risk and unplanned spend'
        ],
        icons: ['🧭', '🛠️', '🫧'],
        iconLabels: ['Baseline', 'Support', 'Health']
      },
      'stage-discover': {
        id: 'stage-discover',
        chip: 'DISCOVER',
        title: 'Understand the current state',
        items: [
          'Short review of tools, risks, and priorities',
          'Confirm users, devices, domain, and scope',
          'Agree the simplest path forward'
        ],
        icons: ['🗂️', '⚠️', '🧠'],
        iconLabels: ['Inventory', 'Risk', 'Plan']
      },
      'stage-transition': {
        id: 'stage-transition',
        chip: 'TRANSITION',
        title: 'Move into Microsoft 365 cleanly',
        items: [
          'Migrate email, calendars, and files',
          'Set up Teams, SharePoint, OneDrive',
          'Minimal disruption, clean cutover'
        ],
        icons: ['✉️', '📁', '👥'],
        iconLabels: ['Mail', 'Files', 'Teams']
      },
      'stage-secure': {
        id: 'stage-secure',
        chip: 'SECURE',
        title: 'Security by default',
        items: ['MFA enforced for all users', 'Baseline policies applied', 'Safer sharing and permissions'],
        icons: ['🔐', '📜', '🧷'],
        iconLabels: ['MFA', 'Policy', 'Access']
      },
      'stage-above': {
        id: 'stage-above',
        chip: 'ABOVE THE CLOUDS',
        title: 'Managed, monitored, backed up',
        items: [
          'Backup for Microsoft 365 data with tested recovery',
          'Monitoring and alerting for issues that matter',
          'Onboarding and offboarding done properly',
          'Predictable cost and calmer day to day operations'
        ],
        icons: ['💾', '📡', '🧰'],
        iconLabels: ['Backup', 'Monitoring', 'Operations']
      },
      'stage-ready': {
        id: 'stage-ready',
        chip: 'READY',
        title: 'AI and automation, when you choose',
        items: ['Centralised data and clean permissions', 'Auditable access and safer sharing', 'AI as a value add, not a risk'],
        icons: ['⚙️', '✨', '🧊'],
        iconLabels: ['Automation', 'Insights', 'Modern']
      }
    }
  },

  de: {
    top_brand: 'ITFUNDAMENTALS.CH',
    top_title: 'Der Aufstieg',
    top_tagline: 'Sichere Cloud Grundlagen für Klein- und Kleinstunternehmen',

    menu_home: 'Home',
    menu_portal: 'Kundenportal',
    menu_about: 'Über uns',
    menu_contact: 'Kontakt',
    menu_climb: 'Der Aufstieg',

    landing_hero_title: 'Sicheres Microsoft 365, sauber umgesetzt',
    landing_hero_body:
      'Wir helfen Klein und Kleinstunternehmen, eine stabile und sichere Microsoft 365 Basis aufzubauen. Klare Aufgaben, saubere Umsetzung und laufende Betreuung.',
    landing_hero_points: [
      'Security Baseline und Identity Controls',
      'E Mail und File Migration mit minimaler Unterbrechung',
      'Backup, Monitoring und pragmatischer Support'
    ],
    landing_primary_cta: 'Call buchen',
    landing_secondary_cta: 'Services ansehen',

    landing_services_title: 'Ein pragmatischer Ansatz',
    landing_services_body:
      'Kein Chaos, keine Zufallstools, keine unklare Übergabe. Fokus auf Grundlagen, die Risiko reduzieren und den Betrieb vereinfachen.',
    landing_steps: [
      { title: 'Entdecken', body: 'Kurzer Review von Users, Devices, Licensing, Risiken und Prioritäten.' },
      { title: 'Stabilisieren', body: 'Saubere Baseline für Identity, Geräte Standards und Security Settings.' },
      { title: 'Umsteigen', body: 'Mail, Files, Teams und Collaboration strukturiert migrieren.' },
      { title: 'Betreiben', body: 'Monitoring, Backup, Onboarding und Support mit klarer Linie.' }
    ],

    landing_included_title: 'In der Baseline enthalten',
    landing_included_items: [
      'MFA und Conditional Access Baseline',
      'Device Standards und Enrollment Weg',
      'SharePoint und OneDrive Struktur und Berechtigungen',
      'Backup mit getestetem Restore Prozess',
      'Monitoring und Alerting für relevante Themen',
      'Kurze Dokumentation, die man behalten kann'
    ],

    landing_pricing_title: 'Einfache Pakete',
    landing_plans: [
      {
        name: 'Baseline',
        price: 'Fixer Umfang',
        blurb: 'Foundation sauber setzen. Ideal wenn es klein ist, aber unruhig.',
        items: ['Security Baseline', 'Identity Controls', 'Backup und Monitoring Setup', 'Runbook und Handover']
      },
      {
        name: 'Umstieg',
        price: 'Projekt',
        blurb: 'Sauber in Microsoft 365 wechseln, mit Plan und Cutover.',
        items: ['E Mail Migration', 'File Migration', 'Teams und SharePoint Setup', 'Kommunikation und Cutover Support']
      },
      {
        name: 'Managed',
        price: 'Monatlich',
        blurb: 'Laufende Betreuung ohne ständig neue Anbieter.',
        items: ['Monitoring und Reaktion', 'User Changes', 'Security Maintenance', 'Backup Oversight und Recovery']
      }
    ],

    landing_comparison_title: 'Was sich nach dem Reset verändert',
    landing_comparison_rows: [
      { label: 'Security', typical: 'MFA optional, Settings inkonsistent', with_itf: 'Baseline enforced, Policies konsistent' },
      { label: 'Files', typical: 'Unklare Shares, kein Owner', with_itf: 'Strukturierte Sites, kontrolliertes Sharing' },
      { label: 'Support', typical: 'Ad hoc Fixes, langsame Follow ups', with_itf: 'Klarer Scope, planbare Reaktion' },
      { label: 'Recovery', typical: 'Hoffnung und Bauchgefühl', with_itf: 'Backups mit getesteter Wiederherstellung' }
    ],

    landing_climb_title: 'Der Aufstieg Vorschau',
    landing_climb_body:
      'Das gleiche interaktive Konzept wie bisher, jetzt als eigener Bereich auf der Landing Page. Im Panel scrollen, um nach oben zu gehen.',
    landing_climb_cta: 'Vollen Aufstieg öffnen',

    page_portal_title: 'Kundenportal',
    page_portal_body:
      'Diese Seite ist für das Kundenportal reserviert. Sie wird sicheren Zugriff auf Support Anfragen, Service Updates und geteilte Dokumentation bieten.',
    page_about_title: 'Über uns',
    page_about_body:
      'Wir helfen Klein und Kleinstunternehmen, eine stabile und sichere Microsoft 365 Grundlage aufzubauen. Der Fokus liegt auf pragmatischer Umsetzung, planbaren Ergebnissen und einem sauberen Weg zu moderner Sicherheit und Automatisierung.',
    page_contact_title: 'Kontakt',
    page_contact_body:
      'Wenn du deine aktuelle Umgebung besprechen möchtest und wissen willst, wie eine sichere Basis aussieht, melde dich. Wir antworten mit konkreten nächsten Schritten.',

    stages: {
      'stage-basecamp': {
        id: 'stage-basecamp',
        chip: 'BASISLAGER',
        title: 'Stabilisiere, was du bereits nutzt',
        items: [
          'Verstreute Tools und spontane Setups reduzieren',
          'Eine klare Sicherheitsbasis definieren',
          'Backup und Monitoring als Grundlage aufbauen',
          'Vermeidbare Risiken und ungeplante Kosten reduzieren'
        ],
        icons: ['🧭', '🛠️', '🫧'],
        iconLabels: ['Basis', 'Support', 'Zustand']
      },
      'stage-discover': {
        id: 'stage-discover',
        chip: 'ENTDECKEN',
        title: 'Den Ist Zustand verstehen',
        items: [
          'Kurzer Review von Tools, Risiken und Prioritäten',
          'Benutzer, Geräte, Domain und Umfang bestätigen',
          'Den einfachsten Weg nach vorn festlegen'
        ],
        icons: ['🗂️', '⚠️', '🧠'],
        iconLabels: ['Inventar', 'Risiko', 'Plan']
      },
      'stage-transition': {
        id: 'stage-transition',
        chip: 'UMSTIEG',
        title: 'Sauber in Microsoft 365 wechseln',
        items: ['E Mail, Kalender und Dateien migrieren', 'Teams, SharePoint und OneDrive einrichten', 'Minimale Unterbrechung, sauberer Cutover'],
        icons: ['✉️', '📁', '👥'],
        iconLabels: ['Mail', 'Dateien', 'Teams']
      },
      'stage-secure': {
        id: 'stage-secure',
        chip: 'ABSICHERN',
        title: 'Sicherheit als Standard',
        items: ['MFA für alle Benutzer erzwingen', 'Baseline Richtlinien anwenden', 'Sicheres Teilen und Berechtigungen'],
        icons: ['🔐', '📜', '🧷'],
        iconLabels: ['MFA', 'Richtlinie', 'Zugriff']
      },
      'stage-above': {
        id: 'stage-above',
        chip: 'ÜBER DEN WOLKEN',
        title: 'Managed, überwacht, gesichert',
        items: [
          'Backup für Microsoft 365 Daten mit getesteter Wiederherstellung',
          'Monitoring und Alarmierung für relevante Themen',
          'Onboarding und Offboarding sauber umsetzen',
          'Planbare Kosten und ruhigere Abläufe im Alltag'
        ],
        icons: ['💾', '📡', '🧰'],
        iconLabels: ['Backup', 'Überwachung', 'Betrieb']
      },
      'stage-ready': {
        id: 'stage-ready',
        chip: 'BEREIT',
        title: 'KI und Automatisierung, wenn es passt',
        items: ['Zentralisierte Daten und saubere Berechtigungen', 'Nachvollziehbarer Zugriff und sichereres Teilen', 'KI als Mehrwert, nicht als Risiko'],
        icons: ['⚙️', '✨', '🧊'],
        iconLabels: ['Automation', 'Einblicke', 'Modern']
      }
    }
  },

  fr: {
    top_brand: 'ITFUNDAMENTALS.CH',
    top_title: 'L’ascension',
    top_tagline: 'Fondations cloud sécurisées pour les micro et petites entreprises',

    menu_home: 'Accueil',
    menu_portal: 'Portail client',
    menu_about: 'À propos',
    menu_contact: 'Contact',
    menu_climb: 'L’ascension',

    landing_hero_title: 'Microsoft 365 sécurisé, livré correctement',
    landing_hero_body:
      'Nous aidons les micro et petites entreprises à obtenir une base Microsoft 365 stable et sécurisée. Périmètre clair, mise en place propre, et un suivi régulier.',
    landing_hero_points: [
      'Base de sécurité et contrôles d’identité',
      'Migration email et fichiers avec peu d’impact',
      'Sauvegarde, supervision et support pragmatique'
    ],
    landing_primary_cta: 'Planifier un appel',
    landing_secondary_cta: 'Voir les services',

    landing_services_title: 'Une approche pragmatique',
    landing_services_body:
      'Pas de bricolage, pas d’outils aléatoires, pas de passation confuse. Nous posons les bases qui réduisent le risque et simplifient l’exploitation.',
    landing_steps: [
      { title: 'Découvrir', body: 'Revue rapide des utilisateurs, appareils, licences, risques et priorités.' },
      { title: 'Stabiliser', body: 'Base propre pour identité, standards appareils et paramètres de sécurité.' },
      { title: 'Transition', body: 'Migration mail, fichiers, Teams et collaboration de façon structurée.' },
      { title: 'Exploiter', body: 'Supervision, sauvegarde, onboarding et support cohérents.' }
    ],

    landing_included_title: 'Inclus dans la base',
    landing_included_items: [
      'MFA et base Conditional Access',
      'Standards appareils et chemin d’enrôlement',
      'Structure SharePoint et OneDrive et permissions',
      'Sauvegarde avec restauration testée',
      'Supervision et alertes sur l’essentiel',
      'Documentation simple et durable'
    ],

    landing_pricing_title: 'Forfaits simples',
    landing_plans: [
      {
        name: 'Base',
        price: 'Périmètre fixe',
        blurb: 'Mettre en place les fondations. Idéal si c’est petit mais instable.',
        items: ['Base de sécurité', 'Contrôles identité', 'Sauvegarde et supervision', 'Runbook et passation']
      },
      {
        name: 'Transition',
        price: 'Projet',
        blurb: 'Passer à Microsoft 365 proprement, avec plan et bascule.',
        items: ['Migration email', 'Migration fichiers', 'Mise en place Teams et SharePoint', 'Support de bascule']
      },
      {
        name: 'Géré',
        price: 'Mensuel',
        blurb: 'Suivi continu sans changer de prestataire tout le temps.',
        items: ['Supervision et réponse', 'Changements utilisateurs', 'Maintenance sécurité', 'Suivi sauvegarde et recovery']
      }
    ],

    landing_comparison_title: 'Après la remise à plat',
    landing_comparison_rows: [
      { label: 'Sécurité', typical: 'MFA optionnel, paramètres variables', with_itf: 'Base appliquée, politiques cohérentes' },
      { label: 'Fichiers', typical: 'Partages confus, propriété floue', with_itf: 'Sites structurés, partage contrôlé' },
      { label: 'Support', typical: 'Correctifs au hasard, suivi lent', with_itf: 'Périmètre clair, réponse prévisible' },
      { label: 'Restauration', typical: 'Espoir et improvisation', with_itf: 'Sauvegardes et restauration testée' }
    ],

    landing_climb_title: 'Aperçu de l’ascension',
    landing_climb_body:
      'Le même concept interactif que vous aviez déjà, maintenant dans sa propre section. Faites défiler dans le panneau pour monter.',
    landing_climb_cta: 'Ouvrir l’ascension complète',

    page_portal_title: 'Portail client',
    page_portal_body:
      'Cette page est réservée au portail client. Elle proposera un accès sécurisé aux demandes de support, aux mises à jour de service et à la documentation partagée.',
    page_about_title: 'À propos',
    page_about_body:
      'Nous aidons les micro et petites entreprises à construire une base Microsoft 365 stable et sécurisée. L’objectif est une mise en place pragmatique, des résultats prévisibles et un chemin clair vers la sécurité moderne et l’automatisation.',
    page_contact_title: 'Contact',
    page_contact_body:
      'Si vous souhaitez discuter de votre situation actuelle et définir une base sécurisée, contactez nous. Nous répondrons avec les prochaines étapes.',

    stages: {
      'stage-basecamp': {
        id: 'stage-basecamp',
        chip: 'CAMP DE BASE',
        title: 'Stabiliser ce que vous utilisez déjà',
        items: [
          'Réduire les outils dispersés et les configurations improvisées',
          'Définir une base de sécurité claire',
          'Mettre en place sauvegarde et supervision',
          'Réduire les risques évitables et les coûts imprévus'
        ],
        icons: ['🧭', '🛠️', '🫧'],
        iconLabels: ['Base', 'Support', 'Santé']
      },
      'stage-discover': {
        id: 'stage-discover',
        chip: 'DÉCOUVRIR',
        title: 'Comprendre l’état actuel',
        items: ['Revue rapide des outils, risques et priorités', 'Confirmer utilisateurs, appareils, domaine et périmètre', 'Valider le chemin le plus simple'],
        icons: ['🗂️', '⚠️', '🧠'],
        iconLabels: ['Inventaire', 'Risque', 'Plan']
      },
      'stage-transition': {
        id: 'stage-transition',
        chip: 'TRANSITION',
        title: 'Passer à Microsoft 365 proprement',
        items: ['Migrer e mail, calendriers et fichiers', 'Configurer Teams, SharePoint, OneDrive', 'Peu d’impact, bascule propre'],
        icons: ['✉️', '📁', '👥'],
        iconLabels: ['Mail', 'Fichiers', 'Teams']
      },
      'stage-secure': {
        id: 'stage-secure',
        chip: 'SÉCURISER',
        title: 'La sécurité par défaut',
        items: ['MFA imposé pour tous les utilisateurs', 'Politiques de base appliquées', 'Partage et permissions plus sûrs'],
        icons: ['🔐', '📜', '🧷'],
        iconLabels: ['MFA', 'Politique', 'Accès']
      },
      'stage-above': {
        id: 'stage-above',
        chip: 'AU DESSUS DES NUAGES',
        title: 'Géré, surveillé, sauvegardé',
        items: [
          'Sauvegarde Microsoft 365 avec restauration testée',
          'Supervision et alertes sur l’essentiel',
          'Onboarding et offboarding réalisés correctement',
          'Coûts prévisibles et opérations plus calmes au quotidien'
        ],
        icons: ['💾', '📡', '🧰'],
        iconLabels: ['Backup', 'Supervision', 'Opérations']
      },
      'stage-ready': {
        id: 'stage-ready',
        chip: 'PRÊT',
        title: 'IA et automatisation, quand vous le souhaitez',
        items: ['Données centralisées et permissions propres', 'Accès traçable et partage plus sûr', 'L’IA comme valeur ajoutée, pas comme risque'],
        icons: ['⚙️', '✨', '🧊'],
        iconLabels: ['Automation', 'Insights', 'Moderne']
      }
    }
  }
};
