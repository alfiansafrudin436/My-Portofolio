"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/actions/auth";
import { signInSchema, type SignInInput } from "@/lib/validations/auth";

export function useLogin(next?: string) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = useCallback(
    (values: SignInInput) => {
      setError(null);
      startTransition(async () => {
        const result = await signIn(values, next);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        // The session cookie is set by the action; refresh so the server
        // layout guard sees it before we navigate.
        router.replace(result.data.redirectTo);
        router.refresh();
      });
    },
    [next, router],
  );

  return {
    // data
    form,
    errors: form.formState.errors,
    isPending,
    error,
    // methods
    onSubmit: form.handleSubmit(onSubmit),
    clearError: () => setError(null),
  };
}
