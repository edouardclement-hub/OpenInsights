import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { BlogPostCard } from "@/components/blocks/BlogPostCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getBlogPosts } from "@/lib/strapi";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, news, and case studies from OpenInsights.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  let posts = null;
  let pagination = null;

  try {
    const res = await getBlogPosts(page);
    posts = res.data;
    pagination = res.meta.pagination;
  } catch {
    // Strapi not running
  }

  return (
    <>
      <Hero
        title="Blog"
        subtitle="Insights, news, and case studies from our team."
      />

      <Section>
        <Container>
          {posts && posts.length > 0 ? (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pageCount > 1 && (
                <div className="mt-12 flex items-center justify-center gap-4">
                  {page > 1 && (
                    <a
                      href={`/blog?page=${page - 1}`}
                      className="rounded-lg border border-secondary px-4 py-2 text-sm font-medium text-primary hover:bg-secondary"
                    >
                      Previous
                    </a>
                  )}
                  <span className="text-sm text-muted">
                    Page {page} of {pagination.pageCount}
                  </span>
                  {page < pagination.pageCount && (
                    <a
                      href={`/blog?page=${page + 1}`}
                      className="rounded-lg border border-secondary px-4 py-2 text-sm font-medium text-primary hover:bg-secondary"
                    >
                      Next
                    </a>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <p className="text-lg text-muted">
                No blog posts yet. Add posts via the Strapi admin panel.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
