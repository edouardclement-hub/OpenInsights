import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compare",
  description: "Compare EPM assessments side by side — coming soon.",
};

export default function ComparePage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="section-label">Tooling</div>
          <h1>Compare assessments</h1>
          <p>Side-by-side comparison of EPM assessments across jurisdictions and sectors.</p>
        </div>
      </div>

      <div className="method-content">
        <div className="method-intro">
          <p>
            The compare tool is under construction. In the meantime, browse the full{" "}
            <Link href="/assessments" style={{ color: "var(--teal)", textDecoration: "underline" }}>
              assessments database
            </Link>{" "}
            and open two tabs side by side — each assessment's Quick Facts panel contains the
            same fields in the same order for easy visual comparison.
          </p>
        </div>
      </div>
    </>
  );
}
