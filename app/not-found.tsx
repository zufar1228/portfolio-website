import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="section-head">
        <p className="eyebrow section-label">Error — 404</p>
        <h1 className="section-title">Page not found.</h1>
      </div>
      <p style={{ marginTop: 24, maxWidth: "40ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <div>
        <Link href="/" className="btn btn-primary cta" style={{ marginTop: 8 }}>
          Back to home<span>←</span>
        </Link>
      </div>
    </main>
  );
}
