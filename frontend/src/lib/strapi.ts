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

/**
 * The assessments the site publishes. Strapi still holds the retired demo
 * records, so every read is filtered through this allowlist: the listing, the
 * search index, the homepage row, the sitemap and generateStaticParams all go
 * through these helpers. Add a slug here when a new assessment goes live.
 */
export const PUBLISHED_ASSESSMENT_SLUGS = [
  "powering-canada-strong-from-strategy-to-action",
] as const;

function onlyPublished(res: StrapiResponse<StrapiAssessment[]>) {
  return {
    ...res,
    data: res.data.filter((a) =>
      (PUBLISHED_ASSESSMENT_SLUGS as readonly string[]).includes(a.slug)
    ),
  };
}

export async function getAssessments() {
  const res = await fetchStrapi<StrapiAssessment[]>("/assessments", {
    populate: "*",
    "sort[0]": "publishedDate:desc",
    "pagination[pageSize]": "100",
  });
  return onlyPublished(res);
}

export async function getFeaturedAssessments(limit = 3) {
  const res = await getAssessments();
  return { ...res, data: res.data.slice(0, limit) };
}

export async function getAssessmentBySlug(slug: string) {
  const res = await fetchStrapi<StrapiAssessment[]>("/assessments", {
    "filters[slug][$eq]": slug,
    populate: "*",
  });
  return onlyPublished(res);
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

// Keyed by slug. The filename carries a version suffix (the assessment's
// publication month) so that replacing the artwork changes the URL: browser and
// CDN caches key on the path, and a same-name swap can keep serving the old
// photo to anyone who already loaded the page.
const ASSESSMENT_LOCAL_IMAGES: Record<string, string> = {
  "powering-canada-strong-from-strategy-to-action":
    "/assessments/powering-canada-strong-from-strategy-to-action-2026-11.jpg",
};

export function getAssessmentImage(
  a: { slug: string; cardImage?: { url: string } | null; detailImage?: { url: string } | null },
  type: "card" | "detail"
): string | null {
  const cmsImage = type === "card" ? a.cardImage : a.detailImage;
  if (cmsImage?.url) return getStrapiMediaUrl(cmsImage.url);
  return ASSESSMENT_LOCAL_IMAGES[a.slug] ?? null;
}

/**
 * The name to show when an assessment is linked or listed: the breadcrumb, the
 * listing card, the "Assessments using this Baseline" list. Falls back to the
 * full title for assessments that do not record a short one.
 */
export function assessmentLinkTitle(a: {
  title: string;
  cardTitle?: string | null;
}): string {
  return a.cardTitle || a.title;
}

export function formatAssessmentDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
