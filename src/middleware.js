import { NextResponse } from "next/server";
export function middleware(request) {
  const currentPath = request.nextUrl.pathname;

  const userToken = request.cookies.has("userToken");

  const protectedRoutes = ["/write-blog", "/your-stories"];

  if (protectedRoutes.includes(currentPath) && !request.cookies.has("userToken")) {
    return NextResponse.redirect(new URL(`/sign-in`, request.url));
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
