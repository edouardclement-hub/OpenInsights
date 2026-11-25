export type AssessmentSlide = {
  image: string;
  title: string;
  description?: string;
};

export type AssessmentSlideshow = {
  slides: AssessmentSlide[];
  /**
   * The full deck the slides were rendered from. When set, the full-screen
   * toolbar offers it as a download next to the slide counter.
   */
  pdf?: { href: string; filename: string };
};

const SLUG_PCS_2026 = "powering-canada-strong-from-strategy-to-action";

/**
 * Slide captions. The caption is shown with the slide number in full screen and
 * is also the slide's alt text, so it has to read as a description of the slide
 * on its own.
 */
const PCS_2026_CAPTIONS = [
  "Powering Canada Strong: From Strategy to Action",
  "About the Energy Policy Monitor",
  "What's in this assessment",
  "Key findings",
  "Most of the 2050 grid is low-carbon",
  "Emissions 1% lower by 2050",
  "Employment is higher in 2050",
  "Key assumptions",
  "Scope and uncertainty",
  "What's next",
  "How to cite this assessment",
];

export const ASSESSMENT_SLIDESHOWS: Record<string, AssessmentSlideshow> = {
  [SLUG_PCS_2026]: {
    slides: PCS_2026_CAPTIONS.map((title, i) => ({
      image: `/assessments/${SLUG_PCS_2026}/slides/page-${String(i + 1).padStart(2, "0")}.png`,
      title,
    })),
    pdf: {
      href: `/assessments/${SLUG_PCS_2026}/${SLUG_PCS_2026}-2026-11.pdf`,
      filename: "Powering Canada Strong - November 2026.pdf",
    },
  },
};

export function getAssessmentSlideshow(slug: string): AssessmentSlideshow | null {
  return ASSESSMENT_SLIDESHOWS[slug] ?? null;
}
