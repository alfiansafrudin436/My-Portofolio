import { Container } from "@/components/Container";
import { Link } from "@/components/Link";
import type { SocialLink } from "@/types/models";

export function SiteFooter({
  name,
  socialLinks,
}: {
  name: string;
  socialLinks: SocialLink[];
}) {
  return (
    <footer className="border-t border-border">
      <Container className="grid gap-8 py-10 md:grid-cols-3 md:items-center">
        <p className="text-sm text-fg-muted">
          © {new Date().getFullYear()} {name}
        </p>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <Link href={link.url} className="text-sm" showExternalIcon={false}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-sm text-fg-subtle md:text-right">
          Built with Next.js + Supabase
        </p>
      </Container>
    </footer>
  );
}
