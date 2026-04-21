import type { MetadataRoute } from "next";
import { getAssessments } from "@/lib/strapi";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/methodology`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/assessments`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  let assessmentUrls: MetadataRoute.Sitemap = [];
  try {
    const res = await getAssessments();
    assessmentUrls = res.data.map((a) => ({
      url: `${SITE_URL}/assessments/${a.slug}`,
      lastModified: new Date(a.publishedDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Strapi not available
  }

  return [...staticPages, ...assessmentUrls];
}
