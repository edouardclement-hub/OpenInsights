import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { getStrapiMediaUrl } from "@/lib/strapi";
import type { StrapiTeamMember } from "@/types/strapi";

export function TeamMemberCard({ member }: { member: StrapiTeamMember }) {
  return (
    <Card className="text-center">
      {member.photo && (
        <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
          <Image
            src={getStrapiMediaUrl(member.photo.url)}
            alt={member.photo.alternativeText || member.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-primary">{member.name}</h3>
      {member.role && (
        <p className="text-sm font-medium text-accent">{member.role}</p>
      )}
      {member.bio && (
        <p className="mt-2 text-sm text-muted">{member.bio}</p>
      )}
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-accent hover:underline"
        >
          LinkedIn
        </a>
      )}
    </Card>
  );
}
