import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Team",
  description: "Who produces the EPM — Open Insights team, EPM leadership, and the steering committee.",
};

type Member = {
  name: string;
  role: string;
  bio?: string;
  photo: string;
  href: string;
};

const OPEN_INSIGHTS_TEAM: Member[] = [
  {
    name: "Deven Azevedo",
    role: "Project Director, Open Insights",
    bio: "Leads the Open Insights initiative and oversees strategy for the EPM and modelling platforms.",
    photo: "/team/deven-azevedo.jpg",
    href: "https://www.linkedin.com/in/devenazevedo/",
  },
  {
    name: "Dr. Aaron Hoyle",
    role: "Director of EPM",
    bio: "Leads the EPM initiative, overseeing various phases of the EPM process and technical framework.",
    photo: "/team/dr-aaron-hoyle.jpg",
    href: "https://www.linkedin.com/in/aaron-hoyle-19312494/",
  },
];

const STEERING_COMMITTEE: Member[] = [
  {
    name: "Dr. Madeleine McPherson",
    role: "Principal Investigator, SESIT Group — Associate Professor, University of Victoria",
    photo: "/team/dr-madeleine-mcpherson.jpg",
    href: "https://www.uvic.ca/ecs/civil/people/home/faculty-profiles/mcpherson-madeleine.php",
  },
  {
    name: "Edouard Clement",
    role: "Executive Director, Energy Modelling Hub",
    photo: "/team/edouard-clement.jpg",
    href: "https://www.linkedin.com/in/edouard-clement-3289665/",
  },
  {
    name: "Michael Bernstein",
    role: "President and Chief Executive Officer, Clean Prosperity",
    photo: "/team/michael-bernstein.jpg",
    href: "https://cleanprosperity.ca/team/michael-bernstein/",
  },
];

function TeamCard({ m }: { m: Member }) {
  return (
    <article className="team-card">
      <a href={m.href} target="_blank" rel="noopener" className="team-card-link" aria-label={`${m.name} — LinkedIn profile`}>
        <div className="team-avatar">
          <Image src={m.photo} alt={m.name} width={120} height={120} />
        </div>
        <div className="team-name">{m.name}</div>
      </a>
      <div className="team-role">{m.role}</div>
      {m.bio && <p className="team-bio">{m.bio}</p>}
    </article>
  );
}

export default function TeamPage() {
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
          <div className="team-group-desc">Project leadership and strategic communications.</div>
          <div className="team-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {OPEN_INSIGHTS_TEAM.map((m) => <TeamCard key={m.name} m={m} />)}
          </div>
        </div>

        <div className="team-group">
          <div className="team-group-title">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--teal)" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            Steering Committee
          </div>
          <div className="team-group-desc">Institutional leadership and strategic oversight.</div>
          <div className="team-grid">
            {STEERING_COMMITTEE.map((m) => <TeamCard key={m.name} m={m} />)}
          </div>
        </div>

        <div className="team-cta">
          <div className="section-label">Media &amp; Inquiries</div>
          <p>
            For media inquiries, research collaboration requests, or technical questions, contact
            the Open Insights team directly.
          </p>
          <Link href="/contact" className="btn-primary">Contact Us</Link>
        </div>
      </div>
    </>
  );
}
