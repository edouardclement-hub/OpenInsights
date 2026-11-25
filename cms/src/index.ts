import type { Core } from '@strapi/strapi';

const SAMPLE_HOMEPAGE = {
  eyebrow: 'Independent assessment',
  heroTitle: 'Canadian energy policy insights, independently assessed.',
  heroSubtitle:
    "The Energy Policy Monitor delivers independent, timely analysis of Canada's major energy and climate policy developments. Built on the Open Insights framework for transparent modelling, EPM provides evidence-based assessments of what new policies mean for emissions, the economy, and energy infrastructure.",
  heroCtaPrimaryLabel: 'Explore assessments',
  heroCtaPrimaryHref: '/assessments',
  heroCtaSecondaryLabel: 'How it works',
  heroCtaSecondaryHref: '/methodology',
  publishedAt: new Date().toISOString(),
};

const SAMPLE_FAQS: any[] = [
  {
    question: 'What is the EPM?',
    answer:
      "The Energy Policy Monitor (EPM) is an independent, timely, and credible assessment framework for major Canadian energy and climate policy. Each assessment evaluates a proposed policy or announcement's projected impact on emissions, energy systems, and socio-economic indicators using open-source modelling infrastructure.",
    order: 1,
    category: 'general',
  },
  {
    question: "What's the difference between EPM Core and EPM+?",
    answer:
      'EPM Core is the standard rapid-response assessment: a 2-page neutral summary, full data package, and public audit trail. EPM+ is an additional follow-on brief authored by an academic partner, offering expert interpretation, policy sensitivity analysis, and regional implications.',
    order: 2,
    category: 'general',
  },
  {
    question: 'How long does an assessment take?',
    answer:
      'EPM Core assessments are typically completed within a few weeks of a policy announcement. The process moves through four phases: policy encoding, baseline validation, model runs, and results review and publication.',
    order: 3,
    category: 'methodology',
  },
  {
    question: 'How do I cite an EPM assessment in my research?',
    answer:
      'Each assessment detail page includes a pre-formatted citation. Click "Copy citation" on any assessment page to get the full citation. All assessments are archived on Zenodo and carry permanent DOIs.',
    order: 4,
    category: 'data',
  },
  {
    question: 'How is the EPM funded?',
    answer:
      'EPM is a collaborative effort between Open Insights and its funders. EPM does not accept direct funding from governments, political parties, or industry bodies.',
    order: 5,
    category: 'general',
  },
];

