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
    menu_portal: 'Client Portal',
    menu_about: 'About us',
    menu_contact: 'Contact us',
    menu_climb: 'The climb',
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
    menu_portal: 'Kundenportal',
    menu_about: 'Über uns',
    menu_contact: 'Kontakt',
    menu_climb: 'Der Aufstieg',
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
    menu_portal: 'Portail client',
    menu_about: 'À propos',
    menu_contact: 'Contact',
    menu_climb: 'L’ascension',
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
