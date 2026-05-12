"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

type ColorKey = "teal" | "cyan" | "blue" | "slate" | "mauve" | "rose";

const C: Record<ColorKey, { bg: string; border: string; title: string; sub: string; dot: string }> = {
  teal:  { bg: "#e8f6f6", border: "#3ba0a1", title: "#1a5657", sub: "#3ba0a1", dot: "#3ba0a1" },
  cyan:  { bg: "#e3f4f8", border: "#1193b2", title: "#0a4e60", sub: "#1193b2", dot: "#1193b2" },
  blue:  { bg: "#e4eff8", border: "#3a82b9", title: "#1b3f5c", sub: "#3a82b9", dot: "#3a82b9" },
  slate: { bg: "#ededf8", border: "#6c6cae", title: "#2e2e5e", sub: "#6c6cae", dot: "#6c6cae" },
  mauve: { bg: "#f2ebf2", border: "#8f528e", title: "#3e1f3e", sub: "#8f528e", dot: "#8f528e" },
  rose:  { bg: "#faedf2", border: "#9e3b60", title: "#5a1530", sub: "#9e3b60", dot: "#9e3b60" },
};

type Model = {
  id: string;
  label: string;
  color: ColorKey;
  capabilities: string[];
  models: string[];
  href: string;
};

const MODELS: Model[] = [
  {
    id: "energy",
    label: "Energy system",
    color: "teal",
    capabilities: [
      "Whole-economy emissions paths",
      "Oil & gas, buildings, transport",
      "Net-zero scenarios to 2050",
      "Hydrogen pathways & tech mix",
    ],
    models: ["MESSAGEix-Canada", "CIMS", "EnergyABM"],
    href: "https://m3.cme-emh.ca/open-models/#energy-systems",
  },
  {
    id: "power",
    label: "Power system",
    color: "cyan",
    capabilities: [
      "Least-cost grid configuration",
      "Hourly dispatch & reliability",
      "Interprovincial transmission",
      "Wind, solar, storage, SMR",
    ],
    models: ["COPPER", "SILVER"],
    href: "https://m3.cme-emh.ca/open-models/#power-systems",
  },
  {
    id: "economic",
    label: "Economic & labour",
    color: "blue",
    capabilities: [
      "GDP & household budget impacts",
      "Jobs by sector & occupation",
      "Trade flows, tariff impacts",
      "All 10 provinces & 50+ sectors",
    ],
    models: ["M3 Macromodel", "LabourABM"],
    href: "https://m3.cme-emh.ca/open-models/#economic",
  },
  {
    id: "sectoral",
    label: "Sectoral & technology",
    color: "slate",
    capabilities: [
      "Building decarbonization",
      "Clean tech cost forecasts",
      "Solar, wind, EVs, heat pumps, H₂",
      "Uncertainty quantification",
    ],
    models: ["BDA-OSM", "Tech cost models"],
    href: "https://m3.cme-emh.ca/open-models/#sectoral",
  },
  {
    id: "integrated",
    label: "Integrated models",
    color: "mauve",
    capabilities: [
      "Demand + supply in one workflow",
      "Electricity price feedbacks",
      "8,760-hour grid feasibility",
      "Consistent cross-sector scenarios",
    ],
    models: ["CIMS-COPPER-SILVER"],
    href: "https://m3.cme-emh.ca/open-models/#integrated",
  },
];

const OUTPUTS: { label: string; sub: string; color: ColorKey; href: string }[] = [
  { label: "Abatement cost curves", sub: "Cheapest path to emissions targets", color: "rose",  href: "/methodology" },
  { label: "Grid & power flows",     sub: "Reliability & dispatch analysis",    color: "cyan",  href: "/methodology" },
  { label: "Jobs & economy",         sub: "Provincial employment shifts",       color: "blue",  href: "/methodology" },
  { label: "Investment & tech",      sub: "Capital flows, cost curves",         color: "slate", href: "/methodology" },
];

const BADGES: { label: string; color: ColorKey; href: string }[] = [
  { label: "Code (GitHub)", color: "teal",  href: "https://github.com/edouardclement-hub/OpenInsights" },
  { label: "Data (CODERS)", color: "cyan",  href: "https://m3.cme-emh.ca/open-data-assumptions/" },
  { label: "Methodology",   color: "slate", href: "https://epm.openinsights.ca/methodology" },
];

function ExternalLinkIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7M7 1h4m0 0v4m0-4L5 7"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10" height="10" viewBox="0 0 12 12" fill="none"
      style={{ flexShrink: 0, transition: "transform 0.18s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
        <path d="M9 2v12M3 10l6 7 6-7" stroke="#888" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Dot({ color }: { color: ColorKey }) {
  return (
    <span style={{
      width: 7, height: 7, borderRadius: "50%",
      background: C[color].dot, display: "block", flexShrink: 0,
    }} />
  );
}

function Bracket({
  label, color, borderColor, children, style = {},
}: {
  label: string;
  color?: ColorKey;
  borderColor?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const bc = borderColor || (color ? C[color].border : "#000");
  const tc = color ? C[color].title : "#000";
  const dc = color ? C[color].dot : bc;
  return (
    <div style={{
      border: `1.5px solid ${bc}`,
      borderRadius: 12,
      padding: "14px 10px 12px",
      position: "relative",
      ...style,
    }}>
      <div style={{
        position: "absolute", top: -10, left: 12,
        background: "var(--background, #fff)",
        padding: "0 7px",
        display: "flex", alignItems: "center", gap: 5,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: dc, display: "block", flexShrink: 0 }} />
        <span style={{
          fontSize: 11, fontWeight: 500, letterSpacing: "0.12em",
          color: tc, textTransform: "uppercase",
        }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function ModelCard({
  model, isOpen, onToggle,
}: {
  model: Model;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const c = C[model.color];
  return (
    <div
      onClick={onToggle}
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 9,
        padding: "9px 9px 8px",
        cursor: "pointer",
        userSelect: "none",
        flex: 1,
        minWidth: 0,
        transition: "opacity 0.15s",
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onToggle()}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 3 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Dot color={model.color} />
          <span style={{ fontSize: 11, fontWeight: 500, color: c.title, lineHeight: 1.25 }}>
            {model.label}
          </span>
        </div>
        <span style={{ color: c.title }}>
          <ChevronIcon open={isOpen} />
        </span>
      </div>

      {isOpen && (
        <div style={{ marginTop: 7 }}>
          <ul style={{ margin: "0 0 6px 12px", padding: 0, listStyle: "disc" }}>
            {model.capabilities.map((cap) => (
              <li key={cap} style={{ fontSize: 10, color: c.title, lineHeight: 1.5 }}>{cap}</li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 6 }}>
            {model.models.map((m) => (
              <span key={m} style={{
                fontSize: 9, fontWeight: 500, padding: "1px 5px", borderRadius: 4,
                background: c.bg, color: c.title, border: `1px solid ${c.border}`,
              }}>
                {m}
              </span>
            ))}
          </div>
          <a
            href={model.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: 10, fontWeight: 500, color: c.sub,
              textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 3,
            }}
          >
            View details <ExternalLinkIcon />
          </a>
        </div>
      )}
    </div>
  );
}

export default function M3PlatformSchematic() {
  const [openCard, setOpenCard] = useState<string | null>(null);
  const toggle = (id: string) => setOpenCard((prev) => (prev === id ? null : id));

  return (
    <div style={{
      fontFamily: "inherit",
      maxWidth: 860,
      margin: "0 auto",
      padding: "32px 0",
    }}>
      <div style={{
        border: "1.5px solid #000",
        borderRadius: 16,
        padding: "18px 12px 14px",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", top: -11, left: 16,
          background: "var(--background, #fff)",
          padding: "0 8px",
          display: "flex", alignItems: "center", gap: 5,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.cyan.dot, display: "block" }} />
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.13em", color: C.cyan.dot, textTransform: "uppercase" }}>
            M3 Platform
          </span>
        </div>

        <Bracket label="Open data: CODERS" color="teal" style={{ marginBottom: 4 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { title: "Policy scenarios",       sub: "Carbon pricing, regulations" },
              { title: "Economic & energy data", sub: "GDP, fuel prices, trade flows" },
              { title: "Technology assumptions", sub: "Cost curves, learning rates" },
            ].map((inp) => (
              <div key={inp.title} style={{
                background: C.teal.bg, border: `1px solid ${C.teal.border}`,
                borderRadius: 9, padding: "11px 12px",
              }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: C.teal.title, marginBottom: 2 }}>{inp.title}</div>
                <div style={{ fontSize: 11, color: C.teal.sub }}>{inp.sub}</div>
              </div>
            ))}
          </div>
        </Bracket>

        <Arrow />

        <Bracket label="Open code: models" color="cyan" style={{ marginBottom: 4 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {MODELS.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                isOpen={openCard === model.id}
                onToggle={() => toggle(model.id)}
              />
            ))}
          </div>
        </Bracket>

        <Arrow />

        <Bracket label="Model outputs" color="rose" style={{ marginBottom: 4 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 7 }}>
            {OUTPUTS.map((out) => {
              const c = C[out.color];
              return (
                <a
                  key={out.label}
                  href={out.href}
                  style={{
                    display: "block", background: c.bg,
                    border: `1px solid ${c.border}`,
                    borderRadius: 9, padding: "11px 12px",
                    textDecoration: "none", transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <div style={{ fontSize: 12, fontWeight: 500, color: c.title, marginBottom: 2 }}>{out.label}</div>
                  <div style={{ fontSize: 11, color: c.sub }}>{out.sub}</div>
                </a>
              );
            })}
          </div>
        </Bracket>

        <Arrow />

        <Bracket label="Open visualization: IDEA" color="mauve" style={{ marginBottom: 14 }}>
          <a
            href="https://m3.cme-emh.ca/open-visualization-tools/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: C.mauve.bg, border: `1px solid ${C.mauve.border}`,
              borderRadius: 9, padding: "12px 14px",
              textDecoration: "none", transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <div>
              <span style={{ fontSize: 13, fontWeight: 500, color: C.mauve.title, marginRight: 8 }}>
                IDEA visualization dashboard
              </span>
              <span style={{ fontSize: 11, color: C.mauve.sub }}>
                Explore model inputs, outputs &amp; scenarios interactively
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: C.mauve.sub, fontSize: 12, fontWeight: 500, flexShrink: 0, marginLeft: 10 }}>
              Open dashboard <ExternalLinkIcon size={11} />
            </div>
          </a>
        </Bracket>

        <div style={{
          borderTop: "0.5px solid rgba(0,0,0,0.12)",
          paddingTop: 10,
          display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap",
        }}>
          <span style={{ fontSize: 11, color: "#666" }}>Open source:</span>
          {BADGES.map((b) => {
            const c = C[b.color];
            return (
              <a
                key={b.label}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  fontSize: 11, fontWeight: 500, padding: "3px 9px", borderRadius: 20,
                  background: c.bg, color: c.title,
                  border: `1px solid ${c.border}`,
                  textDecoration: "none", letterSpacing: "0.03em",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <ExternalLinkIcon /> {b.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