// Budget 2026 assessment. Source of truth: epm intake.md (Part A, F1-F36).
// isExample is FALSE: this is published as a real assessment, so the example
// banner, the example notice on the detail page and the "do not cite" line are
// all suppressed. Flip it back to true only if it returns to dry-run status.
// [TO CONFIRM: ...] strings are deliberate visible placeholders, not oversights.
const PCS_2026: any = {
  title:
    'With latest federal measures, Canada’s electricity grid to grow 43% through 2050, with 89% clean generation; economy-wide emissions remain high',
  // Shorter line for the listing card, where the full H1 does not read well.
  cardTitle:
    "With current policies and latest federal measures, Canada's grid grows 43% by 2050, 89% clean; emissions remain high",
  shortName: 'Powering Canada Strong',
  slug: 'powering-canada-strong-from-strategy-to-action',
  policyAssessed: 'Powering Canada Strong: From Strategy to Action',
  // The Baseline version this assessment was run against. Drives the byline
  // link and the "Assessments using this Baseline" list on the version page.
  baselineVersion: '2026-11',
  publishedDate: '2026-11-01',
  publishedDateLabel: 'November 2026',
  jurisdiction: 'Federal',
  status: 'Completed',
  policyStatus: 'Announced',
  sector: 'Cross-cutting',
  isExample: false,
  lead: 'Open Insights',
  // Cleared at the team's request: no tag row on this assessment's card.
  // The card hides the row entirely when this is empty.
  tags: [],
  instrumentType: [
    'Regulation',
    'Subsidy',
    'Investment',
    'Other: concessional loans and loan guarantees',
  ],
  // No announced claim is published for this assessment: the Quick facts row
  // and the meta description fall back to the EPM finding.
  claim: '',
  // F17 short form - assessments index card
  finding:
    "With the PCS measures, Canada's electricity generation is estimated at 888 TWh in 2050, 12 TWh (1%) above current policies (Baseline), and the low-carbon share rises one percentage point, to 89%.",
  // F17 full form - detail page quick facts. Not published for this
  // assessment; the EPM finding carries the headline numbers instead.
  modelledValue: '',
  execSummary:
    'On November 5, 2026, the Government of Canada issued [Powering Canada Strong: From Strategy to Action (PCS)](https://natural-resources.canada.ca/energy-sources/electricity-infrastructure/powering-canada-strong-strategy-action), released alongside the federal budget. This first analysis from the newly established Energy Policy Monitor assesses the impact of federal and provincial policy, including PCS, on Canada’s future energy system, emissions profile and economy. It assesses PCS by comparing the current policies with a scenario that adds the four new concrete measures that are clearly defined and funded through [Budget 2026](https://budget.canada.ca/2026/report-rapport/toc-tdm-en.html).\n\nThe assessment covers Canada’s ten provinces, with a focus on the electricity grid. EPM ran five linked open-source models twice, from 2025 to 2050: once for current policies and once with the four measures added. The difference is the estimated effect of the measures.\n\nEPM projects that electricity generation will reach 888 TWh in 2050, about 1.4x its 2025 level, with 89% from low-carbon resources (wind, solar, nuclear, and hydro). The PCS measures contribute a 12 TWh increase of that total, representing 1% growth. These same measures add 16 GW of new wind, solar, and battery capacity, a 16% increase. Every EPM assessment also examines how a newly announced policy affects Canada’s emissions trajectory, even if the policy is not presented as a climate measure: with the four modelled measures, economy-wide greenhouse gas emissions are 547 Mt in 2050, 1% lower than under the baseline. The measures also increase real GDP by $10 billion (0.2%) in 2050, and employment by about 75,000 jobs (0.3%). All figures are central estimates.',
  findings: [
    {
      pillar: 'Infrastructure',
      text:
        '<strong>Electricity generation grows 43% by 2050</strong><br /><strong>+43%</strong>: Increase in electricity generation, 2025 to 2050. Under current federal and provincial policies (the baseline), electricity generation grows from 620 TWh in 2025 to 876 TWh in 2050. The four PCS measures add a further 12 TWh (1%) on top of the baseline, bringing 2050 generation to 888 TWh, which is 43% above the 2025 level.',
    },
    {
      pillar: 'Infrastructure',
      text:
        '<strong>The vast majority of the 2050 grid comes from low-carbon sources</strong><br /><strong>89%</strong>: Low-carbon electricity generation in 2050. Low-carbon resources (wind, solar, nuclear and hydro) supply about 80% of generation today. Under the Baseline, they supply 775 TWh in 2050. With PCS, they supply 793 TWh, 18 TWh (2%) more than in the Baseline, driven mainly by additional wind. Because total generation also grows by 12 TWh, the low-carbon share rises by one percentage point, to 89%. PCS adds 16 GW of capacity beyond the Baseline (9 GW wind, 5 GW batteries, 2 GW solar), mostly in 2035 to 2040 in Alberta, Quebec and Saskatchewan. Fossil-fired generation is 6% lower than in the Baseline, and generation from plants without carbon capture is 18% lower (23 TWh compared with 28 TWh).',
    },
    {
      pillar: 'Environment',
      text:
        '<strong>Emissions are 1% lower in 2050 with PCS</strong><br /><strong>−5 Mt (−1%)</strong>: Difference in economy-wide greenhouse gas emissions in 2050, compared with the Baseline. Under the Baseline, economy-wide greenhouse gas emissions are 552 Mt in 2050. With PCS, they are 547 Mt. PCS emissions are below the Baseline from 2035 onward, for a cumulative 148 Mt (1.2%) over 2030 to 2050. Of the 5 Mt difference in 2050, electricity accounts for 1.6 Mt (30%), with homes, commercial buildings, personal vehicles and light industry accounting for most of the rest. Emissions from oil and gas and from agriculture are unchanged.',
    },
    {
      pillar: 'Economy',
      text:
        '<strong>Employment is higher in 2050</strong><br /><strong>75,000</strong>: Additional jobs in 2050, compared with the Baseline. Investment in electricity generation is absorbed in the economy, with effects on employment and wages appearing later in the period. Real GDP is $10 billion (0.2%) higher than in the Baseline in 2050, and higher in every year except 2030 and 2031. Employment reaches 26.6 million in 2050, about 75,000 jobs (0.3%) more than in the Baseline. In Alberta, employment is 0.6% higher.',
    },
  ],
  limitations:
    '## Uncertainty\n\nFigures are central estimates from the paired Baseline and PCS comparison. EPM also ran a COPPER uncertainty analysis around the PCS pathway, covering natural gas prices, electricity demand growth, wind, solar and storage costs, renewable and storage build-rate limits and interprovincial transmission.\n\n## Measures not modelled\n\nThis assessment covers four PCS measures and is not a review of Budget 2026 as a whole. It leaves out targets, which describe outcomes rather than policy measures, and measures without enough detail to model reliably (for example, possible Clean Electricity Regulations amendments). The government has described the action plan as a first phase, with further measures to come. Future EPM assessments will include them as they are defined and funded.\n\n## Geography and simplifications\n\nResults are for the ten provinces; the territories are outside the modelled area. Some statutory details are simplified so they can be entered in the models. For example, intra-provincial Clean Electricity credit eligibility is represented for same-province transmission between balancing areas in Newfoundland and Labrador, Ontario and Quebec, without applying kilovolt floors line by line.\n\n## Time horizon\n\nBoth scenarios are solved from 2025 to 2050 in five-year steps. The modelled PCS measures mainly affect 2030 to 2040.',
  methodologySummary:
    'The assessment links five open-source models and covers energy demand, the electricity system and the provincial economy for Canada’s ten provinces.\n\n1. CIMS (energy demand) simulates how households, small businesses and industry choose energy-using equipment and fuels. It passes electricity demand and related energy outcomes to the power-system models.\n\n2. COPPER (grid capacity expansion) chooses which power plants, storage and transmission to build and the electricity prices that follow. SILVER checks whether that plan can be operated hour by hour; PRAS checks whether it can meet demand under stress. Reliability findings in this deck are based on those checks.\n\n3. MacroABM-ca (macroeconomy) takes the energy and power-system results and estimates effects on GDP, investment, jobs, wages and inflation.\n\n4. SILVER (grid operations) takes the COPPER capacity plan and checks whether it can be operated hour by hour at least cost, which plants run when, how storage is used and whether the system can meet load without relying on infeasible dispatch.\n\n5. PRAS (grid resource adequacy) checks whether the same plan from COPPER can meet demand under stress, for example when generators, transmission or renewable output are unavailable, and reports the risk and size of shortfalls.\n\nThis full sequence is run twice: once for the Baseline (November 2026), which reflects the suite of existing policies and once for the PCS Scenario. The assessment reports the difference between the two, which is the estimated effect of the modelled PCS measures.',
  assumptionsSummary:
    'Models cannot read policy text directly, so each PCS measure had to be translated into a change the models can represent. For each measure, this section sets out what PCS says and how the modelling team represents it. These choices matter because a different representation of the same measure could produce different estimates.\n\n## Measures modelled in this assessment\n\nHow measures are represented: in the electricity system and energy-economy models, tax credits and direct subsidies reduce the costs of qualifying technologies. In most cases, the model chooses which generating capacity to add, rather than having it forced in. Exceptions in both scenarios include the Churchill Falls Generating Station upgrades and the Gull Island project.\n\n## Clean Technology and Clean Electricity investment tax credits\n\nWhat PCS says: extends eligibility to the end of 2040, and to high-voltage transmission lines within a province.\n\nHow it was modelled: both credits apply in 2025 and 2030 in the Baseline. The PCS scenario extends both credits to 2035 and 2040, and extends the Clean Electricity credit to intra-provincial transmission for 2030, 2035 and 2040.\n\n## Strategic High-efficiency Industrial Facilities Transition fund\n\nWhat PCS says: $400 million over seven years for industrial energy efficiency, renewing the Green Industrial Facilities and Manufacturing Program.\n\nHow it was modelled: represented as a reduction in the cost of efficient light-industry equipment, in 2030 and 2035.\n\n## Smart Renewables and Electrification Pathways Program\n\nWhat PCS says: $4 billion over ten years for infrastructure, renewable energy, grid modernization and priority projects.\n\n## Electric vehicle charging\n\nWhat PCS says: $587 million over five years, renewing the Zero-Emission Vehicle Infrastructure Program.\n\nHow it was modelled: represented in 2030 as a reduction in the ‘preference cost’ of battery-electric vehicles.\n\n## Kept the same in both scenarios\n\nIndustrial carbon pricing, the Clean Electricity Regulations, heat pump rebates and the EV Affordability rebate schedule are the same in both scenarios, as are many other federal, provincial and territorial measures.',
  quote:
    'Our assessment shows that new federal measures slightly increase the mix of clean resources on the grid, while having a modest but positive impact on employment.',
  quoteAttribution: 'Dr. Aaron Hoyle, Project Director, Energy Policy Monitor',
  platformName: 'M3 Platform',
  // Opens the Methodology summary dropdown. The template links the platform name.
  methodologyIntro:
    'This assessment was produced using the M3 Platform, an open-source suite of linked energy and economy models. Policy measures were translated into model inputs using EPM’s standard encoding method. Every assessment compares a policy scenario with the Baseline, which reflects policy that has been legislated as of the date in its name. This assessment uses the Baseline: November 2026. The Baseline is updated as legislation changes, and each assessment records the version it used.',
  epmPlus: false,
  accentClass: 'default',
  citation:
    "Open Insights. (2026). With latest federal measures, Canada's electricity grid to grow 43% through 2050, with 89% clean generation; economy-wide emissions remain high. Zenodo. https://doi.org/10.5281/zenodo.24511788",
  zenodoUrl: 'https://doi.org/10.5281/zenodo.24511788',
  datasetUrl: '',                      // F27 [TO CONFIRM]
  modelReposUrl: '',                   // F32 [TO CONFIRM]
  fullAssumptionsUrl: '',              // F33 [TO CONFIRM]
  // Sidebar button and the embedded dashboard both point at the PCS dashboard.
  ideaUrl: 'https://ideajs.sesit.ca/dashboard/2f3bce6c-479f-4bf7-9224-3051e482e437',
  ideaEmbedUrl: 'https://ideajs.sesit.ca/dashboard/2f3bce6c-479f-4bf7-9224-3051e482e437',
  modelDocsUrl: 'https://sesit.gitlab.io/m3-linkages/projects/powering_canada_strong/',
  // Drives the "Questions about this assessment" block in Quick facts.
  contactEmail: 'ahoyle@uvic.ca',
  // Retired with the Budget 2026 wording: these rows are no longer published.
  policyEncodingUrl: '',
  githubUrl: '',
  assumptionsUrl: '',
  codersUrl: '',
  publishedAt: new Date().toISOString(),
};

