import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getAssessmentBySlug,
  getAssessments,
  formatAssessmentDate,
  getStrapiMediaUrl,
} from "@/lib/strapi";
import { CopyCitation } from "@/components/blocks/CopyCitation";

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

  const detailImg = a.detailImage ? getStrapiMediaUrl(a.detailImage.url) : null;

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
              {a.title.length > 40 ? `${a.title.slice(0, 40)}…` : a.title}
            </span>
          </div>
          <div className="detail-meta-top">
            <span className="badge badge-jurisdiction">{a.jurisdiction}</span>
            <span
              className={`badge ${
                a.status === "Completed" ? "badge-status-complete" : "badge-status-progress"
              }`}
            >
              {a.status}
            </span>
          </div>
          <h1 className="detail-title">{a.title}</h1>
          <div className="detail-byline">
            <span>
              Published <strong>{formatAssessmentDate(a.publishedDate)}</strong>
            </span>
            <span>·</span>
            <span>
              Sector: <strong>{a.sector}</strong>
            </span>
            <span>·</span>
            <span>
              Lead: <strong>Open Insights</strong>
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

          {a.citation && (
            <div className="cite-block">
              <div className="cite-block-label">How to cite this assessment</div>
              <div className="cite-text">{a.citation}</div>
              <CopyCitation citation={a.citation} />
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
              This assessment was produced using the M3 Platform, a suite of energy-economy models
              maintained by the Energy Modelling Hub and supported by Open Insights and academic
              partners. Policy measures were encoded using the standardized EPM Policy Encoding
              framework, run against the EMH Assumptions Database baseline, and validated through
              independent QAQC review.
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
            <div className="qf-row">
              <div className="qf-label">Emissions claim</div>
              <div className="qf-value highlight">{a.claim}</div>
            </div>
            {a.claimedValue && (
              <div className="qf-row">
                <div className="qf-label">Claimed value</div>
                <div className="qf-value">{a.claimedValue}</div>
              </div>
            )}
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
            {a.party && (
              <div className="qf-row">
                <div className="qf-label">Governing party</div>
                <div className="qf-value">{a.party}</div>
              </div>
            )}
          </div>
          <div className="qf-downloads">
            <div className="qf-downloads-title">Download package</div>
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
              <button className="download-btn-primary" disabled style={{ opacity: 0.5 }}>
                <span>Zenodo brief — coming soon</span>
              </button>
            )}
            <div className="download-divider" />
            {a.datasetUrl && (
              <a href={a.datasetUrl} target="_blank" rel="noreferrer" className="download-btn">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Results dataset</span>
                <span className="download-tag">ZIP</span>
              </a>
            )}
            {a.policyEncodingUrl && (
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
                <span className="download-tag">CSV</span>
              </a>
            )}
            {a.githubUrl && (
              <a href={a.githubUrl} target="_blank" rel="noreferrer" className="download-btn">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                <span>View code on GitHub</span>
                <span className="download-tag">↗</span>
              </a>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
