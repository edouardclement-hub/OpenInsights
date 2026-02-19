export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-secondary bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
