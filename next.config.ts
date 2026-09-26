import type { NextConfig } from "next";

/**
 * Derive the Storage hostname from the Supabase URL so only that project's
 * bucket is allowed. Falls back to any Supabase subdomain when the env var is
 * absent (e.g. a `next build` run before the project is provisioned).
 */
function supabaseHostname(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return "*.supabase.co";
  try {
    return new URL(url).hostname;
  } catch {
    return "*.supabase.co";
  }
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHostname(),
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
