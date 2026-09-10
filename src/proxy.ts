// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// export async function proxy(request: NextRequest) {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const cookie = request.headers.get("cookie");

//   if (!apiUrl || !cookie) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   try {
//     const response = await fetch(`${apiUrl}/auth/me`, {
//       headers: { cookie },
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       return NextResponse.redirect(new URL("/auth/login", request.url));
//     }
//   } catch {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/review/:path*"],
// };

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/review/:path*"],
};
