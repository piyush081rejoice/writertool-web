// import { NextResponse } from "next/server";
// export function middleware(request) {
//   const currentPath = request.nextUrl.pathname;


//   const protectedRoutes = ["/write-blog", "/your-stories"];
//   console.log(` outside1`, request.cookies.has("userToken"));
//   if (protectedRoutes.includes(currentPath) && !request.cookies.has("userToken")) {
//     console.log(`inner`, request.cookies.has("userToken"));
//     return NextResponse.redirect(new URL(`/sign-up`, request.url));
//   }
//   return NextResponse.next();
// }
// export const config = {
//   matcher: ["/write-blog", "/your-stories"],
// };


import { NextResponse } from "next/server";

export function middleware(request) {
  const currentPath = request.nextUrl.pathname;
  const protectedRoutes = ["/write-blog", "/your-stories"];

  console.log(`outside1`, request.cookies.has("userToken"));

  if (protectedRoutes.includes(currentPath)) {
    // Check for userToken cookie, considering potential delays
    const hasUserToken = request.cookies.has("userToken");
    if (!hasUserToken) {
      console.log(`inner`, request.cookies.has("userToken"));
      return NextResponse.redirect(new URL(`/sign-up`, request.url));
    }
  }

  // Set appropriate cache headers (if applicable)
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  return response;
}

export const config = {
  matcher: ["/write-blog", "/your-stories"],
};
