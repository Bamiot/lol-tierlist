import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { locales } from '@/localization'

function getLocale(request: NextRequest) {
  const headerLocale = request.headers.get('Accept-Language')
  if (headerLocale && Object.keys(locales).includes(headerLocale))
    return headerLocale
  return Object.keys(locales)[0]
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = Object.keys(locales).some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  request.nextUrl.pathname = `/${getLocale(request)}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
