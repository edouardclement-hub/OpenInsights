import Link from "next/link";
import Image from "next/image";
import type { StrapiAssessment } from "@/types/strapi";
import { formatAssessmentDate, getAssessmentImage } from "@/lib/strapi";

function PolicyStatusBadge({ status }: { status: StrapiAssessment["policyStatus"] }) {
  const cls =
    status === "Enacted"
      ? "badge-policy-enacted"
      : status === "Election Platform"
      ? "badge-policy-platform"
      : status === "Announced"
      ? "badge-policy-announced"
      : "badge-policy-proposed";
  return <span className={`badge ${cls}`}>{status}</span>;
}

export function AssessmentCard({ assessment }: { assessment: StrapiAssessment }) {
  const a = assessment;
  const accentClass = a.accentClass && a.accentClass !== "default" ? ` ${a.accentClass}` : "";
  const cardImg = getAssessmentImage(a, "card");

  return (
    <article className="assessment-card">
      <div className={`card-accent${accentClass}`} />
      <div className="card-visual">
        {a.isExample !== false && <div className="card-example-banner">Example</div>}
        {cardImg ? (
          <Image
            src={cardImg}
            alt={a.cardImage?.alternativeText || `${a.sector} sector`}
            width={800}
            height={240}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <span className="card-visual-label">Image · {a.sector}</span>
        )}
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="badge badge-jurisdiction">{a.jurisdiction}</span>
          <PolicyStatusBadge status={a.policyStatus} />
          <span className="card-date">{a.publishedDateLabel || formatAssessmentDate(a.publishedDate)}</span>
        </div>
        <h3 className="card-title">{a.cardTitle || a.title}</h3>
        {a.finding && (
          <div className="card-finding">
            <div className="card-finding-label">EPM Finding</div>
            <div className="card-finding-text">{a.finding}</div>
          </div>
        )}
        <div className="card-actions">
          <Link href={`/assessments/${a.slug}`} className="btn-card-primary">
            View full assessment
          </Link>
        </div>
      </div>
    </article>
  );
}
