import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import AuthApi from './api/AuthApi'
import { AuthError } from './api/base/errors'
import { StaffMember } from './interfaces/api/admin/staff'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/operators', request.url))
  }

  if (request.nextUrl.pathname === '/operator') {
    return NextResponse.redirect(new URL('/operator/chats', request.url))
  }

  if (request.nextUrl.pathname === '/operator/chats') {
    return NextResponse.redirect(new URL('/operator/chats/all', request.url))
  }

  if (request.nextUrl.pathname === '/') {
    const authToken = request.cookies.get('VSAdminAuth')?.value   
    const authApi = new AuthApi({ authToken })

    let user: StaffMember
    try {
      user = await authApi.getCurrentUser()
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

      throw error
    }

    if (user.is_admin) return NextResponse.redirect(new URL('/admin', request.url))
    return NextResponse.redirect(new URL('/operator', request.url))
  }
}

export const config = {
  matcher: ['/:path*'],
}
