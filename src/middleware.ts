import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Simple mock authentication for /admin paths (except /admin/login)
    // Real implementation will use Supabase Auth

    if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
        // Check if an auth cookie exists
        const hasAuthSession = request.cookies.has('coesa-admin-auth');

        if (!hasAuthSession) {
            // Redirect to login if unauthenticated
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

// Config to match only /admin paths for middleware execution
export const config = {
    matcher: '/admin/:path*',
}
