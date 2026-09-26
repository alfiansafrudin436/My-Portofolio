import type { Metadata } from "next";
import { LoginForm } from "@/app/(auth)/login/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

// searchParams is a Promise in Next.js 16.
type PageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { next } = await searchParams;
  return <LoginForm next={next} />;
}
