// Proxy (Next.js 16's middleware): two jobs, admin paths only.
//   1. Optimistic auth gate — /admin/* pages and /api/admin/* routes require
//      the signed session cookie; pages redirect to /admin/login, API calls
//      get a 401. Pages and routes re-check server-side (lib/admin-guard),
//      so this layer is a convenience, not the only lock.
//   2. Sets x-pathname so the root layout can drop the public site chrome
//      (header/footer) on admin screens.

import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-session";

const PUBLIC_ADMIN_PATHS = new Set(["/admin/login", "/api/admin/login"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const authed = verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
  if (!authed) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Tidak terautentikasi." }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
