import { NextResponse, type NextRequest } from "next/server";
import { verifyAdminToken } from "@/server/utils/jwt";
import { ADMIN_COOKIE_NAME } from "@/server/middleware/auth.middleware";

const LOGIN_PATH = "/admin/login";
const DASHBOARD_PATH = "/admin";

function hasValidSession(request: NextRequest): boolean {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    verifyAdminToken(token);
    return true;
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = hasValidSession(request);

  if (pathname === LOGIN_PATH) {
    if (authenticated) {
      return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
    }
    return NextResponse.next();
  }

  if (!authenticated) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
