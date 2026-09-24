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
 *            meta line and summary becomes a link to it.
 *   image    Optional. Path relative to this page; omit or leave "" for none —
 *            the card is designed to look complete either way.
 *   imageAlt Describe the image for screen readers. Required if image is set.
 *   reportUrl / modelUrl
 *            Optional. Omit or leave "" and that link renders greyed out as
 *            "Coming soon" instead.
 */
const RESEARCH_ITEMS = [
  {
    date: '2026-09',
    program: 'Custom Scenario Analysis',
    partner: 'Clean Prosperity',
    partnerUrl: 'https://cleanprosperity.ca/',
    title: 'Electricity system pathway modelling for Saskatchewan',
    image: 'assets/research/saskatchewan-electricity-pathways.jpg',
    imageAlt: 'Clean Prosperity logo above a photograph of the Saskatchewan and Canadian flags flying against a clear sky.',
    summary: 'The Open Insights team collaborated with Clean Prosperity to model several electricity policy scenarios for Saskatchewan, including a “grand bargain” scenario where the province restarts its output-based performance standards carbon market and builds 2,600 megawatts of nuclear power by 2050. Impacts on emissions, costs, electricity demand & supply were assessed.',
    reportUrl: 'https://cleanprosperity.ca/wp-content/uploads/2026/09/A-Nuclear-Grand-Bargain-September-2026.pdf',
    modelUrl: 'https://sesit.gitlab.io/m3-linkages/',
  },
  {
    date: '2026-09',
    program: 'Custom Scenario Analysis',
    partner: 'Electricity Canada',
    partnerUrl: 'https://www.electricity.ca/',
    title: 'Reliability, extreme weather and interties',
    image: 'assets/research/open-insights-electricity-canada.jpg',
    imageAlt: 'The report cover, showing transmission towers at sunset, beside the stacked Open Insights and Electricity Canada logos.',
    summary: 'This report from Electricity Canada and the Open Insights initiative, led by researchers at the University of Victoria, examines how expanded interprovincial electricity connections can strengthen Canada\u2019s grid against extreme weather. Modelling shows that greater interconnection can reduce outage risks, improve resilience, lower system costs and make better use of diverse generation resources, demonstrating the value of greater provincial cooperation in building Canada\u2019s future electricity system.',
    reportUrl: 'https://www.electricity.ca/publications/building-grid-resilience-through-interprovincial-interties/',
    modelUrl: '',
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

  /* Splits text on the partner name and links each occurrence. Builds real
     nodes rather than HTML strings, so nothing needs escaping. */
  const withPartnerLinks = (parent, text, partner, url) => {
    if (!url || !partner || !text.includes(partner)) {
      parent.appendChild(document.createTextNode(text));
      return parent;
    }
    text.split(partner).forEach((chunk, i) => {
      if (i > 0) {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = partner;
        parent.appendChild(a);
      }
      if (chunk) parent.appendChild(document.createTextNode(chunk));
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

    article.appendChild(
      el('span', `research-tag ${TAG_CLASS[item.program] || ''}`.trim(), item.program));
    article.appendChild(withPartnerLinks(
      el('p', 'research-meta'),
      `With ${item.partner} · ${monthYear(item.date)}`, item.partner, item.partnerUrl));
    article.appendChild(el('h3', 'research-title', item.title));
    article.appendChild(withPartnerLinks(
      el('p', 'research-summary'), item.summary, item.partner, item.partnerUrl));

    const links = el('div', 'research-links');
    links.appendChild(linkRow('Read the report', item.reportUrl));
    links.appendChild(linkRow('Access the model assumptions, input data, and code', item.modelUrl));
    article.appendChild(links);

    return article;
  };

  const newestFirst = RESEARCH_ITEMS
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));

  const frag = document.createDocumentFragment();
  newestFirst.forEach((item) => frag.appendChild(card(item)));
  grid.appendChild(frag);
})();
