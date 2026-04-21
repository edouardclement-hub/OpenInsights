"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/assessments", label: "Assessments", match: (p: string) => p.startsWith("/assessments") },
  { href: "/methodology", label: "Methodology", match: (p: string) => p.startsWith("/methodology") },
  { href: "/team", label: "Team", match: (p: string) => p.startsWith("/team") },
  { href: "/about", label: "About", match: (p: string) => p.startsWith("/about") },
];

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
            <li key={link.href}>
              <Link
                href={link.href}
                className={link.match(pathname) ? "active" : ""}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className={`nav-cta${pathname.startsWith("/contact") ? " active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
          </li>
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