async function seedIfEmpty(strapi: Core.Strapi) {
  // Seed homepage singleton
  const hp = await strapi.documents('api::homepage.homepage').findFirst();
  if (!hp) {
    await strapi.documents('api::homepage.homepage').create({ data: SAMPLE_HOMEPAGE, status: 'published' });
    strapi.log.info('[EPM seed] Seeded homepage defaults.');
  }

  // Seed FAQs
  const faqs = await strapi.documents('api::faq.faq').findMany({ limit: 1 });
  if (faqs.length === 0) {
    for (const f of SAMPLE_FAQS) {
      await strapi.documents('api::faq.faq').create({ data: f });
    }
    strapi.log.info('[EPM seed] Seeded FAQs.');
  }
}

// Slugs this record has been published under before. The November 2026 rewrite
// retitled it from "Financing the Build" to "From Strategy to Action", so the
// upsert below finds the existing record and renames it in place rather than
// creating a second one. The frontend redirects the old path.
const PCS_2026_PREVIOUS_SLUGS = ['powering-canada-strong-financing-the-build'];

// Upsert the Powering Canada Strong assessment by slug. This file is the source
// of truth, so admin edits to these fields are overwritten on the next boot.
async function seedPcs2026(strapi: Core.Strapi) {
  strapi.log.info(`[EPM seed] PCS 2026: checking for slug ${PCS_2026.slug}`);
  const existing = await strapi.documents('api::assessment.assessment').findMany({
    filters: { slug: { $in: [PCS_2026.slug, ...PCS_2026_PREVIOUS_SLUGS] } },
    limit: 1,
  });
  if (existing.length === 0) {
    await strapi.documents('api::assessment.assessment').create({ data: PCS_2026, status: 'published' });
    strapi.log.info('[EPM seed] Created PCS 2026 assessment.');
    return;
  }
  const SYNCED_FIELDS = [
    'title', 'cardTitle', 'slug', 'shortName', 'publishedDate', 'publishedDateLabel',
    'jurisdiction', 'status',
    'policyStatus', 'sector', 'isExample', 'lead', 'tags', 'instrumentType', 'claim', 'finding',
    'modelledValue', 'execSummary', 'findings', 'policyAssessed', 'methodologyIntro',
    'limitations', 'methodologySummary',
    'assumptionsSummary', 'quote', 'quoteAttribution', 'platformName', 'epmPlus', 'citation',
    'zenodoUrl', 'ideaUrl', 'ideaEmbedUrl', 'modelDocsUrl', 'contactEmail', 'datasetUrl', 'policyEncodingUrl',
    'githubUrl', 'assumptionsUrl',
    'codersUrl', 'modelReposUrl', 'fullAssumptionsUrl', 'baselineVersion',
  ] as const;
  const current = existing[0] as any;
  const patch: Record<string, unknown> = {};
  for (const field of SYNCED_FIELDS) {
    if (JSON.stringify(current[field]) !== JSON.stringify(PCS_2026[field])) {
      patch[field] = PCS_2026[field];
    }
  }
  if (Object.keys(patch).length > 0) {
    await strapi.documents('api::assessment.assessment').update({
      documentId: existing[0].documentId,
      data: patch,
      status: 'published',
    });
    strapi.log.info(`[EPM seed] Synced PCS 2026 fields: ${Object.keys(patch).join(', ')}`);
  } else {
    strapi.log.info('[EPM seed] PCS 2026 already up to date.');
  }
}

