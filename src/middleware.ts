import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/', '/login(.*)', '/signup(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const { pathname } = req.nextUrl

  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (userId && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/panel', req.url))
  }
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
