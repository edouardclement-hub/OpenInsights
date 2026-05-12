import type { Metadata } from "next";
import Link from "next/link";
import { AssessmentCard } from "@/components/blocks/AssessmentCard";
import { getFeaturedAssessments, getHomepage } from "@/lib/strapi";
import type { StrapiAssessment, StrapiHomepage } from "@/types/strapi";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Energy Policy Monitor — Open Insights",
  description:
    "Independent, data-driven assessments of Canadian energy policy. Transparent modelling, traceable findings, publicly archived.",
};

const FALLBACK_HOMEPAGE: Partial<StrapiHomepage> = {
  eyebrow: "Independent assessment",
  heroTitle: "Canadian energy policy insights, independently assessed.",
  heroSubtitle:
    "The Energy Policy Monitor delivers independent, timely analysis of Canada's major energy and climate policy developments. Led by the Open Insights team, EPM cuts through complexity to provide clear, evidence-based assessments of what new policies mean for emissions trajectories, energy systems, and economic outcomes.",
  heroCtaPrimaryLabel: "Explore assessments",
  heroCtaPrimaryHref: "/assessments",
  heroCtaSecondaryLabel: "How it works",
  heroCtaSecondaryHref: "/methodology",
};

export default async function HomePage() {
  let homepage: Partial<StrapiHomepage> = FALLBACK_HOMEPAGE;
  let featured: StrapiAssessment[] = [];

  try {
    const [homepageRes, featuredRes] = await Promise.all([
      getHomepage(),
      getFeaturedAssessments(3),
    ]);
    homepage = { ...FALLBACK_HOMEPAGE, ...homepageRes.data };
    featured = featuredRes.data;
  } catch {
    // Strapi not running — render with fallback, no assessments
  }

  return (
    <>
      <section className="hero">
        <div className="hero-grid-lines" />
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">{homepage.eyebrow || "Independent assessment"}</div>
            <h1>{homepage.heroTitle}</h1>
            {homepage.heroSubtitle && (
              <p className="hero-sub">
                {(() => {
                  const parts = homepage.heroSubtitle.split("Open Insights");
                  return parts.flatMap((part, i) => [
                    part,
                    i < parts.length - 1 && (
                      <a
                        key={i}
                        href="https://www.openinsights.ca/"
                        target="_blank"
                        rel="noopener"
                        className="hero-sub-link"
                      >
                        Open Insights
                      </a>
                    ),
                  ]);
                })()}
              </p>
            )}
            <div className="hero-actions">
              <Link href={homepage.heroCtaPrimaryHref || "/assessments"} className="btn-primary">
                {homepage.heroCtaPrimaryLabel || "Explore assessments"}
              </Link>
              <Link href={homepage.heroCtaSecondaryHref || "/methodology"} className="btn-ghost">
                {homepage.heroCtaSecondaryLabel || "How it works"}
              </Link>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-stats">
              <div className="hero-stats-title">Platform at a glance</div>
              <div className="stat-row">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <div className="stat-label">Independence</div>
                  <div className="stat-value">All policies and jurisdictions</div>
                  <div className="stat-note">
                    One methodology, applied consistently on major Canadian energy and climate
                    policy announcements.
                  </div>
                </div>
              </div>
              <div className="stat-row">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <div className="stat-label">Transparency</div>
                  <div className="stat-value">Open-source</div>
                  <div className="stat-note">Code, data, assumptions. All public and free.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pillars">
        <div className="pillars-inner">
          <div className="section-label">Our commitment</div>
          <div className="section-title">
            Standardizing transparency
            <br />
            in energy policy analysis.
          </div>
          <div className="pillars-grid">
            <article className="pillar-card">
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="pillar-title">Independent</div>
              <div className="pillar-claim">
                One methodology, applied consistently on major Canadian energy and climate policy
                announcements.
              </div>
              <div className="pillar-desc">
                A standardized methodology is applied to every policy evaluated, regardless of the
                organization or jurisdiction it applies to.
              </div>
            </article>
            <article className="pillar-card">
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="pillar-title">Timely</div>
              <div className="pillar-claim">
                Assessments are published shortly after major energy policy announcements.
              </div>
              <div className="pillar-desc">
                EPM delivers assessments shortly after major energy policies are announced, so
                modelling results are useful while debates and public discourse are still active.
              </div>
            </article>
            <article className="pillar-card">
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div className="pillar-title">Credible</div>
              <div className="pillar-claim">
                Every finding is backed by a publicly archived audit trail, from assumptions to
                final outputs.
              </div>
              <div className="pillar-desc">
                Every EPM brief is Zenodo-archived, QAQC-validated by independent experts, and
                published with full documentation: code, assumptions, data, and results — all
                available for public review and replication.
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="assessments-section">
        <div className="assessments-inner">
          <div className="section-header">
            <div>
              <div className="section-label">Latest work</div>
              <div className="section-title">Assessments</div>
            </div>
            <Link className="link-all" href="/assessments">
              View all assessments →
            </Link>
          </div>
          {featured.length > 0 ? (
            <div className="assessments-grid">
              {featured.map((a) => (
                <AssessmentCard key={a.id} assessment={a} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>
                No assessments published yet. Add them via the{" "}
                <a href="http://localhost:1337/admin" target="_blank" rel="noreferrer">
                  Strapi admin
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
