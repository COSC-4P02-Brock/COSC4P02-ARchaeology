import { createCookieSessionStorage } from "@remix-run/cloudflare";
import type { SessionStorage, SessionData } from "@remix-run/cloudflare";

interface SessionContext {
  ENVIRONMENT?: string;

  SECRET_KEY?: string;
}

interface SessionDetails {
  email: string;

  token: string;

  expiresAt: string;

  expiresIn: number;
}

let sessionStorageCookie: SessionStorage<SessionData, never>;

const getSessionStorageCookie = (context: SessionContext) => {
  if (!sessionStorageCookie) {
    sessionStorageCookie = createCookieSessionStorage({
      cookie: {
        name: "archaeology_session",
        secure: context.ENVIRONMENT === "production",
        secrets: [context.SECRET_KEY ?? "secret"],
        sameSite: "lax",
        path: "/",
        httpOnly: true,
      }
    });
  }

  return sessionStorageCookie;
}

export async function createSession(
  sessionDetails: SessionDetails,
  context: SessionContext
) {
  const cookie = getSessionStorageCookie(context);
  const session = await cookie.getSession();
  session.set("token", sessionDetails.token);
  session.set("email", sessionDetails.email);

  return cookie.commitSession(session, {
    maxAge: sessionDetails.expiresIn ?? 60 * 60 * 24 * 7, // 1 week
    expires: new Date(sessionDetails.expiresAt),
    secure: context.ENVIRONMENT === "production",
  });
}

export async function getToken(request: Request, context: SessionContext) {
  const cookie = getSessionStorageCookie(context);
  const session = await cookie.getSession(request.headers.get("Cookie"));
  const token = await session.get("token");
  if (!token || typeof token !== "string") {
    return null;
  }

  return token;
}

export async function getTokenAndEmail(request: Request, context: SessionContext) {
  const cookie = getSessionStorageCookie(context);
  const session = await cookie.getSession(request.headers.get("Cookie"));
  const email = await session.get("email");
  const token = await session.get("token");
  return {
    email: email && typeof email === "string" ? email : "",
    token: token && typeof token === "string" ? token : null,
  }
}

export async function destroySession(request: Request, context: SessionContext) {
  const cookie = getSessionStorageCookie(context);
  const session = await cookie.getSession(request.headers.get("Cookie"));
  return cookie.destroySession(session);
}
