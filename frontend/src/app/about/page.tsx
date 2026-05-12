import type { Metadata } from "next";
import { FaqAccordion, type FaqItem } from "@/components/blocks/FaqAccordion";
import { getFaqs } from "@/lib/strapi";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Energy Policy Monitor — independent assessment infrastructure for Canadian energy and climate policy.",
};

const FALLBACK_FAQS: FaqItem[] = [
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

export default async function AboutPage() {
  let faqs: FaqItem[] = FALLBACK_FAQS;
  try {
    const res = await getFaqs();
    if (res.data.length > 0) {
      faqs = res.data.map((f) => ({ id: f.id, question: f.question, answer: f.answer }));
    }
  } catch {
    // use fallback
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="section-label">About EPM</div>
          <h1>About the Energy Policy Monitor</h1>
          <p>Independent assessment infrastructure for Canadian energy and climate policy.</p>
        </div>
      </div>

      <div className="about-content">
        <div className="about-main">
          <h2>What is Open Insights?</h2>
          <p>
            The Energy Policy Monitor (EPM) is led by the{" "}
            <a href="https://www.openinsights.ca/" target="_blank" rel="noopener" style={{ color: "var(--teal)" }}>
              Open Insights
            </a>
            {" "}team, enabled by{" "}
            <a href="https://cme-emh.ca/en/" target="_blank" rel="noreferrer" style={{ color: "var(--teal)" }}>
              Energy Modelling Hub
            </a>
            ‘s operational support, and by model development contributions from academic partner
            institutions including{" "}
            <a href="https://sesit.cive.uvic.ca/" target="_blank" rel="noreferrer" style={{ color: "var(--teal)" }}>
              SESIT-UVic
            </a>
            . Open Insights is a shared framework for transparent energy modelling, providing the
            common standards and open-source commitments that connect academic model developers,
            operational infrastructure partners, and published outputs under one consistent,
            transparent process.
          </p>
          <p>
            The EPM is Open Insights' flagship assessment service, providing independent, timely,
            and credible evaluation of major Canadian energy and climate policy announcements. Every
            EPM assessment is powered by the{" "}
            <a href="https://m3.cme-emh.ca/" target="_blank" rel="noreferrer" style={{ color: "var(--teal)" }}>
              M3 Platform
            </a>
            .
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
            <h3>Institutional structure</h3>
            <div className="institution-node">
              <div className="institution-node-name">Academic partners</div>
              <div className="institution-node-role">Build open-source modelling tools.</div>
            </div>
            <div className="institution-plus">+</div>
            <div className="institution-node">
              <div className="institution-node-name">Energy Modelling Hub</div>
              <div className="institution-node-role">
                Operates and hosts the open-source infrastructure that EPM relies on.
              </div>
            </div>
            <div className="institution-equals" />
            <div className="institution-result">
              Open Insights publishes transparent assessments and documentation for the public.
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
