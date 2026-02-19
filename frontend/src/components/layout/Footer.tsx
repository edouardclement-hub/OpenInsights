import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-secondary bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">OpenInsights</h3>
            <p className="mt-2 text-sm text-white/70">
              Delivering insights that drive business growth.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Get in Touch
            </h4>
            <p className="mt-3 text-sm text-white/70">
              Have a question? Reach out to us.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-light"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} OpenInsights. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
