export interface SocialLink {
  id: string;
  type: 'linkedin' | 'twitter' | 'github' | 'instagram' | 'facebook' | 'youtube' | 'whatsapp' | 'telegram' | 'custom';
  url: string;
  enabled: boolean;
  label?: string;
}

export interface SignatureColors {
  primary: string;
  secondary: string;
  text: string;
  background: string;
  accent: string;
}

export interface SignatureFonts {
  family: string;
  nameSize: number;
  titleSize: number;
  contactSize: number;
  weight: '400' | '500' | '600' | '700';
  lineHeight: number;
}

export type TemplateId =
  | 'classic-left'
  | 'centered-minimal'
  | 'horizontal-compact'
  | 'card-style'
  | 'modern-split'
  | 'corporate-formal'
  | 'creative-designer'
  | 'banner-header'
  | 'two-tone'
  | 'minimal-text'
  | 'badge-style'
  | 'sidebar-accent'
  | 'social-focus'
  | 'quote-style'
  | 'bordered-box'
  | 'gradient-avatar'
  | 'pop-shadow'
  | 'dark-glass'
  | 'monospace-dev'
  | 'availability-badge';

export type ImageShape = 'circle' | 'square' | 'rounded';
export type DividerStyle = 'solid' | 'dashed' | 'dotted' | 'none';
export type IconStyle = 'colored' | 'monochrome' | 'outline';

export interface SignatureData {
  id: string;
  name: string;
  // Profile
  fullName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  phone2?: string;
  website: string;
  address?: string;
  tagline?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  // Images (base64)
  profileImage?: string;
  logo?: string;
  // Branding
  colors: SignatureColors;
  // Typography
  fonts: SignatureFonts;
  // Social
  socials: SocialLink[];
  iconStyle: IconStyle;
  iconSize: number;
  // Template
  template: TemplateId;
  // Advanced
  divider: DividerStyle;
  imageShape: ImageShape;
  showDivider: boolean;
}

export const defaultSignature: SignatureData = {
  id: '',
  name: 'My Signature',
  fullName: 'Alexandra Chen',
  jobTitle: 'Senior Product Designer',
  company: 'Studio Nova',
  email: 'alex@studionova.io',
  phone: '+1 (555) 012-3456',
  phone2: '',
  website: 'studionova.io',
  address: 'San Francisco, CA',
  tagline: 'Designing products people love.',
  ctaLabel: 'Book a Meeting',
  ctaUrl: 'https://cal.com/alexchen',
  profileImage: undefined,
  logo: undefined,
  colors: {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    text: '#1E293B',
    background: '#FFFFFF',
    accent: '#22D3EE',
  },
  fonts: {
    family: 'Arial',
    nameSize: 18,
    titleSize: 13,
    contactSize: 12,
    weight: '600',
    lineHeight: 1.5,
  },
  socials: [
    { id: '1', type: 'linkedin', url: 'https://linkedin.com/in/alexchen', enabled: true },
    { id: '2', type: 'twitter', url: 'https://twitter.com/alexchen', enabled: true },
    { id: '3', type: 'github', url: 'https://github.com/alexchen', enabled: true },
    { id: '4', type: 'instagram', url: '', enabled: false },
    { id: '5', type: 'youtube', url: '', enabled: false },
  ],
  iconStyle: 'colored',
  iconSize: 20,
  template: 'classic-left',
  divider: 'solid',
  imageShape: 'circle',
  showDivider: true,
};
