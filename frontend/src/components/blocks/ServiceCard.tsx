import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { getStrapiMediaUrl } from "@/lib/strapi";
import type { StrapiService } from "@/types/strapi";

export function ServiceCard({ service }: { service: StrapiService }) {
  return (
    <Card>
      {service.image && (
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
          <Image
            src={getStrapiMediaUrl(service.image.url)}
            alt={service.image.alternativeText || service.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-primary">{service.title}</h3>
      {service.excerpt && (
        <p className="mt-2 text-sm text-muted">{service.excerpt}</p>
      )}
    </Card>
  );
}
