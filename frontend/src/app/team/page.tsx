import type { Metadata } from "next";
import Image from "next/image";
import { getTeamMembers, getStrapiMediaUrl } from "@/lib/strapi";
import type { StrapiTeamMember } from "@/types/strapi";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Team",
  description: "Who produces the EPM — Open Insights team, the Energy Modelling Hub, and partners.",
};

function TeamCard({ m }: { m: StrapiTeamMember }) {
  const photo = m.photo ? getStrapiMediaUrl(m.photo.url) : null;
  const initials = m.name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <article className="team-card">
      <div className="team-avatar">
        {photo ? (
          <Image src={photo} alt={m.name} width={120} height={120} />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "var(--teal-pale)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--teal)",
              fontWeight: 600,
              fontSize: 20,
              borderRadius: "50%",
            }}
          >
            {initials}
          </div>
        )}
      </div>
      <div className="team-name">{m.name}</div>
      {m.role && <div className="team-role">{m.role}</div>}
      {m.bio && <p className="team-bio">{m.bio}</p>}
    </article>
  );
}

export default async function TeamPage() {
  let members: StrapiTeamMember[] = [];
  try {
    const res = await getTeamMembers();
    members = res.data;
  } catch {
    // Strapi not running
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="section-label">The people</div>
          <h1>Who produces the EPM</h1>
          <p>
            A collaboration between the Open Insights team, the Energy Modelling Hub, and
            university research partners.
          </p>
        </div>
      </div>

      <div className="team-content">
        <div className="team-group">
          <div className="team-group-title">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--teal)" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Open Insights Team
          </div>
          <div className="team-group-desc">
            Project leadership and strategic communications.
          </div>
          {members.length > 0 ? (
            <div className="team-grid">
              {members.map((m) => (
                <TeamCard key={m.id} m={m} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>
                No team members added yet. Add them via the{" "}
                <a href="http://localhost:1337/admin" target="_blank" rel="noreferrer">
                  Strapi admin
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
