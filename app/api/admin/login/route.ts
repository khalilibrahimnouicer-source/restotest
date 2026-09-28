import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

function token(password: string) {
  return createHmac("sha256", password).update("mhl-admin-session").digest("hex");
}

export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return NextResponse.json({error:"ADMIN_PASSWORD missing"}, {status:500});
  const body = await req.json().catch(() => ({}));
  const supplied = String(body.password || "");
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a,b)) return NextResponse.json({error:"invalid"}, {status:401});
  const res = NextResponse.json({ok:true});
  res.cookies.set("mhl_admin", token(expected), {httpOnly:true,secure:true,sameSite:"lax",path:"/",maxAge:60*60*24*7});
  return res;
}