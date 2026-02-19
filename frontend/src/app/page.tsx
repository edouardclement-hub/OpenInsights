import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/blocks/Hero";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getHomepage, getServices, getStrapiMediaUrl } from "@/lib/strapi";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "OpenInsights — Delivering Insights That Drive Growth",
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
      <Hero
        title={homepage?.heroTitle || "Welcome to OpenInsights"}
        subtitle={
          homepage?.heroSubtitle ||
          "We deliver data-driven insights that help businesses make smarter decisions and achieve sustainable growth."
        }
        imageUrl={homepage?.heroImage?.url}
        ctaText={homepage?.heroCta?.text || "Get Started"}
        ctaHref={homepage?.heroCta?.url || "/contact"}
        ctaExternal={homepage?.heroCta?.isExternal}
      />

      {/* Featured Services */}
      <Section>
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">Our Services</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted">
              We offer a range of services designed to help your business thrive
              in today&apos;s data-driven world.
            </p>
          </div>

          {services && services.length > 0 ? (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {["Data Analytics", "Business Intelligence", "Strategic Consulting"].map(
                (title) => (
                  <div
                    key={title}
                    className="rounded-xl border border-secondary bg-white p-6 text-center shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-primary">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      Connect Strapi to manage this content dynamically.
                    </p>
                  </div>
                )
              )}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button href="/services" variant="outline">
              View All Services
            </Button>
          </div>
        </Container>
      </Section>

      {/* About Preview */}
      <Section className="bg-secondary/30">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-primary">
                About OpenInsights
              </h2>
              {homepage?.aboutPreview ? (
                <div
                  className="prose mt-6"
                  dangerouslySetInnerHTML={{ __html: homepage.aboutPreview }}
                />
              ) : (
                <p className="mt-6 text-muted">
                  We are a team of passionate professionals dedicated to
                  transforming data into actionable insights. With years of
                  experience across industries, we help organizations unlock the
                  full potential of their data.
                </p>
              )}
              <div className="mt-8">
                <Button href="/about" variant="outline">
                  Learn More About Us
                </Button>
              </div>
            </div>
            {homepage?.aboutImage ? (
              <div className="relative h-80 overflow-hidden rounded-xl">
                <Image
                  src={getStrapiMediaUrl(homepage.aboutImage.url)}
                  alt="About OpenInsights"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-80 items-center justify-center rounded-xl bg-secondary">
                <p className="text-muted">About image (managed via Strapi)</p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container className="text-center">
          <h2 className="text-3xl font-bold text-primary">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Let&apos;s discuss how we can help your organization unlock the
            power of data.
          </p>
          <div className="mt-8">
            <Button href="/contact">Contact Us Today</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
