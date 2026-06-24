"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, ExternalLink, Link, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="section" ref={ref} aria-label="Contact">
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>

        <div className="section-label" style={{ justifyContent: "center", display: "flex" }}>Contact</div>

        <h2 style={{ marginBottom: "1.25rem" }}>
          Let&apos;s build intelligent<br />systems together<span style={{ color: "var(--primary)" }}>.</span>
        </h2>
        <p style={{ color: "var(--text-3)", marginBottom: "clamp(2rem,4vw,3rem)", maxWidth: 440, margin: "0 auto clamp(2rem,4vw,3rem)" }}>
          Open to AI/ML engineering roles, research collaborations, and high-signal conversations. I reply within 24 hours.
        </p>

        {/* Main card */}
        <div className="glass" style={{ borderRadius: "var(--r-2xl)", padding: "clamp(1.75rem,5vw,3rem)", position: "relative", overflow: "hidden", border: "1px solid var(--border-hi)" }}>
          {/* Background glow */}
          <div style={{ position: "absolute", top: "-40%", left: "50%", transform: "translateX(-50%)", width: 400, height: 200, borderRadius: "50%", background: "rgba(99,102,241,0.08)", filter: "blur(60px)", pointerEvents: "none" }} aria-hidden="true" />

          {/* Email CTA */}
          <a href={`mailto:${siteConfig.contactEmail}`}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 32px", background: "var(--primary)", color: "#fff", fontWeight: 600, fontSize: "1rem", borderRadius: 12, textDecoration: "none", marginBottom: 28, transition: "all 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 16px 48px rgba(99,102,241,0.35)"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}>
            <Mail size={18} />
            {siteConfig.contactEmail}
            <ArrowRight size={16} />
          </a>

          <p style={{ fontSize: "0.8rem", color: "var(--text-4)", marginBottom: 20 }}>or find me on</p>

          {/* Social row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {[
              { href: siteConfig.githubUrl, Icon: ExternalLink, label: "miralhsn", desc: "GitHub" },
              { href: siteConfig.linkedinUrl, Icon: Link, label: "miral-hasan-26353b249", desc: "LinkedIn" },
            ].map(({ href, Icon, label, desc }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 20px", background: "var(--surface-2)", border: "1px solid var(--border-md)", borderRadius: 10, color: "var(--text-2)", fontSize: "0.85rem", textDecoration: "none", transition: "all 0.2s", minWidth: 0 }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.color = "var(--text-1)"; el.style.borderColor = "var(--border-hi)"; el.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.color = "var(--text-2)"; el.style.borderColor = "var(--border-md)"; el.style.transform = "translateY(0)"; }}>
                <Icon size={15} />
                <span style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-4)", fontFamily: "monospace" }}>{desc}</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>{label}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
