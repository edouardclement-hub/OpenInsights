import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getAssessmentBySlug,
  getAssessments,
  formatAssessmentDate,
  getAssessmentImage,
} from "@/lib/strapi";
import { CopyCitation } from "@/components/blocks/CopyCitation";
import { AssessmentSlideshow } from "@/components/blocks/AssessmentSlideshow";
import { AssessmentDisclosure } from "@/components/blocks/AssessmentDisclosure";
import { getAssessmentSlides } from "@/lib/assessment-slides";

export const revalidate = 60;

interface Params {
  slug: string;
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

  const detailImg = getAssessmentImage(a, "detail");

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
          <div className="detail-trust-badges">
            <div className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              QAQC validated
            </div>
            <div className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Open source
            </div>
            <div className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Zenodo citable
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
          {detailImg ? (
            <div className="detail-photo">
              <Image
                src={detailImg}
                alt={a.detailImage?.alternativeText || a.title}
                width={1200}
                height={480}
                style={{ width: "100%", height: "auto", borderRadius: "14px" }}
              />
            </div>
          ) : (
            <div className="detail-photo-placeholder" />
          )}

          {a.execSummary && (
            <div className="detail-exec-summary">
              <h2>Executive summary</h2>
              <p>{a.execSummary}</p>
            </div>
          )}

          {(a.methodologySummary || a.assumptionsSummary) && (
            <div className="detail-section">
              <h2>Summaries</h2>
              {a.methodologySummary && (
                <AssessmentDisclosure title="Methodology summary" body={a.methodologySummary} />
              )}
              {a.assumptionsSummary && (
                <AssessmentDisclosure title="Assumptions summary" body={a.assumptionsSummary} />
              )}
            </div>
          )}

          {(() => {
            const slides = getAssessmentSlides(a.slug);
            return slides ? (
              <AssessmentSlideshow slides={slides} />
            ) : (
              <div className="charts-placeholder" aria-label="Charts and visualizations placeholder">
                <div className="charts-placeholder-label">Charts &amp; visualizations</div>
                <div className="charts-placeholder-sublabel">Reserved for upcoming slides &middot; 16:9</div>
              </div>
            );
          })()}

          {a.findings && a.findings.length > 0 && (
            <div className="detail-section">
              <h2>Key findings</h2>
              <ul className="findings-list">
                {a.findings.map((f, i) => (
                  <li key={i}>
                    <div className="finding-dot" />
                    <p dangerouslySetInnerHTML={{ __html: f.text }} />
                  </li>
                ))}
              </ul>
            </div>
          )}

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

          <div className="detail-section">
            <h2>Methodology</h2>
            <p style={{ fontSize: 15, color: "var(--slate)", lineHeight: 1.7, marginBottom: 16 }}>
              This assessment was produced using the{" "}
              <a
                href="https://m3.cme-emh.ca/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--teal)", fontWeight: 600 }}
              >
                {a.platformName || "M3 Platform"}
              </a>
              , a suite of energy-economy models maintained by the Energy Modelling Hub and
              supported by Open Insights and academic partners. Policy measures were encoded using
              the standardized EPM Policy Encoding framework, run against the EMH Assumptions
              Database baseline, and validated through independent QAQC review.
            </p>
            <Link
              href="/methodology"
              style={{ fontSize: 14, fontWeight: 600, color: "var(--teal)" }}
            >
              View full methodology →
            </Link>
          </div>
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
              <div className="qf-label">Emissions claim</div>
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
                  <span>Zenodo 2-page brief</span>
                  <span className="download-tag-primary">PDF</span>
                </a>
              ) : (
                <button
                  className="download-btn-primary is-unavailable"
                  disabled
                  style={{ opacity: 0.5 }}
                >
                  <span>Zenodo brief - not available</span>
                </button>
              )}
            </div>
            {a.ideaUrl && (
              <div className="qf-row">
                <a href={a.ideaUrl} target="_blank" rel="noreferrer" className="download-btn-primary">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M3 3v18h18" />
                    <path d="M7 14l4-4 3 3 5-6" />
                  </svg>
                  <span>IDEA dashboard</span>
                  <span className="download-tag-primary">INTERACTIVE</span>
                </a>
              </div>
            )}
            <div className="qf-row">
              <div className="download-btn-wrap">
                {a.datasetUrl ? (
                  <a href={a.datasetUrl} target="_blank" rel="noreferrer" className="download-btn">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Results dataset</span>
                  </a>
                ) : (
                  <button className="download-btn" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Results dataset — coming soon</span>
                  </button>
                )}
                <span className="download-tooltip">Technical modelling expertise required to replicate results.</span>
              </div>
            </div>
            <div className="qf-row">
              <div className="download-btn-wrap">
                {a.policyEncodingUrl ? (
                  <a
                    href={a.policyEncodingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="download-btn"
                  >
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span>Policy encoding sheet</span>
                  </a>
                ) : (
                  <button className="download-btn" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span>Policy encoding sheet — coming soon</span>
                  </button>
                )}
                <span className="download-tooltip">Technical modelling expertise required to replicate results.</span>
              </div>
            </div>
            <div className="qf-row">
              <div className="download-btn-wrap">
                {a.githubUrl ? (
                  <a href={a.githubUrl} target="_blank" rel="noreferrer" className="download-btn">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    <span>View source code</span>
                    <span className="download-tag">↗</span>
                  </a>
                ) : (
                  <button className="download-btn" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    <span>View source code — coming soon</span>
                  </button>
                )}
                <span className="download-tooltip">Technical modelling expertise required to replicate results.</span>
              </div>
            </div>
            <div className="qf-row">
              <div className="download-btn-wrap">
                {a.assumptionsUrl ? (
                  <a href={a.assumptionsUrl} target="_blank" rel="noreferrer" className="download-btn">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="3" x2="9" y2="21" />
                    </svg>
                    <span>Assumptions</span>
                    <span className="download-tag">↗</span>
                  </a>
                ) : (
                  <button className="download-btn" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="3" x2="9" y2="21" />
                    </svg>
                    <span>Assumptions — coming soon</span>
                  </button>
                )}
                <span className="download-tooltip">Technical modelling expertise required to replicate results.</span>
              </div>
            </div>
            {a.codersUrl && (
              <div className="qf-row">
                <div className="download-btn-wrap">
                  <a href={a.codersUrl} target="_blank" rel="noreferrer" className="download-btn">
                    <span>CODERS data list</span>
                    <span className="download-tag">↗</span>
                  </a>
                  <span className="download-tooltip">
                    Historical Canadian capacity, demand, and renewable-resource data used by COPPER.
                  </span>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
