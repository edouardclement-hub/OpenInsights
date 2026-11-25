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
export type AssessmentPolicyStatus =
  | "Proposed"
  | "Announced"
  | "Enacted"
  | "Election Platform"
  | "Repealed";
export type AssessmentSector =
  | "Electricity"
  | "Oil & Gas"
  | "Buildings"
  | "Transportation"
  | "Industry"
  | "Agriculture"
  | "Cross-cutting"
  | "Election Platform";
export type AssessmentAccent = "default" | "gold" | "slate";

export interface AssessmentFinding {
  text: string;
  /** "Environment" | "Economy" | "Infrastructure". Untagged findings render as a plain list. */
  pillar?: string;
}

export interface StrapiAssessment {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  publishedDate: string;
  publishedDateLabel: string | null;
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
  ideaUrl: string | null;
  githubUrl: string | null;
  datasetUrl: string | null;
  policyEncodingUrl: string | null;
  assumptionsUrl: string | null;
  isExample: boolean | null;
  lead: string | null;

  // Intake Part A fields added for the Budget 2026 assessment. All optional, so
  // assessments that predate them render unchanged.
  shortName?: string | null;            // F1B
  instrumentType?: string[] | null;     // F6
  limitations?: string | null;          // F21
  methodologySummary?: string | null;   // F22
  assumptionsSummary?: string | null;   // F23
  quote?: string | null;                // F24
  quoteAttribution?: string | null;     // F24
  platformName?: string | null;         // F36
  codersUrl?: string | null;            // F31
  modelReposUrl?: string | null;        // F32
  fullAssumptionsUrl?: string | null;   // F33

  /** Official name of the policy assessed, shown under the byline. */
  policyAssessed?: string | null;
  /** Opening paragraph of the Methodology summary dropdown. */
  methodologyIntro?: string | null;
  /**
   * Shorter title for the listing card, when the page H1 is too long to read
   * well in a card. Falls back to `title`.
   */
  cardTitle?: string | null;
  /**
   * IDEA dashboard embedded in the page, between the Key findings and the
   * Assumptions summary. `ideaUrl` is the sidebar button; this is the frame.
   */
  ideaEmbedUrl?: string | null;
  /** Modelling documentation and code for this assessment. */
  modelDocsUrl?: string | null;
  /** Address behind the "Questions about this assessment" block in Quick facts. */
  contactEmail?: string | null;
  /**
   * Id of the Baseline version this assessment was run against ("2026-11").
   * Resolved through `assessmentBaselineId()`, which keeps older assessments
   * pointing at the version they used after the Baseline is updated.
   */
  baselineVersion?: string | null;
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
