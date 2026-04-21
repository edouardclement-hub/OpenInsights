import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-logo">
              <div className="logo-c" style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "24px" }}>
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </div>
              <div>
                <div className="footer-brand-name">Energy Policy Monitor</div>
                <div className="footer-brand-sub">Open Insights</div>
              </div>
            </div>
            <p className="footer-tagline">
              Independent, data-driven assessments of Canadian energy policy.
              Transparent modelling, traceable findings, publicly archived.
            </p>
          </div>

          <div>
            <div className="footer-links-title">Explore</div>
            <ul className="footer-links">
              <li><Link href="/assessments">Assessments</Link></li>
              <li><Link href="/methodology">Methodology</Link></li>
              <li><Link href="/compare">Compare tool</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-links-title">Organization</div>
            <ul className="footer-links">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-links-title">Open data</div>
            <ul className="footer-links">
              <li><a href="https://zenodo.org" target="_blank" rel="noreferrer">Zenodo archive</a></li>
              <li><a href="https://github.com/edouardclement-hub/OpenInsights" target="_blank" rel="noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Open Insights / Energy Policy Monitor. All rights reserved.
          </div>
          <div className="footer-social">
            <Link href="/privacy" className="social-btn" aria-label="Privacy policy" title="Privacy">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2">
                <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
              </svg>
            </Link>
            <Link href="/terms" className="social-btn" aria-label="Terms" title="Terms">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
