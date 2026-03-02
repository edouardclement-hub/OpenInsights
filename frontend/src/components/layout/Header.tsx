"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "./Navigation";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 text-primary">
      <div className="size-8">
        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path
            clipRule="evenodd"
            d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      </div>
      <h2 className="text-foreground text-xl font-bold leading-tight tracking-tight">
        Open Insights
      </h2>
    </Link>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md px-6 md:px-20 py-3">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <Logo />
          <Navigation />
        </div>

        <div className="flex items-center gap-4">
          {/* Search bar - desktop only */}
          <label className="hidden lg:flex flex-col min-w-48 h-10">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-border">
              <div className="text-muted flex bg-[#f0f2f7] items-center justify-center px-3">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input
                className="flex w-full min-w-0 flex-1 border-none bg-[#f0f2f7] text-foreground focus:outline-none placeholder:text-muted text-sm font-normal"
                placeholder="Search assessments..."
              />
            </div>
          </label>

          <Link
            href="/contact"
            className="hidden sm:flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all"
          >
            Sign Up
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground/70 hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border p-4 md:hidden">
          <Navigation mobile onLinkClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}
