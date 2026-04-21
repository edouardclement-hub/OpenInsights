import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-header">
      <div className="page-header-inner" style={{ textAlign: "center" }}>
        <div className="section-label">404</div>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div style={{ marginTop: 24 }}>
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
