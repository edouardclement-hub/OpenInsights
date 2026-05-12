"use client";

import { useState } from "react";

const TIER = {
  green: {
    containerBg:    "#EDF2EB",
    containerBorder:"#5A7A52",
    headColor:      "#2E4A27",
    cardBg:         "#C8D9C3",
    cardBorder:     "#5A7A52",
    cardTitle:      "#1E3A18",
    cardSub:        "#3D5E35",
    linkColor:      "#2E4A27",
  },
  blue: {
    containerBg:    "#E8EFF7",
    containerBorder:"#3A5F8A",
    headColor:      "#1A3A5C",
    cardBg:         "#B8CEDF",
    cardBorder:     "#3A5F8A",
    cardTitle:      "#0F2740",
    cardSub:        "#2C4D6E",
    dropBg:         "#CDDAEB",
    dropText:       "#0F2740",
    dropBorder:     "#3A5F8A",
    tagBg:          "#E8EFF7",
    tagText:        "#0F2740",
    tagBorder:      "#3A5F8A",
    linkColor:      "#1A3A5C",
  },
  mauve: {
    containerBg:    "#F0EBF4",
    containerBorder:"#7A5A8A",
    headColor:      "#3D1F52",
    cardBg:         "#D9CCDF",
    cardBorder:     "#7A5A8A",
    cardTitle:      "#2A1240",
    cardSub:        "#5A3D6E",
  },
  teal: {
    containerBg:    "#E4F0EE",
    containerBorder:"#2E7A6E",
    headColor:      "#14453D",
    cardBg:         "#AECEC9",
    cardBorder:     "#2E7A6E",
    cardTitle:      "#0A2E2A",
    cardSub:        "#1E5A52",
    linkColor:      "#2E7A6E",
  },
};

const FONT = "'DM Sans', system-ui, sans-serif";

const INPUTS = [
  { id: "policy", label: "Policy Scenarios",       sub: "Carbon pricing, regulations" },
  { id: "econ",   label: "Economic & Energy Data", sub: "GDP, fuel prices, trade flows" },
  { id: "tech",   label: "Technology Assumptions", sub: "Cost curves, learning rates" },
];

type Model = {
  id: string;
  label: string;
  capabilities: string[];
  modelNames: string[];
  learnMore: string;
};

const MODELS: Model[] = [
  {
    id: "energy",
    label: "Energy System Models",
    capabilities: [
      "Whole-economy emissions pathways",
      "Oil & gas, buildings, transport, industry",
      "Net-zero scenarios to 2050",
      "Hydrogen pathways & technology mix",
    ],
    modelNames: ["MESSAGEix-Canada", "CIMS", "EnergyABM"],
    learnMore: "https://m3.cme-emh.ca/open-models/",
  },
  {
    id: "power",
    label: "Power System Models",
    capabilities: [
      "Least-cost grid configuration",
      "Hourly dispatch & reliability (8,760 hrs)",
      "Interprovincial transmission planning",
      "Wind, solar, storage, SMR, gas + CCS",
    ],
    modelNames: ["COPPER", "SILVER"],
    learnMore: "https://m3.cme-emh.ca/open-models/",
  },
  {
    id: "economic",
    label: "Economic & Labour Models",
    capabilities: [
      "GDP & household budget impacts",
      "Jobs by sector, occupation & province",
      "Trade flows & tariff analysis",
      "All 10 provinces, 50+ sectors",
    ],
    modelNames: ["M3 Macromodel", "LabourABM"],
    learnMore: "https://m3.cme-emh.ca/open-models/",
  },
  {
    id: "sectoral",
    label: "Sectoral & Technology Models",
    capabilities: [
      "Building decarbonization pathways",
      "Clean tech cost forecasts",
      "Solar, wind, EVs, heat pumps, H₂",
      "Uncertainty quantification",
    ],
    modelNames: ["BDA-OSM", "Tech cost models"],
    learnMore: "https://m3.cme-emh.ca/open-models/",
  },
  {
    id: "integrated",
    label: "Integrated Models",
    capabilities: [
      "Demand + supply in one workflow",
      "Electricity price feedbacks",
      "8,760-hour grid feasibility check",
      "Consistent cross-sector scenarios",
    ],
    modelNames: ["CIMS-COPPER-SILVER"],
    learnMore: "https://m3.cme-emh.ca/open-models/",
  },
];

