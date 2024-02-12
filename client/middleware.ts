import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // let cookie = request.cookies.get('token');
  // console.log(cookie);

  const token = request.cookies.get("token")?.value || null;

  const isPublicPath = path === "/login" || path === "/register";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/Dashboard", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register"],
};
