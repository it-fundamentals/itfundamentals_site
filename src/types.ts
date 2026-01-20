export type Language = 'en' | 'de' | 'fr';

export interface Stage {
  id: string;
  chip: string;
  title: string;
  items: string[];
  icons: string[];
  iconLabels: string[];
}

export interface LandingStep {
  title: string;
  body: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  blurb: string;
  items: string[];
}

export interface ComparisonRow {
  label: string;
  typical: string;
  with_itf: string;
}

export interface Dictionary {
  top_brand: string;
  top_title: string;
  top_tagline: string;

  menu_home: string;
  menu_portal: string;
  menu_about: string;
  menu_contact: string;
  menu_climb: string;

  landing_hero_title: string;
  landing_hero_body: string;
  landing_hero_points: string[];
  landing_primary_cta: string;
  landing_secondary_cta: string;

  landing_services_title: string;
  landing_services_body: string;
  landing_steps: LandingStep[];

  landing_included_title: string;
  landing_included_items: string[];

  landing_pricing_title: string;
  landing_plans: PricingPlan[];

  landing_comparison_title: string;
  landing_comparison_rows: ComparisonRow[];

  landing_climb_title: string;
  landing_climb_body: string;
  landing_climb_cta: string;

  page_portal_title: string;
  page_portal_body: string;
  page_about_title: string;
  page_about_body: string;
  page_contact_title: string;
  page_contact_body: string;

  stages: Record<string, Stage>;
}
