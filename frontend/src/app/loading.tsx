import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Container className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-accent" />
        <p className="mt-4 text-sm text-muted">Loading...</p>
      </Container>
    </div>
  );
}
