import { NextResponse } from "next/server";

const protectedRoutes = ["/write-blog", "/your-stories", "/category/for-you", "/library", "/profile-setting"];

export default function middleware(req) {
  const isAuthenticated = req.cookies.has("userToken");
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = {
  matcher: ["/write-blog", "/your-stories", "/category/for-you", "/library", "/profile-setting"],
};
