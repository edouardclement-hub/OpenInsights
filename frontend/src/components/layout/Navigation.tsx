"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navigation({
  mobile,
  onLinkClick,
}: {
  mobile?: boolean;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav
      className={
        mobile
          ? "flex flex-col gap-2"
          : "hidden md:flex items-center gap-8"
      }
    >
      {links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={`text-sm font-medium transition-colors ${
              isActive
                ? "text-accent"
                : "text-foreground/70 hover:text-foreground"
            } ${mobile ? "py-2 px-4 rounded-lg hover:bg-secondary" : ""}`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
