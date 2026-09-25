export type AssessmentSlide = {
  image: string;
  title: string;
  description?: string;
};

const SLUG_CONSERVATIVE = "conservative-party-federal-election-platform-2021-energy-climate";

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
