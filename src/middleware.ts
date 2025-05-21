import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
    "/dashboard",
    "/upload-image",
    "/result-image",
    "/history",
    "/detail",
];

const publicRoutes = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/confirm-password",
];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const { pathname } = request.nextUrl;

    // Jika halaman protected dan token tidak ada, redirect ke signin
    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );
    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Jika user sudah login tapi mengakses halaman publik (signin, signup, dll), redirect ke dashboard
    if (publicRoutes.some((route) => pathname.startsWith(route)) && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/signin",
        "/signup",
        "/forgot-password",
        "/confirm-password",
        "/dashboard/:path*",
        "/upload-image/:path*",
        "/result-image/:path*",
        "/history/:path*",
        "/detail/:path*",
    ],
};
