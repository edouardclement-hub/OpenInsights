import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { getStrapiMediaUrl } from "@/lib/strapi";

interface HeroProps {
  title: string;
  subtitle?: string | null;
  imageUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaExternal?: boolean;
}

export function Hero({
  title,
  subtitle,
  imageUrl,
  ctaText,
  ctaHref,
  ctaExternal,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-24 md:py-32">
      {imageUrl && (
        <Image
          src={getStrapiMediaUrl(imageUrl)}
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg text-white/80 md:text-xl">{subtitle}</p>
          )}
          {ctaText && ctaHref && (
            <div className="mt-8">
              <Button href={ctaHref} external={ctaExternal}>
                {ctaText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
