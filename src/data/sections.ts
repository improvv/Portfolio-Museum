import type { MuseumSection } from '../types/exhibit';

export const museumSections: MuseumSection[] = [
  {
    id: 'entrance',
    title: 'Entrance Hall',
    subtitle: 'Curator Note',
    description: '포트폴리오의 입구이자 자기소개 공간입니다.',
    navLabel: 'Entrance',
  },
  {
    id: 'recent',
    title: 'Recent Service Exhibition',
    subtitle: '2026 New Projects',
    description: '최근 진행한 서비스 기획 및 공모전 프로젝트입니다.',
    navLabel: 'Projects',
  },
  {
    id: 'local',
    title: 'Local Problem Solving Gallery',
    subtitle: 'Local Service & Public Ideas',
    description: '지역 문제와 공공성을 중심으로 기획한 프로젝트입니다.',
    navLabel: 'Local',
  },
  {
    id: 'ai',
    title: 'AI & Prototype Gallery',
    subtitle: 'AI, Data, and Interactive Systems',
    description: 'AI와 프로토타입 중심의 프로젝트를 전시합니다.',
    navLabel: 'AI',
  },
  {
    id: 'creative',
    title: 'Creative Archive',
    subtitle: 'Branding, Content, and Experimental UX',
    description: '브랜딩, AI 콘텐츠, 실험적 UX 프로젝트를 모아둔 공간입니다.',
    navLabel: 'Creative',
  },
  {
    id: 'award',
    title: 'Camp & Award Gallery',
    subtitle: 'Competition and Camp Projects',
    description: '캠프, 공모전, 수상 경험을 전시합니다.',
    navLabel: 'Awards',
  },
  {
    id: 'experience',
    title: 'Global Experience Hall',
    subtitle: 'Work, Study, and Language Experience',
    description: '해외 거주와 어학 경험을 정리한 전시관입니다.',
    navLabel: 'Experience',
  },
  {
    id: 'activity',
    title: 'Community & Activity Hall',
    subtitle: 'Writing, Mentoring, Music, and Tech Community',
    description: '대외활동, 커뮤니티, 리더십 경험을 전시합니다.',
    navLabel: 'Activity',
  },
  {
    id: 'certificate',
    title: 'Certificate Archive',
    subtitle: 'Verified Skills and Credentials',
    description: '보유 자격증을 아카이브 벽면처럼 정리합니다.',
    navLabel: 'Certificates',
  },
];

export const navSections = [
  { id: 'entrance', label: 'Entrance' },
  { id: 'recent', label: 'Projects' },
  { id: 'award', label: 'Awards' },
  { id: 'experience', label: 'Experience' },
  { id: 'certificate', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];
