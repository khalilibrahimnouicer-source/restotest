import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

function token(password: string) {
  return createHmac("sha256", password).update("mhl-admin-session").digest("hex");
}

export async function GET(req: Request) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return NextResponse.json({ok:false}, {status:500});
  const cookie = req.headers.get("cookie")?.match(/(?:^|;\s*)mhl_admin=([^;]+)/)?.[1] || "";
  const expected = token(password);
  const a = Buffer.from(cookie);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a,b)) return NextResponse.json({ok:false}, {status:401});
  return NextResponse.json({ok:true});
}