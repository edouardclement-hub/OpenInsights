import type {
  StrapiResponse,
  StrapiGlobal,
  StrapiHomepage,
  StrapiAboutPage,
  StrapiTeamMember,
  StrapiAssessment,
  StrapiFaq,
} from "@/types/strapi";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchStrapi<T>(
  path: string,
  params?: Record<string, string>,
  revalidate: number = 60
): Promise<StrapiResponse<T>> {
  const url = new URL(`/api${path}`, STRAPI_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const headers: Record<string, string> = {};
  if (STRAPI_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getGlobal() {
  return fetchStrapi<StrapiGlobal>("/global", { populate: "*" }, 3600);
}

export async function getHomepage() {
  return fetchStrapi<StrapiHomepage>("/homepage", { populate: "*" });
}

export async function getAboutPage() {
  return fetchStrapi<StrapiAboutPage>("/about-page", { populate: "*" }, 3600);
}

export async function getTeamMembers() {
  return fetchStrapi<StrapiTeamMember[]>("/team-members", {
    populate: "*",
    "sort[0]": "order:asc",
  }, 3600);
}

export async function getAssessments() {
  return fetchStrapi<StrapiAssessment[]>("/assessments", {
    populate: "*",
    "sort[0]": "publishedDate:desc",
    "pagination[pageSize]": "100",
  });
}

export async function getFeaturedAssessments(limit = 3) {
  return fetchStrapi<StrapiAssessment[]>("/assessments", {
    populate: "*",
    "sort[0]": "publishedDate:desc",
    "pagination[pageSize]": String(limit),
  });
}

export async function getAssessmentBySlug(slug: string) {
  return fetchStrapi<StrapiAssessment[]>("/assessments", {
    "filters[slug][$eq]": slug,
    populate: "*",
  });
}

export async function getFaqs(category?: string) {
  const params: Record<string, string> = {
    "sort[0]": "order:asc",
  };
  if (category) params["filters[category][$eq]"] = category;
  return fetchStrapi<StrapiFaq[]>("/faqs", params, 3600);
}

export function getStrapiMediaUrl(url: string | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

const ASSESSMENT_LOCAL_IMAGES: Record<string, string> = {
  "alberta-emissions-reduction-and-energy-development-plan":
    "/assessments/alberta-emissions-reduction-and-energy-development-plan.png",
  "bc-building-electrification-standard-2026-implementation":
    "/assessments/bc-building-electrification-standard-2026-implementation.png",
  "federal-clean-electricity-regulations-draft-framework":
    "/assessments/federal-clean-electricity-regulations-draft-framework.png",
  "ndp-federal-election-platform-energy-climate-chapter":
    "/assessments/ndp-federal-election-platform-energy-climate-chapter.jpg",
};

export function getAssessmentImage(
  a: { slug: string; cardImage?: { url: string } | null; detailImage?: { url: string } | null },
  type: "card" | "detail"
): string | null {
  const cmsImage = type === "card" ? a.cardImage : a.detailImage;
  if (cmsImage?.url) return getStrapiMediaUrl(cmsImage.url);
  return ASSESSMENT_LOCAL_IMAGES[a.slug] ?? null;
}

export function formatAssessmentDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
