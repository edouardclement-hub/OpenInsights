import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyCitation } from "@/components/blocks/CopyCitation";
import { CopyLinkButton } from "@/components/blocks/CopyLinkButton";
import {
  BASELINES,
  baselineMonthYear,
  baselinePath,
  getBaseline,
  getCurrentBaseline,
  isCurrentBaseline,
  assessmentBaselineId,
  assertBaselineVersions,
  BaselineVersionError,
} from "@/lib/baselines";
import { formatAssessmentDate, getAssessments } from "@/lib/strapi";

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://epm.openinsights.ca";

interface Params {
  id: string;
}

export function generateStaticParams() {
  return BASELINES.map((b) => ({ id: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const baseline = getBaseline(id);
  if (!baseline) return { title: "Baseline not found" };
  return {
    title: baseline.label,
    description:
      "The energy and climate policies that every EPM assessment is compared against.",
  };
}

export default async function BaselineVersionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const baseline = getBaseline(id);
  if (!baseline) notFound();

  const current = getCurrentBaseline();
  const isCurrent = isCurrentBaseline(baseline.id);
  const monthYear = baselineMonthYear(baseline.id);
  const pageUrl = `${SITE_URL}${baselinePath(baseline.id)}`;
  const citation = baseline.zenodoDoi
    ? `Open Insights. (${baseline.id.slice(0, 4)}). ${baseline.label}. Energy Policy Monitor. https://doi.org/${baseline.zenodoDoi}`
    : `Open Insights. (${baseline.id.slice(0, 4)}). ${baseline.label}. Energy Policy Monitor. ${pageUrl}`;

  // Listed automatically from each assessment's Baseline version field: nothing
  // here is hard-coded, so a new assessment appears as soon as it names this
  // version. Newest first.
  let assessments: Array<{
    slug: string;
    title: string;
    publishedDate: string;
    publishedDateLabel?: string | null;
  }> = [];
  try {
    const res = await getAssessments();
    assertBaselineVersions(res.data);
    assessments = res.data
      .filter((a) => assessmentBaselineId(a) === baseline.id)
      .sort((x, y) => y.publishedDate.localeCompare(x.publishedDate));
  } catch (err) {
    // A failed Baseline version check must stop the build, not be swallowed
    // along with a Strapi outage: the rest of the page stands on its own.
    if (err instanceof BaselineVersionError) throw err;
  }

  return (
    <div className="baseline-page">
      <div className="baseline-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/methodology">Methodology</Link>
        <span>/</span>
        <Link href="/methodology#baseline">Baseline</Link>
        <span>/</span>
        <span className="baseline-breadcrumb-current">{monthYear}</span>
      </div>

      {!isCurrent && (
        <div className="baseline-earlier-banner" role="note">
          This is an earlier Baseline. The current version is{" "}
          <Link href={baselinePath(current.id)}>{current.label}</Link>.
        </div>
      )}

      <div className="baseline-title-row">
        <h1 className="baseline-title">{baseline.label}</h1>
        <span className={`baseline-state${isCurrent ? " is-current" : ""}`}>
          {isCurrent ? "Current" : "Earlier version"}
        </span>
        <CopyLinkButton target={baselinePath(baseline.id)} label="Copy link to this version" />
      </div>

      {baseline.correction && (
        <div className="baseline-correction" role="note">
          <strong>Correction, {baseline.correction.date}:</strong> {baseline.correction.note}
        </div>
      )}

      <div className="baseline-layout">
        <div className="baseline-main">
          <section className="baseline-section">
            <h2>Introduction</h2>
            <p>
              In our assessments, we evaluate new policies using scenario analysis: a method
              for exploring plausible futures by asking &ldquo;what if&rdquo; questions under
              different sets of assumptions.
            </p>
            <p>
              In our context, a Baseline scenario captures how Canada&rsquo;s energy system
              could evolve under currently legislated policies, together with a small set of
              proposed policies that we believe are especially likely to soon be implemented.
            </p>
          </section>

          <section className="baseline-section">
            <h2>What Is a Baseline?</h2>
            <p>
              The Baseline includes the energy and climate policies that are already law in
              Canada as of <strong>{monthYear}</strong>, in addition to some proposed policies
              that we believe are especially likely to soon be implemented.
            </p>
            <p>
              Holding the Baseline to legislated measures, and to the small set of proposed
              ones we believe are especially likely to soon be implemented, limits speculation
              about which announced measures will proceed and grounds each comparison in a
              clear, verifiable reference point.
            </p>
            <p>
              For example, a measure announced in a federal budget but not yet passed is
              normally excluded from the Baseline, unless we believe it is especially likely to
              soon be implemented. It is incorporated in the first update after it becomes law.
            </p>
            <p>
              The Baseline is a reference point, not a forecast. It does not attempt to predict
              future policy; it is the point of comparison that shows a newly announced
              policy&rsquo;s potential effects.
            </p>
            <p>
              For factors beyond government policy, such as economic growth, energy prices, and
              technology costs, the Baseline adopts central (mid-range) estimates rather than
              optimistic or pessimistic assumptions.
            </p>
          </section>

          <section className="baseline-section">
            <h2>What Is In this Specific Baseline?</h2>
            <p>
              The Baseline is built from information about the energy system and the economy.
              We consider factors such as energy and climate policy, energy markets and
              infrastructure, and how technology is expected to change over time.
            </p>

            <div className="baseline-input-cards">
              <div className="baseline-input-card">
                <h3>Energy and Climate Policy</h3>
                <p>
                  We represent federal and provincial laws, regulations, and programs that
                  influence how Canada&rsquo;s energy system evolves. The Baseline includes
                  measures that are legislated or in force, in addition to a small set of
                  proposed policies that we believe are especially likely to soon be
                  implemented. We document how each policy is represented in our policy
                  assumptions database.
                </p>
              </div>

              <div className="baseline-input-card">
                <h3>The Macroeconomy and Energy Markets</h3>
                <p>
                  We use open-source models to estimate how the economy could respond to energy
                  policy. We consider economic growth, the labour market, household and
                  government spending, and inflation.
                </p>
                <p className="baseline-list-lead">
                  <strong>Key assumptions:</strong>
                </p>
                <ul className="baseline-list">
                  <li>
                    <strong>Population growth:</strong> follows Statistics Canada&rsquo;s
                    medium-growth projection (M1)
                  </li>
                  <li>
                    <strong>Exchange rates:</strong> the Canadian dollar stays at its 2022 value
                    (2022 is the model&rsquo;s starting year)
                  </li>
                  <li>
                    <strong>Export demand:</strong> foreign demand for services that are rarely
                    exported, such as healthcare and education, stays at 2022 levels. Industries
                    that compete internationally respond to changes in their prices compared with
                    the rest of the world.
                  </li>
                  <li>
                    <strong>Public finances:</strong> tax rates and social contributions stay at
                    2022 levels unless otherwise noted, so any government deficit adds to public
                    debt, with no assumed limit.
                  </li>
                  <li>
                    <strong>Energy prices, production, and use:</strong> taken from our in-house
                    energy and power systems models
                  </li>
                </ul>
                <p>
                  Our energy and power systems models use the Canada Energy Regulator&rsquo;s
                  Energy Futures series for crude oil and natural gas price projections. Those
                  projections draw on the CER&rsquo;s review of several global outlooks.
                </p>
              </div>

              <div className="baseline-input-card">
                <h3>Energy Infrastructure and Major Projects</h3>
                <p>
                  Our models do not represent every announced industrial project one-for-one.
                  Instead, the models estimate how much new energy infrastructure, such as power
                  plants and pipelines, gets built, based on demand, costs, markets, and policy.
                  In a smaller set of cases, we include a specific project or expected path (for
                  example, west-coast LNG exports) because it is large enough, certain enough, or
                  otherwise important to the national energy system.
                </p>
              </div>

              <div className="baseline-input-card">
                <h3>Technological Change</h3>
                <p>
                  The Baseline uses mid-range estimates of technology costs and performance from
                  sources such as the{" "}
                  <a href="https://www.iea.org/" target="_blank" rel="noreferrer">
                    International Energy Agency
                  </a>{" "}
                  and the{" "}
                  <a href="https://www.nlr.gov/" target="_blank" rel="noreferrer">
                    National Laboratory of the Rockies
                  </a>{" "}
                  (formerly the National Renewable Energy Laboratory). These projections account
                  for factors such as how mature a technology is and how its supply chains
                  develop.
                </p>
              </div>
            </div>
          </section>

          <section className="baseline-section">
            <h2>Which Baseline Is Current?</h2>
            <p>
              The Baseline is a living record of energy and climate policy in Canada. As new
              measures become law, we update the Baseline and publish a new version,
              identified by the date on which it was set (for example,
              &ldquo;Baseline: November 2026&rdquo;). The most recent version appears first on
              this page and is marked &ldquo;Current.&rdquo;
            </p>
            <p>
              Every EPM assessment identifies the Baseline version it uses. Earlier versions
              remain available on this page, so readers can consult the exact set of policies
              underlying any assessment, including those published before subsequent updates.
            </p>
          </section>

          {/* Hidden entirely, heading included, until an assessment uses this version. */}
          {assessments.length > 0 && (
            <section className="baseline-section">
              <h2>Assessments using this Baseline</h2>
              <ul className="baseline-assessment-list">
                {assessments.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/assessments/${a.slug}`}>
                      <span className="baseline-assessment-title">{a.title}</span>
                      <span className="baseline-assessment-date">
                        {a.publishedDateLabel || formatAssessmentDate(a.publishedDate)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="baseline-sidebar">
          <div className="baseline-card">
            <div className="baseline-card-title">All Baseline versions</div>
            <ul className="baseline-card-versions">
              {BASELINES.map((b) => (
                <li key={b.id}>
                  <Link
                    href={baselinePath(b.id)}
                    className={b.id === baseline.id ? "is-active" : undefined}
                  >
                    {baselineMonthYear(b.id)}
                  </Link>
                  {isCurrentBaseline(b.id) && (
                    <span className="baseline-state is-current">Current</span>
                  )}
                </li>
              ))}
            </ul>
            {BASELINES.length === 1 && (
              <p className="baseline-card-note">
                Earlier versions will be listed here, newest first, as the Baseline is updated.
              </p>
            )}
          </div>

          <div className="baseline-card">
            <div className="baseline-card-title">Share or cite this Baseline</div>
            <CopyLinkButton
              target={baselinePath(baseline.id)}
              label={`Copy link to ${baseline.label}`}
              variant="button"
            />
            <CopyCitation
              citation={citation}
              label="Cite this Baseline"
              className="baseline-btn is-secondary"
            />
            {/* The Download PDF button appears only once a PDF exists. */}
            {baseline.pdfUrl && (
              <a
                className="baseline-btn is-secondary"
                href={baseline.pdfUrl}
                target="_blank"
                rel="noreferrer"
              >
                Download PDF
              </a>
            )}
            <div className="baseline-card-url">
              {pageUrl.replace(/^https?:\/\//, "")}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
