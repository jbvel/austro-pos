import { NextResponse, type NextRequest } from "next/server";

import { AUTH_TOKEN_KEY } from "@/lib/auth";

const PUBLIC_ROUTES = ["/login"];
const PRIVATE_ROUTES = [
  "/dashboard",
  "/pos",
  "/products",
  "/maintainers",
  "/maintainers/categories",
  "/sales",
  "/inventory",
  "/customers",
  "/cash-register",
  "/reports",
  "/settings",
];

function isPrivateRoute(pathname: string) {
  return PRIVATE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;
  const hasToken = Boolean(token);

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = hasToken ? "/dashboard" : "/login";
    return NextResponse.redirect(url);
  }

  if (hasToken && isPublicRoute(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (!hasToken && isPrivateRoute(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard/:path*",
    "/pos/:path*",
    "/products/:path*",
    "/maintainers/:path*",
    "/sales/:path*",
    "/inventory/:path*",
    "/customers/:path*",
    "/cash-register/:path*",
    "/reports/:path*",
    "/settings/:path*",
  ],
};
