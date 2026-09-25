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
    isExample: true,
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
    isExample: true,
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
    isExample: true,
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
    isExample: true,
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

const CONSERVATIVE_2021: any = {
  title: 'Conservative Party of Canada — Federal Election Platform 2021 Energy and Climate Policy Assessment',
  slug: 'conservative-party-federal-election-platform-2021-energy-climate',
  publishedDate: '2021-08-01',
  publishedDateLabel: 'Summer 2021',
  jurisdiction: 'Federal',
  party: 'Conservative',
  status: 'Completed',
  policyStatus: 'Proposed',
  sector: 'Election Platform',
  isExample: false,
  lead: 'Open Insights',
  tags: ['Election Platform', 'federal'],
  claim:
    "Under the proposed platform, Canada's total emissions are projected to hit 440 Mt CO₂e by 2030, representing a 35% fall from current levels.",
  finding:
    "We estimate modest emissions reductions under the Conservative Party of Canada's 2021 platform — an estimated 6% decline from current levels by 2030, versus the 35% decrease by 2030 the Paris Agreement target requires.",
  claimedValue: '633 Mt CO₂e by 2030',
  modelledValue: 'We estimate that emissions will fall by about 6% from current levels to 2030.',
  execSummary:
    "The Conservative Party of Canada's 2021 federal election platform, which repeals the federal carbon tax and Clean Fuel Regulations while introducing measures like a $5B carbon capture tax credit and a 30% ZEV mandate, is projected to reduce Canada's emissions by approximately 6% from 2021 levels by 2030 — short of the 35% reduction required under Canada's Paris Agreement commitments. Emissions reductions in oil and gas and transportation are partly offset by increases in the electricity and industry sectors. By 2050, the platform delivers roughly 50 Mt CO₂e in annual reductions, driven largely by transportation decarbonization and growth in hydrogen and clean fuels.",
  findings: [
    { text: 'Proposed policies modestly reduce emissions. However, our analysis does not support the claim that Canada will be on track to our Paris climate commitments by 2030.' },
    { text: 'We estimate that emissions will fall by about 6% from current levels to 2030, versus the Paris target (35% decrease).' },
    { text: 'By 2050, proposed policies reduce emissions by ~50 Mt CO₂e per year.' },
    { text: 'Emissions reductions in oil and gas and transport are partly offset by increases in industry and electricity generation.' },
    { text: 'The economy grows, on aggregate, but with sectoral winners and losers.' },
    { text: 'Demand for gasoline and diesel declines, while natural gas and clean fuels rise.' },
    { text: 'Electric vehicle adoption accelerates load growth, while natural gas and onshore wind compete for new electricity generation capacity.' },
  ],
  epmPlus: false,
  accentClass: 'default',
  citation:
    'Open Insights. (2026). Conservative Party of Canada — Federal Election Platform 2021 Report. Zenodo. https://doi.org/10.5281/zenodo.20530225',
  zenodoUrl: 'https://zenodo.org/records/20530225',
  ideaUrl: 'https://ideajs.sesit.ca/dashboard/f5aefbc3-7ce7-43c8-a0a4-7f0f4891239b',
  datasetUrl: 'https://gitlab.com/sesit/cims-models-fork/-/tree/SFU_update/results?ref_type=heads',
  policyEncodingUrl: 'https://gitlab.com/cme-emh/energy-policy-monitor/-/tree/SFU_clean/scenarios?ref_type=heads',
  githubUrl: 'https://gitlab.com/cme-emh/energy-policy-monitor/-/tree/SFU_clean/scenarios?ref_type=heads',
  assumptionsUrl: 'https://docs.google.com/spreadsheets/d/1FUpjCgCP1ZL2-c4-6uC89z1IXV8Ti8wy/edit?gid=810528026#gid=810528026',
  publishedAt: new Date().toISOString(),
};

