"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { AssessmentCard } from "./AssessmentCard";
import type { StrapiAssessment } from "@/types/strapi";

const JURISDICTIONS = [
  "Federal",
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];

export function AssessmentsResults({ assessments }: { assessments: StrapiAssessment[] }) {
  const [jurisdiction, setJurisdiction] = useState("");
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(assessments, {
        keys: ["title", "claim", "finding", "execSummary", "tags", "sector", "jurisdiction"],
        threshold: 0.35,
        includeMatches: false,
      }),
    [assessments]
  );

  const results = useMemo(() => {
    let pool = assessments;
    if (jurisdiction) {
      pool = pool.filter((a) => a.jurisdiction === jurisdiction);
    }
    if (query.trim().length > 0) {
      const poolFuse =
        pool.length === assessments.length
          ? fuse
          : new Fuse(pool, {
              keys: ["title", "claim", "finding", "execSummary", "tags", "sector", "jurisdiction"],
              threshold: 0.35,
            });
      pool = poolFuse.search(query).map((r) => r.item);
    }
    return pool;
  }, [assessments, fuse, jurisdiction, query]);

  return (
    <>
      <div className="filters-bar">
        <div className="filters-inner">
          <select
            className="filter-select"
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
          >
            <option value="">All Jurisdictions</option>
            {JURISDICTIONS.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>
          <input
            className="filter-search"
            type="text"
            placeholder="Search assessments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="filter-count">
            Showing {results.length} assessment{results.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="results-content">
        {results.length > 0 ? (
          <div className="results-grid">
            {results.map((a) => (
              <AssessmentCard key={a.id} assessment={a} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No assessments match your search. Try different keywords or clear a filter.</p>
          </div>
        )}
      </div>
    </>
  );
}
