export type AssessmentSlide = {
  image: string;
  title: string;
  description?: string;
};

const SLUG_CONSERVATIVE = "conservative-party-federal-election-platform-2021-energy-climate";

export const ASSESSMENT_SLIDES: Record<string, AssessmentSlide[]> = {
  [SLUG_CONSERVATIVE]: [
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-02.png`,
      title: "Platform assessment details",
      description: "Policies repealed and introduced or maintained.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-03.png`,
      title: "Key findings",
      description: "Total emissions, sectoral emissions, energy demand by 2050.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-04.png`,
      title: "Emissions trajectory",
      description: "Down 2% in 2025, 6% in 2030.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-05.png`,
      title: "National GHGs",
      description: "Transport and oil & gas reductions driven by ZEV mandate and CCS.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-06.png`,
      title: "Electricity demand",
      description: "Load growth driven by EV adoption.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-07.png`,
      title: "Capacity additions",
      description: "Natural gas and wind compete for new supply.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-08.png`,
      title: "End-use energy demand",
      description: "Reductions in buildings driven by RNG mandate.",
    },
  ],
};

export function getAssessmentSlides(slug: string): AssessmentSlide[] | null {
  return ASSESSMENT_SLIDES[slug] ?? null;
}
