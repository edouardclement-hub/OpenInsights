import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand & Use Policy",
};

export default function BrandUsePolicyPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <h1>Brand &amp; Use Policy</h1>
          <p>Last updated: November 2026</p>
        </div>
      </div>

      <div className="method-content">
        <section className="method-section">
          <div className="method-section-head">
            <h2 className="section-title method-section-title">
              Use of Open Insights models, data and brand
            </h2>
          </div>

          <div className="method-prose">
            <p>
              The models, code, data and assumptions behind{" "}
              <a href="https://www.openinsights.ca/" target="_blank" rel="noopener noreferrer">
                Open Insights
              </a>{" "}
              analysis are open-source and published through the{" "}
              <a href="https://m3.cme-emh.ca/" target="_blank" rel="noopener noreferrer">
                M3 Platform
              </a>
              . We encourage anyone to use them. Using them does not make the results an Open
              Insights product.
            </p>
            <p>
              Only analysis published by Open Insights, through the Energy Policy Monitor or a
              Custom Scenario Analysis released jointly with our partners, can be labelled Open
              Insights analysis. Work by anyone else that uses the M3 Platform, its component
              models, or assumptions and data published by Open Insights is the sole
              responsibility of its authors. That holds even when it starts from an Open
              Insights scenario or input data. Open Insights has not reviewed or validated such
              work and does not endorse its findings.
            </p>
            <p>
              When describing such work, you may say that it{" "}
              <strong>used the M3 Platform</strong> or a named component model (for example,
              COPPER or MacroABM-CA).
            </p>
            <p>You may not:</p>
            <ul className="baseline-list">
              <li>
                Attribute findings, results or conclusions to Open Insights or the Energy Policy
                Monitor (for example, &ldquo;Open Insights modelling shows&hellip;&rdquo; or
                &ldquo;according to Open Insights models&hellip;&rdquo;);
              </li>
              <li>
                Describe the work as produced, reviewed, validated or endorsed by Open Insights,
                the Energy Policy Monitor, or any of their partner organizations; or
              </li>
              <li>
                Use the Open Insights or Energy Policy Monitor names, logos or visual identity in
                any report, presentation, publication, website, media or promotional material.
              </li>
            </ul>
            <p>
              If you would like to collaboratively produce or release analysis with Open
              Insights, please reach out to{" "}
              <a href="mailto:deven@openinsights.ca">deven@openinsights.ca</a>.
            </p>
            <p>
              If you are citing a{" "}
              <a href="https://www.openinsights.ca/" target="_blank" rel="noopener noreferrer">
                published Open Insights assessment
              </a>, please cite it
              directly and do not present new or modified results as part of it. See the{" "}
              <a
                href="https://sesit.gitlab.io/m3-linkages"
                target="_blank"
                rel="noopener noreferrer"
              >
                M3 documentation
              </a>
              {/* TODO: update "M3 documentation" link to the Citing M3 page once live */} for
              how to cite and acknowledge the M3 Platform.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
