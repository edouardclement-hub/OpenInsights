import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAssessmentBySlug,
  getAssessments,
  formatAssessmentDate,
} from "@/lib/strapi";
import { CopyCitation } from "@/components/blocks/CopyCitation";
import { AssessmentSlideshow } from "@/components/blocks/AssessmentSlideshow";
import { AssessmentDisclosure } from "@/components/blocks/AssessmentDisclosure";
import { getAssessmentSlides } from "@/lib/assessment-slides";

export const revalidate = 60;

interface Params {
  slug: string;
}

/**
 * The three pillars every assessment reports against, in the order they are
 * shown. A finding carries its pillar in the `findings` JSON; findings without
 * one render as a plain list, as they did before.
 */
const PILLAR_ORDER = ["Environment", "Economy", "Infrastructure"] as const;

/**
 * The "Data and code" row inside every Methodology summary. Plain text links,
 * not buttons: a row with no URL yet still names what will be published.
 */
const DATA_AND_CODE: Array<{ label: string; field: string }> = [
  { label: "Policy encoding sheet", field: "policyEncodingUrl" },
  { label: "Source code", field: "githubUrl" },
  { label: "Assumptions", field: "assumptionsUrl" },
  { label: "CODERS data list", field: "codersUrl" },
  { label: "Results dataset", field: "datasetUrl" },
];

const WHAT_WE_MEASURE: Array<{ pillar: string; text: string }> = [
  {
    pillar: "Environment",
    text: "Greenhouse gas emissions. Reported in every assessment.",
  },
  {
    pillar: "Economy",
    text:
      "Household energy costs or economic growth (GDP). Energy costs cover all household energy, not just electricity.",
  },
  {
    pillar: "Infrastructure",
    text:
      "Depends on the policy, for example the electricity generation mix for electricity policy.",
  },
];

/**
 * Links the first mention of the platform name inside the methodology intro,
 * the way the homepage links "Open Insights" inside its hero copy. Keeps the
 * paragraph itself a single plain string in the CMS.
 */
function linkPlatform(text: string, platformName?: string | null) {
  const name = platformName || "M3 Platform";
  const i = text.indexOf(name);
  if (i === -1) return text;
  return [
    text.slice(0, i),
    <a
      key="platform"
      href="https://m3.cme-emh.ca/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "var(--teal)", fontWeight: 600 }}
    >
      {name}
    </a>,
    text.slice(i + name.length),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getAssessmentBySlug(slug);
    const a = res.data[0];
    if (!a) return { title: "Assessment not found" };
    return {
      title: a.title,
      description: a.claim,
    };
  } catch {
    return { title: "Assessment" };
  }
}

