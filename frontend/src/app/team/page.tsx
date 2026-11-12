import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Team",
  description: "Who produces the EPM: the Open Insights team and the model development leads.",
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
    name: "Dr. Madeleine McPherson",
    role: "Principal Investigator, SESIT Group, Associate Professor, University of Victoria",
    bio: "Leads the EPM initiative, overseeing various phases of the EPM analysis and validation process.",
    photo: "/team/dr-madeleine-mcpherson.jpg",
    href: "https://www.linkedin.com/in/madeleine-mcpherson-01b36719/",
  },
  {
    name: "Dr. Aaron Hoyle",
    role: "Project Director, Energy Policy Monitor",
    bio: "Leads the EPM initiative, overseeing various phases of the EPM process and technical framework.",
    photo: "/team/dr-aaron-hoyle.jpg",
    href: "https://www.linkedin.com/in/aaron-hoyle-19312494/",
  },
];

const MODEL_DEVELOPMENT_LEADS: Member[] = [
  {
    name: "Dr. Aaron Hoyle",
    role: "Demand-Side Lead",
    photo: "/team/dr-aaron-hoyle.jpg",
    href: "https://www.linkedin.com/in/aaron-hoyle-19312494/",
  },
  {
    name: "Dr. Madeleine Seatle",
    role: "Power Systems Lead",
    photo: "/team/dr-madeleine-seatle.jpg",
    href: "https://www.linkedin.com/in/madeleine-seatle-19b35614a/",
  },
  {
    name: "Dr. Esmaeil Izadi",
    role: "Macroeconomic Lead",
    photo: "/team/dr-esmaeil-izadi.jpg",
    href: "https://www.linkedin.com/in/esiz/",
  },
  {
    name: "Bipasa Agrawal",
    role: "Probabilistic Resource Adequacy Suite (PRAS) Lead",
    photo: "/team/bipasa-agrawal.jpg",
    href: "https://www.linkedin.com/in/bipasa-agrawal-6230521b8/",
  },
  {
    name: "Jonas Kraasch",
    role: "Uncertainty Analysis Lead",
    photo: "/team/jonas-kraasch.jpg",
    href: "https://www.linkedin.com/in/jonas-kraasch-5716a7166/",
  },
];

function TeamCard({ m }: { m: Member }) {
  return (
    <article className="team-card">
      <a href={m.href} target="_blank" rel="noopener" className="team-card-link" aria-label={`${m.name}, LinkedIn profile`}>
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
            A collaboration between the Open Insights team and university research partners.
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
          <div className="team-group-desc">Project leadership and delivery</div>
          <div className="team-grid">
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
            Model Development Leads
          </div>
          <div className="team-group-desc">
            Academic leads developing the energy system models and the M3 Platform.
          </div>
          <div className="team-grid">
            {MODEL_DEVELOPMENT_LEADS.map((m) => <TeamCard key={m.name} m={m} />)}
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
