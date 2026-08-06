import { type NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/admin/rate-limit'
import { ADMIN_SESSION_COOKIE } from '@/lib/auth/session'
import { getSessionFromRequest } from '@/lib/auth/session'
import { getAdminHost, isAdminHostName, isLocalHost } from '@/lib/site'

const PUBLIC_FILE = /\.(.*)$/

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') || 'localhost:3000'
  const local = isLocalHost(host)
  const adminHost = isAdminHostName(host)
  const isProd = process.env.NODE_ENV === 'production'

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/css') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/icon') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/api/admin/login')) {
    const ip = request.headers.get('x-forwarded-for') || host
    const limited = checkRateLimit(`login:${ip}`, 20, 60_000)
    if (!limited.ok) {
      return NextResponse.json({ message: 'Too many requests' }, { status: 429 })
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  if (!adminHost && pathname.startsWith('/admin')) {
    if (local) {
      return NextResponse.next()
    }
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if (!adminHost && pathname.startsWith('/studio')) {
    if (isProd && !local) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  const session = await getSessionFromRequest(request)
  const hasSession = Boolean(session)

  if (adminHost) {
    if (pathname.startsWith('/studio')) {
      return NextResponse.next()
    }

    const rewritePath = pathname === '/' ? '/admin' : `/admin${pathname}`
    const url = request.nextUrl.clone()
    url.pathname = rewritePath

    const isLogin = pathname === '/login' || rewritePath === '/admin/login'

    if (!hasSession && !isLogin) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/login'
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (hasSession && isLogin) {
      const dash = request.nextUrl.clone()
      dash.pathname = '/'
      return NextResponse.redirect(dash)
    }

    return NextResponse.rewrite(url)
  }

  if (local && pathname.startsWith('/admin')) {
    const isLogin = pathname === '/admin/login'
    if (!hasSession && !isLogin) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
    if (hasSession && isLogin) {
      const dash = request.nextUrl.clone()
      dash.pathname = '/admin'
      return NextResponse.redirect(dash)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

void getAdminHost
void ADMIN_SESSION_COOKIE
