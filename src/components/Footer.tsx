export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "clamp(1.5rem,3vw,2rem) clamp(1.25rem,4vw,2rem)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <p style={{ fontSize: "0.8rem", color: "var(--text-4)" }}>
          © {new Date().getFullYear()} Miral Hasan. Built with Next.js 15 &amp; Tailwind CSS.
        </p>
        <p style={{ fontSize: "0.75rem", color: "var(--text-4)", fontFamily: "monospace" }}>
          Designed for engineering credibility.
        </p>
      </div>
    </footer>
  );
}
