import type { Metadata } from "next";
import { AssessmentsResults } from "@/components/blocks/AssessmentsResults";
import { getAssessments } from "@/lib/strapi";
import type { StrapiAssessment } from "@/types/strapi";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Assessments",
  description:
    "Independent, reproducible assessments of Canadian energy and climate policy. Full database.",
};

export default async function AssessmentsPage() {
  let assessments: StrapiAssessment[] = [];

  try {
    const res = await getAssessments();
    assessments = res.data;
  } catch {
    // Strapi not running
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="section-label">EPM database</div>
          <h1>Assessment results</h1>
          <p>
            Major Canadian energy policy announcements are assessed with the same open-source
            methodology. All code, data, and assumptions are published, traceable, and replicable.
          </p>
        </div>
      </div>

      <AssessmentsResults assessments={assessments} />
    </>
  );
}
