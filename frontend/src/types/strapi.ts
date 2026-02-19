export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiLink {
  id: number;
  text: string;
  url: string;
  isExternal: boolean;
}

export interface StrapiGlobal {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string | null;
  logo: StrapiImage | null;
  favicon: StrapiImage | null;
  defaultOgImage: StrapiImage | null;
}

export interface StrapiHomepage {
  id: number;
  documentId: string;
  heroTitle: string;
  heroSubtitle: string | null;
  heroImage: StrapiImage | null;
  heroCta: StrapiLink | null;
  featuredServices: StrapiService[];
  aboutPreview: string | null;
  aboutImage: StrapiImage | null;
}

export interface StrapiAboutPage {
  id: number;
  documentId: string;
  title: string;
  content: string | null;
  heroImage: StrapiImage | null;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface StrapiService {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string | null;
  excerpt: string | null;
  icon: string | null;
  image: StrapiImage | null;
  order: number;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface StrapiTeamMember {
  id: number;
  documentId: string;
  name: string;
  role: string | null;
  bio: string | null;
  photo: StrapiImage | null;
  email: string | null;
  linkedin: string | null;
  order: number;
}

export interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  coverImage: StrapiImage | null;
  author: StrapiTeamMember | null;
  category: "insights" | "news" | "case-study";
  publishedDate: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
