/**
 * Open Insights — Our Research
 *
 * Add a new report or collaboration by adding one entry to RESEARCH_ITEMS
 * below. Nothing else needs to change — the layout is generated from this
 * array and cards are ordered newest first automatically.
 *
 * Fields
 *   date     "YYYY-MM". Drives both the displayed "Month Year" and the sort.
 *   program  "Energy Policy Monitor" or "Custom Scenario Analysis".
 *   partner  Organization the work was produced with.
 *   partnerUrl
 *            Optional. When set, every mention of the partner's name in the
 *            meta line and summary becomes a link to it. Omit `partner` when a
 *            piece has no single partner and the meta line shows just the date.
 *   mentions Optional [{ name, url }]. Extra organizations to link wherever
 *            their name appears in the summary, alongside the partner.
 *   image    Optional. Path relative to this page; omit or leave "" for none —
 *            the card is designed to look complete either way.
 *   imageAlt Describe the image for screen readers. Required if image is set.
 *   reportUrl / modelUrl
 *            Optional. Omit or leave "" and that link renders greyed out as
 *            "Coming soon" instead.
 *   dashboardUrl
 *            Optional. Adds a third link, "Access the results dashboard".
 */
const RESEARCH_ITEMS = [
  {
    date: '2026-09',
    program: 'Custom Scenario Analysis',
    partner: 'New Economy Canada and the Canadian Chamber of Commerce',
    mentions: [
      { name: 'New Economy Canada', url: 'https://neweconomycanada.ca/' },
      { name: 'Canadian Chamber of Commerce', url: 'https://chamber.ca/' },
    ],
    title: 'Macroeconomic impacts of doubling the grid',
    image: 'assets/research/macroeconomic-impacts-doubling-the-grid.jpg',
    imageAlt: 'An aerial photograph of transmission lines crossing forested mountains under a clear sky.',
    summary: 'Open Insights worked with New Economy Canada and the Canadian Chamber of Commerce to assess the macroeconomic impacts of doubling the grid. The analysis found the return on investment could be large, but only if key barriers are removed.',
    reportUrl: 'https://neweconomycanada.ca/powering-growth/',
    modelUrl: 'https://sesit.gitlab.io/M3-linkages/projects/powering_canadas_growth/',
    dashboardUrl: 'https://ideajs.sesit.ca/view/0hmpa7wq8n',
  },
  {
    date: '2026-09',
    program: 'Custom Scenario Analysis',
    partner: 'Clean Prosperity',
    partnerUrl: 'https://cleanprosperity.ca/',
    title: 'Electricity system pathway modelling for Saskatchewan',
    image: 'assets/research/saskatchewan-electricity-pathways.jpg',
    imageAlt: 'The Saskatchewan and Canadian flags flying against a clear sky.',
    summary: 'Open Insights worked with Clean Prosperity to model several electricity policy scenarios for Saskatchewan, including a “grand bargain” in which the province restarts its output-based carbon market and builds 2,600 MW of nuclear by 2050. The analysis assessed emissions, costs, and electricity supply and demand.',
    reportUrl: 'https://cleanprosperity.ca/wp-content/uploads/2026/09/A-Nuclear-Grand-Bargain-September-2026.pdf',
    modelUrl: 'https://sesit.gitlab.io/m3-linkages/projects/cp_saskatchewan/',
  },
  {
    date: '2026-09',
    program: 'Custom Scenario Analysis',
    partner: 'Electricity Canada',
    partnerUrl: 'https://www.electricity.ca/',
    title: 'Reliability, extreme weather and interties',
    image: 'assets/research/open-insights-electricity-canada.jpg',
    imageAlt: 'A steel transmission tower photographed from below at sunrise, with more towers receding into the distance.',
    summary: 'Open Insights worked with Electricity Canada to examine how expanded interprovincial connections can strengthen Canada’s grid against extreme weather. Modelling suggests greater interconnection can reduce outage risk, improve resilience, lower system costs, and make better use of diverse generation resources.',
    reportUrl: 'https://www.electricity.ca/publications/building-grid-resilience-through-interprovincial-interties/',
    modelUrl: 'https://sesit.gitlab.io/m3-linkages/projects/electricity_canada_extremeweather/',
  },
];

