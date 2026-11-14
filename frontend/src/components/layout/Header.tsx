"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
  match: (p: string) => boolean;
  children?: Array<{ href: string; label: string; match: (p: string) => boolean }>;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/assessments", label: "Assessments", match: (p: string) => p.startsWith("/assessments") },
  {
    href: "/methodology",
    label: "Methodology",
    // Also highlighted on every Baseline version page.
    match: (p: string) => p.startsWith("/methodology"),
    children: [
      {
        // Always the undated redirect, so the link survives a Baseline update.
        href: "/methodology/baseline/current",
        label: "Baseline",
        match: (p: string) => p.startsWith("/methodology/baseline"),
      },
    ],
  },
  { href: "/team", label: "Team", match: (p: string) => p.startsWith("/team") },
  { href: "/about", label: "About", match: (p: string) => p.startsWith("/about") },
  { href: "/contact", label: "Contact", match: (p: string) => p.startsWith("/contact") },
];

function Caret() {
  return (
    <svg
      className="nav-caret"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function WaveformLogo() {
  return (
    <div className="logo-mark">
      <div className="logo-c" style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "24px" }}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className={`nav${mobileOpen ? " mobile-menu-open" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
          <WaveformLogo />
          <div className="nav-wordmark">
            <span className="epm-name">Energy Policy Monitor</span>
            <span className="epm-sub">Open Insights</span>
          </div>
        </Link>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href} className={link.children ? "nav-item-has-menu" : undefined}>
              <Link
                href={link.href}
                className={link.match(pathname) ? "active" : ""}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                {link.children && <Caret />}
              </Link>
              {link.children && (
                <ul className="nav-submenu">
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={child.match(pathname) ? "active" : ""}
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
