import type {
  StrapiResponse,
  StrapiGlobal,
  StrapiHomepage,
  StrapiAboutPage,
  StrapiService,
  StrapiBlogPost,
  StrapiTeamMember,
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

export async function getServices() {
  return fetchStrapi<StrapiService[]>("/services", {
    populate: "*",
    "sort[0]": "order:asc",
  }, 3600);
}

export async function getBlogPosts(page = 1, pageSize = 9) {
  return fetchStrapi<StrapiBlogPost[]>("/blog-posts", {
    populate: "*",
    "sort[0]": "publishedDate:desc",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
  });
}

export async function getBlogPostBySlug(slug: string) {
  return fetchStrapi<StrapiBlogPost[]>("/blog-posts", {
    "filters[slug][$eq]": slug,
    populate: "*",
  });
}

export async function getTeamMembers() {
  return fetchStrapi<StrapiTeamMember[]>("/team-members", {
    populate: "*",
    "sort[0]": "order:asc",
  }, 3600);
}

export function getStrapiMediaUrl(url: string | undefined): string {
  if (!url) return "/images/placeholder.svg";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