(function renderResearch() {
  const grid = document.getElementById('research-grid');
  if (!grid) return;

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];

  const monthYear = (iso) => {
    const [y, m] = String(iso).split('-');
    const name = MONTHS[parseInt(m, 10) - 1];
    return name ? `${name} ${y}` : String(iso);
  };

  const TAG_CLASS = {
    'Energy Policy Monitor': 'research-tag--epm',
    'Custom Scenario Analysis': 'research-tag--csa',
  };

  /* The organizations whose names should link, in one list. */
  const mentionsFor = (item) => {
    const list = [];
    if (item.partner && item.partnerUrl) list.push({ name: item.partner, url: item.partnerUrl });
    (item.mentions || []).forEach((m) => list.push(m));
    return list;
  };

  /* Links every mention of those organizations in the text. Builds real nodes
     rather than HTML strings, so nothing needs escaping. */
  const withMentionLinks = (parent, text, targets) => {
    if (!targets.length) {
      parent.appendChild(document.createTextNode(text));
      return parent;
    }
    const urlFor = new Map(targets.map((t) => [t.name, t.url]));
    // Longest first, so one name cannot swallow another that contains it.
    const pattern = targets
      .map((t) => t.name)
      .sort((a, b) => b.length - a.length)
      .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|');
    text.split(new RegExp(`(${pattern})`, 'g')).forEach((chunk) => {
      if (!chunk) return;
      if (urlFor.has(chunk)) {
        const a = document.createElement('a');
        a.href = urlFor.get(chunk);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = chunk;
        parent.appendChild(a);
      } else {
        parent.appendChild(document.createTextNode(chunk));
      }
    });
    return parent;
  };

  const el = (tag, className, text) => {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (text) n.textContent = text;
    return n;
  };

  /* A link when we have a URL, a greyed "Coming soon" stand-in when we don't. */
  const linkRow = (label, url) => {
    if (url) {
      const a = el('a', 'research-link', label);
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      return a;
    }
    const span = el('span', 'research-link research-link--disabled');
    span.setAttribute('aria-disabled', 'true');
    span.appendChild(document.createTextNode(label));
    span.appendChild(el('span', 'research-soon', 'Coming soon'));
    return span;
  };

  const card = (item) => {
    const article = el('article', 'research-card');

    if (item.image) {
      const media = el('div', 'research-media');
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.imageAlt || '';
      img.loading = 'lazy';
      media.appendChild(img);
      article.appendChild(media);
    }

    const targets = mentionsFor(item);

    article.appendChild(
      el('span', `research-tag ${TAG_CLASS[item.program] || ''}`.trim(), item.program));
    article.appendChild(withMentionLinks(
      el('p', 'research-meta'),
      item.partner ? `With ${item.partner} · ${monthYear(item.date)}` : monthYear(item.date),
      targets));
    article.appendChild(el('h3', 'research-title', item.title));
    article.appendChild(withMentionLinks(
      el('p', 'research-summary'), item.summary, targets));

    /* One footer holds the divider and every CTA. margin-top:auto pushes it to
       the bottom, and its min-height reserves room for three links, so footers
       line up across cards whatever the blurb length or link count. */
    const footer = el('footer', 'research-footer');
    footer.appendChild(linkRow('Read the report', item.reportUrl));
    footer.appendChild(linkRow('Access the model assumptions, input data, and code', item.modelUrl));
    if (item.dashboardUrl) {
      footer.appendChild(linkRow('Access the results dashboard', item.dashboardUrl));
    }
    article.appendChild(footer);

    return article;
  };

  const newestFirst = RESEARCH_ITEMS
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));

  const frag = document.createDocumentFragment();
  newestFirst.forEach((item) => frag.appendChild(card(item)));
  grid.appendChild(frag);
})();
