import type { Core } from '@strapi/strapi';

const SAMPLE_ASSESSMENTS: any[] = [
  {
    title: 'Federal Clean Electricity Regulations — Draft Framework',
    slug: 'federal-clean-electricity-regulations-draft-framework',
    publishedDate: '2025-06-15',
    jurisdiction: 'Federal',
    party: 'Liberal',
    status: 'Completed',
    policyStatus: 'Proposed',
    sector: 'Electricity',
    tags: ['clean electricity', 'net-zero', 'electricity', 'transmission', 'solar', 'renewable energy', '2035 target', 'emissions reduction', 'federal'],
    claim: 'Net-zero electricity grid by 2035 with an 80% reduction in grid emissions relative to 2005 levels.',
    finding: 'Projected 71–78% grid emissions reduction by 2035 under current policy trajectory.',
    claimedValue: '80% grid emissions reduction by 2035',
    modelledValue: '71–78% reduction by 2035',
    execSummary: "The Federal Clean Electricity Regulations (CER) set out a binding framework for Canada's electricity sector to achieve net-zero emissions by 2035. The EPM evaluated the draft CER against the EMH baseline using M3 Platform electricity system optimization models, assessing feasibility across four regional grids. The assessment finds that the policy's targets are technically achievable but will require acceleration of interprovincial transmission investment and earlier-than-scheduled retirement of gas peaking plants in Alberta and Ontario.",
    findings: [
      { text: '<strong>Emissions:</strong> Grid-level emissions are projected to fall 71–78% by 2035 relative to the 2005 baseline, falling short of the 80% target under current investment trajectories.' },
      { text: '<strong>Infrastructure:</strong> Meeting the 2035 target requires 18–24 GW of new transmission capacity between Alberta–BC and Ontario–Quebec corridors by 2032.' },
      { text: '<strong>Employment:</strong> Net energy sector employment is projected to increase by 12,000–18,000 FTEs between 2025 and 2035, concentrated in solar installation and grid operations.' },
    ],
    epmPlus: true,
    accentClass: 'default',
    citation: 'Open Insights / EPM (2025). EPM Assessment #001: Federal Clean Electricity Regulations — Draft Framework. Energy Policy Monitor, Open Insights. Zenodo. https://doi.org/10.5281/zenodo.XXXXXXX',
    publishedAt: new Date().toISOString(),
  },
  {
    title: 'Alberta Emissions Reduction and Energy Development Plan',
    slug: 'alberta-emissions-reduction-and-energy-development-plan',
    publishedDate: '2025-04-18',
    jurisdiction: 'Alberta',
    party: 'Conservative',
    status: 'Completed',
    policyStatus: 'Enacted',
    sector: 'Oil & Gas',
    tags: ['oil and gas', 'carbon capture', 'CCUS', 'abatement', 'emissions reduction', 'Alberta', 'provincial', 'energy development'],
    claim: '22% reduction in oil and gas sector emissions by 2030 while growing production to 4.2 million barrels per day.',
    finding: 'Modelled emissions trajectory shows 8–13% reduction by 2030, with simultaneous production growth offsetting abatement gains.',
    claimedValue: '22% emissions reduction by 2030',
    modelledValue: '8–13% net reduction by 2030',
    execSummary: "Alberta's Emissions Reduction and Energy Development Plan (EREDP) combines production growth targets with sector-level abatement obligations. The EPM evaluated the internal consistency of the plan's emissions and production targets, finding a significant gap between stated reductions and modelled outcomes when production growth scenarios are incorporated into the baseline.",
    findings: [
      { text: '<strong>Emissions:</strong> The 22% reduction target is inconsistent with simultaneous production growth to 4.2 Mbpd. Modelled net emissions show an 8–13% reduction at best, assuming full abatement technology deployment.' },
      { text: '<strong>Technology dependencies:</strong> Achievement of stated targets depends on carbon capture deployment at 3–4x current planning rates, with no demonstrated policy mechanism to drive this acceleration.' },
      { text: "<strong>Economic:</strong> The plan's production growth projections generate $14–18B in additional royalty revenue over the assessment period, partially offsetting abatement capital costs." },
    ],
    epmPlus: false,
    accentClass: 'gold',
    citation: 'Open Insights / EPM (2025). EPM Assessment #002: Alberta Emissions Reduction and Energy Development Plan. Energy Policy Monitor, Open Insights. Zenodo. https://doi.org/10.5281/zenodo.XXXXXXX',
    publishedAt: new Date().toISOString(),
  },
  {
    title: 'NDP Federal Election Platform — Energy & Climate Chapter',
    slug: 'ndp-federal-election-platform-energy-climate-chapter',
    publishedDate: '2025-03-10',
    jurisdiction: 'Federal',
    party: 'NDP',
    status: 'Completed',
    policyStatus: 'Election Platform',
    sector: 'Cross-cutting',
    tags: ['election platform', 'heat pumps', 'retrofit', 'carbon pricing', 'buildings', 'transport', '2030 target', 'multi-sector', 'federal'],
    claim: '50% emissions reduction below 2005 levels by 2030 through a suite of regulatory, pricing, and public investment measures.',
    finding: 'Integrated assessment projects 38–44% emissions reduction by 2030, with high uncertainty around industrial policy implementation timelines.',
    claimedValue: '50% emissions reduction by 2030',
    modelledValue: '38–44% reduction by 2030',
    execSummary: "The NDP's 2025 election platform included a comprehensive energy and climate package spanning electricity, buildings, transportation, and industrial sectors. The EPM conducted an integrated multi-sector assessment of the combined policy package, applying M3 Platform models to each sector and aggregating the results against the national 2030 target.",
    findings: [
      { text: '<strong>Aggregate emissions:</strong> The integrated platform is projected to deliver 38–44% emissions reductions by 2030 relative to 2005 — below the stated 50% target but above current federal policy trajectory.' },
      { text: '<strong>Buildings:</strong> The heat pump retrofit program is the single largest driver of projected reductions, accounting for 28% of total platform abatement.' },
      { text: '<strong>Implementation risk:</strong> The industrial transition fund, representing 40% of projected abatement in the electricity and oil and gas sectors, carries the highest implementation uncertainty given the scale and complexity of procurement required.' },
    ],
    epmPlus: true,
    accentClass: 'slate',
    citation: 'Open Insights / EPM (2025). EPM Assessment #003: NDP Federal Election Platform — Energy & Climate Chapter. Energy Policy Monitor, Open Insights. Zenodo. https://doi.org/10.5281/zenodo.XXXXXXX',
    publishedAt: new Date().toISOString(),
  },
  {
    title: 'BC Building Electrification Standard — 2026 Implementation',
    slug: 'bc-building-electrification-standard-2026-implementation',
    publishedDate: '2025-07-05',
    jurisdiction: 'British Columbia',
    party: 'NDP',
    status: 'In Progress',
    policyStatus: 'Proposed',
    sector: 'Buildings',
    tags: ['building electrification', 'commercial construction', 'heat pumps', 'electricity', 'grid load', 'employment', 'British Columbia', 'provincial'],
    claim: 'All new commercial construction to meet electrification standards by 2026, eliminating 1.8 Mt CO2e annually by 2035.',
    finding: 'Assessment in progress. Results expected by July 28, 2025.',
    claimedValue: '1.8 Mt CO2e eliminated annually by 2035',
    modelledValue: 'Assessment in progress',
    execSummary: 'Assessment currently in progress. The BC Building Electrification Standard sets minimum electrification requirements for all new commercial construction beginning in 2026. EPM is evaluating projected emissions impacts, grid load implications, and construction sector employment effects.',
    findings: [
      { text: '<strong>Status:</strong> Model runs underway. Results and full assessment brief expected by July 28, 2025.' },
      { text: '<strong>Scope:</strong> Assessment covers direct emissions from buildings, upstream electricity demand on the BC Hydro grid, and employment in the commercial construction sector.' },
    ],
    epmPlus: false,
    accentClass: 'default',
    citation: 'Open Insights / EPM (2025). EPM Assessment #004: BC Building Electrification Standard — 2026 Implementation. Energy Policy Monitor, Open Insights. Assessment in progress.',
    publishedAt: new Date().toISOString(),
  },
];

const SAMPLE_HOMEPAGE = {
  eyebrow: 'Independent assessment',
  heroTitle: 'Canadian energy policy insights, independently assessed.',
  heroSubtitle:
    "The Energy Policy Monitor delivers independent, timely analysis of Canada's major energy and climate policy developments. Led by the Open Insights team, EPM cuts through complexity to provide clear, evidence-based assessments of what new policies mean for emissions trajectories, energy systems, and economic outcomes.",
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

async function seedIfEmpty(strapi: Core.Strapi) {
  // Seed assessments
  const existing = await strapi.documents('api::assessment.assessment').findMany({ limit: 1 });
  if (existing.length === 0) {
    strapi.log.info('[EPM seed] No assessments found — seeding 4 sample assessments.');
    for (const data of SAMPLE_ASSESSMENTS) {
      await strapi.documents('api::assessment.assessment').create({ data, status: 'published' });
    }
    strapi.log.info('[EPM seed] Seeded sample assessments.');
  }

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

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await seedIfEmpty(strapi);
      await openPublicPermissions(strapi);
    } catch (err) {
      strapi.log.error('[EPM bootstrap] failed', err as Error);
    }
  },
};
