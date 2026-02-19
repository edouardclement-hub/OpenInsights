export function RichText({ content }: { content: string | null }) {
  if (!content) return null;

  return (
    <div
      className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
