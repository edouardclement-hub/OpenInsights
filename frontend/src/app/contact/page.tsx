import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { ContactForm } from "@/components/blocks/ContactForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with OpenInsights. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Contact Us"
        subtitle="Have a question or want to work together? We'd love to hear from you."
      />

      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-primary">
                Send Us a Message
              </h2>
              <p className="mt-2 text-muted">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-primary">Get in Touch</h2>
              <p className="mt-2 text-muted">
                You can also reach us through the following channels.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-primary">Email</h3>
                  <p className="mt-1 text-muted">contact@openinsights.com</p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary">Office</h3>
                  <p className="mt-1 text-muted">
                    123 Business Street
                    <br />
                    Suite 100
                    <br />
                    City, State 12345
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary">Hours</h3>
                  <p className="mt-1 text-muted">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
