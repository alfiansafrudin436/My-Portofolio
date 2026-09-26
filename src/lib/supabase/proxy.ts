import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

const PROTECTED_PREFIX = "/master-data";
const LOGIN_PATH = "/login";

/**
 * Refreshes the Supabase session cookie on every request and performs an
 * optimistic redirect for the master-data area.
 *
 * This is a UX layer, not the authorization boundary — the real guard is the
 * getUser() check in src/app/master-data/layout.tsx, which runs regardless of
 * whether this proxy matched the request.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl(), supabaseAnonKey(), {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // getUser(), not getSession(): only getUser() validates the JWT server-side.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (!user && pathname.startsWith(PROTECTED_PREFIX)) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && pathname === LOGIN_PATH) {
    const url = request.nextUrl.clone();
    url.pathname = PROTECTED_PREFIX;
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Returning this exact object matters: it carries the refreshed cookies.
  return response;
}