const OUTPUTS = [
  { id: "macc",   label: "Abatement Cost Curves",  sub: "Cheapest path to emissions targets" },
  { id: "grid",   label: "Grid & Power Flows",      sub: "Reliability & dispatch analysis" },
  { id: "jobs",   label: "Jobs & Economy",          sub: "Provincial employment shifts" },
  { id: "invest", label: "Investment & Technology", sub: "Capital flows, cost curves" },
];

function ExternalLinkIcon({ color }: { color: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7M7 1h4m0 0v4m0-4L5 7"
        stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="13" height="13" viewBox="0 0 14 14" fill="none"
      style={{ flexShrink: 0, transition: "transform 0.22s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "7px 0" }}>
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
        <path d="M10 2v16M4 14l6 7 6-7" stroke="#8A8A85" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function TierHead({ label, href, color }: { label: string; href?: string; color: string }) {
  const inner = (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
      textTransform: "uppercase", color,
    }}>
      {label} {href && <ExternalLinkIcon color={color} />}
    </span>
  );
  return (
    <div style={{ marginBottom: 9 }}>
      {href
        ? <a href={href} target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >{inner}</a>
        : inner
      }
    </div>
  );
}

function ModelCard({ model }: { model: Model }) {
  const [open, setOpen] = useState(false);
  const b = TIER.blue;

  return (
    <div
      style={{
        flex: 1, minWidth: 0,
        background: open ? b.dropBg : b.cardBg,
        border: `1.5px solid ${b.cardBorder}`,
        borderRadius: 8,
        overflow: "hidden",
        transition: "background 0.18s",
        fontFamily: FONT,
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && setOpen(v => !v)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 6, padding: "10px 10px",
          color: b.cardTitle, cursor: "pointer", userSelect: "none", outline: "none",
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.35 }}>{model.label}</span>
        <ChevronIcon open={open} />
      </div>

      {open && (
        <div style={{
          padding: "0 10px 12px",
          borderTop: `1px solid ${b.dropBorder}`,
          background: b.dropBg,
        }}>
          <ul style={{ margin: "10px 0 10px 14px", padding: 0, listStyle: "disc" }}>
            {model.capabilities.map(c => (
              <li key={c} style={{ fontSize: 11.5, color: b.dropText, lineHeight: 1.6, marginBottom: 1 }}>
                {c}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
            {model.modelNames.map(name => (
              <span key={name} style={{
                fontSize: 10, fontWeight: 500, letterSpacing: "0.04em",
                padding: "2px 7px", borderRadius: 4,
                background: b.tagBg, color: b.tagText, border: `1px solid ${b.tagBorder}`,
                whiteSpace: "nowrap",
              }}>
                {name}
              </span>
            ))}
          </div>
          <a
            href={model.learnMore}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              fontSize: 11, fontWeight: 500, color: b.linkColor, textDecoration: "none",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.72")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            View model details <ExternalLinkIcon color={b.linkColor} />
          </a>
        </div>
      )}
    </div>
  );
}

function FooterBadge({
  label, href, bg, border, text,
}: {
  label: string;
  href: string;
  bg: string;
  border: string;
  text: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontSize: 11, fontWeight: 500, letterSpacing: "0.03em",
        padding: "4px 12px", borderRadius: 20,
        background: bg, color: text, border: `1.5px solid ${border}`,
        textDecoration: "none", transition: "opacity 0.15s", fontFamily: FONT,
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "0.72")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
    >
      <ExternalLinkIcon color={text} /> {label}
    </a>
  );
}

export default function M3PlatformSchematic() {
  const g  = TIER.green;
  const b  = TIER.blue;
  const mv = TIER.mauve;
  const tl = TIER.teal;

  return (
    <section
      aria-label="M3 Platform capabilities schematic"
      style={{ fontFamily: FONT, maxWidth: 900, margin: "0 auto", padding: "48px 20px 32px" }}
    >
      <div style={{
        border: "2px solid #2C2C2A",
        borderRadius: 14,
        padding: "28px 14px 14px",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)",
          background: "var(--color-background-primary, #fff)",
          padding: "0 16px",
          whiteSpace: "nowrap",
        }}>
          <span style={{ fontSize: 17, fontWeight: 500, letterSpacing: "0.06em", color: "var(--color-text-primary)", fontFamily: FONT }}>
            M3 Platform
          </span>
        </div>

        <div style={{
          background: g.containerBg, border: `1.5px solid ${g.containerBorder}`,
          borderRadius: 10, padding: "12px 12px 10px", marginBottom: 0,
        }}>
          <TierHead label="Open Data: CODERS" href="https://m3.cme-emh.ca/open-data-assumptions/" color={g.headColor} />
          <div style={{ display: "flex", gap: 8 }}>
            {INPUTS.map(inp => (
              <div key={inp.id} style={{
                flex: 1,
                background: g.cardBg, border: `1.5px solid ${g.cardBorder}`,
                borderRadius: 8, padding: "9px 11px",
              }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: g.cardTitle, marginBottom: 2 }}>{inp.label}</div>
                <div style={{ fontSize: 11, color: g.cardSub }}>{inp.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <Arrow />

        <div style={{
          background: b.containerBg, border: `1.5px solid ${b.containerBorder}`,
          borderRadius: 10, padding: "12px 12px 10px", marginBottom: 0,
        }}>
          <TierHead label="Open Code: MODELS" href="https://m3.cme-emh.ca/open-models/" color={b.headColor} />
          <div style={{ display: "flex", gap: 7 }}>
            {MODELS.map(model => <ModelCard key={model.id} model={model} />)}
          </div>
        </div>

        <Arrow />

        <div style={{
          background: mv.containerBg, border: `1.5px solid ${mv.containerBorder}`,
          borderRadius: 10, padding: "12px 12px 10px", marginBottom: 0,
        }}>
          <TierHead label="Model Outputs" color={mv.headColor} />
          <div style={{ display: "flex", gap: 8 }}>
            {OUTPUTS.map(out => (
              <div key={out.id} style={{
                flex: 1,
                background: mv.cardBg, border: `1.5px solid ${mv.cardBorder}`,
                borderRadius: 8, padding: "9px 11px",
              }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: mv.cardTitle, marginBottom: 2 }}>{out.label}</div>
                <div style={{ fontSize: 11, color: mv.cardSub }}>{out.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <Arrow />

        <div style={{
          background: tl.containerBg, border: `1.5px solid ${tl.containerBorder}`,
          borderRadius: 10, padding: "12px 12px 10px", marginBottom: 0,
        }}>
          <TierHead label="Open Visualization: IDEA" href="https://m3.cme-emh.ca/open-visualization-tools/" color={tl.headColor} />
          <div style={{
            background: tl.cardBg, border: `1.5px solid ${tl.cardBorder}`,
            borderRadius: 8, padding: "10px 14px",
          }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: tl.cardTitle, marginBottom: 2 }}>
              IDEA Visualization Dashboard
            </div>
            <div style={{ fontSize: 11, color: tl.cardSub }}>
              Explore model inputs, outputs &amp; scenarios interactively
            </div>
          </div>
        </div>

        <Arrow />

        <div style={{
          background: "var(--color-background-secondary, #F5F5F3)",
          border: "0.5px solid rgba(0,0,0,0.12)",
          borderRadius: 9, padding: "10px 14px",
          display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8,
        }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#3A3A38", marginRight: 4,
          }}>
            Open Source
          </span>

          <FooterBadge
            label="Models"
            href="https://m3.cme-emh.ca/open-models/"
            bg={g.containerBg} border={g.containerBorder} text={g.headColor}
          />

          <FooterBadge
            label="Data (CODERS)"
            href="https://m3.cme-emh.ca/open-data-assumptions/"
            bg={b.containerBg} border={b.containerBorder} text={b.headColor}
          />

          <FooterBadge
            label="Visualization (IDEA)"
            href="https://m3.cme-emh.ca/open-visualization-tools/"
            bg={tl.containerBg} border={tl.containerBorder} text={tl.headColor}
          />
        </div>

      </div>
    </section>
  );
}
