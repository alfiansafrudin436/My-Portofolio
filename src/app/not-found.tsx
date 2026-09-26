import NextLink from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-screen flex-col justify-center py-24">
      <p className="label text-accent">404</p>
      <h1 className="mt-4 text-4xl font-medium">This page does not exist.</h1>
      <p className="mt-4 max-w-[46ch] text-lg text-fg-muted">
        The link may be outdated, or the project it pointed to is no longer
        published.
      </p>
      <NextLink
        href="/"
        className="label mt-10 inline-flex w-fit border border-border-strong px-5 py-3 text-fg transition-colors hover:bg-fg hover:text-bg"
      >
        Back to home
      </NextLink>
    </Container>
  );
}
