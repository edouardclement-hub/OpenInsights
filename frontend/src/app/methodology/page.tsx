import type { Metadata } from "next";
import Link from "next/link";
import M3PlatformSchematic from "@/components/blocks/M3PlatformSchematic";
import { AssessmentDisclosure } from "@/components/blocks/AssessmentDisclosure";
import { CopyLinkButton } from "@/components/blocks/CopyLinkButton";
import {
  BASELINES,
  BASELINES_OLDEST_FIRST,
  baselinePath,
  baselineShortLabel,
  getCurrentBaseline,
  hasMultipleBaselines,
  isCurrentBaseline,
} from "@/lib/baselines";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How every EPM assessment is built: a standardized, reproducible process from policy announcement to published results.",
};

/**
 * The assessment process, as a vertical list. Steps 02, 03 and 04 each have a
 * section of their own further down the page, so their circle is filled and
 * they carry a link to it. The process is this page's only navigation.
 */
const PROCESS_STEPS: Array<{
  n: string;
  title: string;
  desc: string;
  link?: { label: string; href: string };
}> = [
  {
    n: "00",
    title: "Policy announced",
    desc: "A major energy or climate policy announcement triggers a review of which measures can be modelled.",
  },
  {
    n: "01",
    title: "Policy encoding",
    desc: "The EPM team encodes the policy measures using a standard template that translates each policy measure into model inputs.",
  },
  {
    n: "02",
    title: "Baseline validation",
    desc: "Baseline measures are validated against a shared, public set of baseline assumptions. Scope and sector coverage are confirmed.",
    link: { label: "About the Baseline ↓", href: "#baseline" },
  },
  {
    n: "03",
    title: "Model runs",
    desc: "M3 Platform runs produce emissions, energy system, and socio-economic results.",
    link: { label: "About the models ↓", href: "#models" },
  },
  {
    n: "04",
    title: "Review & publish",
    desc: "Two-page brief authoring, archiving with a DOI, and public release.",
    link: { label: "What gets published ↓", href: "#published" },
  },
];

const PILLARS = [
  {
    name: "Environment",
    desc: "Greenhouse gas emissions, reported in every assessment",
  },
  {
    name: "Economy",
    desc: "Household energy costs or GDP, depending on the policy",
  },
  {
    name: "Infrastructure",
    desc: "Measures relevant to the policy, such as the electricity generation mix",
  },
];

/**
 * Only "The Baseline" carries a copy-link button: it is the one section readers
 * are asked to link to. The others are plain headings.
 */
function SectionHead({
  id,
  title,
  copyLink = false,
}: {
  id: string;
  title: string;
  copyLink?: boolean;
}) {
  return (
    <div className="method-section-head">
      <h2 className="section-title method-section-title">{title}</h2>
      {copyLink && <CopyLinkButton target={`#${id}`} />}
    </div>
  );
}

export default function MethodologyPage() {
  const current = getCurrentBaseline();
  const showVersionHistory = hasMultipleBaselines();

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
        <section id="process" className="method-section">
          <SectionHead id="process" title="The EPM assessment process" />
          <ol className="process-steps">
            {PROCESS_STEPS.map((s, i) => (
              <li key={s.n} className="process-step">
                <div className="process-step-rail">
                  <div className={`process-dot${s.link ? " is-filled" : ""}`}>{s.n}</div>
                  {i < PROCESS_STEPS.length - 1 && <div className="process-line" />}
                </div>
                <div className="process-step-body">
                  <div className="process-step-title">{s.title}</div>
                  <p className="process-step-desc">{s.desc}</p>
                  {s.link && (
                    <a className="process-step-link" href={s.link.href}>
                      {s.link.label}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="baseline" className="method-section">
          <div className="section-label">Step 02</div>
          <SectionHead id="baseline" title="The Baseline" copyLink />
          <div className="method-prose">
            <p>
              The Baseline represents the energy and climate policies currently in law in
              Canada, in addition to some proposed policies that we believe are especially
              likely to soon be implemented.
            </p>
            <p>
              The Baseline is a reference point, not a forecast. It shows how Canada&rsquo;s
              energy system could evolve under existing policy alone. Comparing a newly
              announced policy against it isolates the change that the newly announced policy
              could produce.
            </p>
          </div>

          <div className="baseline-version-row">
            <div className="baseline-version-name">
              <strong>{current.label}</strong>
              <span className="baseline-version-state">Current</span>
            </div>
            <Link className="baseline-version-link" href={baselinePath(current.id)}>
              Read the full Baseline
            </Link>
          </div>

          {/* The rail and the past-versions panel stay hidden until a second
              version exists: with one version there is nothing to compare. */}
          {showVersionHistory && (
            <>
              <AssessmentDisclosure
                title="View all past Baselines"
                openTitle="Hide past Baselines"
              >
                <ul className="baseline-version-list">
                  {BASELINES.map((b) => (
                    <li key={b.id}>
                      <Link href={baselinePath(b.id)}>{b.label}</Link>
                      {isCurrentBaseline(b.id) && (
                        <span className="baseline-version-state">Current</span>
                      )}
                      <CopyLinkButton
                        target={baselinePath(b.id)}
                        label={`Copy link to ${b.label}`}
                      />
                    </li>
                  ))}
                </ul>
              </AssessmentDisclosure>

              <div className="baseline-rail">
                <div className="baseline-rail-line" aria-hidden="true" />
                <ol
                  className="baseline-rail-points"
                  style={{ gridTemplateColumns: `repeat(${BASELINES_OLDEST_FIRST.length}, minmax(0, 1fr))` }}
                >
                  {BASELINES_OLDEST_FIRST.map((b) => (
                    <li key={b.id} className="baseline-rail-point">
                      <div
                        className={`baseline-rail-dot${isCurrentBaseline(b.id) ? " is-current" : ""}`}
                        aria-hidden="true"
                      />
                      <Link className="baseline-rail-label" href={baselinePath(b.id)}>
                        {baselineShortLabel(b.id)}
                      </Link>
                      <div className="baseline-rail-headline">{b.headline}</div>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}
        </section>

        <section id="models" className="method-section">
          <div className="section-label">Step 03</div>
          <SectionHead id="models" title="The models and results" />
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

          <AssessmentDisclosure title="Show the M3 Platform diagram">
            <M3PlatformSchematic />
          </AssessmentDisclosure>

          <p className="method-pillars-intro">Assessment findings are reported under three pillars:</p>
          <div className="method-pillars">
            {PILLARS.map((p) => (
              <div key={p.name}>
                <div className="method-pillar-name">{p.name}</div>
                <div className="method-pillar-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="published" className="method-section">
          <div className="section-label">Step 04</div>
          <SectionHead id="published" title="What gets published" />
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
        </section>

        <section id="transparency" className="method-section">
          <div className="section-label">Transparency</div>
          <SectionHead id="transparency" title="Every assessment can be checked" />
          <div className="method-prose">
            <p>
              Each assessment is published with its policy inputs, model code, assumptions, and
              results.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