async function openPublicPermissions(strapi: Core.Strapi) {
  // Grant read-only public access to EPM collections so the frontend can fetch without a token.
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' }, populate: ['permissions'] });

  if (!publicRole) return;

  const READ_ACTIONS = [
    'api::assessment.assessment.find',
    'api::assessment.assessment.findOne',
    'api::homepage.homepage.find',
    'api::about-page.about-page.find',
    'api::global.global.find',
    'api::team-member.team-member.find',
    'api::team-member.team-member.findOne',
    'api::faq.faq.find',
    'api::faq.faq.findOne',
  ];

  for (const action of READ_ACTIONS) {
    const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: { action, role: publicRole.id },
    });
    if (!existing) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id },
      });
    }
  }
}

// Bootstrap entrypoint — handles seeding + public read permissions on Strapi startup.
export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Each step gets its own try/catch. These previously shared one block, so a
    // failure in the first silently skipped the rest — which is how an instance
    // could end up with the updated schema but without the PCS 2026 record.
    const steps: Array<[string, () => Promise<unknown>]> = [
      ['seedIfEmpty', () => seedIfEmpty(strapi)],
      ['seedPcs2026', () => seedPcs2026(strapi)],
      ['openPublicPermissions', () => openPublicPermissions(strapi)],
    ];
    for (const [name, run] of steps) {
      try {
        await run();
      } catch (err) {
        strapi.log.error(`[EPM bootstrap] ${name} failed`, err as Error);
      }
    }
  },
};
