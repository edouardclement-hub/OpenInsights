import type { Metadata } from "next";
import M3PlatformSchematic from "@/components/blocks/M3PlatformSchematic";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How every EPM assessment is built: a standardized, reproducible process from policy announcement to published results.",
};

const TIMELINE_STEPS = [
  {
    n: "00",
    title: "Policy announced",
    phase: "Phase 0",
    desc: "A major energy or climate policy announcement triggers a review of which measures can be modelled.",
  },
  {
    n: "01",
    title: "Policy encoding",
    phase: "Phase 1",
    desc: "The EPM team parses and encodes the policy measures using a standard template that translates each policy measure into model inputs.",
  },
  {
    n: "02",
    title: "Baseline validation",
    phase: "Phase 2",
    desc: "Baseline data is validated against a shared, public set of baseline assumptions. Scope and sector coverage are confirmed.",
  },
  {
    n: "03",
    title: "Model runs",
    phase: "Phase 3",
    desc: "M3 Platform optimization runs produce emissions, energy system, and socio-economic results.",
  },
  {
    n: "04",
    title: "Review & publish",
    phase: "Phase 4",
    desc: "Two-page brief authoring, permanent archiving with a DOI, and public release.",
  },
];

export default function MethodologyPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="section-label">Technical framework</div>
          <h1>How every assessment is built</h1>
          <p>A standardized, reproducible process from policy announcement to published results.</p>
        </div>
      </div>

      <div className="method-content">
        <div className="method-intro">
          <p>
            Every EPM assessment is produced using the{" "}
            <a href="https://m3.cme-emh.ca/" target="_blank" rel="noreferrer" style={{ color: "var(--teal)", textDecoration: "underline" }}>
              M3 Platform
            </a>
            , a suite of energy-economy models capable of evaluating policy and regulatory
            proposals at federal, provincial, and regional resolutions.
          </p>
        </div>

        <M3PlatformSchematic />

        <div className="timeline">
          <div className="timeline-title">The EPM assessment process</div>
          <div className="timeline-track">
            {TIMELINE_STEPS.map((s) => (
              <div key={s.n} className="timeline-step">
                <div className="timeline-dot">{s.n}</div>
                <div className="timeline-step-title">{s.title}</div>
                <div className="timeline-step-days">{s.phase}</div>
                <div className="timeline-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="comparison-table">
          <div className="comparison-col featured">
            <div className="comparison-header featured">
              <div className="comparison-tier">Every assessment</div>
              <div className="comparison-name">EPM Core</div>
            </div>
            <div className="comparison-body" style={{ padding: "24px 28px" }}>
              <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, fontSize: 14, color: "var(--slate)", lineHeight: 2.1 }}>
                <li>Rapid turnaround from announcement</li>
                <li>Two-page summary of key findings</li>
                <li>Full Policy Encoding Sheet (CSV)</li>
                <li>Results dataset</li>
                <li>Public code repository with model code and assumptions</li>
                <li>Permanent public archive with a citable DOI</li>
                <li><a href="https://m3.cme-emh.ca/open-visualization-tools/" target="_blank" rel="noreferrer" style={{ color: "var(--teal)", textDecoration: "underline" }}>Interactive results dashboard</a></li>
                <li>Results reported for emissions, the economy, and infrastructure.</li>
              </ul>
            </div>
          </div>
          <div className="comparison-col">
            <div className="comparison-header">
              <div className="comparison-tier">Follow-up analysis</div>
              <div className="comparison-name">EPM+</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>Released after EPM Core</div>
            </div>
            <div className="comparison-body" style={{ padding: "24px 28px" }}>
              <p style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.65, margin: "0 0 16px" }}>
                EPM+ is an independent academic response to EPM Core. Written by an external
                contributor, it explores what the policy means in practice, beyond the two-page
                summary.
              </p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", margin: "0 0 8px" }}>
                EPM+ briefs include:
              </p>
              <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, fontSize: 14, color: "var(--slate)", lineHeight: 2.1 }}>
                <li>Policy sensitivity analysis</li>
                <li>Regional and distributional implications</li>
              </ul>
            </div>
          </div>
        </div>

        <section id="baseline" className="method-baseline" style={{ maxWidth: 680, scrollMarginTop: 120 }}>
          <div className="section-label">Scenario baseline</div>
          <div className="section-title" style={{ fontSize: 24, marginBottom: 20 }}>
            Baseline: November 2026{" "}
            <a
              href="#baseline"
              className="baseline-permalink"
              aria-label="Link to the Baseline: November 2026 section"
              title="Link to this section"
            >
              #
            </a>
          </div>
          <p style={{ fontSize: 15.5, color: "var(--slate)", lineHeight: 1.75 }}>[COPY TO COME]</p>
        </section>

        <div style={{ maxWidth: 680 }}>
          <div className="section-label">Transparency</div>
          <div className="section-title" style={{ fontSize: 24, marginBottom: 20 }}>
            Every assessment can be checked
          </div>
          <p style={{ fontSize: 15.5, color: "var(--slate)", lineHeight: 1.75 }}>
            Each assessment is published with its policy inputs, model code, assumptions, and
            results. Where reasonable modelling choices could differ, we disclose them in the
            technical appendix.
          </p>
        </div>
      </div>
    </>
  );
}
