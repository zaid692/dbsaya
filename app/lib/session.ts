// app/lib/session.ts
import type { SessionOptions } from 'iron-session' // Note: Changed from IronSessionOptions to SessionOptions

export type AdminSession = {
  isAdmin?: boolean
}

declare module "iron-session" {
  interface IronSessionData extends AdminSession {}
}

export const sessionOptions: SessionOptions = {  // Changed type here too
  password: process.env.SESSION_PASSWORD || 'complex_password_at_least_32_chars_long_123456',
  cookieName: 'admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  },
}