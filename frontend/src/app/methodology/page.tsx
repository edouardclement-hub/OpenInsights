import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How every EPM assessment is built — a standardized, reproducible process from policy announcement to published results.",
};

const TIMELINE_STEPS = [
  {
    n: "00",
    title: "Policy announced",
    phase: "Phase 0",
    desc: "A major energy or climate policy announcement triggers an EPM scope review.",
  },
  {
    n: "01",
    title: "Policy encoding",
    phase: "Phase 1",
    desc: "The EPM team parses and encodes the policy measures using the standardized Policy Encoding framework.",
  },
  {
    n: "02",
    title: "Baseline validation",
    phase: "Phase 2",
    desc: "Baseline data is validated against the Assumptions Database. Scope and sector coverage are confirmed.",
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
    desc: "External QAQC validation, 2-page brief authoring, Zenodo archiving, and public release.",
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

        <div className="m3-schematic">
          <span className="m3-schematic-label">Image placeholder</span>
          <span className="m3-schematic-sublabel">M3 Platform architecture diagram · 800 × 360 px</span>
        </div>

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
              <div className="comparison-tier">Standard service</div>
              <div className="comparison-name">EPM Core</div>
            </div>
            <div className="comparison-body" style={{ padding: "24px 28px" }}>
              <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, fontSize: 14, color: "var(--slate)", lineHeight: 2.1 }}>
                <li>Rapid turnaround from announcement</li>
                <li>2-page neutral summary of key findings</li>
                <li>Full Policy Encoding Sheet (CSV)</li>
                <li>Complete results dataset (ZIP)</li>
                <li>Public GitHub repository with code & assumptions</li>
                <li>Zenodo archiving with permanent DOI</li>
                <li>QAQC validated by independent experts</li>
              </ul>
            </div>
          </div>
          <div className="comparison-col">
            <div className="comparison-header">
              <div className="comparison-tier">Expert extension</div>
              <div className="comparison-name">EPM+</div>
              <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4 }}>Released after EPM Core</div>
            </div>
            <div className="comparison-body" style={{ padding: "24px 28px" }}>
              <p style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.65, margin: "0 0 16px" }}>
                EPM+ is an independent academic response to EPM Core. Written by an external
                contributor, it explores what the policy means in practice — beyond the neutral
                2-page summary.
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

        <div style={{ maxWidth: 680 }}>
          <div className="section-label">Quality assurance</div>
          <div className="section-title" style={{ fontSize: 24, marginBottom: 20 }}>
            Every assessment is QAQC validated
          </div>
          <p style={{ fontSize: 15.5, color: "var(--slate)", lineHeight: 1.75, marginBottom: 16 }}>
            Before publication, each EPM brief passes through an independent validation process —
            covering policy encoding accuracy, baseline data currency, model parameter selection,
            and results interpretation. Validation is performed by experts not involved in the run.
          </p>
          <p style={{ fontSize: 15.5, color: "var(--slate)", lineHeight: 1.75 }}>
            Validation status is published alongside every brief. Contested assumptions or
            encoding decisions are disclosed in the technical appendix.
          </p>
        </div>
      </div>
    </>
  );
}
