import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getHomepage, getServices, getStrapiMediaUrl } from "@/lib/strapi";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Open Insights — Energy Policy Analysis You Can Trust",
};

export default async function HomePage() {
  let homepage = null;
  let services = null;

  try {
    const [homepageRes, servicesRes] = await Promise.all([
      getHomepage(),
      getServices(),
    ]);
    homepage = homepageRes.data;
    services = servicesRes.data;
  } catch {
    // Strapi not running — render fallback
  }

  return (
    <>
      {/* Hero Section */}
      <section className="px-6 md:px-20 py-12 md:py-20 flex justify-center bg-white">
        <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 order-2 md:order-1">
            <div className="flex flex-col gap-4">
              <span className="text-primary font-bold tracking-widest uppercase text-xs">
                Non-Partisan Analysis
              </span>
              <h1 className="text-foreground text-4xl lg:text-6xl font-black leading-tight tracking-tight">
                {homepage?.heroTitle ? (
                  homepage.heroTitle
                ) : (
                  <>
                    Energy Policy Analysis{" "}
                    <br />
                    <span className="text-primary">You Can Trust</span>
                  </>
                )}
              </h1>
              <p className="text-muted text-lg leading-relaxed max-w-lg">
                {homepage?.heroSubtitle ||
                  "Independent, rapid-response modeling for a sustainable energy future. Providing transparent, non-partisan assessments for policy makers and the public."}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/assessments"
                className="flex items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                Explore Assessments
              </Link>
              <Link
                href="/methodology"
                className="flex items-center justify-center rounded-lg h-14 px-8 border-2 border-border text-foreground text-base font-bold hover:bg-gray-50 transition-colors"
              >
                Our Methodology
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2">
            {homepage?.heroImage ? (
              <div className="relative w-full aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src={getStrapiMediaUrl(homepage.heroImage.url)}
                  alt={homepage.heroImage.alternativeText || "Hero image"}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            ) : (
              <div className="w-full aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary/40 text-[120px]">
                  solar_power
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="px-6 md:px-20 py-16 flex justify-center bg-background-light">
        <div className="max-w-[1200px] w-full flex flex-col gap-12">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h2 className="text-foreground text-3xl font-bold tracking-tight">
              Our Core Pillars
            </h2>
            <p className="text-muted text-lg max-w-2xl">
              Ensuring integrity and speed in every policy model we release to
              maintain objective standards.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-4 rounded-xl border border-border-dark bg-white p-8 hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">visibility</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-xl font-bold">Transparent</h3>
                <p className="text-muted text-base leading-relaxed">
                  Full methodology disclosure for every assessment. We publish our data sources and modeling assumptions openly.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-border-dark bg-white p-8 hover:shadow-xl transition-shadow">
              <div className="bg-accent-orange/10 text-accent-orange w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">balance</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-xl font-bold">Fair</h3>
                <p className="text-muted text-base leading-relaxed">
                  Non-partisan analysis through a multi-stakeholder lens. We weigh economic and environmental impacts equally.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-border-dark bg-white p-8 hover:shadow-xl transition-shadow">
              <div className="bg-accent-green/10 text-accent-green w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-xl font-bold">Fast</h3>
                <p className="text-muted text-base leading-relaxed">
                  Rapid modeling designed for current legislative cycles. Getting critical data to decision makers when it matters most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Assessments */}
      <section className="px-6 md:px-20 py-16 flex justify-center bg-white">
        <div className="max-w-[1200px] w-full flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-foreground text-2xl font-bold">Featured Assessments</h2>
            <Link href="/assessments" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
              View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services && services.length > 0
              ? services.slice(0, 3).map((service) => (
                  <div key={service.id} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:-translate-y-1">
                    {service.image ? (
                      <div className="relative w-full aspect-video overflow-hidden">
                        <Image src={getStrapiMediaUrl(service.image.url)} alt={service.image.alternativeText || service.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-full aspect-video bg-gradient-to-br from-primary/5 to-primary/15 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary/30 text-6xl">analytics</span>
                      </div>
                    )}
                    <div className="p-6 flex flex-col gap-4">
                      <h3 className="text-foreground text-lg font-bold group-hover:text-primary transition-colors">{service.title}</h3>
                      {service.excerpt && <p className="text-muted text-sm">{service.excerpt}</p>}
                      <div className="flex items-center justify-end border-t border-gray-100 pt-4 mt-auto">
                        <div className="bg-primary/10 text-primary hover:bg-primary hover:text-white p-2 rounded-lg transition-colors cursor-pointer">
                          <span className="material-symbols-outlined">chevron_right</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : [
                  { title: "Federal Green Party 2025", desc: "Comprehensive analysis of the proposed environmental platform and economic viability.", tag: "Federal", year: "2025", metricLabel: "Reduction Claim", metricValue: "40% Emissions", metricColor: "text-accent-green", yearColor: "text-accent-green bg-accent-green/10" },
                  { title: "Alberta NDP 2026", desc: "Grid reliability focus and impact assessment of provincial energy transitions.", tag: "Alberta", year: "2026", metricLabel: "Focus", metricValue: "Grid Stability", metricColor: "text-accent-orange", yearColor: "text-accent-orange bg-accent-orange/10" },
                  { title: "Federal Clean Electricity", desc: "Detailed 2035 Net-Zero pathway analysis for national power generation systems.", tag: "Federal", year: "2025", metricLabel: "Pathway", metricValue: "Net-Zero 2035", metricColor: "text-primary", yearColor: "text-accent-green bg-accent-green/10" },
                ].map((card) => (
                  <div key={card.title} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:-translate-y-1">
                    <div className="w-full aspect-video bg-gradient-to-br from-primary/5 to-primary/15 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary/30 text-6xl">analytics</span>
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-bold uppercase tracking-wider text-gray-600">Jurisdiction: {card.tag}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${card.yearColor}`}>Year: {card.year}</span>
                      </div>
                      <h3 className="text-foreground text-lg font-bold group-hover:text-primary transition-colors">{card.title}</h3>
                      <p className="text-muted text-sm">{card.desc}</p>
                      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-500 font-medium uppercase">{card.metricLabel}</span>
                          <span className={`${card.metricColor} font-bold`}>{card.metricValue}</span>
                        </div>
                        <div className="bg-primary/10 text-primary hover:bg-primary hover:text-white p-2 rounded-lg transition-colors cursor-pointer">
                          <span className="material-symbols-outlined">chevron_right</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-6 md:px-20 py-20 flex justify-center bg-primary text-white">
        <div className="max-w-[1200px] w-full flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">Stay informed on policy changes</h2>
            <p className="text-white/80 text-lg">
              Subscribe to get rapid-response assessment notifications directly in your inbox as soon as they are published.
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-3">
            <div className="flex w-full items-stretch rounded-lg overflow-hidden h-14 bg-white">
              <input className="w-full border-none bg-transparent text-foreground px-6 text-base font-normal placeholder:text-gray-400 focus:outline-none" placeholder="Enter your email" />
              <button className="bg-accent-orange text-white px-8 font-bold hover:bg-accent-orange/90 transition-colors whitespace-nowrap">Join Now</button>
            </div>
            <p className="text-xs text-white/60 text-center md:text-left">
              By subscribing, you agree to our privacy policy and data protection terms.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
