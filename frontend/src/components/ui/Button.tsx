import Link from "next/link";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  external?: boolean;
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-colors";
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-light",
    outline:
      "border border-accent text-accent hover:bg-accent hover:text-white",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return <button className={styles}>{children}</button>;
}
