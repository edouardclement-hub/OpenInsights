export type AssessmentSlide = {
  image: string;
  title: string;
  description?: string;
};

const SLUG_BUDGET_2026 = "powering-canada-strong-financing-the-build";

export const ASSESSMENT_SLIDES: Record<string, AssessmentSlide[]> = {
  [SLUG_BUDGET_2026]: [
    {
      image: `/assessments/${SLUG_BUDGET_2026}/slides/page-01.png`,
      title: "Budget 2026",
      description: "An analysis of Budget 2026's impact on Canada's energy system, economy, and emissions.",
    },
    {
      image: `/assessments/${SLUG_BUDGET_2026}/slides/page-02.png`,
      title: "About the Budget 2026 policy",
      description: "The five measures modelled, how they were tested, and the three models used.",
    },
    {
      image: `/assessments/${SLUG_BUDGET_2026}/slides/page-03.png`,
      title: "Key assumptions",
      description: "When each measure applies, how it is represented, and what stays the same.",
    },
    {
      image: `/assessments/${SLUG_BUDGET_2026}/slides/page-04.png`,
      title: "Key findings",
      description: "National electricity capacity by 2050, and the three headline findings.",
    },
    {
      image: `/assessments/${SLUG_BUDGET_2026}/slides/page-05.png`,
      title: "Earlier grid investment, and more gas generation",
      description: "Generation by source in 2035, and the effect concentrated in Alberta.",
    },
    {
      image: `/assessments/${SLUG_BUDGET_2026}/slides/page-06.png`,
      title: "Households electrify, while spending is about the same",
      description: "Annual gap in household energy spending, and the 2035 to 2050 average by category.",
    },
    {
      image: `/assessments/${SLUG_BUDGET_2026}/slides/page-07.png`,
      title: "Cumulative emissions are about the same",
      description: "Contribution to the change in cumulative emissions, 2025 to 2050.",
    },
    {
      image: `/assessments/${SLUG_BUDGET_2026}/slides/page-08.png`,
      title: "Scope and uncertainty",
      description: "What the modelling covers, and its limitations.",
    },
  ],
};

export function getAssessmentSlides(slug: string): AssessmentSlide[] | null {
  return ASSESSMENT_SLIDES[slug] ?? null;
}
