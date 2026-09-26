"use client";

import { useEffect } from "react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-screen flex-col justify-center py-24">
      <p className="label text-danger">Error</p>
      <h1 className="mt-4 text-4xl font-medium">Something went wrong.</h1>
      <p className="mt-4 max-w-[46ch] text-lg text-fg-muted">
        This is usually a missing Supabase environment variable or an
        unreachable database. Check the server logs for details.
      </p>
      {error.digest && (
        <p className="label mt-4 text-fg-subtle">Digest: {error.digest}</p>
      )}
      <Button variant="outline" onClick={reset} className="mt-10 w-fit">
        Try again
      </Button>
    </Container>
  );
}
