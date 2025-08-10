import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

 const parseCookies = (str?: string) => {
  const list: Record<string, string> = {};
  if (!str) return list;
  str.split(";").forEach((cookie) => {
    const parts = cookie.split("=");
    const key = parts.shift()?.trim();
    if (!key) return;
    const val = decodeURIComponent(parts.join("="));
    list[key] = val;
  });
  return list;
}

export const clientIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const headerId = req.header("x-client-id");
  if (headerId) {
    (req as any).clientId = headerId;
    return next();
  }

  const rawCookies = req.header("cookie");
  const cookies = parseCookies(rawCookies);
  let clientId = cookies["clientId"];

  if (!clientId) {
    clientId = randomUUID();
    res.setHeader("Set-Cookie", `clientId=${clientId}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`);
  }

  (req as any).clientId = clientId;
  next();
}
