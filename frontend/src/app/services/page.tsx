import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getServices } from "@/lib/strapi";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the services we offer at OpenInsights.",
};

export default async function ServicesPage() {
  let services = null;

  try {
    const res = await getServices();
    services = res.data;
  } catch {
    // Strapi not running
  }

  return (
    <>
      <Hero
        title="Our Services"
        subtitle="Comprehensive solutions to help your business leverage data for growth."
      />

      <Section>
        <Container>
          {services && services.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Data Analytics",
                  excerpt:
                    "Transform raw data into meaningful insights with our advanced analytics solutions.",
                },
                {
                  title: "Business Intelligence",
                  excerpt:
                    "Make informed decisions with real-time dashboards and comprehensive reporting.",
                },
                {
                  title: "Strategic Consulting",
                  excerpt:
                    "Expert guidance to align your data strategy with business objectives.",
                },
                {
                  title: "Machine Learning",
                  excerpt:
                    "Leverage AI and ML to predict trends and automate decision-making.",
                },
                {
                  title: "Data Engineering",
                  excerpt:
                    "Build robust data pipelines and infrastructure that scale with your needs.",
                },
                {
                  title: "Training & Workshops",
                  excerpt:
                    "Empower your team with the skills to become data-driven.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-secondary bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{item.excerpt}</p>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section className="bg-secondary/30">
        <Container className="text-center">
          <h2 className="text-3xl font-bold text-primary">
            Need a Custom Solution?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Every business is unique. Let&apos;s discuss how we can tailor our
            services to meet your specific needs.
          </p>
          <div className="mt-8">
            <Button href="/contact">Get in Touch</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
