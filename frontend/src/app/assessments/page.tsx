import type { Metadata } from "next";
import Image from "next/image";
import { getServices, getStrapiMediaUrl } from "@/lib/strapi";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Assessments",
  description: "Browse all energy policy assessments from Open Insights.",
};

export default async function AssessmentsPage() {
  let services = null;

  try {
    const res = await getServices();
    services = res.data;
  } catch {
    // Strapi not running
  }

  return (
    <>
      <section className="px-6 md:px-20 py-12 md:py-20 flex justify-center bg-white">
        <div className="max-w-[1200px] w-full flex flex-col gap-4">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">
            Research Archive
          </span>
          <h1 className="text-foreground text-4xl lg:text-5xl font-black leading-tight tracking-tight">
            All Assessments
          </h1>
          <p className="text-muted text-lg max-w-2xl">
            Browse our complete archive of independent energy policy assessments
            and analysis reports.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-20 py-16 flex justify-center bg-background-light">
        <div className="max-w-[1200px] w-full">
          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  {service.image ? (
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={getStrapiMediaUrl(service.image.url)}
                        alt={service.image.alternativeText || service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-gradient-to-br from-primary/5 to-primary/15 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary/30 text-6xl">
                        analytics
                      </span>
                    </div>
                  )}
                  <div className="p-6 flex flex-col gap-3">
                    <h3 className="text-foreground text-lg font-bold group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    {service.excerpt && (
                      <p className="text-muted text-sm">{service.excerpt}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-muted text-6xl">
                description
              </span>
              <p className="mt-4 text-lg text-muted">
                No assessments published yet. Add them via the Strapi admin
                panel.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
