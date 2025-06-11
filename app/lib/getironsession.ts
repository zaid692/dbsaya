// app/lib/getSession.ts
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import type { AdminSession } from './session';
import { sessionOptions } from './session';

export async function getSession() {
  const cookiesStore = await cookies(); // Await the cookies
  const session = await getIronSession<AdminSession>(cookiesStore, sessionOptions);
  
  if (typeof session.isAdmin === 'undefined') {
    session.isAdmin = false;
  }

  return session;
}

export async function updateSession(sessionData: Partial<AdminSession>) {
  const session = await getSession();
  Object.assign(session, sessionData);
  await session.save();
  return session;
}

export async function destroySession() {
  const session = await getSession();
  await session.destroy();
}

// Helper for Route Handlers