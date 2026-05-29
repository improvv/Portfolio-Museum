import type { ExhibitSection } from '../types/exhibit';

export interface GalleryDef {
  id: string;
  titleKo: string;
  titleEn: string;
  description: string;
  exhibitIds: string[];
  iconType: string;
  roomNumber: string;
}

export const galleryDefs: GalleryDef[] = [
  {
    id: 'projects',
    titleKo: '프로젝트 전시관',
    titleEn: 'Project Gallery',
    description: '기획하고 개발한 서비스 프로젝트들을 전시합니다.',
    exhibitIds: [
      'masil',
      'gachi',
      'bpt',
      'i-did-it',
      'daejeon-bakery-map',
      'pocket-toy-studio',
      'cliary',
      'project-museum',
    ],
    iconType: 'museum',
    roomNumber: '01',
  },
  {
    id: 'awards',
    titleKo: '수상 및 캠프 전시관',
    titleEn: 'Award & Camp Gallery',
    description: '캠프, 공모전, 수상 경험을 전시합니다.',
    exhibitIds: ['geumsan-ppipo', 'silver-stop', 'gachi-award'],
    iconType: 'ai-car',
    roomNumber: '02',
  },
  {
    id: 'experience',
    titleKo: '경험 전시관',
    titleEn: 'Experience Gallery',
    description: '해외 거주, 어학, 그리고 산업 현장 경험을 정리한 전시관입니다.',
    exhibitIds: ['australia', 'uk-language-training', 'bosch-internship'],
    iconType: 'internship',
    roomNumber: '03',
  },
  {
    id: 'activity',
    titleKo: '활동 전시관',
    titleEn: 'Community & Activity Hall',
    description: '대외활동, 커뮤니티, 리더십 경험을 전시합니다.',
    exhibitIds: ['herald', 'multicultural-mentoring', 'black-stone-band', 'likelion'],
    iconType: 'community',
    roomNumber: '04',
  },
  {
    id: 'certificate',
    titleKo: '자격증 아카이브',
    titleEn: 'Certificate Archive',
    description: '보유 자격증을 아카이브 형태로 전시합니다.',
    exhibitIds: [
      'computer-specialist-1',
      'korean-history-1',
      'information-processing-engineer',
      'network-manager-2',
      'erp-accounting-2',
      'erp-logistics-2',
      'erp-hr-2',
      'information-processing-craftsman',
      'word-processor',
    ],
    iconType: 'certificate',
    roomNumber: '05',
  },
];

// Helper: get exhibit IDs that belong to given section IDs
export const sectionToGalleryId: Record<ExhibitSection, string> = {
  recent: 'projects',
  local: 'projects',
  ai: 'projects',
  creative: 'projects',
  award: 'awards',
  experience: 'experience',
  activity: 'activity',
  certificate: 'certificate',
};
