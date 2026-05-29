export type ExhibitType =
  | 'project'
  | 'competition'
  | 'experience'
  | 'certificate'
  | 'activity';

export type ExhibitSection =
  | 'recent'
  | 'local'
  | 'ai'
  | 'creative'
  | 'award'
  | 'experience'
  | 'activity'
  | 'certificate';

export interface Exhibit {
  id: string;
  type: ExhibitType;
  section: ExhibitSection;
  title: string;
  subtitle: string;
  category: string;
  period: string;
  team?: string;
  role?: string;
  award?: string;
  stack?: string[];
  description: string;
  problem?: string;
  features?: string[];
  contribution?: string[];
  result?: string;
  iconType: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  articleUrl?: string;
  imageUrl?: string;
  // Optional English overrides — used when lang === 'en'
  titleEn?: string;
  subtitleEn?: string;
  descriptionEn?: string;
  problemEn?: string;
  featuresEn?: string[];
  contributionEn?: string[];
  resultEn?: string;
}

export interface MuseumSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  navLabel: string;
}
