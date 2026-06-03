export type AssessmentSlide = {
  image: string;
  title: string;
  description?: string;
};

const SLUG_CONSERVATIVE = "conservative-party-federal-election-platform-2021-energy-climate";

export const ASSESSMENT_SLIDES: Record<string, AssessmentSlide[]> = {
  [SLUG_CONSERVATIVE]: [
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-01.png`,
      title: "For the EPM team",
      description: "Mock-up of what this deck could look like at release.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-02.png`,
      title: "About the assessment",
      description: "Policies repealed and introduced under the 2021 Conservative platform.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-03.png`,
      title: "Key findings",
      description: "Modest reductions; off-track from Paris targets by 2030.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-04.png`,
      title: "Emissions trajectory",
      description: "Emissions fall 2% by 2025 and 6% by 2030 versus reference scenario.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-05.png`,
      title: "Sectoral emissions",
      description: "Oil & gas and transport reductions partly offset by industry and electricity.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-06.png`,
      title: "National GDP",
      description: "Conservative platform provides a modest GDP boost through 2035.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-07.png`,
      title: "Provincial GDP divergence",
      description: "National GDP is similar, but Alberta and Quebec diverge significantly.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-08.png`,
      title: "Sectoral shifts by 2035",
      description: "Vehicles and agriculture lose; oil, gas, and services win.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-09.png`,
      title: "Electricity demand & EV adoption",
      description: "Load growth driven by EV adoption; ICE sales fall to ~15% by 2050.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-10.png`,
      title: "Capacity additions",
      description: "Natural gas and onshore wind compete for new generation capacity.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-11.png`,
      title: "End-use energy demand",
      description: "Gasoline and diesel decline; natural gas, hydrogen and bioenergy rise.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-12.png`,
      title: "Scope of the assessment",
      description: "EPM assessments present modelling outputs transparently and do not endorse platforms.",
    },
    {
      image: `/assessments/${SLUG_CONSERVATIVE}/slides/page-13.png`,
      title: "About Energy Policy Monitor",
      description: "Independent, timely analysis of Canada's major energy and climate policy developments.",
    },
  ],
};

export function getAssessmentSlides(slug: string): AssessmentSlide[] | null {
  return ASSESSMENT_SLIDES[slug] ?? null;
}
