import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "Our transparent, peer-reviewed methodology for energy policy analysis.",
};

export default function MethodologyPage() {
  return (
    <>
      <section className="px-6 md:px-20 py-12 md:py-20 flex justify-center bg-white">
        <div className="max-w-[1200px] w-full flex flex-col gap-4">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">
            How We Work
          </span>
          <h1 className="text-foreground text-4xl lg:text-5xl font-black leading-tight tracking-tight">
            Our Methodology
          </h1>
          <p className="text-muted text-lg max-w-2xl">
            Transparency is at the heart of everything we do. Here&apos;s how we
            ensure every assessment meets the highest standards of rigor.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-20 py-16 flex justify-center bg-background-light">
        <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              icon: "database",
              title: "Data Collection",
              desc: "We source data from publicly available government databases, peer-reviewed research, and verified industry reports. Every data point is cited and traceable.",
            },
            {
              icon: "model_training",
              title: "Modeling Framework",
              desc: "Our models are built on established energy systems frameworks, calibrated against historical data, and validated by independent experts.",
            },
            {
              icon: "fact_check",
              title: "Peer Review",
              desc: "Every assessment undergoes internal review by at least two analysts and external review by subject matter experts before publication.",
            },
            {
              icon: "update",
              title: "Continuous Updates",
              desc: "As new data becomes available or policies evolve, we update our assessments and clearly document all revisions.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="flex gap-6 rounded-xl border border-border-dark bg-white p-8"
            >
              <div className="bg-primary/10 text-primary w-14 h-14 rounded-lg flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl">
                  {step.icon}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-xl font-bold">
                  {step.title}
                </h3>
                <p className="text-muted text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
