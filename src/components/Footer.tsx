export default function Footer() {
  return (
    <footer className="border-t hairline bg-[var(--color-bg)] py-8">
      <div className="site-shell flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-dim">
          Â© {new Date().getFullYear()} Miral Hasan. Built with Next.js 15 &amp; Tailwind CSS.
        </p>
        <p className="text-xs font-bold text-dim">
          Designed for engineering credibility.
        </p>
      </div>
    </footer>
  );
}
