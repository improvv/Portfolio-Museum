import {
  MessageSquare,
  HeartPulse,
  Dumbbell,
  Sparkles,
  Package,
  Droplets,
  Activity,
  Car,
  Building2,
  Globe,
  Newspaper,
  GraduationCap,
  Music,
  Users,
  Award,
  MapPin,
  Coffee,
  Briefcase,
  type LucideProps,
} from 'lucide-react';
import type { FC } from 'react';

type IconComponent = FC<LucideProps>;

const iconMap: Record<string, IconComponent> = {
  'local-sns': MessageSquare,
  'care-ai': HeartPulse,
  fitness: Dumbbell,
  bakery: Coffee,
  routine: Sparkles,
  toy: Package,
  skin: Droplets,
  'senior-health': Activity,
  'ai-car': Car,
  museum: Building2,
  passport: Globe,
  uk: MapPin,
  newspaper: Newspaper,
  mentoring: GraduationCap,
  bass: Music,
  community: Users,
  certificate: Award,
  internship: Briefcase,
};

interface ArtifactIconProps {
  iconType: string;
  size?: number;
  className?: string;
}

export function ArtifactIcon({ iconType, size = 44, className = '' }: ArtifactIconProps) {
  const IconComponent = iconMap[iconType] ?? Building2;
  return <IconComponent size={size} className={className || 'text-museum-accent'} />;
}
