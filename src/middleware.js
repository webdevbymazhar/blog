import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function middleware(req) {
    let token = cookies().get("token")?.value
    try {
      
        const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_PRIVATE_KEY))

        if (!verified) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
    } catch (error) {
       
        return NextResponse.redirect(new URL("/login", req.url))
    }
}

export const config = {
    matcher: ["/admin/:path*"], // Protect routes under /admin/*
}
