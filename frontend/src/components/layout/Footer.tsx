import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white px-6 md:px-20 py-16 border-t border-border">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-3 text-primary">
            <div className="size-6">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-foreground text-lg font-bold">Open Insights</h2>
          </Link>
          <p className="text-muted text-sm leading-relaxed">
            The leading source for independent, data-driven energy policy
            analysis. Building a transparent future for public discourse.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-muted hover:text-primary cursor-pointer transition-colors">
              public
            </span>
            <span className="material-symbols-outlined text-muted hover:text-primary cursor-pointer transition-colors">
              hub
            </span>
            <span className="material-symbols-outlined text-muted hover:text-primary cursor-pointer transition-colors">
              alternate_email
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-foreground font-bold mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-muted text-sm font-medium">
            <li>
              <Link href="/assessments" className="hover:text-primary transition-colors">
                Assessments Archive
              </Link>
            </li>
            <li>
              <Link href="/methodology" className="hover:text-primary transition-colors">
                Methodology Whitepaper
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Data Sources
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Partnerships
              </Link>
            </li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h4 className="text-foreground font-bold mb-6">About</h4>
          <ul className="flex flex-col gap-4 text-muted text-sm font-medium">
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">
                Our Team
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Annual Report
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Press Room
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-foreground font-bold mb-6">Contact</h4>
          <ul className="flex flex-col gap-4 text-muted text-sm font-medium">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">mail</span>
              contact@openinsights.org
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">location_on</span>
              Ottawa, ON - Canada
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">call</span>
              +1 (800) INSIGHT
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between text-muted text-xs gap-4">
        <p>&copy; {new Date().getFullYear()} Open Insights. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:underline">Privacy Policy</Link>
          <Link href="#" className="hover:underline">Terms of Service</Link>
          <Link href="#" className="hover:underline">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
