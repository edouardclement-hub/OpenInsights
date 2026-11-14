import type { Metadata } from "next";
import { FaqAccordion, type FaqItem } from "@/components/blocks/FaqAccordion";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Energy Policy Monitor: independent modelling of Canadian energy and climate policy.",
};

// FAQs are owned by this file, not the CMS. Edit them here.
const FAQS: FaqItem[] = [
  {
    id: "what-is-epm",
    question: "What is the EPM?",
    answer:
      "The Energy Policy Monitor (EPM) is an independent, timely, and credible assessment framework for major Canadian energy and climate policy. Each assessment evaluates a proposed policy or announcement's projected impact on emissions, energy systems, and socio-economic indicators using open-source modelling infrastructure. All results, code, data, and assumptions are published publicly for public review and replication.",
  },
  {
    id: "core-vs-plus",
    question: "What's the difference between EPM Core and EPM+?",
    answer:
      "EPM Core is the standard rapid-response assessment: a 2-page neutral summary, full data package, and public audit trail. EPM+ is an additional follow-on brief authored by an academic partner, offering expert interpretation, policy sensitivity analysis, and regional implications. EPM+ is published on a variable timeline after EPM Core concludes.",
  },
  {
    id: "timeline",
    question: "How long does an assessment take?",
    answer:
      "EPM Core assessments are typically completed within a few weeks of a policy announcement. The process moves through four phases: policy encoding, baseline validation, model runs, and results review and publication. EPM+ briefs are published on a variable schedule following EPM Core.",
  },
  {
    id: "request",
    question: "Who can request an assessment?",
    answer:
      "Assessment requests are open to any individual, organization, or institution. All requests are reviewed against EPM's scope criteria: the policy must include specific, modellable energy or emissions measures. The same methodology applies regardless of who submitted the request.",
  },
  {
    id: "citation",
    question: "How do I cite an EPM assessment in my research?",
    answer:
      "Each assessment detail page includes a pre-formatted citation. Click \"Copy citation\" on any assessment page to get the full citation. All assessments are archived on Zenodo and carry permanent DOIs.",
  },
  {
    id: "funding",
    question: "How is the EPM funded?",
    answer:
      "EPM is a collaborative effort between Open Insights and its funders. EPM does not accept direct funding from governments, political parties, or industry bodies.",
  },
];

/**
 * The "At a glance" card beside "How EPM works". Each organisation is linked
 * on the word that names it, not across the whole row.
 */
const GLANCE_ROWS: Array<{ label: string; value: React.ReactNode }> = [
  {
    label: "Framework",
    value: (
      <a href="https://www.openinsights.ca/" target="_blank" rel="noopener">
        Open Insights
      </a>
    ),
  },
  {
    label: "Academic home",
    value: (
      <>
        <a href="https://sesit.cive.uvic.ca/" target="_blank" rel="noreferrer">
          SESIT
        </a>
        , University of Victoria
      </>
    ),
  },
  {
    label: "Models",
    value: (
      <>
        <a href="https://m3.cme-emh.ca/" target="_blank" rel="noreferrer">
          M3 Platform
        </a>
        {" "}(open-source)
      </>
    ),
  },
  { label: "Every assessment", value: "Published with full documentation" },
];

export default function AboutPage() {
  const faqs: FaqItem[] = FAQS;

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="section-label">About EPM</div>
          <h1>About the Energy Policy Monitor</h1>
          <p>Independent modelling of Canadian energy and climate policy.</p>
        </div>
      </div>

      <div className="about-content">
        <div className="about-main">
          <h2>How EPM works</h2>
          <p>
            The Energy Policy Monitor (EPM) evaluates major Canadian energy and climate policies
            within{" "}
            <a href="https://www.openinsights.ca/" target="_blank" rel="noopener" style={{ color: "var(--teal)" }}>
              Open Insights
            </a>
            , a framework for transparent energy modelling developed at{" "}
            <a href="https://sesit.cive.uvic.ca/" target="_blank" rel="noreferrer" style={{ color: "var(--teal)" }}>
              SESIT
            </a>
            {" "}(University of Victoria).
          </p>
          <p>
            Each EPM assessment draws on the{" "}
            <a href="https://m3.cme-emh.ca/" target="_blank" rel="noreferrer" style={{ color: "var(--teal)" }}>
              M3 Platform
            </a>
            , an open-source suite of linked energy and economic models developed at SESIT and
            maintained by the{" "}
            <a href="https://cme-emh.ca/en/" target="_blank" rel="noreferrer" style={{ color: "var(--teal)" }}>
              Energy Modelling Hub
            </a>
            . For every assessment, we publish the inputs, assumptions, and results, so that the
            analysis can be independently reviewed and reproduced.
          </p>

          <h2>Our commitment</h2>
          <div className="commitment-cards">
            <div className="commitment-card">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <div>
                <h4>Timely</h4>
                <p>
                  Assessments are completed shortly after major energy policy announcements or
                  election platform releases. Results are published while the policy is still being
                  actively discussed.
                </p>
              </div>
            </div>
            <div className="commitment-card">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div>
                <h4>Independent</h4>
                <p>
                  The same methodology is applied consistently to every policy and jurisdiction.
                  EPM assessments are non-partisan reviews committed to sharing modelled outcomes
                  openly, without advocacy.
                </p>
              </div>
            </div>
            <div className="commitment-card">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <div>
                <h4>Credible</h4>
                <p>
                  The full open-source audit trail (code, data, assumptions) is published to a
                  public repository. Every assessment carries a Zenodo DOI for citation.
                </p>
              </div>
            </div>
          </div>

          <h2>How assessments are selected</h2>
          <p>
            The EPM evaluates <strong>major</strong> Canadian federal or provincial energy or
            climate policy announcements, regardless of party or ideology. A policy qualifies for
            assessment if it includes specific, modellable energy or emissions measures. Assessments
            are not commissioned by governments, parties, or funders.
          </p>

          <h2>Frequently asked questions</h2>
          <FaqAccordion items={faqs} />
        </div>

        <aside className="about-sidebar">
          <div className="institution-diagram">
            <h3>At a glance</h3>
            <dl className="glance-list">
              {GLANCE_ROWS.map((row) => (
                <div className="glance-row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </>
  );
}
