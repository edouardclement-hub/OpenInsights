import Link from "next/link";
import { NewsletterSignup } from "@/components/blocks/NewsletterSignup";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-newsletter">
          <NewsletterSignup />
        </div>

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
            </ul>
          </div>

          <div>
            <div className="footer-links-title">Organization</div>
            <ul className="footer-links">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/brand-use-policy">Brand &amp; Use Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Open Insights / Energy Policy Monitor. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
