import HeadlineReveal from "@/components/motion/HeadlineReveal";

const philosophy = [
  {
    title: "Production-First",
    desc: "A model that can't be served is just a prototype. Every model choice, optimization, and parameter is filtered through real-world system latency and serving costs.",
  },
  {
    title: "Observability Built-In",
    desc: "AI systems fail silently. I build with comprehensive logging, telemetry, vector analytics, and drift monitoring from day oneâ€”never as an afterthought.",
  },
  {
    title: "Systems Thinking",
    desc: "The model is only 20% of the architecture. I focus on high-throughput data pipelines, GPU/CPU scaling limits, feedback loops, and robust caching layers.",
  },
];

const stats = [
  { value: "15+", label: "Projects Built" },
  { value: "8+", label: "Systems Deployed" },
  { value: "30+", label: "Technologies Mastered" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative border-b hairline bg-[var(--color-bg-soft)] section-space"
      aria-label="About Section"
    >
      <div className="site-shell">
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-3">
            <div className="micro-label">
              01 // PROFILE & PHILOSOPHY
            </div>
          </div>

          <div className="col-span-12 md:col-span-9">
            <HeadlineReveal
              className="max-w-[10ch]"
              lines={[
                <span key="what">What I Build &</span>,
                <span key="how">How I Think<span className="text-accent">.</span></span>,
              ]}
            />
          </div>

          <div className="col-span-12 mt-14 md:col-span-5 md:col-start-4 md:mt-20">
            <h3 className="font-[var(--font-text-stack)] text-[clamp(1.8rem,3.8vw,3.8rem)] font-medium leading-[1.05] tracking-normal">
              Engineering AI for reliability
            </h3>
          </div>

          <div className="col-span-12 mt-8 space-y-6 md:col-span-4 md:col-start-9 md:mt-20">
            <p>
              I am an AI Systems Engineer who focuses on translating bleeding-edge machine learning research into production-grade systems. I bridge the gap between academic models and robust, scalable backend architectures.
            </p>

            <p>
              My engineering philosophy centers around simplicity and performance. Rather than deploying complex architectures by default, I opt for the simplest mechanism that meets the latency, cost, and reliability criteria of a production environment.
            </p>
          </div>

          <div className="col-span-12 mt-16 md:col-span-9 md:col-start-4 md:mt-24">
            <div className="border-y hairline">
              {philosophy.map((item, idx) => (
                <div
                  key={item.title}
                  className="grid grid-cols-12 gap-4 border-b hairline py-7 last:border-b-0 md:py-9"
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="micro-label">{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="col-span-10 md:col-span-4">
                    <h3 className="font-[var(--font-text-stack)] text-xl font-semibold leading-tight tracking-normal text-[var(--color-text)]">
                      {item.title}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <p className="body-small">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 mt-14 md:col-span-9 md:col-start-4">
            <div className="grid grid-cols-1 border-y hairline sm:grid-cols-3">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="border-b hairline py-7 sm:border-b-0 sm:border-r sm:pr-8 sm:last:border-r-0 sm:[border-color:var(--color-line)]"
                >
                  <div className="display-type text-[clamp(4rem,8vw,7rem)] leading-none text-[var(--color-text)]">
                    {stat.value}
                  </div>
                  <div className="micro-label mt-3">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