export async function generateStaticParams() {
  try {
    const res = await getAssessments();
    return res.data.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export default async function AssessmentDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  let a;
  try {
    const res = await getAssessmentBySlug(slug);
    a = res.data[0];
  } catch {
    // Strapi not reachable
  }

  if (!a) notFound();

  const slides = getAssessmentSlides(a.slug);

  // Findings are shown one per pillar, in PILLAR_ORDER. An assessment whose
  // findings are not pillar-tagged keeps its original list and order.
  const taggedFindings = (a.findings || []).filter((f) => f.pillar);
  const orderedFindings =
    taggedFindings.length > 0
      ? [...(a.findings || [])].sort(
          (x, y) =>
            PILLAR_ORDER.indexOf(x.pillar as (typeof PILLAR_ORDER)[number]) -
            PILLAR_ORDER.indexOf(y.pillar as (typeof PILLAR_ORDER)[number])
        )
      : a.findings || [];

  return (
    <>
      <div className="detail-hero">
        <div className="detail-hero-inner">
          <div className="detail-breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/assessments">Assessments</Link>
            <span>›</span>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>
              {a.title}
            </span>
          </div>
          <div className="detail-meta-top">
            <span className="badge badge-jurisdiction">{a.jurisdiction}</span>
          </div>
          <h1 className="detail-title">{a.title}</h1>
          <div className="detail-byline">
            <span>
              Published <strong>{a.publishedDateLabel || formatAssessmentDate(a.publishedDate)}</strong>
            </span>
            <span>·</span>
            <span>
              Sector: <strong>{a.sector}</strong>
            </span>
            <span>·</span>
            <span>
              Lead: <strong>{a.lead || "Open Insights"}</strong>
            </span>
          </div>
          {a.policyAssessed && (
            <div className="detail-policy-line">
              Policy assessed: <strong>{a.policyAssessed}</strong>
            </div>
          )}
          <div className="detail-trust-badges">
            <div className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Open source
            </div>
          </div>
        </div>
      </div>

      <div className="detail-main">
        <div className="detail-content">
          {a.isExample !== false && (
            <div className="example-notice" role="note">
              <div className="example-notice-label">Example assessment</div>
              <p>
                This is a fictional example assessment. It was created for demonstration purposes only and does not represent a real policy evaluation, real modelled findings, or the views of any organization.
              </p>
            </div>
          )}

          {slides ? (
            <AssessmentSlideshow slides={slides} />
          ) : (
            <div className="charts-placeholder" aria-label="Charts and visualizations placeholder">
              <div className="charts-placeholder-label">Charts &amp; visualizations</div>
              <div className="charts-placeholder-sublabel">Reserved for upcoming slides &middot; 16:9</div>
            </div>
          )}

          {a.execSummary && (
            <div className="detail-exec-summary">
              <h2>Executive summary</h2>
              <p>{a.execSummary}</p>
            </div>
          )}

          {orderedFindings.length > 0 && (
            <div className="detail-section">
              <h2>Key findings</h2>
              <ul className="findings-list">
                {orderedFindings.map((f, i) => (
                  <li key={i}>
                    <div className="finding-dot" />
                    <div className="finding-body">
                      {f.pillar && <div className="finding-pillar">{f.pillar}</div>}
                      <p dangerouslySetInnerHTML={{ __html: f.text }} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="findings-scope-note">
                This page shows headline results for the areas we measure: environment, economy,
                and infrastructure. The full set of modelled results is in the interactive
                dashboard.
              </p>
            </div>
          )}

          <div className="detail-section">
            <AssessmentDisclosure
              title="Assumptions summary"
              body={a.assumptionsSummary || "[COPY TO COME]"}
            />
            <AssessmentDisclosure
              title="Methodology summary"
              body={a.methodologySummary || undefined}
              intro={a.methodologyIntro ? <p>{linkPlatform(a.methodologyIntro, a.platformName)}</p> : null}
            >
              <h4 className="disclosure-heading">What we measure</h4>
              <ul className="disclosure-list">
                {WHAT_WE_MEASURE.map((m) => (
                  <li key={m.pillar}>
                    <strong>{m.pillar}:</strong> {m.text}
                  </li>
                ))}
              </ul>

              <h4 className="disclosure-heading">Data and code</h4>
              <ul className="disclosure-list disclosure-links">
                {DATA_AND_CODE.map((d) => {
                  const href = (a as unknown as Record<string, string | undefined>)[d.field];
                  return (
                    <li key={d.label}>
                      {href ? (
                        <a href={href} target="_blank" rel="noreferrer">
                          {d.label}
                        </a>
                      ) : (
                        <span>{d.label}</span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <p className="disclosure-footer-links">
                <Link href="/methodology#baseline">Baseline: November 2026</Link>
                <Link href="/methodology">View full methodology →</Link>
              </p>
            </AssessmentDisclosure>
          </div>

          {a.limitations && (
            <div className="detail-section limitations-section">
              <h2>Limitations and uncertainty</h2>
              {a.limitations
                .split(/\n{2,}/)
                .map((b) => b.trim())
                .filter(Boolean)
                .map((block, i) =>
                  block.startsWith("## ") ? (
                    <h4 key={i} className="limitations-heading">
                      {block.slice(3)}
                    </h4>
                  ) : (
                    <p key={i} className="limitations-text">
                      {block}
                    </p>
                  )
                )}
            </div>
          )}

          {a.citation && (
            <div className="cite-block">
              <div className="cite-block-label">How to cite this assessment</div>
              <div className="cite-text">{a.citation}</div>
              <CopyCitation citation={a.citation} />
              {a.isExample !== false && (
                <div className="cite-do-not-cite">This is a fictional example. Do not cite.</div>
              )}
            </div>
          )}

          {a.epmPlus && (
            <div className="epm-plus-section">
              <div className="epm-plus-badge-wrap">
                <div className="epm-plus-badge">EPM+</div>
              </div>
              <h3>Expert interpretive brief available</h3>
              <p>An academic partner has published an interpretive brief on this assessment.</p>
            </div>
          )}
        </div>

        <aside className="quick-facts">
          <div className="qf-header">
            <h3>Quick facts</h3>
          </div>
          <div className="qf-body">
            {a.quote && (
              <figure className="qf-quote">
                <blockquote>&ldquo;{a.quote}&rdquo;</blockquote>
                {a.quoteAttribution && <figcaption>{a.quoteAttribution}</figcaption>}
              </figure>
            )}
            <div className="qf-row">
              <div className="qf-label">Announced claim</div>
              <div className="qf-value highlight">{a.claim}</div>
            </div>
            {a.modelledValue && (
              <div className="qf-row">
                <div className="qf-label">Modelled value</div>
                <div className="qf-value">{a.modelledValue}</div>
              </div>
            )}
            <div className="qf-row">
              <div className="qf-label">Jurisdiction</div>
              <div className="qf-value">{a.jurisdiction}</div>
            </div>
            <div className="qf-row">
              <div className="qf-label">Sector</div>
              <div className="qf-value">{a.sector}</div>
            </div>
            <div className="qf-row">
              <div className="qf-label">Policy status</div>
              <div className="qf-value">{a.policyStatus}</div>
            </div>
            <div className="qf-row">
              {a.zenodoUrl ? (
                <a href={a.zenodoUrl} target="_blank" rel="noreferrer" className="download-btn-primary">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>Download the brief (PDF)</span>
                </a>
              ) : (
                <button
                  className="download-btn-primary is-unavailable"
                  disabled
                  style={{ opacity: 0.5 }}
                >
                  <span>Download the brief (PDF)</span>
                </button>
              )}
            </div>
            {a.ideaUrl && (
              <div className="qf-row">
                <a href={a.ideaUrl} target="_blank" rel="noreferrer" className="download-btn">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M3 3v18h18" />
                    <path d="M7 14l4-4 3 3 5-6" />
                  </svg>
                  <span>Explore the interactive results (IDEA)</span>
                </a>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
