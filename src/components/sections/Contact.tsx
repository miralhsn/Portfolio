import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import MagneticLink from "@/components/motion/MagneticLink";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-[var(--color-bg-soft)] section-space"
      aria-label="Contact Section"
    >
      <div className="site-shell">
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-3">
            <span className="micro-label">
              04 // ACQUISITION & TALK
            </span>
          </div>

          <div className="col-span-12 md:col-span-9">
            <HeadlineReveal
              className="max-w-[11ch]"
              lines={[
                <span key="lets">Let&apos;s build</span>,
                <span key="something">something</span>,
                <span key="intelligent">intelligent<span className="text-accent">.</span></span>,
              ]}
            />
          </div>

          <div className="col-span-12 mt-10 md:col-span-4 md:col-start-7">
            <p>
              Currently open to senior AI systems engineering roles, technical advisory, and high-signal research projects.
            </p>
          </div>

          <div className="col-span-12 mt-12 md:col-span-6 md:col-start-7">
            <MagneticLink
              href={`mailto:${siteConfig.contactEmail}`}
              cursorLabel="OPEN"
              className="focus-ring group inline-flex max-w-full items-center gap-3 border-b border-[var(--color-accent)] pb-2 text-[clamp(1.05rem,2vw,1.55rem)] font-bold leading-tight text-[var(--color-text)]"
            >
              <span className="break-all">{siteConfig.contactEmail}</span>
              <ArrowUpRight size={20} strokeWidth={1.5} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </MagneticLink>
          </div>

          <div className="col-span-12 mt-10 flex flex-wrap gap-8 md:col-span-6 md:col-start-7">
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              className="focus-ring group relative text-sm font-bold text-muted transition-colors duration-200 hover:text-[var(--color-text)]"
            >
              <span>LinkedIn</span>
              <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-100 bg-[var(--color-line-strong)] transition-colors duration-200 group-hover:bg-[var(--color-accent)]" />
            </a>

            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              className="focus-ring group relative text-sm font-bold text-muted transition-colors duration-200 hover:text-[var(--color-text)]"
            >
              <span>GitHub</span>
              <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-100 bg-[var(--color-line-strong)] transition-colors duration-200 group-hover:bg-[var(--color-accent)]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
