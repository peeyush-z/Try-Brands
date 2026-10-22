/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryType = 'All' | 'Branding' | 'Creative Direction' | '3D Motion' | 'Digital Product';

export interface ReelItem {
  id: string;
  title: string;
  client: string;
  category: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  tags: string[];
  views: string;
  aspectRatio: '9:16';
  isActive: boolean;
  order: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  year: string;
  category: 'Branding' | 'Creative Direction' | '3D Motion' | 'Digital Product';
  heroMediaUrl: string;
  heroMediaType: 'video' | 'image';
  thumbnailUrl: string;
  excerpt: string;
  description: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  clientQuote?: {
    quote: string;
    author: string;
    role: string;
  };
  gallery: string[];
  liveUrl?: string;
  isActive: boolean;
  order: number;
}

export interface ClientBrand {
  id: string;
  name: string;
  industry: string;
  impactMetric: string;
  partnershipYear: string;
  symbolText: string;
  logoDescription: string;
  isActive: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  metricValue: string;
  metricLabel: string;
  avatarUrl: string;
  videoSnippetUrl?: string;
  isActive: boolean;
}

export interface CapabilityService {
  id: string;
  index: string;
  title: string;
  tagline: string;
  deliverables: string[];
  accentMetric: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
}

export interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  services: string[];
  budgetRange: string;
  timeline: string;
  projectOverview: string;
  submittedAt: string;
}

export type CursorVariant = 'default' | 'hover' | 'media' | 'magnetic' | 'text' | 'hidden';
