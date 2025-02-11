import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

import { APP_ROUTES } from './routes/paths'

const publicPages = [APP_ROUTES.public.signIn]

const authMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => token != null,
  },
  pages: {
    signIn: APP_ROUTES.public.signIn,
  },
})

export default async function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i',
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)
  const isAuth = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (isPublicPage && isAuth) {
    return NextResponse.redirect(new URL(APP_ROUTES.private.home.reports, req.url))
  }
  if (!isPublicPage) {
    // @ts-expect-error - The type of authMiddleware is not compatible with the middleware function
    return (authMiddleware as Any)(req)
  }

  return NextResponse.next()
}

export const config = {
  matcher: `/((?!_next/static|_next/image|favicon.ico|api|error|.*\\..*).*)`,
};