// Budget 2026 dry-run assessment. Source of truth: epm intake.md (Part A, F1-F36).
// isExample stays TRUE: the assessed Budget chapter is a simulated document, so the
// example banner and the "do not cite" line must remain until that changes.
// [TO CONFIRM: ...] strings are deliberate visible placeholders, not oversights.
const BUDGET_2026: any = {
  title: 'Budget 2026, Chapter 2: Powering Canada Strong: Financing the Build',
  shortName: 'Budget 2026',
  slug: 'powering-canada-strong-financing-the-build',
  publishedDate: '2026-09-01',
  publishedDateLabel: 'September 2026',
  jurisdiction: 'Federal',
  status: 'Completed',
  policyStatus: 'Proposed',
  // F5 names two sectors (electricity grid; buildings/heating). `sector` is a
  // single-value enum, so both names are carried in tags instead.
  sector: 'Cross-cutting',
  isExample: true,
  lead: 'Open Insights',
  tags: [
    'Power/electricity grid',
    'Buildings/heating',
    'Regulation',
    'Subsidy',
    'Investment',
  ],
  instrumentType: [
    'Regulation',
    'Subsidy',
    'Investment',
    'Other: concessional loans and loan guarantees',
  ],
  claim:
    'Budget 2026 cites the objective, set out in Powering Canada Strong, of building the infrastructure required to double Canada’s electricity supply by 2050.',
  // F17 short form - assessments index card
  finding:
    'The modelled measures mainly change when capacity is built, not the size of the grid in 2050.',
  // F17 full form - detail page quick facts
  modelledValue:
    'A doubling of Canada’s 2025 generating capacity would be approximately 325 GW. In the Budget Scenario, national capacity is estimated at 287 GW in 2050, 1.8 times its 2025 level and 3 GW lower than the Reference Scenario (290 GW). The modelled measures mainly change when capacity is built, not the size of the grid in 2050.',
  execSummary:
    'Budget 2026 is the federal government’s plan to finance the growth of Canada’s electricity system, with more than $62 billion in federal support. The Energy Policy Monitor assessed five of its measures: the Canada Electricity Financing Facility, the Intertie Acceleration Fund, an extended Clean Electricity tax credit for transmission, amendments to the Clean Electricity Regulations, and grants for home heat pumps. Using linked CIMS–COPPER and MacroABM-ca models, the assessment compares these measures with current policies to estimate their effects on the electricity grid, household energy spending, and emissions from 2025 to 2050.',
  findings: [
    {
      text:
        '<strong>Earlier grid investment, and more gas generation</strong> — <strong>+33 TWh</strong>: More electricity generated from natural gas in Canada in 2035 than under current policies (Reference Scenario). In the Budget Scenario, Canada is estimated to generate 33 TWh more electricity from natural gas in 2035 than under current policies (Reference Scenario). Because the limit on new gas plants would start in 2040 rather than 2035, the increase would be concentrated in Alberta (+36 TWh), where the first nuclear plant would open in 2040 instead of 2035. Other provinces would generate slightly less from gas.',
    },
    {
      text:
        '<strong>Household energy mix changes, while spending is about the same</strong> — <strong>+0.5%</strong>: Difference in average annual household energy spending, 2025 to 2050, compared with current policies (Reference Scenario). In the Budget Scenario, average household energy spending from 2025 to 2050 is estimated to be 0.5% higher than under current policies (Reference Scenario), about $26 a year. Spending would be higher before 2035 as heat pumps are adopted sooner, and lower on average from 2035 to 2050 as spending shifts from gasoline and natural gas to electricity.',
    },
    {
      text:
        '<strong>Cumulative emissions are about the same</strong> — <strong>−0.6%</strong>: Difference in cumulative national greenhouse gas emissions, 2025 to 2050, compared with current policies (Reference Scenario). In the Budget Scenario, cumulative national emissions from 2025 to 2050 are estimated to be 115 Mt lower than under current policies (Reference Scenario), 0.6% of the Reference Scenario total. Home heating emissions would be 242 Mt lower, mostly in Ontario and Alberta, as homes switch from gas to electric heat sooner. This would be partly offset by electricity emissions 90 Mt higher, mostly from Alberta gas generation in 2035 before the gas limit applies, and by emissions 38 Mt higher in other sectors.',
    },
  ],
  limitations:
    '## Uncertainty\n\nResults come from one central pair of scenarios, with no uncertainty range.\n\n## Financing\n\nCOPPER calculates the total cost of the electricity system but does not show how that cost is split between electricity customers, governments, and investors. Because federal financing mainly changes who pays, the Canada Electricity Financing Facility is entered as a lower equipment cost, and modelled system costs and electricity rates are not reported as findings.\n\n## Grid reliability and timing\n\nHourly grid reliability was not tested (the SILVER model was not run), and model years are five years apart.\n\n## Household spending\n\nFigures use a national average household from [TO CONFIRM: name of dashboard]. How households are weighted in that average, and which price index is used, are still to be confirmed.',
  methodologySummary:
    'The assessment links three models, which run in sequence:\n\n1. CIMS, an energy-economy model, simulates how households and firms choose technologies and fuels. It sends the resulting electricity demand to COPPER.\n\n2. COPPER, an electricity-system model, chooses the lowest-cost mix of power plants, storage, and transmission to meet that demand. It sends electricity prices back to CIMS.\n\n3. CIMS and COPPER repeat this exchange in turns until the electricity prices in each province are close between the two models.\n\n4. The linked results then feed MacroABM-ca, a macroeconomic model with a labour module, which estimates effects on the economy and on household spending.\n\nThis full sequence is run twice: once for the Reference Scenario (current policy) and once for the Budget Scenario. The assessment reports the difference between the two, which is the estimated effect of the modelled Budget 2026 measures.',
  assumptionsSummary:
    'Models cannot read policy text directly, so each Budget measure had to be translated into a change the models can represent. For each measure, this section sets out what the Budget says, how the modelling team represented it, and what that choice means for the results. These choices matter because a different representation of the same measure could produce different estimates.\n\n## Canada Electricity Financing Facility\n\nWhat the Budget says: $18 billion over ten years ($6.2 billion in funding and $11.8 billion in loans and guarantees) for new power plants, storage, and power lines.\n\nHow it was modelled: the funding and loans are combined into one 7% reduction in the cost of building these assets in 2030 and 2035. Each model year represents about five calendar years, so these two years cover the ten-year program. The model is given a lower cost, not a list of projects to build.\n\nWhat this means: the model decides what to build at the lower cost. Because it does not show who pays, lower costs reflect a change in who pays rather than cheaper equipment, so electricity rates are not reported as findings.\n\n## Intertie Acceleration Fund\n\nWhat the Budget says: federal support for lines between provinces, generally up to 50% of eligible costs.\n\nHow it was modelled: named lines between provinces (BC–AB, MB–SK, NS–NB, PE–NB, NL–QC) cost half as much to build in 2030 and 2035. The model is not required to build a set amount. The Yukon–BC line is outside the model’s map and is not included.\n\nWhat this means: how much new capacity is built between provinces is the model’s own lowest-cost choice at the reduced price.\n\n## Transmission tax credit\n\nWhat the Budget says: the existing 15% Clean Electricity tax credit is extended to certain major power lines within a province.\n\nHow it was modelled: a 15% credit on the cost of all new power lines built in 2030 and 2035. Power plants and storage already receive the credit under current policies.\n\nWhat this means: the change is in which projects are eligible, not in the rate of the credit.\n\n## Clean Electricity Regulations\n\nWhat the Budget says: the government will amend the Clean Electricity Regulations to allow more room to add new units in the near term, including natural gas plants where needed for reliability and affordability. The 2050 net-zero goal is unchanged.\n\nHow it was modelled: under current rules (Reference Scenario), new combined-cycle gas plants must meet an emissions limit starting in 2035. The Budget Scenario removes that 2035 step, so the limit first applies in 2040. Other fossil fuel plants follow current rules, and the 2050 standard is unchanged. The Budget’s reference to greater use of carbon offsets is not represented.\n\nWhat this means: for five more years, new gas plants can be built and operated without meeting the limit. This timing change drives most of the results for Alberta in 2035.\n\n## Heat pump grants\n\nWhat the Budget says: $2.3 billion in grants to help households switch from oil, propane, and baseboard heating to heat pumps.\n\nHow it was modelled: eligible heat pumps receive a grant covering 25.3% of their cost in 2030 (33.7% in Atlantic Canada). These rates were set so total modelled grants come to about $2.1 billion, close to the Budget amount. Heat pumps with gas backup are not eligible, and the $4.2 billion loan stream is not modelled.\n\nWhat this means: the grant rates were chosen to match the Budget’s funding amount.\n\n## Kept the same in both scenarios\n\nCarbon prices, and existing clean electricity tax credits for power plants and storage.',
  quote:
    'The EPM team compared a Budget scenario containing five electricity and home-heating measures with a current-policy Reference scenario, using linked energy-economy, electricity-system, and macroeconomic models. In our modelling, the measures change when Canada’s grid is built and which fuels households use more than they change the size of the grid or national emissions by 2050.',
  quoteAttribution: 'Aaron Hoyle, Director of Energy Policy Monitor',
  platformName: 'M3 Platform',
  epmPlus: false,
  accentClass: 'default',
  citation:
    'Energy Policy Monitor (2026). Assessment of Budget 2026. Open Insights. DOI: [not available - fictional]',
  // Blank URLs render as the template's disabled "coming soon" affordance.
  zenodoUrl: '',                       // F26 [TO CONFIRM]
  datasetUrl: '',                      // F27 [TO CONFIRM]
  modelReposUrl: '',                   // F32 [TO CONFIRM]
  fullAssumptionsUrl: '',              // F33 [TO CONFIRM]
  ideaUrl: 'https://ideajs.sesit.ca/dashboard/51f2f08f-6362-455d-845e-fb35758e9cad',
  policyEncodingUrl: 'https://docs.google.com/spreadsheets/d/16HzcekDbT4cYmRs7THX9l4pBkVUrrpaM/edit',
  githubUrl: 'https://epm-budget-docs-preview.pages.dev/projects/epm_budget_2026_dry_run/',
  assumptionsUrl: 'https://drive.google.com/file/d/1FpusD84tk0tIDzNUFegI3JDKERiTtq0Q/view?usp=sharing',
  codersUrl: 'https://coders.cme-emh.ca/',
  publishedAt: new Date().toISOString(),
};

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

  // Upsert the Conservative 2021 assessment (real, non-example) by slug.
  const conservativeExisting = await strapi.documents('api::assessment.assessment').findMany({
    filters: { slug: { $eq: CONSERVATIVE_2021.slug } },
    limit: 1,
  });
  if (conservativeExisting.length === 0) {
    await strapi.documents('api::assessment.assessment').create({ data: CONSERVATIVE_2021, status: 'published' });
    strapi.log.info('[EPM seed] Created Conservative 2021 assessment.');
  } else {
    // Keep the canonical content fields in sync with this file.
    // Edits to these fields via Strapi admin will be overwritten on next boot —
    // the seed file is the source of truth for the Conservative 2021 entry.
    const SYNCED_FIELDS = [
      'title', 'publishedDate', 'publishedDateLabel', 'jurisdiction', 'party', 'status', 'policyStatus',
      'sector', 'lead', 'tags', 'claim', 'finding', 'claimedValue', 'modelledValue',
      'execSummary', 'findings', 'citation', 'zenodoUrl', 'ideaUrl', 'datasetUrl',
      'policyEncodingUrl', 'githubUrl', 'assumptionsUrl',
    ] as const;
    const current = conservativeExisting[0] as any;
    const patch: Record<string, unknown> = {};
    for (const field of SYNCED_FIELDS) {
      if (JSON.stringify(current[field]) !== JSON.stringify(CONSERVATIVE_2021[field])) {
        patch[field] = CONSERVATIVE_2021[field];
      }
    }
    if (Object.keys(patch).length > 0) {
      await strapi.documents('api::assessment.assessment').update({
        documentId: conservativeExisting[0].documentId,
        data: patch as any,
        status: 'published',
      });
      strapi.log.info(`[EPM seed] Patched Conservative 2021 fields: ${Object.keys(patch).join(', ')}.`);
    }
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

// Upsert the Budget 2026 dry-run assessment by slug, on the same pattern as
// CONSERVATIVE_2021: this file is the source of truth, so admin edits to these
// fields are overwritten on the next boot.
async function seedBudget2026(strapi: Core.Strapi) {
  strapi.log.info(`[EPM seed] Budget 2026: checking for slug ${BUDGET_2026.slug}`);
  const existing = await strapi.documents('api::assessment.assessment').findMany({
    filters: { slug: { $eq: BUDGET_2026.slug } },
    limit: 1,
  });
  if (existing.length === 0) {
    await strapi.documents('api::assessment.assessment').create({ data: BUDGET_2026, status: 'published' });
    strapi.log.info('[EPM seed] Created Budget 2026 assessment.');
    return;
  }
  const SYNCED_FIELDS = [
    'title', 'shortName', 'publishedDate', 'publishedDateLabel', 'jurisdiction', 'status',
    'policyStatus', 'sector', 'isExample', 'lead', 'tags', 'instrumentType', 'claim', 'finding',
    'modelledValue', 'execSummary', 'findings', 
    'limitations', 'methodologySummary',
    'assumptionsSummary', 'quote', 'quoteAttribution', 'platformName', 'epmPlus', 'citation',
    'zenodoUrl', 'ideaUrl', 'datasetUrl', 'policyEncodingUrl', 'githubUrl', 'assumptionsUrl',
    'codersUrl', 'modelReposUrl', 'fullAssumptionsUrl',
  ] as const;
  const current = existing[0] as any;
  const patch: Record<string, unknown> = {};
  for (const field of SYNCED_FIELDS) {
    if (JSON.stringify(current[field]) !== JSON.stringify(BUDGET_2026[field])) {
      patch[field] = BUDGET_2026[field];
    }
  }
  if (Object.keys(patch).length > 0) {
    await strapi.documents('api::assessment.assessment').update({
      documentId: existing[0].documentId,
      data: patch,
      status: 'published',
    });
    strapi.log.info(`[EPM seed] Synced Budget 2026 fields: ${Object.keys(patch).join(', ')}`);
  } else {
    strapi.log.info('[EPM seed] Budget 2026 already up to date.');
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
    // could end up with the updated schema but without the Budget 2026 record.
    const steps: Array<[string, () => Promise<unknown>]> = [
      ['seedIfEmpty', () => seedIfEmpty(strapi)],
      ['seedBudget2026', () => seedBudget2026(strapi)],
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
