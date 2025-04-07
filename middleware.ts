import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { IFRAME_WHITELIST_ORIGINS } from '@/config'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const frameAncestors = IFRAME_WHITELIST_ORIGINS.length > 0
    ? `frame-ancestors ${IFRAME_WHITELIST_ORIGINS.join(' ')};`
    : ''

  response.headers.set('Content-Security-Policy', frameAncestors)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|favicon.svg).*)'], // 정적 리소스에는 적용X
}
