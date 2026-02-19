import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { TeamMemberCard } from "@/components/blocks/TeamMember";
import { RichText } from "@/components/blocks/RichText";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getAboutPage, getTeamMembers } from "@/lib/strapi";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await getAboutPage();
    return {
      title: data?.seoTitle || "About Us",
      description: data?.seoDescription || "Learn more about OpenInsights and our team.",
    };
  } catch {
    return { title: "About Us" };
  }
}

export default async function AboutPage() {
  let aboutPage = null;
  let teamMembers = null;

  try {
    const [aboutRes, teamRes] = await Promise.all([
      getAboutPage(),
      getTeamMembers(),
    ]);
    aboutPage = aboutRes.data;
    teamMembers = teamRes.data;
  } catch {
    // Strapi not running
  }

  return (
    <>
      <Hero
        title={aboutPage?.title || "About Us"}
        subtitle="Learn more about who we are and what drives us."
        imageUrl={aboutPage?.heroImage?.url}
      />

      <Section>
        <Container>
          {aboutPage?.content ? (
            <div className="mx-auto max-w-3xl">
              <RichText content={aboutPage.content} />
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              <p className="text-lg text-muted">
                OpenInsights was founded with a simple mission: to help
                businesses make better decisions through data. We combine
                cutting-edge analytics with deep industry expertise to deliver
                insights that matter.
              </p>
              <p className="mt-4 text-lg text-muted">
                Our team brings together diverse backgrounds in data science,
                business strategy, and technology to provide comprehensive
                solutions for our clients.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Team Section */}
      <Section className="bg-secondary/30">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">Meet Our Team</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted">
              The talented people behind OpenInsights.
            </p>
          </div>

          {teamMembers && teamMembers.length > 0 ? (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {["Jane Doe", "John Smith", "Alex Johnson"].map((name) => (
                <div
                  key={name}
                  className="rounded-xl border border-secondary bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-secondary">
                    <span className="text-2xl text-muted">
                      {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary">{name}</h3>
                  <p className="text-sm text-accent">Team Member</p>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
