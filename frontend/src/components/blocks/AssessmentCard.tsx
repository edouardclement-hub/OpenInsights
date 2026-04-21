import Link from "next/link";
import Image from "next/image";
import type { StrapiAssessment } from "@/types/strapi";
import { formatAssessmentDate, getStrapiMediaUrl } from "@/lib/strapi";

function PolicyStatusBadge({ status }: { status: StrapiAssessment["policyStatus"] }) {
  const cls =
    status === "Enacted"
      ? "badge-policy-enacted"
      : status === "Election Platform"
      ? "badge-policy-platform"
      : "badge-policy-proposed";
  return <span className={`badge ${cls}`}>{status}</span>;
}

function StatusBadge({ status }: { status: StrapiAssessment["status"] }) {
  const cls = status === "Completed" ? "badge-status-complete" : "badge-status-progress";
  return <span className={`badge ${cls}`}>{status}</span>;
}

export function AssessmentCard({
  assessment,
  showTags = true,
}: {
  assessment: StrapiAssessment;
  showTags?: boolean;
}) {
  const a = assessment;
  const accentClass = a.accentClass && a.accentClass !== "default" ? ` ${a.accentClass}` : "";
  const cardImg = a.cardImage ? getStrapiMediaUrl(a.cardImage.url) : null;

  return (
    <article className="assessment-card">
      <div className={`card-accent${accentClass}`} />
      <div className="card-visual">
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
          <StatusBadge status={a.status} />
          <span className="card-date">{formatAssessmentDate(a.publishedDate)}</span>
        </div>
        <h3 className="card-title">{a.title}</h3>
        {a.finding && (
          <div className="card-finding">
            <div className="card-finding-label">EPM Finding</div>
            <div className="card-finding-text">{a.finding}</div>
          </div>
        )}
        {showTags && a.tags && a.tags.length > 0 && (
          <div className="card-tags">
            {a.tags.slice(0, 5).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
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
