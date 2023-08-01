import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
    const session = request.cookies.get("session");
    const host = request.headers.get("Host") ?? "localhost:3000";
    console.log("host", host)

    // Return to /login if don't have a session
    if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const protocal = process?.env.NODE_ENV === "development" ? "http" : "https"

    console.log("protocal", protocal)

    const responseAPI = await fetch(`${protocal}://localhost:3000/api/login`, {
        method: "GET",
        headers: {
            Cookie: `session=${session?.value}`,
        },
    });

    //Return to /login if token is not authorized
    if (responseAPI.status !== 200) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

// Add your protected routes
export const config = {
    matcher: ["/protected/:path*", "/"],
};