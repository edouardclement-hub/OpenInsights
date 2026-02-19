import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/blocks/RichText";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  getBlogPosts,
  getBlogPostBySlug,
  getStrapiMediaUrl,
} from "@/lib/strapi";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const res = await getBlogPosts(1, 100);
    return res.data.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getBlogPostBySlug(slug);
    const post = res.data[0];
    if (!post) return { title: "Post Not Found" };

    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || undefined,
      openGraph: post.coverImage
        ? { images: [getStrapiMediaUrl(post.coverImage.url)] }
        : undefined,
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = null;

  try {
    const res = await getBlogPostBySlug(slug);
    post = res.data[0];
  } catch {
    notFound();
  }

  if (!post) notFound();

  const date = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative h-64 w-full md:h-96">
          <Image
            src={getStrapiMediaUrl(post.coverImage.url)}
            alt={post.coverImage.alternativeText || post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/60" />
          <div className="absolute inset-0 flex items-end">
            <Container className="pb-8">
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {post.title}
              </h1>
            </Container>
          </div>
        </div>
      )}

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Post header (if no cover image) */}
            {!post.coverImage && (
              <h1 className="text-3xl font-bold text-primary md:text-4xl">
                {post.title}
              </h1>
            )}

            {/* Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
              {post.category && (
                <span className="rounded-full bg-accent/10 px-3 py-1 font-medium text-accent capitalize">
                  {post.category.replace("-", " ")}
                </span>
              )}
              {date && <span>{date}</span>}
              {post.author && <span>By {post.author.name}</span>}
            </div>

            {/* Content */}
            <div className="mt-8">
              <RichText content={post.content} />
            </div>

            {/* Back link */}
            <div className="mt-12 border-t border-secondary pt-8">
              <Link
                href="/blog"
                className="text-sm font-medium text-accent hover:underline"
              >
                &larr; Back to Blog
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
