import type { Metadata } from "next";
import { ContactForm } from "@/components/blocks/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Energy Policy Monitor team at Open Insights.",
};

export default function ContactPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="section-label">Get in touch</div>
          <h1>Contact the EPM team</h1>
          <p>
            Have a question, a policy to flag, or an academic partnership in mind? Reach out.
          </p>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-form-section">
          <h2>Send us a message</h2>
          <p>We read everything and respond within a few business days.</p>
          <ContactForm />
        </div>

        <aside className="contact-info">
          <h2>Other ways to reach us</h2>
          <p>Prefer email or social? Here's where to find the EPM team.</p>

          <div className="contact-channel">
            <div className="contact-channel-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <div className="contact-channel-label">Email</div>
              <div className="contact-channel-value">info@openinsights.org</div>
              <div className="contact-channel-note">For media, research, and partnership inquiries.</div>
            </div>
          </div>

          <div className="contact-channel">
            <div className="contact-channel-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div>
              <div className="contact-channel-label">GitHub</div>
              <div className="contact-channel-value">
                <a
                  href="https://github.com/edouardclement-hub/OpenInsights"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--teal)" }}
                >
                  edouardclement-hub/OpenInsights
                </a>
              </div>
              <div className="contact-channel-note">Issues, pull requests, and replication questions.</div>
            </div>
          </div>

          <div className="contact-channel">
            <div className="contact-channel-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <div className="contact-channel-label">Location</div>
              <div className="contact-channel-value">Ottawa, ON · Canada</div>
              <div className="contact-channel-note">Remote-first team across Canada.</div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
