"use client";

import NextLink from "next/link";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { Input } from "@/components/Input";
import { useLogin } from "@/app/(auth)/login/hooks";

export function LoginForm({ next }: { next?: string }) {
  const { form, errors, isPending, error, onSubmit } = useLogin(next);

  return (
    <div className="w-full max-w-sm">
      <p className="label text-accent">Admin access</p>
      <h1 className="mt-3 text-3xl font-medium">Sign in</h1>
      <p className="mt-3 text-sm text-fg-muted">
        Master data is restricted to the site owner.
      </p>

      {error && (
        <p
          role="alert"
          className="mt-8 border border-danger px-4 py-3 text-sm text-danger"
        >
          {error}
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
        <Field label="Email" htmlFor="email" error={errors.email?.message} required>
          <Input
            id="email"
            type="email"
            variant="underline"
            autoComplete="email"
            autoFocus
            invalid={Boolean(errors.email)}
            {...form.register("email")}
          />
        </Field>

        <Field
          label="Password"
          htmlFor="password"
          error={errors.password?.message}
          required
        >
          <Input
            id="password"
            type="password"
            variant="underline"
            autoComplete="current-password"
            invalid={Boolean(errors.password)}
            {...form.register("password")}
          />
        </Field>

        <Button type="submit" isLoading={isPending} className="w-full" size="lg">
          {isPending ? "Signing in" : "Sign in"}
        </Button>
      </form>

      <NextLink
        href="/"
        className="label mt-10 inline-block text-fg-subtle transition-colors hover:text-fg"
      >
        ← Back to site
      </NextLink>
    </div>
  );
}
