"use client";

import { ArrowRight, Mail } from "lucide-react";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import MagneticLink from "@/components/motion/MagneticLink";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden border-b hairline pt-28"
      aria-label="Hero Section"
    >
      <div className="site-shell editorial-grid min-h-[calc(100vh-7rem)] content-end pb-14 sm:pb-20">
        <div className="col-span-12 mb-14 flex items-center justify-between gap-6 border-b hairline pb-4 text-dim md:col-span-10 md:col-start-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            <span className="micro-label">Available for Senior Roles</span>
          </div>
          <span className="micro-label hidden sm:inline">Scroll</span>
        </div>

        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <HeadlineReveal
            as="h1"
            immediate
            className="max-w-[12ch]"
            lines={[
              <span key="intro">hi, i am</span>,
              <span key="name" className="text-accent">miral hasan</span>,
            ]}
          />
        </div>

        <div className="col-span-12 mt-8 md:col-span-4 md:col-start-2 md:mt-12">
          <h2 className="font-[var(--font-text-stack)] text-[clamp(1.15rem,2vw,1.65rem)] font-semibold leading-tight tracking-normal">
            building production-ready AI systems
          </h2>
        </div>

        <div className="col-span-12 mt-6 md:col-span-4 md:col-start-8 md:mt-12">
          <p className="body-small max-w-[36rem]">
            AI Software Engineer focused on Computer Vision, LLMs, Agentic AI, Semantic Search, Explainable AI and scalable backend systems.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticLink
              href="mailto:miralqureshi@gmail.com"
              cursorLabel="OPEN"
              className="focus-ring group inline-flex h-12 items-center justify-center gap-2 border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 text-sm font-bold text-[var(--color-accent-ink)] transition-[background,color,transform] duration-200 ease-[var(--ease-standard)] active:scale-[0.98]"
            >
              <Mail size={15} strokeWidth={1.8} />
              <span>Let&apos;s Talk</span>
            </MagneticLink>
            <MagneticLink
              href="#projects"
              cursorLabel="VIEW"
              className="focus-ring group inline-flex h-12 items-center justify-center gap-2 border hairline px-5 text-sm font-bold text-[var(--color-text)] transition-[border-color,color,transform] duration-200 ease-[var(--ease-standard)] hover:border-[var(--color-line-strong)] active:scale-[0.98]"
            >
              <span>View Work</span>
              <ArrowRight size={15} strokeWidth={1.8} className="transition-transform duration-200 group-hover:translate-x-1" />
            </MagneticLink>
          </div>
        </div>
      </div>
    </section>
  );
}
