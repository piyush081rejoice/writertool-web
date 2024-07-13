import { NextResponse } from "next/server";
export function middleware(request) {
  const currentPath = request.nextUrl.pathname;

  const userToken = request.cookies.has("userToken");

  const protectedRoutes = ["/write-blog", "/your-stories"];
  console.log(` outside1`, request.cookies.has("userToken"));
  if (protectedRoutes.includes(currentPath) && !request.cookies.has("userToken")) {
    console.log(`inner`, request.cookies.has("userToken"));
    return NextResponse.redirect(new URL(`/sign-up`, request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/write-blog","/your-stories"],
};
