"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

export interface CaseStudyData {
  id: string;
  name: string;
  tagline: string;
  status: string;
  shortDescription: string;
  description: string;
  problem: string;
  solution: string;
  architecture: Array<{ step: string; detail: string }>;
  workflow: Array<{ title: string; description: string }>;
  technicalDecisions: string;
  challenges: string;
  results: string;
  lessonsLearned: string;
  techStack: string[];
  color: string;
  github?: string;
  demo?: string;
}

interface SlideOverCaseStudyProps {
  isOpen: boolean;
  data: CaseStudyData | null;
  onClose: () => void;
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t hairline py-7">
      <h3 className="micro-label mb-4 text-[var(--color-text)]">{title}</h3>
      {children}
    </section>
  );
}

export function SlideOverCaseStudy({ isOpen, data, onClose }: SlideOverCaseStudyProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[rgba(5,6,8,0.72)]"
          />

          <motion.div
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full flex-col border-l hairline bg-[var(--color-bg)] sm:w-[720px]"
          >
            <div className="flex items-center justify-between border-b hairline px-6 py-5 sm:px-8">
              <div>
                <span className="micro-label">
                  Case Study // {data.id}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study panel"
                data-cursor="OPEN"
                className="focus-ring flex h-10 w-10 items-center justify-center border hairline text-muted transition-colors duration-200 hover:text-[var(--color-text)]"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8">
              <div className="pb-8">
                <h2 className="text-[clamp(3rem,8vw,6rem)]">
                  {data.name}
                </h2>
                <p className="mt-3 text-base font-semibold text-[var(--color-accent)]">
                  {data.tagline}
                </p>
              </div>

              <DetailBlock title="Project Overview">
                <p>{data.description}</p>
              </DetailBlock>

              <div className="grid grid-cols-1 border-t hairline md:grid-cols-2">
                <section className="border-b hairline py-7 md:border-b-0 md:border-r md:pr-6 md:[border-color:var(--color-line)]">
                  <h3 className="micro-label mb-4 text-[var(--color-text)]">The Problem</h3>
                  <p className="body-small">{data.problem}</p>
                </section>
                <section className="border-b hairline py-7 md:border-b-0 md:pl-6">
                  <h3 className="micro-label mb-4 text-[var(--color-text)]">The Solution</h3>
                  <p className="body-small">{data.solution}</p>
                </section>
              </div>

              <DetailBlock title="System Architecture">
                <div className="space-y-5">
                  {data.architecture.map((step, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 border-t hairline pt-5 first:border-t-0 first:pt-0">
                      <div className="col-span-3">
                        <span className="micro-label">{step.step}</span>
                      </div>
                      <div className="col-span-9">
                        <p className="body-small">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DetailBlock>

              <DetailBlock title="System Workflow">
                <div className="space-y-5">
                  {data.workflow.map((flow, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 border-t hairline pt-5 first:border-t-0 first:pt-0">
                      <div className="col-span-2">
                        <span className="micro-label">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="col-span-10">
                        <h4 className="text-sm font-bold text-[var(--color-text)]">{flow.title}</h4>
                        <p className="body-small mt-2">{flow.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DetailBlock>

              <DetailBlock title="Technical Decisions">
                <p>{data.technicalDecisions}</p>
              </DetailBlock>

              <DetailBlock title="Challenges">
                <p>{data.challenges}</p>
              </DetailBlock>

              <DetailBlock title="Results & Impact">
                <p>{data.results}</p>
              </DetailBlock>

              <DetailBlock title="Lessons Learned">
                <p>{data.lessonsLearned}</p>
              </DetailBlock>

              <DetailBlock title="Full Tech Stack">
                <p className="text-sm font-semibold leading-relaxed text-muted">
                  {data.techStack.join(" / ")}
                </p>
              </DetailBlock>
            </div>

            <div className="border-t hairline px-6 py-5 sm:px-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="OPEN"
                    className="focus-ring inline-flex flex-1 items-center justify-center gap-2 border hairline px-4 py-3 text-sm font-bold text-[var(--color-text)] transition-colors duration-200 hover:border-[var(--color-line-strong)]"
                  >
                    <ExternalLink size={14} strokeWidth={1.8} />
                    <span>GitHub Repository</span>
                  </a>
                )}
                {data.demo && (
                  <a
                    href={data.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="OPEN"
                    className="focus-ring inline-flex flex-1 items-center justify-center gap-2 border border-[var(--color-accent)] bg-[var(--color-accent)] px-4 py-3 text-sm font-bold text-[var(--color-accent-ink)] transition-transform duration-200 active:scale-[0.98]"
                  >
                    <ExternalLink size={14} strokeWidth={1.8} />
                    <span>Live Demonstration</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
