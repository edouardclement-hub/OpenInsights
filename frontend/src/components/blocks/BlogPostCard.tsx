import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { getStrapiMediaUrl } from "@/lib/strapi";
import type { StrapiBlogPost } from "@/types/strapi";

export function BlogPostCard({ post }: { post: StrapiBlogPost }) {
  const date = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="h-full transition-shadow group-hover:shadow-lg">
        {post.coverImage && (
          <div className="relative -mx-6 -mt-6 mb-4 h-48 overflow-hidden rounded-t-xl">
            <Image
              src={getStrapiMediaUrl(post.coverImage.url)}
              alt={post.coverImage.alternativeText || post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-muted">
          {post.category && (
            <span className="rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent capitalize">
              {post.category.replace("-", " ")}
            </span>
          )}
          {date && <span>{date}</span>}
        </div>
        <h3 className="mt-2 text-lg font-semibold text-primary group-hover:text-accent">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm text-muted">
            {post.excerpt}
          </p>
        )}
        {post.author && (
          <p className="mt-3 text-xs text-muted">By {post.author.name}</p>
        )}
      </Card>
    </Link>
  );
}
