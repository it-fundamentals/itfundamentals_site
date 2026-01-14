export type Language = 'en' | 'de' | 'fr';

export interface Stage {
  id: string;
  chip: string;
  title: string;
  items: string[];
  icons: string[];
  iconLabels: string[];
}

export interface Dictionary {
  top_brand: string;
  top_title: string;
  top_tagline: string;
  menu_portal: string;
  menu_about: string;
  menu_contact: string;
  menu_climb: string;
  page_portal_title: string;
  page_portal_body: string;
  page_about_title: string;
  page_about_body: string;
  page_contact_title: string;
  page_contact_body: string;
  stages: Record<string, Stage>;
}
