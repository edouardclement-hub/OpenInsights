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
  eyebrow: string | null;
  heroTitle: string;
  heroSubtitle: string | null;
  heroCtaPrimaryLabel: string | null;
  heroCtaPrimaryHref: string | null;
  heroCtaSecondaryLabel: string | null;
  heroCtaSecondaryHref: string | null;
  pillarEmissionsTitle: string | null;
  pillarEmissionsClaim: string | null;
  pillarInfrastructureTitle: string | null;
  pillarInfrastructureClaim: string | null;
  pillarEmploymentTitle: string | null;
  pillarEmploymentClaim: string | null;
  aboutPreview: string | null;
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

export type AssessmentJurisdiction =
  | "Federal"
  | "Alberta"
  | "British Columbia"
  | "Ontario"
  | "Quebec"
  | "Manitoba"
  | "Saskatchewan"
  | "Nova Scotia"
  | "New Brunswick"
  | "Newfoundland and Labrador"
  | "Prince Edward Island"
  | "Yukon"
  | "Northwest Territories"
  | "Nunavut";

export type AssessmentStatus = "Completed" | "In Progress";
export type AssessmentPolicyStatus = "Proposed" | "Enacted" | "Election Platform" | "Repealed";
export type AssessmentSector =
  | "Electricity"
  | "Oil & Gas"
  | "Buildings"
  | "Transportation"
  | "Industry"
  | "Agriculture"
  | "Cross-cutting";
export type AssessmentAccent = "default" | "gold" | "slate";

export interface AssessmentFinding {
  text: string;
}

export interface StrapiAssessment {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  publishedDate: string;
  jurisdiction: AssessmentJurisdiction;
  party: string | null;
  status: AssessmentStatus;
  policyStatus: AssessmentPolicyStatus;
  sector: AssessmentSector;
  tags: string[] | null;
  claim: string;
  finding: string | null;
  claimedValue: string | null;
  modelledValue: string | null;
  execSummary: string | null;
  findings: AssessmentFinding[] | null;
  epmPlus: boolean;
  accentClass: AssessmentAccent;
  citation: string | null;
  cardImage: StrapiImage | null;
  detailImage: StrapiImage | null;
  zenodoUrl: string | null;
  githubUrl: string | null;
  datasetUrl: string | null;
  policyEncodingUrl: string | null;
}

export interface StrapiFaq {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  order: number;
  category: "general" | "methodology" | "data" | "contact";
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
